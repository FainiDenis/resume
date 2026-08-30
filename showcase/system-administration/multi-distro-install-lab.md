# Multi-Distro Linux & Unix Installation Lab

**Hands-on installer walkthroughs for nine desktop operating systems — installed from scratch, side by side, and compared on package management, install experience, and lineage.**

---

## Overview

For this lab I downloaded the official ISO for each of nine Unix-like operating systems and installed them from scratch in a virtual-machine lab. I captured the installer screens as I went, then wrote up each run end-to-end so the whole process is easy to follow without redoing the install.

The goal was practical, not just screenshots: to see how different distributions approach the same task — turning a bare ISO into a working desktop — and to compare what that says about each project's philosophy and target audience.

## Distros Installed

| # | Distro | Base | Package Manager | Install UX | Doc |
|---|---|---|---|---|---|
| 1 | Linux Mint 19.2 "Tina" | Ubuntu/Debian | `apt` | Live-first | [doc](docs/linux-install-lab/01-linux-mint.md) |
| 2 | Debian 10 "Buster" | Debian | `apt` | Install-first | [doc](docs/linux-install-lab/02-debian.md) |
| 3 | CentOS 8 | RHEL | `yum` | Install-first | [doc](docs/linux-install-lab/03-centos.md) |
| 4 | Fedora Workstation 31 | Fedora | `dnf`/`yum` | Live or install | [doc](docs/linux-install-lab/04-fedora.md) |
| 5 | Red Hat Enterprise Linux 8 | RHEL | `yum` | Install-first | [doc](docs/linux-install-lab/05-rhel8.md) |
| 6 | FreeBSD 12.1 (+ GNOME) | BSD | `pkg` | Install-first, no GUI | [doc](docs/linux-install-lab/06-freebsd.md) |
| 7 | Puppy Linux (BionicPup64) | Ubuntu Bionic | `pet` | Live-first | [doc](docs/linux-install-lab/07-puppy.md) |
| 8 | Zorin OS 15 Education | Ubuntu | `apt` | Live or install | [doc](docs/linux-install-lab/08-zorin.md) |
| 9 | Parrot OS | Debian | `apt` | Install-first | [doc](docs/linux-install-lab/09-parrot.md) |

Each doc walks the installer through from boot to first login, with the actual installer screens embedded in the runs where screenshots were captured.


Every distro has a written walkthrough. Most also have install-session screenshots; the `mint/` and `parrot/` runs are text-only for the reasons noted in their documents.

## What I Learned

- **Installer experience splits along "live-first" vs. "install-first" lines, not distro family.** Mint, Puppy, Fedora, and Zorin boot into a working desktop you can poke around before committing to disk. Debian, CentOS, RHEL, and FreeBSD drop you straight into the installer.

- **Package manager choice tracks lineage exactly.** Every Debian/Ubuntu descendant here (Mint, Debian, Zorin, Parrot) uses `apt`; every RHEL descendant (CentOS, Fedora, RHEL) uses `yum`/`dnf`. The two true outliers — FreeBSD's `pkg` and Puppy's `pet` — are also the two distros that belong to neither mainstream Linux lineage.

- **FreeBSD is a great server OS but a reluctant desktop.** The base install (`bsdinstall`) is clean and fast, but it ships no desktop environment. Getting to a graphical login meant a whole second phase — `pkg install gnome`, then hand-editing `/etc/rc.conf` and `/etc/fstab` before GDM would start. Every Linux distro here reached a desktop with zero manual config-file editing.

- **Small distros move fast.** Puppy's 354 MB ISO is a live-first system aimed at old hardware, and it installed quickly — the only rough edge was its GParted partitioning step, which took a second attempt after an initial error.

## Tooling

VirtualBox / VM-based installs, official ISOs pulled from each project's distribution site, and each installer's default guided flow. All screenshots are original captures from my own install sessions.
