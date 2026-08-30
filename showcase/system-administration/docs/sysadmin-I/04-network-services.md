# Network Services

**What we did: set up and tested FTP, rsync, Samba, and NFS for moving and sharing files across Linux and Windows machines, plus DNS validation.**

---

## FTP — File Transfers (with a security caveat)

We configured an FTP server on Linux and tested it.

- We set up both **authenticated** and **anonymous** access and verified we could transfer files.
- We checked the **transfer log (`xferlog`)** to confirm the file actually landed on the server, and we looked at who could see it — which depends on whether the server allows anonymous/guest access.
- The important lesson: FTP sends credentials and data **in plain text**, so it's a teaching tool and a liability, not something to use for sensitive traffic. Real-world sensitive transfers should use a secure protocol.

## rsync — Synchronizing Files

We used `rsync` for file synchronization between systems:

- Operated in **archive mode (`-a`)**, which preserves permissions, ownership, and timestamps — critical for keeping a faithful copy.
- Used **verbose (`-v`)** output to watch what was being transferred.
- Understood the difference between a plain copy and a true synchronization that only moves the changes.

rsync quickly became one of our go-to utilities for keeping files in sync because it's precise about *how* files are copied.

## Samba — Sharing with Windows Clients

Samba lets a Linux server share files with Windows clients using the SMB/CIFS protocol.

- We worked with the **`smb.conf`** configuration format — a text file of sections, including a global section plus share sections and (depending on setup) home and printer sections, each serving a distinct purpose.
- We configured shares, then **verified from a Windows client** that it could list, read, and write to the share — and confirmed the server-side Samba status.
- The "test from the client" step is what proved the configuration was actually correct, not just syntactically valid.

## NFS — Sharing with Linux Clients

We configured NFS to share directories with other Linux systems:

- Set up an export in `/etc/exports` and mounted it on a client.
- Worked with the key export options and their trade-offs:
  - **`rw`** — clients get read/write access instead of read-only.
  - **`sync` vs. async** — `sync` waits for writes to be committed (safer, slower); `async` is faster but risks data inconsistencies.
  - **`no_root_squash`** — lets a client's root user keep full access to the shared files; convenient but a real **security risk**, and we noted exactly why you'd normally avoid it.
- Used `_netdev` in the client's mount entry so the NFS share only mounts once the network is up (this also ties back to our storage lab).

## DNS Validation

Throughout the network-services work we validated **forward and reverse lookup zones** so that names on the network resolved correctly — the same DNS groundwork that Active Directory depends on.

---

**Key takeaway:** There are many ways to move bytes across a network, and the right choice depends on the client (Windows or Linux), the security requirements, and whether you need a copy or a live sync. Understanding *when not* to use a tool (like plain-text FTP, or `no_root_squash`) is as important as knowing how to configure it.
