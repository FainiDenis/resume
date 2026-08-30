# Containerized, Highly-Available Application Deployment

**What we did: as a team we took a real self-hosted application and designed, built, and documented a scalable, resilient deployment — containers behind a load balancer, with a highly-available database, orchestrated by Ansible.**

---

This was the capstone of the configuration-management work: applying everything together to take a real application and make it production-worthy. The application we deployed was **Mealie**, an open-source recipe website for organizing and sharing recipes.

## The Architecture

We designed a deployment that would stay up even when components failed:

- **Three web-server containers**, each running the application in Docker.
- An **Apache2 reverse proxy** in front of them that distributed incoming requests across the web servers, so no single server bore all the load.
- **Two PostgreSQL databases** with **Patroni** providing high availability — so the data layer had redundancy and could fail over without taking the app down.

The guiding idea, straight from real-world scaling, was **redundancy at every tier**: take out a couple of web servers and one database, and the site remains operational.

## Orchestration & Automation

Automation was what made managing the fleet feasible. We used **Ansible** to deploy and configure the container setup across the machines — the same agentless approach we'd practiced on a single host, now applied to a whole environment. That meant the container configuration was pushed out reliably and consistently rather than configured by hand on each box.

## Documentation, Results & Challenges

Delivering an infrastructure project means documenting it as carefully as building it. We:

- Produced **architecture diagrams** (Visio/draw.io) showing the topology.
- Captured **results** — demonstrating the resilience, and being honest about remaining limits (for example, image files still living on a single server's disk, and that database redundancy helps availability more than raw load).
- Worked through the **challenges** of the build: using Ansible to drive the container tooling, and dealing with unexpected OS-level issues plus aging documentation that pushed toward older technology — the friction that shows up in a real project and not a tutorial.

We also left a clear roadmap for the remaining work: adding **shared storage (NFS)** so images exist on every server (closing the last gap in resilience), rethinking the database schema for performance, and layering on a **monitoring solution** across all the VMs.

---

**Key takeaway:** Real configuration management isn't a single script or tool — it's the combination of orchestration (Ansible), containers, and a solid redundant architecture, plus the discipline to document it and be honest about its limits. That's what turns a self-hosted app into something you'd actually trust in an organization.
