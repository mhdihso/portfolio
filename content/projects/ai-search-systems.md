---
title: AI & Hybrid Information Retrieval Search Engine
description: Scalable search architecture combining BM25 lexical ranking and dense vector embeddings with sub-45ms query latency.
date: 2026-04-01
tags: [project, ai, information-retrieval, search, python, redis, pgvector, fastapi]
---

## Hybrid AI Search & Information Retrieval Engine

**University of Tübingen · Summer 2026 - Present · Tübingen, Germany**

### System Architecture & Problem Statement
Pure lexical search (BM25/TF-IDF) misses semantic context, while pure vector search struggle with exact keyword/code identifier matches. This system implements a high-throughput hybrid retrieval architecture combining lexical BM25 scores and dense transformer embeddings into a unified reciprocal rank fusion (RRF) pipeline.

```
┌─────────────────────────────────┐
│ Document Ingestion & Text Chunk │
└─────────────────────────────────┘
                 │
  ┌──────────────┴──────────────┐
  ▼                             ▼
┌─────────────────────────┐   ┌─────────────────────────┐
│ Inverted BM25 Indexer   │   │ Dense Vector Generator  │
│ (Exact Keyword Match)   │   │ (Transformer Embeddings)│
└─────────────────────────┘   └─────────────────────────┘
  │                             │
  └──────────────┬──────────────┘
                 ▼
┌─────────────────────────────────┐
│ Reciprocal Rank Fusion (RRF)    │
│ Re-ranker (FastAPI + Redis)     │
└─────────────────────────────────┘
```

### Key Engineering Features & Benchmarks
- **Sub-45ms P99 Latency:** Optimized query execution by caching frequent search tokens in Redis and executing vector cosine distance queries against PostgreSQL `pgvector` indexed columns.
- **Hybrid Scoring Pipeline:** Implemented Reciprocal Rank Fusion (RRF) to dynamically weight exact string matches alongside semantic embedding similarity vectors.
- **Scalable REST API Backend:** Built with FastAPI, Pydantic data validation, and asynchronous database connections for parallel query execution.

### Technical Stack
`Python` · `FastAPI` · `PostgreSQL (pgvector)` · `Redis` · `PyTorch / HuggingFace Embeddings` · `Information Retrieval` · `Docker`
