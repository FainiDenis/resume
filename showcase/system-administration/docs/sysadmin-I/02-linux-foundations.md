# Linux Foundations, Remote Access & Automation

**What we covered: Linux user management, SSH key-based authentication, protecting root, and writing small scripts to automate admin tasks.**

---

## User Management on Linux

We worked with the core files and directories that Linux uses to manage users and groups:

- **`/etc/passwd`** — the list of user accounts and their basic details. The password field is no longer stored here; it holds a placeholder (`x`) and the real hashed password lives in `/etc/shadow`.
- **`/etc/shadow`** — stores the password hashes plus password-aging controls. It's readable only by root, which is a deliberate security boundary.
- **`/etc/group`** — defines groups and which users belong to them.
- **`/etc/skel`** — the skeleton directory. Default files here are copied into each new user's home directory automatically when the account is created, so every new user starts with a consistent environment.

Understanding which file holds permissions, which holds hashes, and who's allowed to read each one tells you a lot about how Linux compartmentalizes security.

## SSH Key-Based Authentication

We set up key-based authentication for SSH and compared it with passwords.

- The **private key never leaves the machine**, so it isn't transmitted over the network where it could be intercepted. That's the big advantage over typing a password each session.
- Keys are far harder to guess than passwords, and can be protected with a passphrase.
- The trade-offs: a lost or stolen private key becomes a risk, and you need to manage a key per machine rather than memorizing one password.

In the lab we generated a key pair and copied the public key to the server so we could log in without a password — and we verified the difference in how the two approaches behave.

## Protecting the Root Password

A Linux machine can be booted into single-user mode, where an attacker with physical access can potentially reset root. In the lab we looked at several ways to stop that:

- **Firmware / BIOS-UEFI password** — prevents someone from booting into single-user mode (or from changing the boot device) without the password. This is the same idea as locking a Windows device in its BIOS.
- **Full-disk encryption** — even with physical access, an attacker can't read or modify the password files without the key.
- **Secure Boot** — ensures the system only boots trusted software, blocking tampering with the boot process.

The parallel between locking down Linux and locking down a Windows device's firmware made the concept stick.

## Small Admin Scripts

As part of the coursework, my classmates and I wrote a few small Python scripts to automate repetitive administrative tasks. We're describing them only at a high level because the point is the problem-solving, not handing out the code:

- A **network troubleshooting** tool that steps through gateway connectivity, remote connectivity, and DNS resolution tests and reports pass/fail.
- A **system information** collector that produces a report of the machine's basic details.
- A **security / log-analysis** script that scans system logs for failed root logins and maps the source addresses.
- A **desktop shortcut** helper that creates shortcuts in a user's home/desktop.

Writing these helped us get comfortable turning "I keep running the same checks" into "let the machine run them for me" — which is most of what a good administrator does.

---

**Key takeaway:** Security on Linux comes in layers — restricting file read access, keeping secrets off the wire, protecting the boot process, and automating the boring checks so they actually get done.
