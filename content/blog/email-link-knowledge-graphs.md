---
title: "Building an Email Intelligence System with Knowledge Graphs and TransE Embeddings"
date: "2026-02-17"
description: "How I combined NLP, knowledge graphs, and TransE embeddings to make email search actually intelligent — and what I learned building it."
tags: ["AI", "Knowledge Graphs", "NLP", "TransE", "Python"]
author: "Gaurav Surtani"
---

Email is where knowledge goes to die.

Over a career, the average professional sends and receives tens of thousands of emails. Critical decisions, project context, contact relationships, commitments — all buried in an inbox that only responds to exact keyword matches. Search for "project deadline" and you'll miss the email that said "need this wrapped up by end of month." The words don't match. The meaning does.

That's the problem I set out to solve with [Email-Link](https://github.com/gauravsurtani/Email-Link).

## The Core Idea: Relationships Over Keywords

Instead of indexing words, what if we indexed *relationships*? When you receive an email about a product launch from a colleague, your brain doesn't store it as a bag of keywords — it stores it as a node in a network: this person, this project, this deadline, connected to everything else you know.

Knowledge graphs work the same way. Every entity in your email — people, organizations, dates, topics, projects — becomes a node. Every relationship between them becomes an edge.

## Where TransE Changes Everything

This is where it gets interesting. A traditional knowledge graph stores explicit relationships — things you've directly stated. But emails are full of *implicit* relationships: the colleague who always cc's legal on pricing questions, the project that's always mentioned alongside a specific vendor, the deadline language that signals urgency without stating it.

**TransE** (Translating Embeddings) addresses this by learning a vector representation of every entity and relationship in the graph. The core insight is elegant: if `(head, relation, tail)` is a true triple, then `head + relation ≈ tail` in embedding space. This means the model can *infer* relationships that were never explicitly stated — finding connections your inbox doesn't know it contains.

Applied to email graphs, TransE lets the system surface non-obvious links: "these three threads are all connected to the Q3 budget even though none of them say 'Q3 budget.'"

## What I Learned

Building this taught me that the hard problem isn't the AI — it's data quality. Email is noisy. Entity resolution (figuring out that "Sarah," "Sarah J.," and "s.johnson@company.com" are the same node) consumed more engineering time than the graph queries themselves.

The second lesson: embedding-based inference needs careful calibration. TransE can find patterns that don't exist if the training data is sparse. Confidence thresholds and graceful fallback to explicit-only results matter more than raw recall.

## More Coming Soon

This post is a teaser. A deeper technical writeup — covering the full NLP pipeline, the graph schema design, TransE training details, and evaluation results — is in progress.

If you're working on knowledge representation, graph embeddings, or agentic AI over structured data, I'd genuinely like to compare notes. The code is on [GitHub](https://github.com/gauravsurtani/Email-Link).
