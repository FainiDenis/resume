# Secure Remote Automation (SSH & Ansible)

**What I did: established passwordless remote control between machines with SSH keys, then used Ansible to configure a target without installing anything on it.**

---

Automation across many machines requires a secure way to reach them. This work connected the two key pieces: **SSH key-based authentication** for secure, scriptable access, and **Ansible** for agentless configuration management over that connection.

## SSH Key-Based Authentication

I set up two machines and established passwordless login between them:

- Confirmed SSH was present and **active** on both machines.
- **Generated an SSH key pair** on the control machine and **copied the public key** to the target, so I could log in **without a password**.
- Understood where the keys live, what the private/public key files look like, and that the private key must never leave its machine.
- Noted the **security details**: the firewall permits SSH on its standard port, and every login attempt is written to the system SSH log — which is how you'd spot unauthorized access.

This key-based setup is exactly how automation tools talk to machines: securely, and without a human typing a password each time.

## Agentless Configuration with Ansible

A big advantage of Ansible is that it needs **no special client installed on the machines it manages** — it turns the administrator's commands into SSH sessions and runs them on the target. That keeps the attack surface small. I:

- **Installed Ansible** on the control machine (pulling in its supporting packages).
- Learned that Ansible is **not a service** — it's a command-line automation tool you invoke, rather than something running in the background.
- Checked **connectivity** to the target with Ansible's ping module (the "ping/pong" handshake proves it can reach and run on the target).
- Ran **ad-hoc commands** to make real changes to the target:
  - **Installing software** remotely.
  - **Copying a file** from the control machine over to the target.
- Understood the role of Ansible's **configuration** and **inventory** files, which define how it talks to its hosts and which accounts it uses.

## Why It's Configuration Management

Ansible is the bridge from "configure one machine by hand" to "configure many machines from a single control point." The ad-hoc commands here are the foundation — the same connection and inventory model that later runs full playbooks to roll out consistent configurations across an entire fleet.

---

**Key takeaway:** SSH keys plus an agentless tool like Ansible let one control machine push reliable, repeatable configuration to any number of targets — without installing a bespoke agent (and its security risk) on every single one.
