---
title: NoyanFanavarArya
description: Co-founder and backend developer building scalable Python/Django services, REST APIs, and containerized data pipelines.
date: 2019-01-01
tags: [experience, python, django, fastapi, postgresql, redis, docker]
---

## Co-Founder & Senior Backend Developer

**NoyanFanavarArya · 2019 - 2024**

### Overview & Engineering Scope
Co-founded and engineered backend microservices and data platforms for over 15 client web applications. Led architectural decisions from database schema modeling to production deployment, performance tuning, and async job queues.

```
┌─────────────────────────────────┐
│ REST API Gateway                │
│ (JWT Auth & Rate Limiting)      │
└─────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│ Python / Django / FastAPI       │
│ Backend Microservices           │
└─────────────────────────────────┘
       │                 │
       ▼                 ▼
┌──────────────┐  ┌──────────────┐
│ PostgreSQL   │  │ Redis Cache  │
│ Primary DB   │  │ & Celery     │
└──────────────┘  └──────────────┘
```

### Engineering Highlights & Metrics
- **Scalable Service Architecture:** Designed and built RESTful microservices using Python, Django, and FastAPI, handling concurrent user spikes across e-commerce and enterprise management platforms.
- **Database Optimization (40% Latency Drop):** Analyzed PostgreSQL execution plans (`EXPLAIN ANALYZE`), created multi-column B-tree/GIN indexes, and restructured ORM queries, reducing P95 database query latency by ~40%.
- **Caching & Async Task Queues:** Implemented Redis caching for hot read paths and Celery asynchronous task queues for background email delivery, PDF generation, and report aggregation.
- **Containerized DevOps:** Built isolated Docker container environments and Linux deployment pipelines, establishing zero-downtime deployment workflows.

### Technical Stack
`Python` · `Django` · `FastAPI` · `PostgreSQL` · `Redis` · `Celery` · `Docker` · `Linux` · `REST APIs` · `JWT`
