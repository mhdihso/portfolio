---
title: What Five Years of Co-Founding Taught Me About Backend Engineering
description: The engineering lessons that only come from owning a production system with no one else to fix it.
date: 2026-07-20
tags: [blog, backend, engineering, co-founder, systems]
draft: false
---

Running the engineering of a company you founded is a particular kind of education.

When something breaks in a big company, there is a process. An incident channel, an on-call rotation, a runbook. When it breaks at your own startup, there is you, a terminal, and the knowledge that clients are waiting.

Here are the things that experience actually taught me.

## Query plans are not optional

I spent years writing SQL queries that worked. The real education came when they worked fine with 10,000 rows and fell apart at 500,000. You learn to read `EXPLAIN ANALYZE` output not because someone told you to, but because a production query is taking 12 seconds and you need to find out why.

The answers are usually unpleasant: a missing index on a join column, a sequential scan where you expected an index scan, or a subquery being re-evaluated for every row. Once you've fixed a slow query by adding a partial index on a filtered column, you start thinking about indexes before you write the query.

## Containers are not magic

Docker is a tool with a learning curve that hides its own complexity. When I first containerized our services, I thought the hard part was writing the Dockerfile. It turned out the hard part is thinking clearly about networking, environment configuration, persistent state, and what happens when a container crashes in production versus in development.

Docker Swarm taught me how service scheduling, health checks, and rolling updates actually work — not from documentation, but from deploying something that broke halfway through a rollout and learning to design rollbacks.

## Ownership is the only real teacher

Every engineering decision I made at NoyanFanavarArya had consequences I had to live with. That means I was motivated to make good ones, and that failure was immediately legible. There is no review process that teaches you as fast as deploying something broken to production and fixing it at 1am.

The skills I trust most are the ones I learned this way: not from courses, but from the discipline that comes when the consequences are real and the safety net is your own competence.

---

This is not a story about working harder than everyone else. It is a story about how accountability accelerates learning — and why I value engineering environments where the people making decisions are close to their consequences.
