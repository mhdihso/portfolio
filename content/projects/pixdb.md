---
title: PixDB — Domain-Specific Image DBMS
description: A C-based, domain-specific database management system that treats image pixel data, visual features, and deep learning embeddings as first-class, queryable SQL primitives.
date: 2026-07-26
tags:
  [
    project,
    ongoing,
    databases,
    c,
    storage-engine,
    query-optimization,
    vector-search,
    computer-vision,
    systems-programming,
  ]
---

# PixDB — Domain-Specific Image DBMS Engine

**Ongoing Systems Project · University of Tübingen · 2026 – Present**

> **Status:** Active Engineering — Phase 1 Storage Engine & Pager Complete
>
> **Core Stack:** C11 (Database Internals), Python (PyTorch, OpenCV, FAISS), FastAPI, React/TypeScript
>
> **Key Domains:** Database Storage Engines, Query Execution & Optimization, Vector Similarity Search, Computational Photography

---

## 1. System Vision

Traditional relational databases treat images as **opaque BLOBs** (Binary Large Objects), forcing applications to download raw bytes and execute feature extraction in application code. Specialized vector databases store embeddings, but lack relational query operators, structured metadata filters, and computational photography primitives.

**PixDB** is a research-prototype DBMS written in C that elevates pixel data, visual features, computational photography metrics, and deep-learning vector embeddings to **first-class, queryable SQL primitives**.

### Example PixDB Query

```sql
SELECT photo_id, brightness, entropy, contains_object('person')
FROM photos
WHERE brightness > 0.75
  AND entropy > 6.2
  AND contains_object('person') = 1
ORDER BY similarity(photo_123)
LIMIT 20;
```

Instead of running an expensive vector scan over the entire dataset, PixDB's query optimizer applies **predicate pushdown** to prune candidate sets using scalar indices and feature bounds before computing vector similarity or triggering deep-learning inference.

---

## 2. Architecture Overview

```
                      ┌──────────────────────────┐
                      │   Image SQL Statement    │
                      └─────────────┬────────────┘
                                    │
                                SQL Parser
                                    │
                           Logical Query Plan
                                    │
                         Query Optimizer & Planner
                      (Predicate Pushdown & Cost Model)
                                    │
                          Physical Query Plan
                                    │
               ┌────────────────────┼────────────────────┐
               │                    │                    │
     ┌─────────┴─────────┐ ┌────────┴────────┐ ┌─────────┴─────────┐
     │  C Storage Engine │ │ Feature Engine  │ │ Vector Index Engine│
     │  (Pager, Slotted) │ │ (OpenCV / CV)   │ │  (HNSW / FAISS)    │
     └─────────┬─────────┘ └────────┬────────┘ └─────────┬─────────┘
               └────────────────────┼────────────────────┘
                                    │
                          Volcano Iterator Stream
                                    │
                             Image Results
```

---

## 3. Core Engine Components

### A. C Storage Engine & Buffer Manager

- **Disk Pager:** Manages fixed-size page blocks over binary database files with persistence across process restarts. (Completed in Phase 1)
- **Buffer Pool Manager:** Maintains an in-memory page cache with LRU eviction policies, dirty page tracking, and synchronized disk flushes.
- **Slotted-Page Record Layout:** Supports variable-length records (labels, detected bounding boxes, feature vectors, and binary headers) within disk pages.
- **Catalog System:** Dynamic schema management defining attribute types, offsets, and indexed feature fields.

### B. Computational Photography & Feature Engine

Transforms image analysis metrics into queryable database fields computed and cached upon ingestion:

- **Statistical Features:** RGB/HSV color histograms, entropy, mean brightness, contrast, noise levels, and edge density.
- **Photographic Operators:** Blur detection (Laplacian variance), exposure metrics, focus maps, and lens distortion indicators.
- **EXIF & Spatial Metadata:** GPS coordinates, camera model, focal length, ISO, and timestamp attributes.

### C. Computer Vision & Deep Learning Subsystem

- **Precomputed Metadata:** Object detection (YOLO/Faster R-CNN), face detection, OCR text extraction, and semantic segmentation executed asynchronously during ingestion.
- **Vector Embeddings:** Extracts 768-dimensional CNN/ViT visual feature vectors per image.

### D. Vector Similarity & k-NN Indexing

- **Vector Search Engine:** Integrated vector index (HNSW / FAISS) supporting cosine and L2 distance metrics.
- **Query Operator:** Native `similarity(image_id)` operator enabling fast k-Nearest Neighbor (k-NN) visual search integrated directly into SQL `ORDER BY` clauses.

### E. Execution & Query Optimization

- **Volcano Iterator Model:** Standardized open-next-close iterator pipeline (`SeqScan` → `Filter` → `Project` → `VectorRank`).
- **Optimization Strategy:** Predicate pushdown to evaluate low-cost scalar filters (e.g., `brightness > 0.75`) before triggering expensive vector distance calculations or CV feature lookups.

---

## 4. Technology Stack & Tooling

| System Layer      | Technology Selection                       | Rationale                                                                         |
| :---------------- | :----------------------------------------- | :-------------------------------------------------------------------------------- |
| **DBMS Core**     | C11 (GCC / Clang)                          | Zero-overhead memory management, custom buffer pool, exact pointer layout control |
| **CV & AI Layer** | Python 3.11, PyTorch, OpenCV, ONNX Runtime | Deep learning model inference and computer vision feature extraction              |
| **Vector Index**  | HNSWlib / FAISS                            | High-throughput approximate nearest neighbor (ANN) vector retrieval               |
| **API Boundary**  | FastAPI, C/Python IPC                      | High-performance API wrapper for execution plan visualization                     |
| **Web Frontend**  | React, TypeScript                          | Interactive SQL query editor and visual query execution plan graph                |

---

## 5. Development Roadmap & Status

- [x] **Milestone 1: C Storage Engine Pager**
      Implemented disk pager over binary files, fixed-schema row serialization, buffer management, and verified persistent filter scans across restarts.
- [/] **Milestone 2: Slotted Pages & Catalog System** _(Current Focus)_
  Transitioning to variable-length record formats for label arrays, multi-tag storage, and dynamic schema catalogs.
- [ ] **Milestone 3: SQL Tokenizer & Volcano Executor**
      Implementing recursive-descent SQL parser for `SELECT-FROM-WHERE-ORDER BY` and Volcano iterator execution pipeline.
- [ ] **Milestone 4: Computational Feature Pipeline**
      Integrating OpenCV C++/Python bindings for histogram, entropy, blur, and color extraction upon image insertion.
- [ ] **Milestone 5: Vector Similarity Indexing & Query Pushdown**
      Integrating HNSW vector index and cost-based query optimizer for hybrid relational + vector query plans.
- [ ] **Milestone 6: Plan Visualizer & Web Console**
      Building React/TypeScript frontend displaying interactive query execution graphs and visual result grids.

---

## 6. Systems Engineering & Research Challenges

1. **IPC / FFI Boundary Design:** Evaluating shared-memory IPC vs. C/Python FFI (`ctypes`/`cffi`) to pass high-dimensional feature vectors between Python AI models and the C storage engine without redundant copy overhead.
2. **Hybrid Relational-Vector Query Optimization:** Designing cost formulas to decide when to perform vector index traversal first versus applying relational scalar filters first.
3. **Storage Compression for Visual Vectors:** Investigating product quantization (PQ) and compressed page formats for dense 768-dim embeddings.

---

[[projects/index|View All Projects →]] · [[blog/PixDB-Project-Plan|Read the Architecture & Engineering Plan →]] · [[about/bio|Read Technical Bio →]]
