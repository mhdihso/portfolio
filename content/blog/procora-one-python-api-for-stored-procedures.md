---
title: Procora — Designing One Python API for Stored Procedures
description: How Procora unifies stored-procedure discovery, execution, results, and connection safety across SQL Server, PostgreSQL, and MySQL.
date: 2026-09-05
modified: 2026-09-06
tags: [blog, project, backend, databases, python, sql-server, postgresql, mysql, architecture]
draft: false
---

# Procora — Designing One Python API for Stored Procedures

> **Project status:** Procora 1.0 is a stable, typed Python library with real-database testing across SQL Server, PostgreSQL, and MySQL. See the [[projects/procora|project overview]] or [source code](https://github.com/mhdihso/procora).

## 1. What is Procora?

Procora is a Python library for applications that need to call stored procedures on different database systems. It provides one consistent API while preserving the behavior that matters on each backend: result sets, `OUT` and `INOUT` parameters, and SQL Server return codes.

```python
from procora import connect

db = connect("postgresql", dsn="postgresql://app:secret@localhost/shop")
result = db.call("sales.create_order", customer_id=42)

print(result.rows)
print(result.output)
print(result.return_value)
```

The database remains the source of truth. Procora reads a procedure's metadata from the connected database, matches Python arguments to its parameters, executes it through the native driver, and returns a portable `ProcedureResult`. There is no local procedure registry, duplicated SQL template layer, Django project, or REST server to maintain.

## 2. The cross-database problem

Stored procedures look similar from application code, but their driver-level behavior is not portable. Each database has different catalog queries, call syntax, parameter modes, result handling, timeout controls, and connection-state rules.

Without a dedicated boundary, those differences tend to leak into business logic:

- SQL Server supports result sets, `OUTPUT` parameters, and integer `RETURN` values;
- PostgreSQL procedures expose output values as a procedure output row and have version-dependent `OUT` behavior;
- MySQL requires placeholders for output parameters and every `IN` or `INOUT` argument;
- drivers use different mechanisms for timeouts, transactions, and multiple result sets; and
- pooled connections must be cleaned before they can safely serve another request.

Procora moves that complexity behind a small interface while still letting each database behave like itself.

## 3. One API, native drivers

The public workflow is the same for every backend:

```python
# Direct call
result = db.call("sales.create_order", customer_id=42, note="first order")

# Reusable procedure proxy
create_order = db.procedure("sales.create_order")
result = create_order(customer_id=42)

# Schema namespace
result = db.schemas.sales.create_order(customer_id=42)
```

Applications can pass parameters as keyword arguments or as a mapping. Mapping form is useful when a procedure has parameters whose names overlap with Procora call options, or when SQL Server-style prefixes such as `@note` are convenient.

Procora does not replace the database driver. SQL Server still uses `pyodbc`, PostgreSQL uses `psycopg` 3, and MySQL uses MySQL Connector/Python. The library provides the portable coordination layer around those drivers: discovery, validation, execution, result normalization, and safe connection ownership.

## 4. Live metadata discovery

Rather than asking developers to describe every procedure twice, Procora inspects the database catalog:

```python
info = db.inspect("sales.create_order")

for parameter in info.parameters:
    print(
        parameter.position,
        parameter.name,
        parameter.native_type,
        parameter.mode,
    )
```

Discovered metadata is cached after first use. The cache has a configurable size, optional time-to-live, and explicit invalidation for schema migrations:

```python
db.invalidate_metadata("sales.create_order")
db.clear_metadata_cache()
```

Unqualified procedure names require special care. Procora resolves the active schema or database on the borrowed connection before choosing a cache key. This keeps metadata isolated when pooled connections have different session defaults or applications switch between tenant schemas.

Invalidation is generation-safe: discovery that began before an invalidation may finish for its current caller, but it cannot silently repopulate the entry that was just removed.

## 5. A portable result model

Every call returns a `ProcedureResult` with a predictable interface:

| Property       | Meaning                                        |
| :------------- | :--------------------------------------------- |
| `rows`         | The first result set as a list of dictionaries |
| `first`        | The first row, or `None`                       |
| `scalar`       | The first value in the first row, or `None`    |
| `result_sets`  | Every returned result set                      |
| `output`       | `OUT` and `INOUT` parameter values             |
| `return_value` | The SQL Server integer return code             |

Driver-native values such as `Decimal`, `date`, `datetime`, `bytes`, and UUIDs are preserved. Duplicate column labels are made unique, and JSON text can be decoded directly from a scalar result.

Procora buffers returned result sets before releasing the connection. That design makes connection ownership predictable and results easy to use after a call, but it also creates a clear boundary: the library is intended for bounded procedure results, not unbounded streaming workloads.

## 6. Architecture

```text
Application code
└── Procora's portable Python API
    ├── metadata discovery and bounded caching
    ├── parameter validation and binding
    ├── portable result and error models
    └── database adapters
        ├── SQL Server / Azure SQL → pyodbc
        ├── PostgreSQL 11+         → psycopg 3
        └── MySQL                  → MySQL Connector/Python
```

The adapter boundary is intentionally small. A custom backend implements connection creation, procedure discovery, procedure execution, and procedure listing. The rest of the behavior—public API, cache coordination, call validation, and connection lifecycle—remains shared.

This keeps backend-specific SQL where it belongs without forcing the portable layer to pretend that all databases have identical capabilities.

## 7. Connection ownership and failure safety

Creating a Procora client is lazy. It does not connect until an operation such as `ping`, `inspect`, `list_procedures`, or `call` needs a connection. Each operation borrows or creates a connection, performs its work, and then releases it.

Applications can provide an existing pool:

```python
db = connect(
    "postgresql",
    connection_factory=my_pool.getconn,
    connection_releaser=my_pool.putconn,
    connection_discarder=lambda connection: my_pool.putconn(connection, close=True),
)
```

Before returning a pooled connection, Procora cleans up read transactions and restores temporary session settings that it changed. If rollback, session reset, or commit state becomes uncertain, it discards the connection rather than returning potentially unsafe state to the pool.

Procora also deliberately avoids automatic procedure retries. A failed call may have completed part of a write before the error became visible. Retrying it automatically could create duplicate orders, payments, or other business operations. Retry policy therefore remains an explicit application decision.

## 8. Supported behavior

| Backend                |     Result sets      |    `OUT` / `INOUT`     | Integer return code |
| :--------------------- | :------------------: | :--------------------: | :-----------------: |
| SQL Server / Azure SQL |         Yes          |          Yes           |         Yes         |
| PostgreSQL 11+         | Procedure output row | Yes, version-dependent |   Not applicable    |
| MySQL                  |         Yes          |          Yes           |   Not applicable    |

SQLite is intentionally absent because it does not implement stored procedures. MariaDB can use the MySQL adapter when its Connector/Python-compatible behavior matches the routines being called.

Database-specific differences remain documented rather than hidden. For example, PostgreSQL functions are not treated as procedures, overloaded PostgreSQL procedure names require an unambiguous wrapper, and SQL Server parameter defaults have limitations when an `OUTPUT` variable must also capture the final value.

## 9. Testing the real boundary

Unit tests cover the shared API and backend-specific execution logic, but driver fakes alone are not enough for this kind of library. Procora's real-database suite creates procedures, calls them, verifies their outputs and failure behavior, and removes them again.

The CI matrix covers Python 3.10–3.14 and real PostgreSQL 11, 14, and 17; MySQL 8.0 and 8.4; and SQL Server 2019 and 2022 environments. Azure SQL can be checked through a separate smoke workflow.

The important cases are not only successful calls. The suite also exercises defaults, duplicate columns, multiple result sets, native values, errors, timeouts, connection reuse, transaction cleanup, and failure paths where a connection must be discarded.

## 10. Why a library instead of a service?

Procora originally explored a larger web-application shape. The design became clearer after removing the server and framework layers: calling a stored procedure is infrastructure code that should fit inside an existing application, not force that application to adopt another service.

The final scope is intentionally narrow. Procora does not replace an ORM, generate REST endpoints, or hide SQL behind a new query language. It gives backend code a dependable boundary around an awkward cross-database task while leaving connection policy, business logic, authentication, and API design with the application.

That smaller boundary is the central design decision. Procora is useful because it standardizes what can be portable and makes the remaining database-specific behavior explicit.

---

**[Explore Procora on GitHub](https://github.com/mhdihso/procora)** · [[projects/procora|Go to the project overview →]]
