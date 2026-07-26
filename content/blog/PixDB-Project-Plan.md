---
title: PixDB — Architecture & Engineering Plan
description: An engineering roadmap for PixDB, a C-based image database that combines structured metadata filters, computer-vision features, and vector similarity search.
date: 2026-07-26
tags:
  [
    blog,
    project,
    ongoing,
    databases,
    c,
    storage-engine,
    computer-vision,
    vector-search,
    architecture,
  ]
draft: false
---

# PixDB — Architecture & Engineering Plan

> **Project status:** Ongoing. The storage pager is complete; the current focus is a slotted-page layout and dynamic catalog. For the project overview, see [[projects/pixdb|PixDB]].

## 1. Executive Vision

**PixDB** is a research-prototype database management system for image data. Rather than treating an image as an opaque BLOB or sending every query to a separate vector database, it makes visual metadata, computational-photography metrics, and learned embeddings queryable alongside conventional relational fields.

```sql
SELECT photo_id, brightness, entropy
FROM photos
WHERE brightness > 0.75
  AND entropy > 6.2
  AND contains_object('person') = 1
ORDER BY similarity(photo_123)
LIMIT 20;
```

The project brings database-engine internals—storage, execution, and optimization—together with computer vision and vector retrieval in one system.

---

## 2. Core Goals & Engineering Demonstrations

- **Custom DBMS core:** A C11 storage engine, buffer manager, SQL front end, Volcano-style executor, and optimizer built without embedding an existing database engine.
- **Image-aware query language:** SQL extensions for `contains_object()`, `similarity()`, `entropy()`, `blur()`, and `brightness()`.
- **Ingestion-time feature extraction:** Statistical, photographic, and learned features are computed once and stored as queryable attributes.
- **Hybrid retrieval:** HNSW or FAISS powers k-nearest-neighbour ordering alongside relational filters.
- **Explainable execution:** A web console will expose logical and physical query plans.

---

## 3. High-Level Architecture

```
                    ┌──────────────────────────┐
                    │      Image Query SQL     │
                    └─────────────┬────────────┘
                                  │
                              SQL Parser
                                  │
                         Logical Query Plan
                                  │
                        Query Optimizer & Plan
                                  │
                       Physical Execution Plan
                                  │
          ┌───────────────────────┼───────────────────────┐
          │                       │                       │
 ┌────────┴────────┐     ┌────────┴────────┐     ┌────────┴────────┐
 │ Storage Engine  │     │ Feature Engine  │     │ Vector Index    │
 │ (C Pager/Slotted│     │ (OpenCV / CV)   │     │ (HNSW / FAISS)  │
 └────────┬────────┘     └────────┬────────┘     └────────┬────────┘
          └───────────────────────┼───────────────────────┘
                                  │
                         Execution Results
```

---

## 4. Major Subsystems

1. **Storage Engine (C):** File pager, buffer manager, binary page layout, metadata catalog, and slotted-page record management.
2. **Feature Extraction Engine:** RGB/HSV color histograms, entropy, contrast, mean brightness, sharpness, noise levels, and EXIF metadata.
3. **Computational Photography Operators:** Queryable indicators for blur detection (Laplacian variance), exposure quality, focus, and histogram distribution.
4. **Computer Vision Module (Python/C FFI):** Object detection, face detection, OCR, and segmentation, computed at ingestion and stored as relational attributes.
5. **CNN Vector Embeddings:** 768-dimensional feature vectors per image powering vector similarity search.
6. **Vector Search Index:** Integrated HNSW/FAISS index powering `ORDER BY similarity(...)` clauses.
7. **Query Executor & Optimizer:** Volcano iterator model (`SeqScan → Filter → Project → VectorSort`) with predicate pushdown and cost-based plan generation.

---

## 5. Technology Stack & Dependencies

| Layer                    | Choice & Rationale                                                             |
| :----------------------- | :----------------------------------------------------------------------------- |
| **DBMS Core**            | **C11 (GCC/Clang)** — Storage engine, pager, parser, optimizer, buffer manager |
| **AI & Computer Vision** | **Python (PyTorch, OpenCV, ONNX Runtime)** — Deep learning feature extraction  |
| **Vector Engine**        | **FAISS / HNSWlib** — High-performance vector index                            |
| **API boundary**         | **FastAPI & Uvicorn** — query and execution-plan endpoints                     |
| **Web console**          | **React + TypeScript** — SQL editor and query-plan visualizer                  |

---

## 6. Implementation Roadmap

- [x] **1. Storage pager and file format**
      A C disk pager with fixed-schema rows and persistent filter scans across process restarts.
- [/] **2. Header page and slotted-page layout** _(current)_
  Variable-length storage for tags, detected labels, and vector arrays.
- [ ] **3. Dynamic catalog system**
      Runtime schema definitions that replace compile-time row layouts.
- [ ] **4. SQL front end and parser**
      A tokenizer and recursive-descent parser for image-aware SQL.
- [ ] **5. Volcano execution engine**
      An iterator pipeline using `open` → `next` → `close` operators.
- [ ] **6. Predicate-pushdown optimizer**
      Rules that apply inexpensive scalar filters before vector distance calculations.
- [ ] **7. CV and vector integration**
      OpenCV-derived features and an HNSW index connected to the query engine.
- [ ] **8. Web console and plan visualizer**
      A React interface for querying the system and inspecting execution plans.

---

[[projects/pixdb|Go to Main PixDB Project Page →]]
