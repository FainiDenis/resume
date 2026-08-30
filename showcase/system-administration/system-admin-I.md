# Systems Administration I — Showcase

**A write-up of the hands-on Windows Server and Linux systems administration work we completed together as a team.**

---

## What This Is

This is my personal record of the systems administration coursework I completed with classmates, working together as a team on the class labs. We split up and completed the hands-on setups as a team in a shared lab environment — a Windows Server domain, Linux clients and servers, storage arrays, and a full set of network services. It's written as a reflection of our work, so the focus is on what we built, what we troubleshot, and what I learned along the way.

## What We Built

### A Windows Server Domain
We stood up a Windows Server machine as a domain controller and built out a full Active Directory environment on top of it:

- **Active Directory & domain controllers** — set up a domain, promoted the server to a domain controller, and verified domain membership from both Windows and Linux clients.
- **User and structure management** — created organizational units (OUs), managed user accounts, and worked with the key administrative groups (Enterprise Admins, Schema Admins, Domain Admins).
- **DNS integration** — configured and verified the DNS records that Active Directory depends on, including the service (SRV) records clients use to locate domain services, and confirmed resolution from clients.
- **DHCP** — set up DHCP scopes so clients received addresses automatically without static configuration.
- **Group Policy** — created and linked Group Policy Objects (GPOs), verified their reports, and used them to restrict access (for example, denying a group access to Control Panel).
- **Day-to-day verification** — used PowerShell (`Get-ADDomain`, user/OU creation, command history) to confirm and document the environment as configured.

### Linux Foundations & Automation
We worked directly on Linux systems covering user management, secure remote access, and administrative scripting:

- **User files & authentication** — worked with `/etc/passwd`, `/etc/shadow`, and `/etc/group`, and the `/etc/skel` skeleton that seeds new user home directories.
- **SSH key-based auth** — set up key-based authentication and understood why keys are more secure than passwords (the private key is never transmitted).
- **Protecting root** — explored ways to stop an attacker from resetting the root password in single-user mode (firmware/BIOS passwords, full-disk encryption, secure boot).
- **Scripting** — wrote a few small Python scripts to automate routine admin tasks:
  - a **network ping troubleshooting** tool that walks through gateway, remote, and DNS connectivity tests;
  - a **system information report** collector;
  - a **log-analysis / security** script that scans system logs for failed root logins;
  - a **shortcut** utility for creating desktop shortcuts.

*These were written as part of the coursework and are described here only at a high level.*

### Storage & File Systems
We added and configured disk storage on a Linux system:

- **Partitions & layout** — worked with primary, extended, and logical partitions, and compared MBR and GPT partition tables.
- **RAID** — built RAID 1 (mirroring) and RAID 5 (striping with parity) arrays, verified the redundancy, simulated a drive failure, and rebuilt the array.
- **LVM** — used Logical Volume Management for more flexible storage, including resizing volumes on the fly, and worked with `/etc/fstab` (and `_netdev`) so file systems mount automatically at boot.
- **Comparing platforms** — compared Windows basic/dynamic disk storage with Linux storage concepts.

### Network Services
We set up and tested a range of Linux network services for file sharing and data transfer:

- **FTP** — configured an FTP server and tested both authenticated and anonymous access, including verifying transfers via the transfer log.
- **rsync** — used `rsync` for archive-mode file synchronization, preserving permissions, ownership, and timestamps.
- **Samba** — configured Samba so Linux shares were accessible from Windows clients, and verified remote read/write access.
- **NFS** — configured NFS exports and client mounts, and understood mount options like `rw`, `sync`, and `no_root_squash` — including the security implications of that last one.
- **DNS lookups** — validated both forward and reverse lookup zones.

### Web, Email & Monitoring Services
We stood up and secured services, and set up logging:

- **Apache web server** — configured the document root, set up virtual hosts, and secured sites with SSL/TLS.
- **Certificates & keys** — worked with encryption keys and certificates, including setting up a self-signed certificate and understanding how it differs operationally from a certificate issued by a certification authority.
- **Email** — configured a mail server and understood the roles of the mail user agent (MUA), mail delivery agent (MDA), and mail transfer agent (MTA), verifying delivery with network traces.
- **Centralized logging** — configured `rsyslog` to forward log messages between systems.
- **Task scheduling** — compared and used `cron`, `at`, and `anacron` for scheduling recurring and one-off tasks.

---

## What We Learned The Hard Way

- **Back up your configs before changing them.** We learned to keep a copy of configuration files (like `httpd.conf`) so we could restore them if a change went wrong.
- **Read the error messages and check the logs.** The troubleshooting scripts and log-forwarding setup made us pay attention to what the system is actually telling you.
- **Understand the security trade-offs.** Options like `no_root_squash` and plain-text protocols are convenient but have real risks — knowing when *not* to use them matters.
- **Test from the client's perspective.** Verifying that a Windows client could reach a Samba share, or that a Linux client resolved a domain, caught issues that server-side checks missed.

---

*This showcase describes the work we performed as a team and the concepts we applied. It intentionally omits course identifiers, exact assignment solutions, and source code so that it stays a portfolio of our own learning rather than a set of answers.*
