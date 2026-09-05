---
title: Procora — One Python API for Stored Procedures
description: A typed Python library for discovering and calling stored procedures across SQL Server, PostgreSQL, and MySQL.
date: 2026-09-05
modified: 2026-09-06
tags: [project, backend, databases, python, sql-server, postgresql, mysql, open-source]
---

## Procora

**Open-Source Database Library · Python · 2026**

Procora gives Python applications one consistent way to call stored procedures across SQL Server, PostgreSQL, and MySQL. It discovers procedure metadata directly from the database, binds values through each backend's native driver, and returns rows, output parameters, and return values through a portable result model.

The project is deliberately a library rather than a web service or framework. It fits inside an existing backend, keeps the database as the source of truth, supports custom connection pools and database adapters, and does not retry procedures whose writes may already have executed.

### Explore the project

- **[[blog/procora-one-python-api-for-stored-procedures|Read the complete technical article →]]**
- **[Review the source code →](https://github.com/mhdihso/procora)**

### Stack and topics

`Python 3.10+` · `SQL Server` · `PostgreSQL` · `MySQL` · `pyodbc` · `psycopg 3` · `Stored Procedures` · `Connection Pooling` · `Typed APIs`
