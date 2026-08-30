# Package Management

**What I did: mastered the package manager on a Linux server — the operation that controls what software (and therefore what capability) a machine has.**

---

Packages are how you manage a server's capabilities. This work was a hands-on exercise in answering real operational questions with the package manager on a minimal Linux install.

## What I Learned to Do

- **Inventory what's installed** — determine how many packages are on a fresh minimal system and whether a specific tool (like SSH) is present.
- **Check versions** — identify the official name of an installed package and whether it's the current version.
- **Search** — find the right package when you only know roughly what you want (e.g., the package for a particular service or feature).
- **Update** — bring packages up to date, and know exactly which ones just changed (so you can verify and document them).
- **Understand dependencies** — how the package manager makes sure everything a piece of software relies on is present and satisfied.

## A Production Judgment

Part of the work was *deciding what belongs on a production server*. Some packages are developer/debugging utilities (for example, a tool set for inspecting binary files and debugging symbols). Those are handy — but they also expand the attack surface on a machine you want to harden. Weighing "useful for debugging" against "another thing an attacker could exploit" is a real security decision an administrator has to make, not just "install everything."

## Why It Matters for Configuration Management

Solid package management is the foundation for everything else in configuration management: before you can reliably configure a fleet of servers, you have to be confident that the software each one runs is installed, up to date, and no more than what it needs.

---

**Key takeaway:** Knowing your packages — what's installed, what version, what depends on what, and whether a tool actually belongs on a production box — is the bedrock of safely operating a server.
