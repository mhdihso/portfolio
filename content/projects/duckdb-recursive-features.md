---
title: Recursive Features in DuckDB Engine
description: Seminar research into recursive SQL execution models, CTE optimization, and analytical query performance in modern vectorized database engines.
date: 2026-04-01
tags: [project, databases, duckdb, sql, query-optimization, cpp, research]
---

## Recursive Query Execution & Optimization in DuckDB

**University of Tübingen · Summer 2026 - Present · Tübingen, Germany**

### Research Context & Problem Statement
Modern analytical database engines excel at columnar vectorized execution, but recursive SQL CTEs (`WITH RECURSIVE`) pose unique challenges. Cyclic graph traversals, transitive closures, and hierarchical data queries can cause explosive working-set state expansion if memory and iteration limits are not carefully managed inside the query execution operator pipeline.

```
┌─────────────────────────────────┐
│ Recursive SQL Query Input       │
│ WITH RECURSIVE CTE (Graph/Tree) │
└─────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│ DuckDB Logical Planner          │
│ & Recursive CTE Operator        │
└─────────────────────────────────┘
                 │
  ┌──────────────┴──────────────┐
  ▼                             ▼
┌─────────────────────────┐   ┌─────────────────────────┐
│ Working-Set Accumulator │   │ Vectorized Execution    │
│ (In-Memory State)       │   │ Pipeline & Join Engine  │
└─────────────────────────┘   └─────────────────────────┘
```

### Research Scope & Key Findings
- **Execution Operator Analysis:** Investigated DuckDB's C++ physical operator implementation for recursive CTEs, analyzing how working-set data vectors are passed across iteration cycles.
- **Graph Traversal Benchmarking:** Evaluated query execution performance and memory footprint during deep recursive graph traversals compared to traditional iterative query processing.
- **Optimization Trade-Offs:** Identified key bottlenecks in intermediate tuple deduplication and state accumulation during large-scale recursive graph joins.

### Technical Stack
`DuckDB` · `C++` · `SQL (WITH RECURSIVE)` · `Query Execution Plans` · `Vectorized Execution` · `Database Engine Internals`
