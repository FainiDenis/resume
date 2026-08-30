# Configuration Management — Showcase

**A write-up of my deeper DevOps and infrastructure-tooling work — managing services and packages, remote automation with Ansible, coordinating teams with Azure DevOps, and deploying a highly-available containerized application.**

---

## What This Is

This is my personal record of the **configuration management** and DevOps tooling work I completed — the layer that comes *after* learning to script, where you automate and manage whole fleets of machines rather than one-off tasks. It builds on the task-automation scripting skills and scales them up with professional tools.

It's written as a reflection of my work — first person where the work was individual, and team phrasing where it was done with classmates. It intentionally omits course identifiers and exact configuration so it stays a portfolio of my own learning rather than a set of answers.

## What I Can Do

### Linux Systems Management
- Manage **packages** — query, search, install, and update software, and understand dependencies.
- Manage **services** with systemd/`systemctl` — install, start, stop, enable, disable, and check status.
- Make sound judgments about what belongs on a **production** server.

### Remote Automation
- Set up **SSH key-based authentication** for secure, scriptable access.
- Run **Ansible** ad-hoc commands agentlessly over SSH — no client installed on managed hosts.
- Push changes (install software, copy files) from one control machine to many targets.

### Team Coordination
- Plan and track group work with **Azure DevOps** — projects, boards, epics, sprints, and work items.

### Containers & High Availability
- Deploy a real application in **Docker containers** behind a **reverse proxy**.
- Add **database high availability** (PostgreSQL with Patroni) for resilience.
- Orchestrate the deployment with **Ansible** and document the architecture.

---

## Projects

- **01 · Package Management** — working with the package manager on a Linux server.
- **02 · Service Management** — controlling background services with systemd/`systemctl`.
- **03 · Secure Remote Automation** — SSH keys and Ansible ad-hoc commands.
- **04 · Team Workflow with Azure DevOps** — planning and tracking group work (team).
- **05 · Containerized, Highly-Available Deployment** — Docker, reverse proxy, and HA database (team).

---

## Tools I Used

- **Linux package management** — Yum, query/install/update, dependency awareness
- **systemd / systemctl** — service lifecycle management
- **OpenSSH** — key-based authentication
- **Ansible** — agentless ad-hoc configuration management
- **Azure DevOps** — project, boards, epics, sprints, work items
- **Docker** — containerized services
- **Apache2** — reverse proxy / load balancing
- **PostgreSQL + Patroni** — high-availability database
- **Visio / draw.io** — architecture diagrams

---

## Key Skills Summary

| Skill Area | Key Capabilities |
|------------|------------------|
| **Systems Management** | Package and service lifecycle, production hardening judgment |
| **Remote Automation** | SSH keys, agentless Ansible ad-hoc commands |
| **Team Coordination** | Azure DevOps boards, epics, sprints, work item tracking |
| **Containers & HA** | Docker, reverse proxy load balancing, Patroni database HA |
