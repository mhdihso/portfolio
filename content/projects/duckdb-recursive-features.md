---
title: Recursive Features in DuckDB
description: A controlled DuckDB research project comparing standard recursive CTEs with USING KEY through a real Distance-Vector Routing implementation.
date: 2026-04-01
tags: [project, databases, duckdb, sql, query-optimization, research]
---

## Distance-Vector Routing with Recursive SQL

**University of Tübingen · Summer 2026 · Tübingen, Germany**

This seminar project investigates whether SQL can serve as a programming
language for stateful graph algorithms. It implements Bellman–Ford
Distance-Vector Routing twice inside the same DuckDB engine:

- a standard recursive CTE that accumulates simple-path candidates; and
- DuckDB `USING KEY`, which keeps one replaceable route state per
  `(from_node, to_node)` key.

The controlled comparison uses identical physical `.duckdb` files, schemas,
topologies, DDL, transactional mutations, and shortest-path output contracts.
The application executes real `CREATE`, `ALTER`, `INSERT`, `UPDATE`, and
`DELETE` statements, exposes its SQL and query plans, simulates link failures,
and measures re-convergence and recursive-state growth.

### Explore the research

- **[[blog/duckdb-using-key-distance-vector-routing|Read the complete research article →]]**
- **[Run the interactive experiment →](https://duckdb-using-key-routing.streamlit.app/)**
- **[Review the implementation and research material →](https://github.com/mhdihso/Database_seminar_Distance_Vector_Routing)**

### Stack and topics

`DuckDB` · `SQL` · `Recursive CTEs` · `USING KEY` · `Bellman–Ford` ·
`Streamlit` · `Graph Algorithms` · `Benchmark Design` · `Database Research`
