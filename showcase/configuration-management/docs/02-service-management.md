# Service Management with systemd

**What I did: dug into how background services are controlled via systemd/`systemctl` — using a real service (time synchronization) as the working example.**

---

Knowing what's *running* on a server is just as important as knowing what's *installed*. This work focused on the `systemctl` command, which manages the background services (called **units**) on a modern Linux system.

## What I Learned to Do

Using a real service as the example (the time-synchronization daemon), I:

- **Install** the service package and observed that installing it makes it *available* but does **not** automatically start it.
- **Start and stop** the service on demand.
- **Check status** — whether a unit is **active** (running right now) and whether it's **loaded**.
- **Enable / disable** a service, so it does (or doesn't) start automatically at boot.
- **List dependencies** of a unit and the full set of enabled units on the system.

## The Key Distinction

The most useful mental model from this work is the difference between two independent states:

- **Active** — the service is *running right now*.
- **Enabled** — the service is *configured to start automatically at boot*.

These don't move together. Stopping a service does **not** un-enable it (it will still come back at boot), and disabling it does **not** stop it in the current session. "Loaded but not enabled" is normal — it just means a unit is available for manual activation but isn't set to auto-start. Understanding this is essential for reliable, reproducible service configuration.

---

**Key takeaway:** Controlling services isn't just "start it." Knowing the difference between *running now* and *configured to run at boot* — and how install, enable, start, stop, and disable each interact — is what makes service configuration predictable and repeatable.
