---
title: PixDB — From Standalone DBMS to DuckDB Extension
description: The revised architecture, working SQL interface, and roadmap for PixDB as an image-query extension built on DuckDB.
date: 2026-07-26
modified: 2026-09-05
tags: [blog, project, ongoing, databases, duckdb, cpp, computer-vision, vector-search, architecture]
draft: false
---

# PixDB — From Standalone DBMS to DuckDB Extension

> **Project status:** Active. PixDB is now a working DuckDB extension with image metadata queries and configurable ASCII rendering. The next stages will add visual features and, later, vector search. See the [[projects/pixdb|project overview]] or [source code](https://github.com/mhdihso/PixDB).

## 1. The architectural change

PixDB began as a plan for a standalone image database: a custom pager, catalog, SQL parser, optimizer, and execution engine written from scratch. That route is useful for learning database internals, but it spends most of the project rebuilding infrastructure that is not specific to images.

The project now has a narrower and more useful goal:

**PixDB is a DuckDB extension that makes image data queryable with SQL.**

DuckDB owns storage, transactions, SQL parsing, query execution, and optimization. PixDB adds the image-specific layer: file discovery, metadata extraction, visual operators, embeddings, and terminal rendering. This keeps the research focus on image-aware data systems while immediately gaining DuckDB's mature relational engine.

## 2. Current architecture

```text
                     SQL query
                        │
                ┌───────▼────────┐
                │     DuckDB     │
                │ SQL · storage  │
                │ plans · joins  │
                └───────┬────────┘
                        │ extension API
              ┌─────────▼──────────┐
              │       PixDB        │
              ├────────────────────┤
              │ image discovery    │
              │ metadata decoding  │
              │ ASCII rendering    │
              │ future CV features │
              │ future embeddings  │
              └────────────────────┘
```

The implementation is C++17 and follows the standard DuckDB extension structure. DuckDB is pinned as a Git submodule, and the development build produces both a statically linked DuckDB shell and a loadable `.duckdb_extension` artifact.

## 3. What works today

### Query a directory of images

`pixdb_images()` turns a local file or glob into ordinary DuckDB rows:

```sql
SELECT filename, format, width, height, channels, has_alpha, size
FROM pixdb_images('/photos/**/*', ignore_errors = true)
WHERE width > height
ORDER BY width * height DESC;
```

The initial scanner supports JPEG, PNG, GIF, and BMP. It detects formats by signature rather than trusting file extensions, reads dimensions and channel information from image headers, and returns filesystem size and modification time.

Because the result is relational, normal SQL composes with it:

```sql
SELECT format,
       count(*) AS image_count,
       sum(size) AS total_bytes
FROM pixdb_images('/photos/**/*', ignore_errors = true)
GROUP BY format
ORDER BY image_count DESC;
```

Metadata can also be persisted as a regular DuckDB table:

```sql
CREATE TABLE image_catalog AS
SELECT *, current_timestamp AS indexed_at
FROM pixdb_images('/photos/**/*', ignore_errors = true);
```

The scan has deterministic file ordering and projection pushdown. Empty globs produce no rows, exact missing paths produce useful errors, and `ignore_errors = true` skips malformed or unreadable inputs during batch scans. This first version intentionally supports local files only and inspects headers without decoding the complete pixel buffer.

### Render an image as ASCII

PixDB integrates [ascii-image-converter](https://github.com/TheZoraiz/ascii-image-converter) as a runtime renderer:

```sql
SET pixdb_ascii_width = 40;
SET pixdb_ascii_complex = true;
SET pixdb_ascii_negative = false;

SELECT ascii_line
FROM pixdb_ascii_lines('/photos/example.jpg');
```

The scalar `pixdb_ascii(path)` returns the complete rendering, while `pixdb_ascii_lines(path)` returns one row per line for clean terminal output. DuckDB settings control width, height, color, complexity, negative mode, dithering, background color, and the converter executable path.

## 4. Design boundaries

PixDB will not implement another general-purpose parser, transaction manager, buffer pool, catalog, or relational optimizer. New work should enter through DuckDB extension APIs and return regular DuckDB values, rows, or tables.

The project remains responsible for the domain-specific questions:

- How should image collections be discovered and catalogued?
- Which visual features are inexpensive and deterministic enough to compute during a scan?
- Which features should be materialized, cached, or computed lazily?
- How should relational predicates narrow candidates before expensive inference or similarity search?
- Where should model inference live, and how should its version and provenance be recorded?

## 5. Revised roadmap

- [x] **Extension foundation:** Buildable C++17 DuckDB extension with CI, tests, and pinned dependencies.
- [x] **ASCII rendering:** Scalar and line-oriented SQL interfaces backed by configurable converter settings.
- [x] **Image metadata queries:** Local glob discovery, signature detection, header metadata, error handling, and relational materialization.
- [ ] **Deterministic visual features:** Brightness, contrast, entropy, blur, and compact color statistics.
- [ ] **Catalog refresh semantics:** Detect changed or missing files and update materialized metadata safely.
- [ ] **EXIF metadata:** Orientation, capture time, camera information, and optional spatial fields.
- [ ] **Embeddings:** Versioned model inference with vectors stored in DuckDB.
- [ ] **Similarity search:** Integrate DuckDB vector capabilities after the relational and feature-extraction paths are stable.

## 6. Build and try it

```sh
git clone --recurse-submodules https://github.com/mhdihso/PixDB.git
cd PixDB
GEN=ninja make
GEN=ninja make test
./build/release/duckdb
```

The repository includes SQLLogicTests for supported formats, malformed files, empty globs, Unicode filenames, settings, and the ASCII converter boundary.

---

**[Explore PixDB on GitHub](https://github.com/mhdihso/PixDB)** · [[projects/pixdb|Go to the project overview →]]
