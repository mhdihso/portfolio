---
title: PixDB — Image Analytics for DuckDB
description: A C++ DuckDB extension for querying image metadata, visual features, ASCII renderings, and future vector embeddings with SQL.
date: 2026-07-26
modified: 2026-09-05
tags: [project, ongoing, databases, duckdb, cpp, database-extension, vector-search, computer-vision]
---

# PixDB — Image Analytics for DuckDB

**Ongoing Systems Project · University of Tübingen · 2026 – Present**

> **Status:** Working DuckDB extension — image metadata queries and ASCII rendering are implemented and tested.
>
> **Core Stack:** C++17, DuckDB extension API, stb_image, ascii-image-converter
>
> **Source:** [github.com/mhdihso/PixDB](https://github.com/mhdihso/PixDB)

## Project direction

PixDB makes image collections queryable inside DuckDB. It began as a standalone database-engine experiment, but the architecture was deliberately changed: DuckDB now provides the SQL engine, storage, transactions, catalog, and optimizer, while PixDB concentrates on image-aware functionality.

That boundary makes the project smaller, more composable, and more useful. Image metadata can participate in normal DuckDB filters, joins, aggregations, and persistent tables without recreating a general-purpose DBMS.

## Working SQL interface

`pixdb_images()` scans one local image or a glob and returns relational metadata:

```sql
SELECT filename, format, width, height, channels, has_alpha, size
FROM pixdb_images('/photos/**/*', ignore_errors = true)
WHERE width >= 1920
ORDER BY width * height DESC;
```

Current output includes:

| Column                  | Meaning                                                 |
| :---------------------- | :------------------------------------------------------ |
| `filename`              | Matched local path                                      |
| `format`                | JPEG, PNG, GIF, or BMP detected from the file signature |
| `width`, `height`       | Encoded image dimensions                                |
| `channels`, `has_alpha` | Encoded color layout                                    |
| `size`                  | File size in bytes                                      |
| `last_modified`         | Filesystem modification timestamp                       |

Results can be materialized with standard SQL:

```sql
CREATE TABLE image_catalog AS
SELECT *, current_timestamp AS indexed_at
FROM pixdb_images('/photos/**/*', ignore_errors = true);
```

PixDB also exposes terminal-friendly ASCII rendering:

```sql
SET pixdb_ascii_width = 40;

SELECT ascii_line
FROM pixdb_ascii_lines('/photos/example.png');
```

## Architecture

```text
DuckDB
├── SQL parser, binder, optimizer, and executor
├── tables, files, transactions, joins, and aggregates
└── PixDB extension
    ├── image collection discovery
    ├── header-based metadata extraction
    ├── configurable ASCII rendering
    ├── planned visual feature functions
    └── planned embeddings and similarity search
```

The metadata reader uses DuckDB's filesystem abstraction and a pinned stb_image dependency. It performs signature detection and header parsing without decoding the full pixel buffer. The table function supports deterministic ordering, projection pushdown, explicit batch error semantics, and paths containing spaces or Unicode characters.

## Engineering milestones

- [x] Buildable static and loadable DuckDB extension
- [x] C++17 configuration and extension module boundaries
- [x] Configurable `pixdb_ascii()` scalar function
- [x] Terminal-oriented `pixdb_ascii_lines()` table function
- [x] `pixdb_images()` metadata table function
- [x] JPEG, PNG, GIF, and BMP signature and header support
- [x] SQLLogicTests for successful scans and failure cases
- [ ] Deterministic image features such as brightness, contrast, entropy, and blur
- [ ] Refresh semantics for persistent image catalogs
- [ ] EXIF extraction and orientation handling
- [ ] Versioned embedding generation and vector similarity search

## Why DuckDB?

DuckDB already provides a mature vectorized execution engine and a strong extension model. PixDB can therefore focus its engineering effort on image semantics instead of duplicating SQL parsing, storage pages, concurrency control, and relational optimization. The result behaves like part of a database rather than a separate service that happens to sit beside one.

---

**[Explore the source code →](https://github.com/mhdihso/PixDB)** · [[blog/PixDB-Project-Plan|Read the architecture and roadmap →]] · [[projects/index|View all projects →]]
