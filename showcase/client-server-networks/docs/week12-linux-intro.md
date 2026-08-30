# Introduction to Linux

**Objective:** install Ubuntu Desktop and Ubuntu Server as VMs, compare the two, get them talking to each other over the network, and manage local user accounts on each.

## Task I — Installing Ubuntu Desktop

**Downloading Ubuntu**
- Recommended system requirements: 2 GHz dual-core CPU or better, 2 GB RAM, 25 GB free disk, DVD drive or USB port, internet access helpful.
- Version downloaded: **Ubuntu Desktop 16.04.3 LTS** ("LTS" = Long Term Support).
- Ubuntu Server, same release: **16.04.3 LTS**, supported for **3 years**, minimum **2 GB** free disk space.

**Creating the VM**
1. VMware Workstation → File → New Virtual Machine → Custom.
2. Point at the downloaded Ubuntu Desktop ISO and let VMware auto-detect the OS.
3. Full name **Ubuntu Desktop**, username **administrator**, password set.
4. Name the VM, accept the defaults through disk/processor screens.
5. Set VM memory to **1024 MB**.
6. Network type: **Bridged**.
7. Review every setting before clicking Finish.

![VM settings review](../screenshots/week12/image2.png)

**Installing the OS**
- Welcome screen: language English, **Install Ubuntu** (not "Try Ubuntu").
- Preparing to install: leave "Download updates while installing" **unchecked**.
- Location: New York. Keyboard: English (US).
- User setup: full name, computer name `UbuntuPCXX`, lowercase username, password, then restart into the new desktop.

![Ubuntu Desktop installed and logged in](../screenshots/week12/image3.png)

## Task II — Installing Ubuntu Server

Followed the same VM-creation flow for Ubuntu Server, restarted after install, and confirmed a clean login at the `login:` prompt.

![Ubuntu Server login](../screenshots/week12/image4.png)

## Task III — Comparing Desktop and Server, and networking them together

**Activity 4 — Desktop vs. Server**
- Ubuntu Desktop ships a full GUI; Ubuntu Server is terminal-only — everything is done by typed command rather than pointing and clicking.
- Desktop needs meaningfully more free storage than Server, which needs as little as 2 GB.

**Activity 5 — Finding each machine's IP address**

| Host | IP address |
|---|---|
| Ubuntu Desktop | 192.168.153.130 |
| Ubuntu Server | 192.168.153.129 |

![Desktop IP](../screenshots/week12/image5.png)
![Server IP](../screenshots/week12/image6.png)

**Activity 6 — Pinging between them**

Confirmed connectivity in both directions between Desktop and Server.

![Ping Desktop → Server](../screenshots/week12/image7.png)
![Ping Server → Desktop](../screenshots/week12/image8.png)

- `Ctrl + C` stops a running `ping`.
- `ping -c 7 192.168.153.129` limits the run to 7 replies.

![ping -c 7](../screenshots/week12/image9.png)

## Task IV — Adding a user account

Added a new administrator account through **System Settings → User Accounts** on Ubuntu Desktop, then set its password and confirmed login worked after logging off the built-in admin account.

![New account login](../screenshots/week12/image10.png)
![Successful login](../screenshots/week12/image11.png)

## Bonus — Installing Google Chrome on Ubuntu Desktop

![Chrome installed](../screenshots/week12/image12.png)

---
**Next Section**: [Remote Access & Long-Distance Communications](week14-vpn-remote-access.md)