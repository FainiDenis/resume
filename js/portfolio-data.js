window.PORTFOLIO_DATA = (() => {
  const DATA = {};
  DATA["showcase/client-server-networks/README.md"] = `# Client-Server Networks 

## Windows Server 2012 R2 Administration

A hands-on Windows Server administration walkthrough: standing up a domain controller from a bare VM, then building out Active Directory, Group Policy, DNS, DHCP, file/print services, TCP/IP addressing, a Linux comparison lab, and remote-access tooling on top of it.


## What's in here

| Topic | Docs |
|---|---|
| Client-server fundamentals (homework) | — (setup notes below) |
| IPv4/IPv6 addressing & subnetting | [docs/00-addressing-extra-credit.md](docs/00-addressing-extra-credit.md) |
| Introducing Windows Server 2012 R2 | [docs/week02-introducing-server-2012r2.md](docs/week02-introducing-server-2012r2.md) |
| Installing Windows Server 2012 R2 | [docs/week03-installing-server-2012r2.md](docs/week03-installing-server-2012r2.md) |
| File & printer services (NTFS, shares, printing) | [docs/week04-file-and-printer-services.md](docs/week04-file-and-printer-services.md) |
| Introducing Active Directory (AD DS, DNS, Group Policy basics) | [docs/week05-active-directory-intro.md](docs/week05-active-directory-intro.md) |
| Managing OUs and AD accounts | [docs/week06-ch7-ous-and-ad-accounts.md](docs/week06-ch7-ous-and-ad-accounts.md) |
| Configuring Group Policy | [docs/week07-ch8-group-policies.md](docs/week07-ch8-group-policies.md) |
| Configuring TCP/IP (binary, CIDR, \`arp\`/\`tracert\`, IPv6) | [docs/week09-ch9-tcpip.md](docs/week09-ch9-tcpip.md) |
| Configuring DNS | [docs/week10-dns.md](docs/week10-dns.md) |
| Configuring DHCP | [docs/week11-dhcp.md](docs/week11-dhcp.md) |
| Introduction to Linux (Ubuntu Desktop + Server) | [docs/week12-linux-intro.md](docs/week12-linux-intro.md) |
| Remote access — VPN, LogMeIn, TeamViewer | [docs/week14-vpn-remote-access.md](docs/week14-vpn-remote-access.md) |

The [addresses worksheet](docs/00-addressing-extra-credit.md) is a standalone fundamentals exercise; the rest follow the environment built top-down below. Two labs (OUs/AD accounts and DNS/DHCP) were largely instructor-checkpoint screenshots with limited written Q&A in the source material, so those docs are presented as a checkpoint table rather than a full narrative.

## Environment

All server-side labs ran as VMware Workstation VMs (\`410Server1\`, \`410Server2\`) on a shared external SSD, built up incrementally:

1. Fresh Windows Server 2012 R2 Datacenter install, static IP, hostname, workgroup.
2. Promotion to a domain controller (AD DS + DNS roles).
3. OU structure, bulk user accounts, and Group Policy layered on top of the domain.
4. TCP/IP addressing theory, then DNS and DHCP server roles.
5. A second, independent VM pair (Ubuntu Desktop + Ubuntu Server) for a Windows-vs-Linux comparison.
6. Client-side remote access tooling (VPN, LogMeIn, TeamViewer), run on physical laptops rather than the VM lab.

## Key takeaways

- **Permissions in Windows are inherited by default and grouped predictably**: CREATOR OWNER and Everyone get the same baseline; SYSTEM and Administrators get another. Once you know the pattern, most "why can't I access this" questions in the file/printer lab answer themselves.
- **Group Policy inheritance has real teeth.** Editing the *Default Domain Policy* directly (rather than a policy scoped to one OU) applies everywhere it's linked — the warning dialog about this is Windows trying to stop you from making that mistake by accident.
- **DHCP and DNS depend on each other in practice, not just in theory** — both point back at the AD DS + DNS domain-controller install as a hard prerequisite.
- **Ubuntu Server vs. Desktop is a storage and interface trade-off, not a capability one** — Server needs as little as 2 GB of disk and drops the GUI entirely in favor of the terminal, while Desktop needs over 10× that for the same base OS plus a full desktop environment.
- **VPN changes your visible IP but not your DNS servers** — confirmed directly by comparing \`ipconfig /all\` output before and after connecting.
`;
  DATA["showcase/client-server-networks/docs/00-addressing-extra-credit.md"] = `# IPv4/IPv6 Addressing

A worksheet on IP address classes, subnet masks, CIDR notation, and public/private address ranges.

## Address classes

| Class | First-octet decimal range | First-octet binary range | Default subnet mask | CIDR |
|---|---|---|---|---|
| A | 1 – 127 | \`00000001\`–\`01111111\` | 255.0.0.0 | /8 |
| B | 128 – 191 | \`10000000\`–\`10111111\` | 255.255.0.0 | /16 |
| C | 192 – 223 | \`11000000\`–\`11011111\` | 255.255.255.0 | /24 |

**Binary → dotted decimal:** \`10110101.00000010.11110000.11111001\` → **181.2.240.249**

## Network / broadcast addresses

The first address in a network is the **network address**; the last is the **broadcast address** — both are reserved and can't be assigned to a host.

| Host address (default mask) | Network address | Broadcast address |
|---|---|---|
| 39.16.79.100 | 39.0.0.0 | 39.255.255.255 |
| 161.14.69.89 | 161.14.0.0 | 161.14.255.255 |

## CIDR / slash notation

A subnet mask can be abbreviated by counting its \`1\` bits — e.g. \`255.0.0.0\` (8 ones) = \`/8\`.

| Address + mask | Class | Default mask for that class in use? |
|---|---|---|
| 193.25.16.79 / 255.255.255.0 (\`/24\`) | C | Yes |
| 181.56.199.2 / 24 | B | No — this is a subnetted Class B network |

If the default mask for the address's class is in use, the network hasn't been subnetted. If a non-default mask is in use, the administrator has divided the network into smaller subnets — more manageable and generally more secure.

## Public vs. private address ranges

| Class | Private range |
|---|---|
| A | 10.0.0.0 – 10.255.255.255 |
| B | 172.16.0.0 – 172.31.255.255 |
| C | 192.168.0.0 – 192.168.255.255 |

Public addresses must be globally unique; private addresses don't need to be, since they aren't routed on the open internet.

## Dynamic vs. static addressing

- **Dynamic** — assigned automatically by a DHCP server, and "leased" for a period of time (\`ipconfig /all\` shows the lease).
- **Static** — assigned manually by an administrator and doesn't change until they change it.

## MAC addresses & bit/byte basics

- 1 byte = 1 octet = 8 bits.
- An IPv4 address is 32 bits (4 bytes); an IPv6 address is 128 bits (16 bytes).
- Example IPv6 address: \`fe80::6512:9f05:ccd3:513a\`

---

**Next Section**: [Introducing Windows Server 2012 R2](week02-introducing-server-2012r2.md)`;
  DATA["showcase/client-server-networks/docs/week02-introducing-server-2012r2.md"] = `# Introducing Windows Server 2012 R2

**Objective:** identify system requirements across the Windows Server 2012 R2 editions, compare them against a Windows 10 Enterprise client and a real lab PC, then get a first look at NTFS permissions and the Server Manager role catalog.

## Task I — System requirements

| Component | Datacenter / Standard / Essentials / Foundation | Windows 10 Enterprise |
|---|---|---|
| Processor | Min: 1.4 GHz 64-bit · Recommended: 3.1 GHz+ multicore | 1 GHz or faster / SoC |
| Display | Super VGA or higher | 800×600 |
| Memory | Min: 512 MB (2 GB on Essentials) · Recommended: 2–8 GB | 1 GB (32-bit) / 2 GB (64-bit) |
| Disk | Min: 32 GB (90 GB on Essentials) · Recommended: 60 GB+ | 16 GB (32-bit) / 20 GB (64-bit) |
| Optical/USB | DVD drive | DVD drive |
| NIC | Gigabit Ethernet | Gigabit Ethernet |

A lab PC (i7-4790 @ 3.60 GHz, 1920×1080, 16 GB RAM, 466 GB free disk) comfortably clears every one of these minimums, so **yes**, it could be upgraded to run Windows Server 2012 R2 Datacenter.

## Task II — Windows Server Catalog

Cross-checked NIC, display, and USB hardware against the official Windows Server Catalog compatibility list before committing to an install — every component checked came back listed as compatible with both Windows Server 2012 R2 Datacenter and Windows 10 Enterprise. Skipping this step and installing with unlisted hardware risks a system that doesn't run reliably — low RAM, storage, or an unsupported processor can all cause problems down the line.

## Task III — NTFS permissions and attributes

| ![General tab](../screenshots/week02/image1.png) | ![Security tab](../screenshots/week02/image2.png) |
|---|---|

- **File system on C:\\\\** — NTFS (New Technology File System).
- **Is FAT/FAT32 recommended for the Windows Server 2012 R2 install partition?** No — Microsoft's modern OSes (Server 2012 R2, Windows 10, Windows 7) are all built around NTFS, and NTFS has always been the more capable file system of the two.
- **Administrators' default file permissions:** Full control, Modify, Read & execute, List folder contents, Read, Write.
- **Users' default file permissions:** Read & execute, List folder contents, Read.
- **File attribute checkboxes** on a new text file: Read-only and Hidden.
- **Advanced attributes** split into two groups: *File attributes* (ready for archiving; allow indexing) and *Compress or Encrypt* (compress to save disk space; encrypt to secure contents).

## Task IV — Exploring server roles

Connected to the class file share (\`\\\\10.1.100.51\`), copied the lab files to an external SSD, then powered on **410Server1** in VMware Workstation.

![Server Manager dashboard](../screenshots/week02/image3.png)

- The Dashboard showed **2 roles and 1 server group** already configured.
- **Add Roles and Features** requires three preliminary steps before you reach the role list: *Before You Begin*, *Installation Type*, and *Server Selection*.

![Select Server Roles](../screenshots/week02/image4.png)

- **20 roles** are available in the list; **one** — DNS Server — was already installed.

---
**Next Section**: [Installing Windows Server 2012 R2](week03-installing-server-2012r2.md)`;
  DATA["showcase/client-server-networks/docs/week03-installing-server-2012r2.md"] = `# Installing Windows Server 2012 R2

**Objective:** stand up the first Windows Server 2012 R2 VM from scratch — plan the server name, protocol, IP addressing and time zone up front, then walk the VMware + Windows Setup wizards end-to-end.

## Pre-install plan

| Decision | Value used |
|---|---|
| Server name | \`410Server2\` |
| Network protocol | TCP/IPv4 only |
| IP address | \`10.10.1.2/16\` (static) |
| Time zone | Eastern Time |

A server should always get a **static** IP rather than the automatic address Windows assigns by default — some roles (DHCP among them) require it.

## Task I — Building the VM and installing Windows Server 2012 R2

1. Launch VMware Workstation and start **Create a New Virtual Machine**.
2. Choose the **Typical** creation method.
![New VM wizard](../screenshots/week03/image4.png)
3. Point the installer at the install media, but decline VMware's **Easy Install** auto-detection (select *I will install the operating system later*) so the Windows installer runs normally instead of unattended.
4. Set the guest OS to Microsoft Windows Server 2012.
![Choose guest OS](../screenshots/week03/image6.png)
5. Name the VM and store it on the external SSD rather than the internal drive, for performance.
6. Set the virtual disk to 60 GB, split into multiple files.
![Disk size](../screenshots/week03/image8.png)
7. Bump the VM's memory to 8 GB, then finish the wizard.
8. Insert the Windows Server 2012 R2 install media and power on the VM.
9.  Work through Windows Setup: language → **Install Now** → **Windows Server 2012 Datacenter Evaluation (Server with a GUI)** → accept the license terms → **Custom: Install Windows only (advanced)** → accept the default disk layout → let installation run.

| | | |
|---|---|---|
| ![Install Now](../screenshots/week03/image12.png) | ![Choose install type](../screenshots/week03/image13.png) | ![Custom install](../screenshots/week03/image15.png) |
| ![Installing](../screenshots/week03/image17.png) |
10. Set the built-in Administrator password on first boot.
![Set Administrator password](../screenshots/week03/image18.png)
11. Log in using VMware's **Send Ctrl-Alt-Del to VM** button — pressing the physical key combo goes to the *host* machine, not the guest, so the VM needs its own dedicated shortcut for it.
![Send Ctrl-Alt-Del](../screenshots/week03/image19.png)

## Task II — Time, date, and time zone

Configured the server's clock and time zone via Control Panel / Settings, matching the pre-install plan (Eastern Time).

## Task III — Setting a static IP address

- **IP address assigned:** \`10.10.1.2\`
- **Network class:** Class A
- **Default subnet mask for that class:** \`255.0.0.0\`

![IPv4 properties](../screenshots/week03/image21.png)

## Task IV — Changing the computer name and workgroup

Renamed the computer and confirmed the change by capturing the new workgroup name after the rename and reboot.

![Workgroup name](../screenshots/week03/image22.png)

---
**Next Section**: [Configuring File and Printer Services](week04-file-and-printer-services.md)

`;
  DATA["showcase/client-server-networks/docs/week04-file-and-printer-services.md"] = `# Configuring File and Printer Services

**Objective:** manage NTFS permissions and ownership, create and lock down Windows file shares, then install, share, and connect to a network printer.

## Task I — Securing access with NTFS permissions

Set up a new virtual disk in VMware (SCSI, 10 GB, split into multiple files) as the sandbox for the permissions exercises, then walked through the textbook's file-permission activities on it.

- A freshly created volume ships with **five** default groups/users in its ACL: **Everyone, CREATOR OWNER, SYSTEM, Administrators, Users**.
- Their default permissions:
  - **Everyone** and **CREATOR OWNER** — Special permissions only.
  - **SYSTEM** and **Administrators** — Full control (Modify, Read & execute, List folder contents, Read, Write).
  - **Users** — Read & execute, List folder contents, Read, Special permissions.
  - → Everyone/CREATOR OWNER share the same baseline, and SYSTEM/Administrators share the same baseline.
- Permissions can be changed via the **Advanced** button on the Security tab (true).
- To let *everyone* edit a file in a folder, the **Modify** box needs to be checked in basic permissions (true).

![Volume permissions](../screenshots/week04/image2.png)

**ACE (Access Control Entry)** is a single permission grant assigned to a specific user or group. Entries can appear grayed out in the Security tab when they're **inherited** from a parent folder — you can't edit an inherited entry directly.

A newly created *file* (as opposed to folder) has no **CREATOR OWNER** entry in its Security tab, because that entry only applies to folders, not files.

![File permissions](../screenshots/week04/image3.png)

Working through a locked-down \`TestPerm\` folder surfaced the practical effect of permissions:
- Renaming a file to reveal extensions worked fine (e.g. seeing \`.txt\` on a file).
- Opening a file without Read & execute rights threw *"Windows cannot access the specified device, path, or file."*
- Editing and saving that file failed for the same reason — read access alone doesn't grant write/execute.
- Double-clicking a file you no longer have access to raises *Access is denied*.
- The fix in every case: add yourself back into the file's Security tab with the permissions you need.

![Access restrictions](../screenshots/week04/image4.png)

## Task II — Creating Windows file shares

- A newly created share is accessible by default to the **Administrator** user and **Administrators** group only.
- Once mapped, a share shows up under **Network** in File Explorer as \`\\\\410SERVER1\\TestShare12\`.
- Default share permissions for **Everyone** and **Administrators**: Full control, Change, Read.

![File share](../screenshots/week04/image5.png)

Ownership and permission interplay:
- A regular test user can't delete a file owned by Administrators — deleting requires the owner's permission, which surfaces as *Access Denied*.
- A file a test user creates is owned by that user, who gets full control of it; Administrators (as the built-in owning group) also retains full control.
- A user without access to another user's share hits a network error trying to open it — again, straightforward permission enforcement rather than a bug.

![Share permissions testing](../screenshots/week04/image6.png)
![Ownership testing](../screenshots/week04/image7.png)
![Access denied](../screenshots/week04/image10.png)
![Network error](../screenshots/week04/image11.png)

## Task III — Installing and sharing a printer

- **"Add a printer using a TCP/IP address or hostname"** vs. **"Add a local printer with manual settings"** — both let you target a printer by IP, but the manual-settings path also lets you attach to an existing port (USB, LPT, local, TCP/IP) and manually install a driver if Windows doesn't have one.
- Printer used: \`10.16.251.6\` (LBJ 2315 Self Instruction Lab).
- Printed a test page successfully after setup.

![Test page](../screenshots/week04/image12.png)

- In the printer's Security tab: **Everyone** has permission to manage the printer; **CREATOR OWNER** has permission to manage the documents they printed.

![Printer permissions](../screenshots/week04/image13.png)
![Printer permissions detail](../screenshots/week04/image14.png)

## Task IV — Connecting to a shared printer

Connected a client to the shared printer and printed a test page successfully.

![Print test](../screenshots/week04/image15.png)

Canceling a queued print job from the client left it paused on the server — resolved by having the server administrator un-pause the printer to release the job.

---
**Next Section**: [Introducing Active Directory](week05-active-directory-intro.md)`;
  DATA["showcase/client-server-networks/docs/week05-active-directory-intro.md"] = `# Introducing Active Directory

**Objective:** install AD DS as the first domain controller in a new forest, explore Active Directory's container objects, then get a first look at Group Policy.

## Task I — Installing and configuring AD DS

**Activity 6-1 — Install AD DS and DNS on 410Server1**

![AD DS + DNS installed](../screenshots/week05/image1.png)

- After the roles install, the server needs a manual restart to complete promotion to a domain controller.
- Post-restart, the logon screen's domain changed to \`410Server2012\\Administrator\` — visible confirmation the box is now a domain controller.
- **MMC** = Microsoft Management Console — the framework admins use to open, save, and arrange the various administrative snap-in tools Windows provides.

**Activity 6-2 — Domain/forest functional level & default groups**

![Functional level](../screenshots/week05/image2.png)

- Confirmed both the domain and forest functional levels report **Windows Server 2012 R2**.
- The default **Users** container lists **27** built-in group accounts.

![After deleting test accounts](../screenshots/week05/image3.png)

**Activity 6-3 — Simple file sharing & user properties**

![Simple file sharing](../screenshots/week05/image4.png)

- A built-in group's **Member Of** tab is empty and its Add/Remove buttons are disabled — built-in groups can't themselves be members of other groups.
- The **Operating System** tab on the domain controller's computer object reports **Windows Server 2012 R2 Datacenter, Version 6.3 (9600)**.

![New user details](../screenshots/week05/image5.png)

- Comparing the **Account** tab for the built-in **Administrator** vs. **Guest** users: Administrator has every account-restriction checkbox disabled by default, while Guest has three enabled out of the box — *User cannot change password*, *Password never expires*, and *Account is disabled*.

![Administrator vs. Guest account options](../screenshots/week05/image6.png)

**Activity 6-4 — Password policy enforcement**

- Creating a new user with a weak password fails with an error explaining the domain's password policy — minimum length, and a mix of uppercase, lowercase, numbers, and a special character (e.g. \`@#!$\`).

![Password policy error](../screenshots/week05/image7.png)

- Group membership after adding a test account: member shown is **Test User1**.

![Group membership](../screenshots/week05/image8.png)

**Activity 6-5 — \`dsadd\` from the command line**

![dsadd command](../screenshots/week05/image9.png)

Verified the new object (Test User 2) appears correctly inside its target OU (\`TestOU1\`).

![User appears in OU](../screenshots/week05/image10.png)

**Activities 6-6 / 6-8 — Find Now, and publishing a share in AD**

![Find Now results](../screenshots/week05/image11.png)
![PubShare found](../screenshots/week05/image12.png)
![Published share](../screenshots/week05/image13.png)

- Toggling **View → Users, Contacts, Groups, and Computers as containers** off changes what the right pane shows when clicking **Domain Controllers** on the left — it switches from showing that container's contents to showing the domain controller computer object itself.

![View toggle effect](../screenshots/week05/image14.png)

## Task II — Introducing Group Policy

**Activity 6-11 — Default Domain Policy**

![Editing Default Domain Policy](../screenshots/week05/image15.png)

- Editing the **Default Domain Policy** triggers a warning because it's *linked* — any change made here applies everywhere the GPO is linked, not just to the object you clicked from.

![Password policy settings](../screenshots/week05/image16.png)

Reviewing **Account Policies / Password Policy**:
- *Enforce password history: 24 remembered* — prevents users from cycling back to recently-used passwords.
- *Maximum password age: 42 days* — forces expiration on a schedule that roughly matches typical business cycles, limiting the exposure window if a password leaks.
- *Password must meet complexity requirements: Enabled* — requires the same length/character-mix rule seen earlier (600 minutes, for reference, is 10 hours).
- The **User Configuration** node shows no settings yet because nothing has been configured there.
- The Policies folder splits into three subfolders: **Software Settings**, **Windows Settings**, **Administrative Templates**.
- The three defined policies visible under **Local Policies**: **Audit Policy**, **User Rights Assignment**, **Security Options**.
- On a fresh domain, **Account Policies** has no explicit settings, but a number of **User Rights Assignments** are already defined — by default, most administrative actions are restricted to the Administrators, Backup Operators, and Server Operators groups.

**Activity 6-12 — Testing a Control Panel restriction policy**

- With **Enabled**, users covered by the policy lose access to Control Panel/PC Settings; **Disabled** restores access; **Not Configured** means the policy has no effect either way.
- Logging in as \`testuser1\` under the enabled restriction produced a sign-in error — the account is blocked from logging on locally to the server.

![Sign-in blocked](../screenshots/week05/image17.png)

- After adjusting the policy, \`testuser1\` was able to log on successfully.
- Opening Control Panel produced a restriction message; opening **Screen Resolution** produced the same restriction plus an \`explorer.exe\` error.
- Opening **Server Manager** prompted a User Account Control box asking for administrator credentials — \`testuser1\` doesn't have permission to change system configuration.
- \`testuser1\` was also unable to shut down the server (true) — another effect of the same restricted rights assignment.
- 
---
**Next Section**: [Managing OUs and Active Directory Accounts](week06-ch7-ous-and-ad-accounts.md)`;
  DATA["showcase/client-server-networks/docs/week06-ch7-ous-and-ad-accounts.md"] = `# Managing OUs and Active Directory Accounts

**Objective:** work through Chapter 7's Organizational Unit and AD account management activities on **410Server1** — this lab assumes DNS and AD DS are already installed (see [Introducing Active Directory](week05-active-directory-intro.md)).

Evidence captured at the checkpoint noted for each activity:

| Activity | Checkpoint | Screenshot |
|---|---|---|
| 7-1 | Step 5 | ![7-1](../screenshots/week06/image1.png) |
| 7-2 | Step 7 | ![7-2a](../screenshots/week06/image2.png) ![7-2b](../screenshots/week06/image3.png) |
| 7-4 | Step 11 | ![7-4a](../screenshots/week06/image4.png) ![7-4b](../screenshots/week06/image5.png) |
| 7-5 | Steps 12, 13, 26 | ![7-5a](../screenshots/week06/image6.png) ![7-5b](../screenshots/week06/image7.png) ![7-5c](../screenshots/week06/image8.png) ![7-5d](../screenshots/week06/image9.png) |
| 7-6 | Step 11 | ![7-6a](../screenshots/week06/image10.png) ![7-6b](../screenshots/week06/image11.png) |
| 7-7 | Steps 7 & 9 | ![7-7a](../screenshots/week06/image12.png) ![7-7b](../screenshots/week06/image13.png) |
| 7-8 | Step 12 | ![7-8](../screenshots/week06/image14.png) |
| 7-10 | Step 8 | ![7-10](../screenshots/week06/image15.png) |
| 7-11 | Step 11 | ![7-11a](../screenshots/week06/image16.png) ![7-11b](../screenshots/week06/image17.png) |
| 7-13 | Step 7 | ![7-13](../screenshots/week06/image18.png) |
| 7-14 | Step 9 | ![7-14](../screenshots/week06/image19.png) |
| 7-15 | Step 9 (AdvUser1, AdvUser2, AdvUser3) | ![7-15a](../screenshots/week06/image20.png) ![7-15b](../screenshots/week06/image21.png) |

These activities cover creating and organizing OUs, bulk-creating user accounts, moving/renaming/deleting objects, and using the account-creation wizard's advanced options — the working set that [Group Policy](week07-ch8-group-policies.md) is applied against.

---
**Next Section**: [Configuring Group Policies](week07-ch8-group-policies.md)`;
  DATA["showcase/client-server-networks/docs/week07-ch8-group-policies.md"] = `# Configuring Group Policies

**Objective:** apply and test Group Policy Objects against the OU structure built in [Managing OUs and Active Directory Accounts](week06-ch7-ous-and-ad-accounts.md).

Evidence captured at the checkpoint noted for each activity:

| Activity | Checkpoint | Screenshot |
|---|---|---|
| 8-1 | Step 18 | ![8-1](../screenshots/week07/image1.png) |
| 8-4 | Step 11 | ![8-4](../screenshots/week07/image2.png) |
| 8-5 | Step 11 | ![8-5a](../screenshots/week07/image3.png) ![8-5b](../screenshots/week07/image4.png) |
| 8-11 | Step 9 | ![8-11](../screenshots/week07/image5.png) |
| 8-12 | Step 9 | ![8-12](../screenshots/week07/image6.png) |
| 8-19 | Step 2 | ![8-19a](../screenshots/week07/image7.png) |
| 8-19 | Step 15 | ![8-19b](../screenshots/week07/image8.png) |

Activity 8-19 (creating and linking a login-script GPO) also doubled as a bonus checkpoint for the [Configuring DNS](week10-dns.md) lab.

---
**Next Section**: [Configuring TCP/IP](week09-ch9-tcpip.md)`;
  DATA["showcase/client-server-networks/docs/week09-ch9-tcpip.md"] = `# Configuring TCP/IP

**Objective:** drill binary/decimal conversion, CIDR math, and hands-on TCP/IP tooling (\`arp\`, \`tracert\`, \`ping -6\`, static IPv6) across the lab's Windows machines.

## Activity 9-1 — Decimal → binary

| Decimal | Binary |
|---|---|
| 167 | 10100111 |
| 149 | 10010101 |
| 252 | 11111100 |
| 128 | 10000000 |
| 64 | 01000000 |
| 240 | 11110000 |
| 255 | 11111111 |
| 14 | 00001110 |
| 15 | 00001111 |
| 63 | 00111111 |
| 188 | 10111100 |
| 224 | 11100000 |

## Activity 9-2 — Binary → decimal

| Binary | Decimal |
|---|---|
| 00110101 | 53 |
| 11111000 | 248 |
| 00011111 | 31 |
| 10101010 | 170 |
| 01010101 | 85 |
| 11111110 | 254 |
| 11111100 | 252 |
| 00111011 | 59 |
| 11001100 | 204 |
| 00110011 | 51 |
| 00000111 | 7 |
| 00111100 | 60 |

## Activity 9-3 — Working with CIDR notation

| Network/Prefix | Subnet Mask | Host Bits | Usable Hosts |
|---|---|---|---|
| 172.16.1.0/24 | 255.255.255.0 | 8 | 254 |
| 10.1.100.128/26 | 255.255.255.192 | 6 | 62 |
| 10.1.96.0/19 | 255.255.224.0 | 13 | 8190 |
| 192.168.1.0/24 | 255.255.255.0 | 8 | 254 |
| 172.31.0.0/16 | 255.255.0.0 | 16 | 65534 |
| 10.255.255.252/30 | 255.255.255.252 | 2 | 2 |
| 172.28.240.0/20 | 255.255.240.0 | 12 | 4094 |
| 10.44.108.0/22 | 255.255.252.0 | 10 | 1022 |
| 192.168.100.24/21 | 255.255.248.0 | 11 | 2046 |
| 172.23.64.0/18 | 255.255.192.0 | 13 | 8190 |
| 192.168.5.128/25 | 255.255.255.128 | 7 | 126 |

## Activity 9-4 — Determining the correct prefix

| Network ID | Required Hosts | Host Bits Needed | Network ID/Prefix |
|---|---|---|---|
| 172.16.1.0 | 254 | 8 | 172.16.1.0/24 |
| 10.1.100.128 | 62 | 6 | 10.1.100.128/26 |
| 10.1.96.0 | 8190 | 13 | 10.1.96.0/19 |
| 192.168.1.0 | 200 | 8 | 192.168.1.0/24 |
| 172.31.0.0 | 65000 | 16 | 172.31.0.0/16 |
| 10.255.255.252 | 2 | 2 | 10.255.255.252/30 |
| 172.28.240.0 | 4000 | 12 | 172.28.240.0/20 |
| 10.44.108.0 | 900 | 10 | 10.44.108.0/22 |
| 192.168.240.0 | 2200 | 11 | 192.168.240.0/21 |
| 172.23.64.0 | 1600 | 11 | 172.23.64.0/21 |
| 192.168.5.128 | 110 | 7 | 192.168.5.128/25 |

## Activity 9-5 — Using \`arp\`

![arp output](../screenshots/week09/image1.png)

- \`www.yahoo.com\` resolves to a **Class A** address.
- That address is a **public** IP.

## Activity 9-6 — Using \`tracert\`

- Trace to the target completed in **12 hops**.
- Difference between the two trace commands: one reports IP addresses along the path, the other reports hop count — the two outputs together give you both the path and its length.

![tracert output](../screenshots/week09/image2.png)

## Activity 9-7 — Setting a static IPv6 address

![Static IPv6 configured](../screenshots/week09/image3.png)

## Activity 9-8 — Working with IPv6

- \`ping ::1\` — Windows replies because it's pinging its own loopback address.
- \`ping -a ::1\` — the \`-a\` flag tells \`ping\` to resolve and display the hostname for that address (in this case, the local machine's own name).

![ping -a ::1](../screenshots/week09/image4.png)

- \`ping -6 <host>\` — the \`-6\` flag forces \`ping\` to use IPv6 explicitly.

![ping -6](../screenshots/week09/image5.png)

- Checked the local MAC address via \`ipconfig /all\`.

![MAC address](../screenshots/week09/image6.png)
![Final verification](../screenshots/week09/image7.png)

---
**Next Section**: [Configuring DNS](week10-dns.md)`;
  DATA["showcase/client-server-networks/docs/week10-dns.md"] = `# Configuring DNS

**Objective:** work through the textbook's DNS configuration activities on **410Server1** — forward/reverse lookup zones, records, and DNS-dependent server behavior.

| Activity | Checkpoint | Screenshot |
|---|---|---|
| 10-2 | Step 14 | ![10-2](../screenshots/week10/image1.png) |
| 10-3 | Step 7 | ![10-3](../screenshots/week10/image2.png) |
| 10-4 | Step 12 | ![10-4](../screenshots/week10/image3.png) |
| 10-5 | Step 9 | ![10-5a](../screenshots/week10/image4.png) ![10-5b](../screenshots/week10/image5.png) |
| 10-6 | Steps 2, 4, 7, 8, 11 | ![10-6a](../screenshots/week10/image6.png) ![10-6b](../screenshots/week10/image7.png) ![10-6c](../screenshots/week10/image8.png) ![10-6d](../screenshots/week10/image9.png) |
| 8-19 (bonus, carried over from Ch. 8) | Step 15 | ![8-19 bonus](../screenshots/week10/image10.png) |

---
**Next Section**: [Configuring DHCP](week11-dhcp.md)`;
  DATA["showcase/client-server-networks/docs/week11-dhcp.md"] = `# Configuring DHCP

**Objective:** install and configure the DHCP server role — scopes, exclusions, reservations, and lease behavior — and verify clients pick up addresses correctly.

| Activity | Checkpoint | Screenshot |
|---|---|---|
| 11-1 | Step 2 | ![11-1a](../screenshots/week11/image1.png) |
| 11-1 | Step 7 | ![11-1b](../screenshots/week11/image2.png) |
| 11-1 | Step 11 | ![11-1c](../screenshots/week11/image3.png) |
| 11-2 | Step 9 | ![11-2a](../screenshots/week11/image4.png) |
| 11-2 | Step 11 | ![11-2b](../screenshots/week11/image5.png) |
| 11-2 | Step 13 | ![11-2c](../screenshots/week11/image6.png) |
| 11-3 | Step 4 | ![11-3a](../screenshots/week11/image7.png) |
| 11-3 | Step 6 | ![11-3b](../screenshots/week11/image8.png) |
| 11-3 | Step 10 | ![11-3c](../screenshots/week11/image9.png) |
| 11-3 | Step 12 | ![11-3d](../screenshots/week11/image10.png) |
| 11-3 | Step 13 | ![11-3e](../screenshots/week11/image11.png) |
| 11-4 | Step 5 | ![11-4a](../screenshots/week11/image12.png) |
| 11-4 | Step 6 | ![11-4b](../screenshots/week11/image13.png) |
| 11-4 | Step 9 | ![11-4c](../screenshots/week11/image14.png) |
| 11-7 | Step 1 | ![11-7a](../screenshots/week11/image15.png) ![11-7a2](../screenshots/week11/image16.png) |
| 11-7 | Step 2 | ![11-7b](../screenshots/week11/image17.png) ![11-7b2](../screenshots/week11/image18.png) |

---
**Next Section**: [Introduction to Linux](week12-linux-intro.md)`;
  DATA["showcase/client-server-networks/docs/week12-linux-intro.md"] = `# Introduction to Linux

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
- User setup: full name, computer name \`UbuntuPCXX\`, lowercase username, password, then restart into the new desktop.

![Ubuntu Desktop installed and logged in](../screenshots/week12/image3.png)

## Task II — Installing Ubuntu Server

Followed the same VM-creation flow for Ubuntu Server, restarted after install, and confirmed a clean login at the \`login:\` prompt.

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

- \`Ctrl + C\` stops a running \`ping\`.
- \`ping -c 7 192.168.153.129\` limits the run to 7 replies.

![ping -c 7](../screenshots/week12/image9.png)

## Task IV — Adding a user account

Added a new administrator account through **System Settings → User Accounts** on Ubuntu Desktop, then set its password and confirmed login worked after logging off the built-in admin account.

![New account login](../screenshots/week12/image10.png)
![Successful login](../screenshots/week12/image11.png)

## Bonus — Installing Google Chrome on Ubuntu Desktop

![Chrome installed](../screenshots/week12/image12.png)

---
**Next Section**: [Remote Access & Long-Distance Communications](week14-vpn-remote-access.md)`;
  DATA["showcase/client-server-networks/docs/week14-vpn-remote-access.md"] = `# Remote Access & Long-Distance Communications

**Objective:** install and use a campus VPN, then compare two remote-desktop tools (LogMeIn and TeamViewer) for accessing a machine remotely.

## Task I — Installing the campus VPN

**Setup:** two laptops (Windows + Mac) connected by Ethernet through a patch panel, Wi-Fi disabled on both.

| Machine | DNS | IPv4 (no VPN) |
|---|---|---|
| Windows | 10.1.100.10, 10.1.100.20 | 10.1.40.102 |
| Mac | 10.1.100.10, 10.1.100.20 | 10.1.40.104 |

![Windows IP config](../screenshots/week14/image1.png)
![Mac IP config](../screenshots/week14/image2.png)
![Mac IP config detail](../screenshots/week14/image3.png)

- One Ethernet adapter/Local Area Connection was visible in the command output before connecting the VPN.

**Downloading and installing the client:** navigated to the university IT site, agreed to the VPN download terms, and reviewed system requirements before installing.

![System requirements & download](../screenshots/week14/image4.png)

- **Windows requirement:** Windows 7 SP1 or newer.
- **Mac requirement:** Mac OS X 10.9 or newer.
- **MD5** — a checksum used to verify a downloaded file wasn't corrupted or tampered with in transit.
- Installing software requires **administrator rights** — a standard account isn't permitted to install software on the machine.

![Install prompt](../screenshots/week14/image5.png)
![Client installed](../screenshots/week14/image6.png)
![Connect dialog](../screenshots/week14/image7.png)

**After connecting:**

| Machine | IPv4 with VPN |
|---|---|
| Mac | 129.21.12.26 |
| Windows | 129.21.12.23 |

![Mac VPN IP](../screenshots/week14/image8.png)
![Windows VPN IP](../screenshots/week14/image9.png)

- Two Ethernet adapters now appear in the command output — the VPN adds a virtual adapter alongside the physical one.
- IPv4 addresses differ before/after the VPN connects on both machines, but DNS servers stay the same on both.
- **VPN advantages observed:** masking your real IP/location, browsing anonymously, and cutting long-distance access costs versus other remote-access methods.

## Task II — Remote Desktop via LogMeIn

Installed LogMeIn on the "host" laptop, created an account, then logged into the LogMeIn web console from the "client" laptop to connect back to it.

![LogMeIn installed](../screenshots/week14/image10.png)
![LogMeIn welcome](../screenshots/week14/image11.png)
![LogMeIn login](../screenshots/week14/image12.png)
![LogMeIn dashboard](../screenshots/week14/image13.png)

- **1** computer registered under Home.
- **Updates** page reported no updates available.

![Updates page](../screenshots/week14/image14.png)
![No updates](../screenshots/week14/image15.png)
![Login to remote computer](../screenshots/week14/image16.png)

**LogMeIn feature set used:** File Manager, Remote Sound, Desktop Sharing, File Sharing, LastPass integration.

Remote system details pulled through the LogMeIn console:

| Metric | Value |
|---|---|
| CPU | Intel Core i5-4300U @ 1.90 GHz (2.50 GHz turbo) |
| Physical memory | 8 GB RAM |
| Committed memory | 2.1 / 9.8 GB |
| Last booted | 36 minutes ago |
| Interactive user | Student |
| Disk size | 119.23 GB |
| Network traffic | Max inbound 0.1 Mbps · Max outbound 0 Mbps |

![System info panels](../screenshots/week14/image17.png)

- Best remote-screen color quality: **Options → Color Quality → Choose best image quality**.
- Encryption used by LogMeIn: **256-bit SSL**.

Confirmed a successful remote desktop session from the Mac to the Dell laptop.

![Remote session](../screenshots/week14/image25.png)

## Task III — Remote Desktop via TeamViewer (bonus)

Installed and configured TeamViewer on both laptops and confirmed a working remote session in both directions.

![TeamViewer session 1](../screenshots/week14/image26.png)
![TeamViewer session 2](../screenshots/week14/image27.png)

### LogMeIn vs. TeamViewer

| Feature | LogMeIn | TeamViewer |
|---|---|---|
| Cost | Free trial only; paid plans from $249/yr | Free for personal use; commercial from $660/yr |
| Remote sound | Yes | Yes |
| HD video stream | Yes | Yes |
| Remote-to-local printing | Yes | Yes |
| Desktop sharing | Yes | Yes |
| File transfer | Yes | Yes |
| Online meeting | No | Yes |
| Remote access | Yes | Free and Pro tiers |
| Security | 256-bit SSL | 1024-bit RSA key exchange + 256-bit AES session encryption |

**Takeaway:** TeamViewer came out ahead for this use case — free for personal use (vs. a short trial for LogMeIn), no email sharing required, and ID/password-based access control.
`;
  DATA["showcase/configuration-management/README.md"] = `# Configuration Management — Showcase

**A write-up of my deeper DevOps and infrastructure-tooling work — managing services and packages, remote automation with Ansible, coordinating teams with Azure DevOps, and deploying a highly-available containerized application.**

---

## What This Is

This is my personal record of the **configuration management** and DevOps tooling work I completed — the layer that comes *after* learning to script, where you automate and manage whole fleets of machines rather than one-off tasks. It builds on the task-automation scripting skills and scales them up with professional tools.

It's written as a reflection of my work — first person where the work was individual, and team phrasing where it was done with classmates. It intentionally omits course identifiers and exact configuration so it stays a portfolio of my own learning rather than a set of answers.

## What I Can Do

### Linux Systems Management
- Manage **packages** — query, search, install, and update software, and understand dependencies.
- Manage **services** with systemd/\`systemctl\` — install, start, stop, enable, disable, and check status.
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
- **02 · Service Management** — controlling background services with systemd/\`systemctl\`.
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
`;
  DATA["showcase/configuration-management/docs/01-package-management.md"] = `# Package Management

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
`;
  DATA["showcase/configuration-management/docs/02-service-management.md"] = `# Service Management with systemd

**What I did: dug into how background services are controlled via systemd/\`systemctl\` — using a real service (time synchronization) as the working example.**

---

Knowing what's *running* on a server is just as important as knowing what's *installed*. This work focused on the \`systemctl\` command, which manages the background services (called **units**) on a modern Linux system.

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
`;
  DATA["showcase/configuration-management/docs/03-secure-remote-automation.md"] = `# Secure Remote Automation (SSH & Ansible)

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
`;
  DATA["showcase/configuration-management/docs/04-team-workflow.md"] = `# Team Workflow with Azure DevOps

**What we did: my classmates and I set up Azure DevOps to plan, track, and coordinate our team's work — a real-world tool for making group projects auditable.**

---

Group infrastructure projects only run smoothly when everyone can see what's happening and who's responsible for what. This work applied **Azure DevOps**, the tool many large organizations use to define and coordinate team work, to our own team's projects.

## Setting Up the Team Space

We started by getting everyone on the same platform:

- Each team member **created their own account** in Azure DevOps.
- We created a shared **organization and project** that would hold the labs we'd complete over the semester.
- **Added all members** so everyone could access and contribute.
- Wrote a project summary so the scope was documented up front.

## Planning with Boards & Sprints

The real structure came from Azure DevOps' agile planning features:

- Using the **Boards**, we created an **Epic work item for each major lab** — treating each large body of work as one unit.
- Created the specific **work items** tied to the first project.
- Set up a **Sprint**, pulled those work items into it, and **moved them from New to Closed** as they were completed — experiencing, for real, how a team tracks work from start to finish.

## How It Helped

Beyond the mechanics, we reflected on how the tool shapes teamwork. The shared **repo** lets us back up and version our work, and the Boards give the team a single place to **track tasks, report on progress, and plan what still needs to be done** — keeping a group moving together instead of in parallel silos.

---

**Key takeaway:** Tools like Azure DevOps aren't just project-management overhead — they give a team a shared, auditable record of who did what and when, which is exactly what makes group infrastructure work accountable and efficient.
`;
  DATA["showcase/configuration-management/docs/05-containerized-application-deployment.md"] = `# Containerized, Highly-Available Application Deployment

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
`;
  DATA["showcase/event-based-travel/README.md"] = `# Event-Based Travel Planning System

**Team capstone project** · August 2024 – April 2025 · a web + mobile travel-booking platform for non-profit organizations.

---

## What It Is

Non-profits organize a lot of events — conferences, fundraisers, board meetings — and every one means travel. That process is usually a mess: event planners emailing back and forth, finance tracking budgets in spreadsheets, attendees booking flights and hoping to get reimbursed.

We built one place where all of it lives. A browser- and phone-friendly system where event planners, finance teams, and attendees coordinate flight searches, booking requests, approvals, budgets, and reports together — no more chasing people down.

## What It Does

- **Flight search** with real US domestic data, plus filtering, sorting, and warnings (over-budget, low seats, long connections).
- **Booking requests** with an **approval workflow** that spans event planning and finance.
- **Event management** — create events, invite attendees, track who's coming.
- **Budgets & reports** for finance, and analytics for keeping an organization on track.
- **Role-based access** for admins, event planners, finance users, approvers, and attendees.
- **Security first** — mandatory multi-factor authentication, hashed + salted passwords, encrypted personal data, and OWASP-aligned practices.

## On Our Team

Seven of us worked on this together, tracking everything through **Azure DevOps**, GitHub for version control, and Discord for day-to-day coordination. We planned with user stories, epics, and sprints, and kept requirements, a risk register, and a Gantt chart in Smartsheet.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, JavaScript (responsive, accessible) |
| Backend | PHP |
| Database | MySQL |
| Flight data | Amadeus API |
| Mobile | Native iOS & Android apps |
| Design | Figma (wireframes & prototyping) |

## My Contribution

I was part of the design and build across the full stack — most visibly in the **UI/UX wireframes** in Figma, where I planned the core screens and flows. See the **Wireframes** page for the design demo.

> Note: this page intentionally focuses on what the project *is* and the design I contributed — no course identifiers or submission code are included.
`;
  DATA["showcase/event-based-travel/docs/01-wireframes.md"] = `# Wireframe Design Demo

**The screens below are from the Figma wireframes* we built early in the project to plan the layout and flows before writing code.**

We treated the wireframes as working, testable mockups rather than final pixels — iterating on them caught UX problems (like a confusing mobile nav and an over-long checkout) before they cost us dev time.

*\\*Design artifacts from our team work — included as a demo of the UI/UX work, without any user data or internal references.*

---

## Landing Page

The entry point: a clean sign-in / registration focus with no distractions.

![Landing page](../images/landing.png)

## Login

Simple email + password login, the first step before multi-factor authentication.

![Login](../images/login.png)

## Event Management (Event Planner)

The event planner's workspace: list, create, and manage events, and invite attendees.

![Event management](../images/event-management.png)

## Approval (Booking Workflow)

An approver reviewing a flight booking request — the heart of the planning/finance collaboration workflow.

![Approval](../images/approval.png)

## Reports — Event Planners

Reporting and analytics so planners can track attendance and event trends over time.

![Reports for event planners](../images/reports-planners.png)

## Checkout

Booking confirmation — review the trip, passenger details, and total cost before submitting for approval.

![Checkout](../images/checkout.png)

---

**Design principles we followed** across every screen: clean and simple, consistent patterns, accessible (contrast, screen-reader, keyboard support, dark mode), and responsive across web and mobile.
`;
  DATA["showcase/lan-wan-design/README.md"] = `# LAN/WAN Design

---

### About This

This contains my hands-on work in LAN/WAN network design — the fundamentals of network design, routing protocols, switching, and network security, learned through lab exercises on real Cisco equipment plus written assignments.

### What's Inside

#### Homework Assignments
- **Chapters 1-2**: OSI Model, Network Media, Protocols
- **Chapter 3**: Number Systems, IP Addressing, Subnetting
- **Chapter 4**: IPv6 Addressing, MAC-to-EUI-64 Conversion
- **Chapter 5-6**: Router Commands, Cisco IOS, Memory Types
- **Chapter 7**: Routing Protocols (RIP, IGRP, Static Routes)
- **Chapter 8**: Advanced Routing (RIPv2, OSPF, EIGRP)
- **Chapter 9**: NAT, DHCP, DNS Services
- **Chapters 12-13**: Switching, VLANs, STP, VTP

#### Lab Exercises
1. **Identifying Data Link and Network Layer Addresses** - MAC and IP address analysis
2. **ARP Protocol Analysis** - Using Wireshark to observe ARP in action
3. **Router Command Line Fundamentals** - Cisco IOS basics
4. **Configuring Serial Interfaces** - Router-to-router connections
5. **Basic RIP Configuration** - Classful routing with RIPv1
6. **DHCP and NAT Configuration** - Dynamic addressing and address translation
7. **Basic Switch Configuration** - VLANs, port security, MAC tables
8. **Router-on-a-Stick** - Inter-VLAN routing
9. **Configuring Remote Router Using SSH** - Secure remote access
10. **Bonus: OSPF Configuration** - Link-state routing protocol

### Skills Demonstrated

#### Routing Protocols
- RIP (v1 and v2)
- OSPF
- Static Routing
- Default Routing
- EIGRP (conceptual)

#### Switching Technologies
- VLAN Configuration
- VLAN Trunking Protocol (VTP)
- Port Security
- MAC Address Tables
- Spanning Tree Protocol (STP)

#### Network Services
- DHCP Server Configuration
- Static and Dynamic NAT
- Port Address Translation (PAT)
- DNS Configuration

#### Security
- SSH Configuration
- Password Security
- Access Control Lists (ACL)
- Port Security

#### Tools Used
- **Cisco Routers**: 1760, 2600, 2901, 2691
- **Cisco Switches**: 2950, 3745 (modified)
- **Simulation**: GNS3
- **Analysis**: Wireshark
- **Terminal**: PuTTY, HyperTerminal
- **TFTP**: TFTP32/TFTP64

### Project Highlights

#### Router-on-a-Stick (Lab 8)
Configured a single router interface with sub-interfaces to route traffic between multiple VLANs. This demonstrated understanding of:
- 802.1Q trunking
- Sub-interface configuration
- Inter-VLAN routing

#### DHCP & NAT (Lab 6)
Set up a Cisco router as a DHCP server with:
- IP address pools for multiple subnets
- Excluded addresses for static devices
- Static and dynamic NAT with address pools
- PAT (Port Address Translation) for internet connectivity

#### SSH Remote Access (Lab 9)
Configured secure remote access to routers:
- RSA key generation
- SSH version 2 support
- Remote access without physical console
- TFTP backup of IOS images

### Key Takeaways

This work gave me hands-on experience with enterprise networking equipment and protocols. I learned:

1. **The OSI Model isn't just theory** - Every layer has practical applications in network configuration
2. **Routing protocols have trade-offs** - RIP for simplicity, OSPF for scalability
3. **Security matters** - SSH over Telnet, MFA concepts, password policies
4. **Switches are complex** - VLANs, trunking, STP, port security
5. **Documentation is essential** - Every configuration needs to be saved and explained

### Future Learning

Building on this foundation, I plan to explore:
- Network automation (Python, Ansible)
- Cloud networking (AWS, Azure)
- Network security (Firewalls, VPNs)
- CCNP certification
`;
  DATA["showcase/lan-wan-design/docs/01-course-overview.md"] = `# Overview

## What This Is

This is my hands-on work in local area network (LAN) and wide area network (WAN) design. It covers the OSI model, IP addressing, routing protocols, switching technologies, network services, and security, combining theory with practical lab exercises on real Cisco networking equipment.

## What I Learned to Do

By the end of this body of work, I was able to:

1. **Understand Network Fundamentals**
   - OSI and TCP/IP models
   - Physical and logical addressing
   - Network media and topologies

2. **Configure Cisco Devices**
   - Router and switch configuration
   - Interface configuration
   - Password and security settings

3. **Implement Routing Protocols**
   - Static and default routing
   - RIP (v1 and v2)
   - OSPF
   - Route redistribution concepts

4. **Configure Switching Technologies**
   - VLAN creation and management
   - Trunking (802.1Q, ISL)
   - Port security
   - Spanning Tree Protocol

5. **Deploy Network Services**
   - DHCP
   - NAT and PAT
   - DNS
   - SSH

## Equipment Used

### Routers
| Model | Description |
|-------|-------------|
| Cisco 1760 | Entry-level router for lab exercises |
| Cisco 2600 | Modular router for advanced labs |
| Cisco 2901 | Modern router with Gigabit Ethernet |
| Cisco 2691 | Used for OSPF and RIP labs |

### Switches
| Model | Description |
|-------|-------------|
| Cisco 2950 | Basic switch for VLAN and port security |
| Cisco 3745 | Modified for switch functionality in GNS3 |

### Software Tools
| Tool | Purpose |
|------|---------|
| GNS3 | Network simulation and emulation |
| Wireshark | Packet analysis and protocol debugging |
| PuTTY | Terminal emulation for console access |
| TFTP32/64 | File transfer for IOS backups |

## Lab Environment

Most labs were completed using:
- Physical equipment in the campus lab
- GNS3 simulation software for complex topologies
- Direct console connections via rollover cables

## Key Concepts Learned

### OSI Model
I learned each layer's function and how they work together. The Physical layer transmits bits, Data Link handles MAC addresses, Network routes packets, Transport manages segmentation, Session controls data exchange, Presentation handles encryption and translation, and Application provides services to users.

### IP Addressing and Subnetting
This was challenging at first. I learned to convert between binary, decimal, and hexadecimal. I can now calculate subnet masks, identify network and broadcast addresses, and determine usable host ranges. I also learned about IPv6 addressing and EUI-64 conversion.

### Router Configuration
I learned the Cisco IOS command structure, password management, and interface configuration. Understanding the difference between enable password and enable secret, and knowing when to use each, became second nature.

### Routing Protocols
RIP was straightforward — broadcast every 30 seconds, count hops. IGRP and EIGRP added more metrics. OSPF was the most complex but also the most powerful. I learned about autonomous systems, administrative distance, and route summarization.

### Switching Technologies
Switches work differently than routers. VLANs allow logical segmentation without physical separation. Trunking carries multiple VLANs on one link. Spanning Tree Protocol prevents loops. VTP simplifies VLAN management.

### Network Services
NAT allows private IP addresses to access the internet. PAT (overload) maps many private addresses to one public address. DHCP automates IP address assignment. DNS translates names to addresses.

---

**Next Section**: [Homework Assignments](02-homework-assignments.md)
`;
  DATA["showcase/lan-wan-design/docs/02-homework-assignments.md"] = `# Homework Assignments

## Chapter 1-2: Introduction to Networking

### Key Concepts Learned

**OSI Model (Bottom to Top)**
1. **Physical** - Transmits signals on the wire (bits)
2. **Data Link** - MAC addressing, frames
3. **Network** - Routing, packets (IP addresses)
4. **Transport** - Segmentation, TCP/UDP
5. **Session** - Full/half-duplex control
6. **Presentation** - Encryption, translation
7. **Application** - User services (email, web)

**Network Media**
- Copper (UTP/STP)
- Fiber optic
- Wireless
- Coaxial

**Protocols**
- TCP/IP: Primary internet protocol
- HTTP: Web browsing (port 80)
- HTTPS: Secure web (port 443)
- SMTP: Email (port 25)
- DNS: Name resolution (port 53)

### Sample Questions

**Q: What is the difference between a hub and a switch?**
A hub operates at Layer 1 (Physical) and broadcasts all traffic to all ports. A switch operates at Layer 2 (Data Link) and learns MAC addresses to forward traffic only to the correct port. Switches reduce collisions and improve network performance.

**Q: What are the 7 layers of the OSI model?**
Physical, Data Link, Network, Transport, Session, Presentation, Application.

**Q: How many collision domains does a switch create?**
Each switch port creates its own collision domain. With 12 ports, there are 12 collision domains.

---

## Chapter 3: Number Systems and IP Addressing

### Binary to Decimal Conversion

10110110 = 182
- 128 + 32 + 16 + 4 + 2 = 182

10111101 = 189
- 128 + 32 + 16 + 8 + 4 + 1 = 189

### Decimal to Binary Conversion

69 = 01000101
- 64 + 4 + 1 = 69

158 = 10011110
- 128 + 16 + 8 + 4 + 2 = 158

### Hexadecimal Conversion

11101100 = EC
10101010 = AA

### IP Address Classes

| Class | First Octet Range | Default Subnet Mask | CIDR |
|-------|-------------------|---------------------|------|
| A | 1-126 | 255.0.0.0 | /8 |
| B | 128-191 | 255.255.0.0 | /16 |
| C | 192-223 | 255.255.255.0 | /24 |

### Subnetting Example

**Given**: 203.34.175.124/28
- Class: C
- Borrowed bits: 4
- Subnet mask: 255.255.255.240
- Subnets: 16 (14 usable)
- Hosts per subnet: 16 (14 usable)

---

## Chapter 4: IPv6 Addressing

### IPv6 Abbreviation

**Full Address**: 192f:2ccd:0004:0000:f7ec:d000:23ab:0e02
**Abbreviated**: 192f:2ccd:4::f7ec:d:23ab:e02

**Full Address**: 8000:0000:0000:0000:0bbe:0000:6aa9:9df0
**Abbreviated**: 8::bbe::6aa9:9df

### EUI-64 Conversion

**MAC**: 47:CC:32:9B:00:EB
**EUI-64**: 47:CC:32:FF:FE:9B:00:EB

### IPv6 Loopback
::1/128

---

## Chapter 5-6: Router Configuration

### Router Memory Types

| Memory | Purpose |
|--------|---------|
| RAM | Running configuration, routing tables |
| ROM | Bootstrap, POST |
| NVRAM | Startup configuration |
| Flash | IOS image |

### Key Commands

| Command | Description |
| :--- | :--- |
| \`enable\` | Moves from User EXEC mode to Privileged EXEC mode. |
| \`config terminal\` | Enters Global Configuration mode to make system-wide changes. |
| \`hostname GAD\` | Renames the router to "GAD". |
| \`enable secret [pass]\` | Sets a strongly encrypted password for privileged access. |
| \`enable password [pass]\` | Sets a plain-text password for privileged access. |
| \`line vty 0 4\` | Enters configuration mode for remote access lines (SSH/Telnet). |
| \`password [pass]\` | Sets the password for remote login access. |
| \`login\` | Tells the router to prompt for a password on the VTY lines. |
| \`copy running-config startup-config\` | Saves the active RAM configuration to permanent NVRAM. |
| \`show running-config\` | Displays the current active configuration. |
| \`show startup-config\` | Displays the saved configuration that loads on boot. |
| \`show interfaces\` | Shows the status and statistics of all network ports. |
| \`show ip route\` | Displays the routing table. |
| \`show version\` | Shows hardware info, software version, and system uptime. |


---

## Chapter 7: Routing Protocols

### Routable vs Routing Protocols

**Routable (Routed) Protocols**
- TCP/IP
- IPX/SPX
- Carry network layer information

**Routing Protocols**
- RIP (Routing Information Protocol)
- IGRP (Interior Gateway Routing Protocol)
- OSPF (Open Shortest Path First)
- EIGRP (Enhanced IGRP)


### Administrative Distance

| Route Type | AD |
|------------|-----|
| Connected | 0 |
| Static | 1 |
| EIGRP | 90 |
| OSPF | 110 |
| RIP | 120 |

---

## Chapter 8: Advanced Routing

### RIPv1 vs RIPv2

| Feature | RIPv1 | RIPv2 |
|---------|-------|-------|
| Classless | No | Yes |
| Subnet Mask | Not sent | Sent in updates |
| Authentication | No | MD5 |
| Update Type | Broadcast | Multicast (224.0.0.9) |

### OSPF Configuration
\`\`\`
Router(config)# router ospf 1
Router(config-router)# network 192.168.1.0 0.0.0.255 area 0
Router(config-router)# network 172.16.0.0 0.0.0.255 area 0
\`\`\`

**Wildcard Mask**: Inverse of subnet mask
- 255.255.255.0 → 0.0.0.255
- 255.255.255.240 → 0.0.0.15

### Static Route Configuration
\`\`\`
Router(config)# ip route 192.168.16.0 255.255.255.0 192.168.15.2
\`\`\`


---

## Chapter 9: NAT and DHCP

### NAT Types

**Static NAT**
- One-to-one mapping
- Internal IP to external IP
- Example: 192.168.1.10 → 209.165.201.10

**Dynamic NAT**
- Pool of external addresses
- Assigned as needed
- Example: 192.168.1.0/24 → 209.165.201.9-14

**PAT (NAT Overload)**
- Many internal addresses to one external IP
- Uses ports to distinguish sessions
- Most common for small networks

### DHCP Configuration
\`\`\`
R2(config)# ip dhcp excluded-address 172.16.10.1 172.16.10.10
R2(config)# ip dhcp pool R1_LAN10
R2(dhcp-config)# network 172.16.10.0 255.255.255.0
R2(dhcp-config)# default-router 172.16.10.1
R2(dhcp-config)# dns-server 172.16.11.5
\`\`\`

### NAT Configuration
\`\`\`
R2(config)# ip nat pool NAT-POOL 209.165.201.9 209.165.201.14 netmask 255.255.255.248
R2(config)# ip nat inside source list NAT pool NAT-POOL
R2(config)# ip access-list extended NAT
R2(config-ext-nacl)# permit ip 172.16.10.0 0.0.0.255 any
R2(config-ext-nacl)# permit ip 172.16.11.0 0.0.0.255 any
\`\`\`

---

## Chapter 12-13: Switching and VLANs

### Switching Fundamentals

**MAC Address Table**
- Maps MAC addresses to ports
- Learned dynamically
- Can be statically configured

**Frame Forwarding Methods**
- Cut-through: Low latency, no error checking
- Store-and-forward: Full error checking, higher latency
- Fragment-free: Checks first 64 bytes

**CSMA/CD**
- Carrier Sense Multiple Access with Collision Detection
- Used in Ethernet networks
- Collision domains isolated by switches

### VLAN Configuration

**Create VLAN**
\`\`\`
S1(config)# vlan 2
S1(config-vlan)# name Engineering
S1(config-vlan)# exit
\`\`\`

**Assign Ports to VLAN**
\`\`\`
S1(config)# interface range f0/4 - f0/9
S1(config-if-range)# switchport access vlan 2
S1(config-if-range)# exit
\`\`\`

**Trunk Configuration**
\`\`\`
S1(config)# interface f1/1
S1(config-if)# switchport mode trunk
\`\`\`

### VTP Configuration
\`\`\`
S1# vlan database
S1(vlan)# vtp server
S1(vlan)# vlan 2 name Engineering
S1(vlan)# vlan 3 name Marketing
S1(vlan)# vlan 4 name Production
\`\`\`

### Port Security
\`\`\`
S1(config)# interface f0/4
S1(config-if)# switchport mode access
S1(config-if)# switchport port-security
S1(config-if)# switchport port-security mac-address sticky
S1(config-if)# switchport port-security maximum 1
S1(config-if)# switchport port-security violation shutdown
\`\`\`

---

## Sample Questions & Answers

### Q: Why can't RIPv1 be used on networks with subnets?
RIPv1 is classful and doesn't carry subnet mask information in updates. It summarizes networks to their major boundaries, which breaks subnetting.

### Q: What is the benefit of using DHCP?
DHCP automates IP address assignment, reducing administrative overhead and preventing duplicate IP addresses. It's essential for large networks.

### Q: What is the difference between Telnet and SSH?
Telnet transmits data in plaintext, which is insecure. SSH encrypts all traffic, including passwords. SSH uses port 22, Telnet uses port 23.

### Q: What is the purpose of STP?
STP prevents loops in networks with redundant paths. It blocks some paths to create a logical tree topology, preventing broadcast storms.

---

**Next Section**: [Lab Exercises](03-lab-exercises.md)`;
  DATA["showcase/lan-wan-design/docs/03-lab-exercises.md"] = `# Lab Exercises

## Lab 1: Identifying Data Link and Network Layer Addresses

### Objective
Identify MAC and IP addresses on a computer and understand their formats.

### Equipment
- PC with Windows
- Command Prompt

### Results

**NIC Information**
- Brand: Asustek Computer Inc.
- MAC Address: 08-62-66-C7-C4-D0
- OUI: 08-62-66 (Asustek)
- Serial Number: C7-C4-D0

**IP Configuration**
- IP Address: 10.1.40.103
- Subnet Mask: 255.255.255.0
- Default Gateway: 10.1.40.1

### Key Takeaways
- MAC addresses are 48 bits (6 octets) in hexadecimal
- OUI identifies the manufacturer
- IP addresses are 32 bits (4 octets) in decimal
- ARP resolves IP to MAC addresses

---

## Lab 2: ARP Protocol Analysis

### Objective
Use Wireshark to observe ARP requests and replies, understand the ARP cache.

### Setup
- Two PCs connected via switch
- Static IP addresses assigned
- Firewalls disabled

### Topology
PC1 (192.168.1.7) --- Switch --- PC2 (192.168.1.17)

### Procedure
1. Clear ARP cache: \`arp -d\`
2. Start Wireshark capture
3. Ping from PC1 to PC2
4. Observe ARP request/reply exchange

### Wireshark Analysis

**ARP Request**
- Source IP: 192.168.1.7
- Destination IP: 192.168.1.17
- Source MAC: 94:c6:91:a1:1e:7a
- Destination MAC: ff:ff:ff:ff:ff:ff (broadcast)

**ARP Reply**
- Source IP: 192.168.1.17
- Destination IP: 192.168.1.7
- Source MAC: ec:f4:bb:61:30:a1
- Destination MAC: 94:c6:91:a1:1e:7a

**ICMP Request**
- Source: 192.168.1.7
- Destination: 192.168.1.17

**ICMP Reply**
- Source: 192.168.1.17
- Destination: 192.168.1.7

### Observations
- First ping triggers ARP: 2 frames (request + reply)
- Subsequent pings are just ICMP: 8 frames (4 requests + 4 replies)
- ARP cache holds entries for about 2-5 minutes
- ARP requests are broadcasts, replies are unicasts

### Key Takeaways
- ARP is essential for IPv4 communication
- ARP caches speed up communication
- Wireshark is powerful for protocol analysis

---

## Lab 3: Router Command Line Fundamentals

### Objective
Learn basic Cisco IOS commands and navigation.

### Equipment
- Cisco 2600 Router
- Console cable
- PuTTY terminal

### Key Commands Learned

**Modes**
\`\`\`
Router> User EXEC mode (limited commands)
Router# Privileged EXEC mode (all commands)
Router(config)# Global configuration mode
Router(config-if)# Interface configuration mode
Router(config-router)# Routing protocol configuration mode
\`\`\`

**Navigation**
\`\`\`
Router> enable Enter privileged EXEC
Router# config t Enter global config
Router(config)# interface serial 0/0 Enter interface config
Router(config-if)# exit Exit one level
Router(config)# end Exit to privileged EXEC
\`\`\`

**Help System**
\`\`\`
Router> ? List all commands
Router# show ? List show subcommands
Router# show ip ? List show ip subcommands
\`\`\`


**Command History**
- Up arrow: Previous command
- Down arrow: Next command
- Show history: \`show history\`

### Observations
- Commands can be abbreviated (e.g., \`show run\` or \`show running-config\`)
- Context-sensitive help is available with \`?\`
- Tab key completes commands

---

## Lab 4: Configuring Serial Interfaces

### Objective
Configure two routers with serial connections, create a simple network.

### Topology
<!-- GAD (192.168.15.1) --- Serial Cable --- BHM (192.168.15.2) -->
![lab-4-topology](../assets/screenshots/lab-4.png)

### Configuration

**Router GAD**
\`\`\`
GAD(config)# interface serial 0
GAD(config-if)# ip address 192.168.15.1 255.255.255.0
GAD(config-if)# clock rate 56000
GAD(config-if)# no shutdown
\`\`\`

**Router BHM**
\`\`\`
BHM(config)# interface serial 0
BHM(config-if)# ip address 192.168.15.2 255.255.255.0
BHM(config-if)# no shutdown
\`\`\`

### Verification
\`\`\`
GAD# show interface serial 0
Serial0 is up, line protocol is up
Internet address is 192.168.15.1/24
Encapsulation HDLC

GAD# ping 192.168.15.2
!!!!! (5 replies)
\`\`\`

### Key Takeaways
- DCE side needs clock rate
- \`no shutdown\` enables the interface
- HDLC is default encapsulation
- Line protocol up means Layer 2 is working

---

## Lab 5: Basic RIP Configuration

### Objective
Configure RIP routing protocol on multiple routers.

### Topology
PC1 --- R1 --- R2 --- R3 --- PC2

### Configuration

**R1**
\`\`\`
R1(config)# router rip
R1(config-router)# network 172.16.0.0
R1(config-router)# network 192.168.1.0
\`\`\`

**R2**
\`\`\`
R2(config)# router rip
R2(config-router)# network 192.168.1.0
R2(config-router)# network 192.168.2.0
\`\`\`

**R3**
\`\`\`
R3(config)# router rip
R3(config-router)# network 192.168.2.0
R3(config-router)# network 172.17.0.0
\`\`\`

### Verification
\`\`\`
R1# show ip route
C 172.16.0.0/16 is directly connected, FastEthernet0/0
C 192.168.1.0/24 is directly connected, Serial0/0
R 192.168.2.0/24 [120/1] via 192.168.1.2
R 172.17.0.0/16 [120/2] via 192.168.1.2

R1# debug ip rip
RIP: sending v1 update to 255.255.255.255
\`\`\`


### Observations
- RIP broadcasts every 30 seconds
- RIP uses hop count metric (max 15)
- RIPv1 doesn't support subnet masks

---

## Lab 6: DHCP and NAT Configuration

### Objective
Configure router as DHCP server, implement static and dynamic NAT.

### Topology
PC1 (172.16.10.x) --- R1 --- R2 --- ISP --- Internet
PC2 (172.16.11.x) --- R1

### DHCP Configuration on R2
\`\`\`
R2(config)# ip dhcp excluded-address 172.16.10.1 172.16.10.10
R2(config)# ip dhcp excluded-address 172.16.11.1 172.16.11.10
R2(config)# ip dhcp pool R1_LAN10
R2(dhcp-config)# network 172.16.10.0 255.255.255.0
R2(dhcp-config)# default-router 172.16.10.1
R2(dhcp-config)# dns-server 172.16.11.5
R2(dhcp-config)# exit
R2(config)# ip dhcp pool R1_LAN11
R2(dhcp-config)# network 172.16.11.0 255.255.255.0
R2(dhcp-config)# default-router 172.16.11.1
R2(dhcp-config)# dns-server 172.16.11.5
\`\`\`

### NAT Configuration on R2
\`\`\`
R2(config)# interface serial0/1
R2(config-if)# ip nat outside
R2(config-if)# exit
R2(config)# interface serial0/0
R2(config-if)# ip nat inside
R2(config-if)# exit
R2(config)# interface fastethernet0/0
R2(config-if)# ip nat inside
R2(config-if)# exit
R2(config)# ip nat pool NAT-POOL 209.165.201.9 209.165.201.14 netmask 255.255.255.248
R2(config)# ip nat inside source list NAT pool NAT-POOL
R2(config)# ip access-list extended NAT
R2(config-ext-nacl)# permit ip 172.16.10.0 0.0.0.255 any
R2(config-ext-nacl)# permit ip 172.16.11.0 0.0.0.255 any
\`\`\`

### Static Route on R2
\`\`\`
R2(config)# ip route 0.0.0.0 0.0.0.0 209.165.201.2
\`\`\`

### Verification
\`\`\`
PC1> ipconfig /all
IP Address: 172.16.10.11 (DHCP)
Subnet Mask: 255.255.255.0
Default Gateway: 172.16.10.1
DNS Server: 172.16.11.5
\`\`\`

\`\`\`
R2# show ip dhcp binding
IP address Hardware Address Lease expiration
172.16.10.11 00:50:79:66:68:01 Mar 01 2024 12:00 PM

R2# show ip nat translations
Pro Inside global Inside local Outside local Outside global
icmp 209.165.201.9:1 172.16.10.11:1 209.165.201.2:1 209.165.201.2:1
\`\`\`

### Key Takeaways
- DHCP automatically assigns IP addresses
- \`ip helper-address\` forwards DHCP broadcasts across subnets
- NAT hides internal private addresses
- PAT (overload) allows many internal hosts to share one public IP

---

## Lab 7: Basic Switch Configuration

### Objective
Configure basic switch settings, VLANs, port security, and MAC tables.

### Equipment
- Cisco 2950 Switch
- 2-3 PCs

### Basic Configuration
\`\`\`
Switch# config terminal
Switch(config)# hostname ALSwitch
ALSwitch(config)# enable secret class
ALSwitch(config)# enable password cisco
ALSwitch(config)# line console 0
ALSwitch(config-line)# password cisco
ALSwitch(config-line)# login
ALSwitch(config-line)# line vty 0 4
ALSwitch(config-line)# password cisco
ALSwitch(config-line)# login
\`\`\`

### Management VLAN
\`\`\`
ALSwitch(config)# interface vlan 1
ALSwitch(config-if)# ip address 192.168.1.2 255.255.255.0
ALSwitch(config-if)# no shutdown
ALSwitch(config)# ip default-gateway 192.168.1.1
\`\`\`

### MAC Address Table
\`\`\`
ALSwitch# show mac-address-table
MAC Address Table

Vlan Mac Address Type Ports
1 94c6.91a1.1e7a DYNAMIC Fa0/4
1 ecf4.bb61.30a1 DYNAMIC Fa0/1
\`\`\`

### Static MAC Configuration
\`\`\`
ALSwitch(config)# mac-address-table static 94c6.91a1.1e7a interface fastethernet 0/4 vlan 1
\`\`\`

### Port Security
\`\`\`
ALSwitch(config)# interface f0/4
ALSwitch(config-if)# switchport mode access
ALSwitch(config-if)# switchport port-security
ALSwitch(config-if)# switchport port-security mac-address sticky
ALSwitch(config-if)# switchport port-security maximum 1
ALSwitch(config-if)# switchport port-security violation shutdown
\`\`\`

### Verification
\`\`\`
ALSwitch# show port-security
Secure Port MaxSecureAddr CurrentAddr SecurityViolation Security Action
Fa0/4 1 1 0 Shutdown
\`\`\`

### Observations
- Default VLAN is VLAN 1
- MAC addresses are learned dynamically
- Port security prevents unauthorized access
- Violation modes: shutdown, restrict, protect

---

## Lab 8: Router-on-a-Stick

### Objective
Configure inter-VLAN routing using a single router interface.

### Topology
<!-- R1 (192.168.x.1)
        |
Trunk (802.1Q)
        |
    Switch S1
/       |    \\
VLAN2 VLAN3 VLAN4
(Eng) (Mkt) (Prod) -->
![lab-8](../assets/screenshots/lab-8.png)

### Router Configuration
\`\`\`
R1(config)# interface fastethernet 0/0
R1(config-if)# no ip address
R1(config-if)# no shutdown
R1(config-if)# exit
R1(config)# interface f0/0.1
R1(config-subif)# encapsulation dot1q 1 native
R1(config-subif)# ip address 192.168.1.1 255.255.255.0
R1(config-subif)# exit
R1(config)# interface f0/0.2
R1(config-subif)# encapsulation dot1q 2
R1(config-subif)# ip address 192.168.2.1 255.255.255.0
R1(config-subif)# exit
R1(config)# interface f0/0.7
R1(config-subif)# encapsulation dot1q 3
R1(config-subif)# ip address 192.168.3.1 255.255.255.0
R1(config-subif)# exit
R1(config)# interface f0/0.12
R1(config-subif)# encapsulation dot1q 4
R1(config-subif)# ip address 192.168.4.1 255.255.255.0
R1(config-subif)# exit
\`\`\`

### Switch Configuration
\`\`\`
S1(config)# interface f1/1
S1(config-if)# switchport mode trunk
S1(config-if)# exit
S1(config)# vlan database
S1(vlan)# vtp server
S1(vlan)# vlan 2 name Engineering
S1(vlan)# vlan 3 name Marketing
S1(vlan)# vlan 4 name Production
S1(vlan)# exit
S1(config)# interface range f1/2 - f1/6
S1(config-if-range)# switchport access vlan 2
S1(config-if-range)# exit
S1(config)# interface range f1/7 - f1/11
S1(config-if-range)# switchport access vlan 3
S1(config-if-range)# exit
S1(config)# interface range f1/12 - f1/15
S1(config-if-range)# switchport access vlan 4
\`\`\`

### PC Configurations
\`\`\`
PC1 (VLAN 2)
IP: 192.168.2.11
GW: 192.168.2.1

PC2 (VLAN 3)
IP: 192.168.3.11
GW: 192.168.3.1

PC3 (VLAN 4)
IP: 192.168.4.11
GW: 192.168.4.1
\`\`\`

### Ping Tests
\`\`\`
PC1> ping 192.168.3.11
Reply from 192.168.3.11: bytes=32 time=20ms TTL=254

PC1> ping 192.168.4.11
Reply from 192.168.4.11: bytes=32 time=20ms TTL=254

PC2> ping 192.168.4.11
Reply from 192.168.4.11: bytes=32 time=20ms TTL=254
\`\`\`

### Failure Scenario
When trunk cable is removed:
PC1> ping 192.168.3.11
Request timed out. (No connectivity)

### Key Takeaways
- Router-on-a-stick uses one physical interface for multiple VLANs
- Sub-interfaces use 802.1Q tagging
- VTP simplifies VLAN management across switches
- Inter-VLAN routing requires routing between sub-interfaces

---

## Lab 9: Configuring Remote Router Using SSH

### Objective
Configure SSH for secure remote router access.

### Topology
<!-- PC (192.168.1.6) --- Router (192.168.1.1) -->
![lab-9 screenshot](../assets/screenshots/lab-9.png)

### Router Configuration
\`\`\`
CustomerRouter(config)# hostname CustomerRouter
CustomerRouter(config)# ip domain-name customer.com
CustomerRouter(config)# username admin privilege 15 password 0 cisco123
CustomerRouter(config)# interface fastethernet 0/0
CustomerRouter(config-if)# ip address 192.168.1.1 255.255.255.0
CustomerRouter(config-if)# no shutdown
CustomerRouter(config-if)# exit
CustomerRouter(config)# line vty 0 4
CustomerRouter(config-line)# privilege level 15
CustomerRouter(config-line)# login local
CustomerRouter(config-line)# transport input telnet ssh
CustomerRouter(config-line)# exit
CustomerRouter(config)# crypto key generate rsa
How many bits in the modulus [512]: 768
\`\`\`

### SSH Verification
\`\`\`
CustomerRouter# show ip ssh
SSH Enabled - version 1.99
Authentication timeout: 120 secs
Authentication retries: 3
\`\`\`

### PuTTY Configuration
- Connection type: SSH
- Host: 192.168.1.1
- Port: 22
- SSH version: 2

### TFTP Backup
\`\`\`
R1# show version
System image file is "flash0:c2900-universalk9-mz.SPA.152-4.M3.bin"

R1# copy flash tftp
Source filename: c2900-universalk9-mz.SPA.152-4.M3.bin
Address of remote host: 172.17.0.2
Destination filename: [confirm]
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
\`\`\`

### Key Takeaways
- SSH encrypts all traffic (unlike Telnet)
- RSA key generation is required
- SSH version 2 is more secure than version 1
- TFTP can backup IOS images

---

## Lab Bonus: OSPF Configuration

### Objective
Configure OSPF routing protocol across multiple routers.

### Topology
R1 --- R2 --- R3

### Configurations

**R1**
\`\`\`
R1(config)# router ospf 1
R1(config-router)# network 172.16.0.0 0.0.0.3 area 0
R1(config-router)# network 172.16.10.0 0.0.0.255 area 0
R1(config-router)# network 172.16.11.0 0.0.0.255 area 0
\`\`\`

**R2**
\`\`\`
R2(config)# router ospf 1
R2(config-router)# network 172.16.0.0 0.0.0.3 area 0
R2(config-router)# network 172.16.20.0 0.0.0.255 area 0
R2(config-router)# default-information originate
\`\`\`

**R3**
\`\`\`
R3(config)# router ospf 1
R3(config-router)# network 172.16.0.0 0.0.0.3 area 0
R3(config-router)# network 172.16.30.0 0.0.0.255 area 0
\`\`\`

### Verification
\`\`\`
R1# show ip ospf interface
FastEthernet0/0 is up, line protocol is up
Internet Address 172.16.10.1/24, Area 0
Process ID 1, Router ID 192.168.10.5, Network Type BROADCAST, Cost: 1
Transmit Delay is 1 sec, State DR, Priority 1

R1# show ip route
O 172.16.20.0/24 [110/2] via 192.168.10.2, 00:00:05, Serial0/0
O 172.16.30.0/24 [110/3] via 192.168.10.2, 00:00:05, Serial0/0
\`\`\`

### Key Takeaways
- OSPF uses wildcard masks (inverse of subnet mask)
- OSPF has better convergence than RIP
- OSPF uses cost metric (based on bandwidth)
- OSPF is classless (supports VLSM)

---

**Next Section**: [Skills Summary](04-skills-summary.md)
`;
  DATA["showcase/lan-wan-design/docs/04-skills-summary.md"] = `# Skills & Competencies

## Summary

Throughout LAN/WAN Design, I developed practical networking skills through hands-on configuration of Cisco routers and switches. Below is a comprehensive list of what I learned and can now do.

---

## Routing Protocols

### Static Routing
- Configure static routes for specific networks
- Configure default routes for unknown destinations
- Understand when to use static vs dynamic routing
- **Example**: \`ip route 192.168.16.0 255.255.255.0 192.168.15.2\`

### RIP (v1 and v2)
- Configure RIPv1 for classful networks
- Configure RIPv2 for classless networks
- Understand RIP's limitations (15 hop max)
- **Example**: \`router rip\` \`network 172.16.0.0\`

### OSPF
- Configure OSPF with wildcard masks
- Understand OSPF areas and their purpose
- Use \`default-information originate\` for default routes
- **Example**: \`router ospf 1\` \`network 172.16.0.0 0.0.0.3 area 0\`

### Route Selection
- Understand administrative distance
- Know when routes are preferred
- **Example**: Connected (0) > Static (1) > OSPF (110) > RIP (120)

---

## Switching Technologies

### VLANs
- Create and name VLANs
- Assign ports to VLANs
- Understand VLAN membership (static vs dynamic)
- **Example**: \`vlan 2 name Engineering\` \`switchport access vlan 2\`

### Trunking
- Configure 802.1Q trunking
- Understand ISL (Cisco proprietary)
- Differentiate between native VLAN and tagged VLANs
- **Example**: \`switchport mode trunk\`

### VTP (VLAN Trunking Protocol)
- Configure VTP servers and clients
- Understand VTP modes (Server, Client, Transparent)
- **Example**: \`vtp server\`

### STP (Spanning Tree Protocol)
- Understand root bridge election
- Know port roles (Root, Designated, Blocking)
- Understand STP states (Blocking, Listening, Learning, Forwarding)

---

## Network Services

### DHCP
- Configure router as DHCP server
- Exclude addresses from DHCP pools
- Define DHCP pools with network, default gateway, DNS
- Use \`ip helper-address\` for cross-subnet DHCP
- **Example**: \`ip dhcp pool R1_LAN10\` \`network 172.16.10.0\`

### NAT (Network Address Translation)
- Configure Static NAT (one-to-one)
- Configure Dynamic NAT (pool-based)
- Configure PAT/NAT Overload (many-to-one)
- Define inside and outside interfaces
- **Example**: \`ip nat inside source list NAT pool NAT-POOL\`

### DNS
- Configure DNS server on router
- Use \`ip host\` for local name resolution
- Disable domain lookup with \`no ip domain-lookup\`

---

## Security

### Authentication
- Set enable password and enable secret
- Configure console line password
- Configure VTY (Telnet/SSH) password
- Understand local vs AAA authentication

### SSH
- Generate RSA keys
- Enable SSH on VTY lines
- Configure SSH version 2
- **Example**: \`crypto key generate rsa\` \`transport input ssh\`

### Port Security
- Enable port security on switch ports
- Set maximum MAC addresses
- Configure violation modes (shutdown, restrict, protect)
- Use sticky MAC addresses
- **Example**: \`switchport port-security maximum 1\`

---

## Cisco IOS Proficiency

### Navigation
- Move between user EXEC, privileged EXEC, global config, and sub-modes
- Use \`exit\` and \`end\` to navigate
- Understand abbreviated commands

### Help System
- Use \`?\` for context-sensitive help
- Use Tab for command completion
- Use \`show ?\` to explore options

### Configuration Management
- Save configs with \`copy run start\`
- Erase configs with \`erase startup-config\`
- Reload router with \`reload\`
- View configs with \`show running-config\` and \`show startup-config\`

### Troubleshooting
- Use \`ping\` and \`traceroute\` for connectivity
- Use \`show ip route\` for routing table
- Use \`show interface\` for interface status
- Use \`debug\` for real-time troubleshooting

---

## IP Addressing

### Subnetting
- Convert binary to decimal and vice versa
- Calculate subnet masks from CIDR notation
- Determine network and broadcast addresses
- Calculate usable host ranges

### IPv4 Addressing
- Identify address classes (A, B, C)
- Understand private vs public addresses
- Identify network, host, and broadcast addresses

### IPv6 Addressing
- Understand IPv6 address formats
- Compress and expand IPv6 addresses
- Convert MAC to EUI-64 format
- Identify loopback address (::1)

---

## Hardware Knowledge

### Router Components
- RAM: Running configuration, routing tables
- ROM: POST, bootstrap
- NVRAM: Startup configuration
- Flash: IOS image

### Switch Components
- MAC address table
- VLAN database
- Port configurations

---

## Tools & Software

### GNS3
- Build network topologies
- Connect routers and switches
- Simulate networks without physical hardware

### Wireshark
- Capture packets
- Analyze protocols (ARP, ICMP, TCP, UDP)
- Filter traffic for specific protocols

### PuTTY
- Console connections (serial)
- SSH connections
- Telnet connections

### TFTP
- Backup IOS images
- Backup configuration files
- Transfer files to/from routers

---

## Real-World Applications

The skills I learned here apply directly to:

1. **Network Administrator**: Configuring routers and switches for small to medium businesses
2. **Network Engineer**: Designing and implementing LAN/WAN infrastructure
3. **IT Support**: Troubleshooting network issues using Cisco tools
4. **Security Analyst**: Understanding network security fundamentals
5. **Network Consultant**: Advising clients on network design and implementation

---

## Future Learning Path

### Certifications
- **CCNA**: A natural next step after this networking work
- **Network+**: Vendor-neutral networking certification

### Advanced Topics
- **EIGRP**: Cisco's proprietary routing protocol
- **BGP**: Border Gateway Protocol for internet routing
- **MPLS**: Multiprotocol Label Switching for WANs
- **Network Automation**: Python, Ansible, SDN

### Specializations
- **Security**: Firewalls, VPNs, intrusion detection
- **Cloud Networking**: AWS, Azure, Google Cloud
- **Wireless**: Wi-Fi design and implementation

---

## Final Thoughts

This work gave me a solid foundation in network design and configuration. I'm comfortable with:
- Router and switch commands
- Routing protocols and their configuration
- VLANs and switching technologies
- DHCP and NAT services
- Basic security practices

I look forward to building on this foundation in future work and professional practice.`;
  DATA["showcase/system-administration/docs/linux-install-lab/01-linux-mint.md"] = `# Linux Mint 19.2 "Tina" (Cinnamon)

| | |
|---|---|
| **ISO source** | http://www.linuxmint.com/download.php |
| **Version installed** | 19.2 "Tina" |
| **Released** | August 2, 2019 |
| **Package manager** | apt (deb) |
| **Boot behavior** | Boots to a live session first; install from the desktop |

## Steps

1. Download the Mint ISO from the official Linux Mint website.
2. Create a bootable USB stick (or attach the ISO directly in a VM).
3. Boot the machine — Mint starts in a live session rather than dropping straight into the installer.
4. Double-click **Install Linux Mint** on the live-session desktop.
5. Choose the install language.
6. Choose the installation type (erase disk / manual partitioning / alongside another OS).
7. Select the time zone.
8. Select the keyboard layout.
9. Enter user account details (name, computer name, username, password).
10. Wait for the installer to copy files and complete setup.
11. Restart the computer when installation finishes.
12. Remove the USB stick / eject the ISO.

## Notes

No screenshots were captured for this run — the flow above was walked through directly on the live-session installer. Mint's "boot to a working desktop first, install when ready" model made it the fastest of the nine distros to get running, and its installer defaults required the fewest decisions along the way.
`;
  DATA["showcase/system-administration/docs/linux-install-lab/02-debian.md"] = `# Debian 10 (Buster)

| | |
|---|---|
| **ISO source** | https://www.debian.org/CD/http-ftp/#stable |
| **Version installed** | Debian 10 "Buster" |
| **Released** | July 6, 2019 |
| **Package manager** | apt (deb) |
| **Boot behavior** | Complete install first (no live session) |

## Steps

1. Download the Debian ISO from the official Debian website.
2. Boot the target machine from the installation media (USB or DVD ISO).
3. At the BIOS-mode boot menu, choose the first (Install) option.
4. Choose the installer language.
5. Select your location, which also sets the time zone.
6. Choose the keyboard layout.
7. Set a hostname for the machine.
8. Set a domain name, or leave it blank if none applies.
9. Set the root password.
10. Create a local (non-root) user account with its own password.
11. Choose a disk partitioning scheme — guided (recommended) is the simplest path.
12. Let the base system install; this stage runs unattended for a while.
13. On the software-selection screen, choose a desktop environment (GNOME was selected here).
14. Install the GRUB bootloader and pick the target disk for it.
15. Remove the installation media once setup finishes, then continue to reboot.
16. Log in with the user account created during setup.
17. Confirm Debian booted successfully into the desktop environment.

## Screenshots

Captured in order during the walkthrough (\`screenshots/debian/\`):

**Debian Linux installer menu**

![Debian Linux installer menu](screenshots/debian/img-000.png)

**Select a language to use debian system**

![Select a language to use debian system](screenshots/debian/img-001.png)

**Select a location for time zone**

![Select a location for time zone](screenshots/debian/img-002.png)

**Select your keyboard keymap to use**

![Select your keyboard keymap to use](screenshots/debian/img-003.png)

**Enter hostname for Debian**

![Enter hostname for Debian](screenshots/debian/img-004.png)

**Leave blank if you don't have domain name**

![Leave blank if you don't have domain name](screenshots/debian/img-005.png)

**Set up root password for debian**

![Set up root password for debian](screenshots/debian/img-006.png)

**Re-Enter debian root password**

![Re-Enter debian root password](screenshots/debian/img-007.png)

**New user full name**

![New user full name](screenshots/debian/img-008.png)

**username account for new user**

![username account for new user](screenshots/debian/img-009.png)

**Password for new user**

![Password for new user](screenshots/debian/img-010.png)

**Re enter password for new user**

![Re enter password for new user](screenshots/debian/img-011.png)

**Choose partitioning method to use the disk**

![Choose partitioning method to use the disk](screenshots/debian/img-012.png)

**Select disk to partition**

![Select disk to partition](screenshots/debian/img-013.png)

**Partitioning scheme choose recommended one**

![Partitioning scheme choose recommended one](screenshots/debian/img-014.png)

**Finish partitioning and write the change to disk**

![Finish partitioning and write the change to disk](screenshots/debian/img-015.png)

**Write the changes to disk**

![Write the changes to disk](screenshots/debian/img-016.png)

**Loading installing the base system**

![Loading installing the base system](screenshots/debian/img-017.png)

**Choose if you want to participate in the package usage survey**

![Choose if you want to participate in the package usage survey](screenshots/debian/img-018.png)

**Choose GNOME to use GUI**

![Choose GNOME to use GUI](screenshots/debian/img-019.png)

**Install the Grub boot loader to MBR**

![Install the Grub boot loader to MBR](screenshots/debian/img-020.png)

**Choose disk for boot loader**

![Choose disk for boot loader](screenshots/debian/img-021.png)

**Complete Debian installation**

![Complete Debian installation](screenshots/debian/img-022.png)

**Login to your user name with password**

![Login to your user name with password](screenshots/debian/img-023.png)
`;
  DATA["showcase/system-administration/docs/linux-install-lab/03-centos.md"] = `# CentOS 8

| | |
|---|---|
| **ISO source** | http://isoredirect.centos.org/centos/8/isos/x86_64/CentOS-8-x86_64-1905-dvd1.iso |
| **Version installed** | CentOS 8 |
| **Released** | September 24, 2019 |
| **Package manager** | yum (rpm) |
| **Boot behavior** | Complete install first (no live session) |

## Steps

1. Download the CentOS ISO from the official CentOS website.
2. Boot the machine from the installation media (USB or ISO in a VM).
3. At the BIOS-mode boot menu, choose the first (Install) option.
4. Choose the installer language.
5. Configure the installation destination (target disk) in System Configuration.
6. On the Installation Summary screen, click Begin Installation.
7. While installation runs, configure the root and local user account settings.
8. Set the root password.
9. Create a new local user account.
10. After installation completes, reboot the system.
11. Accept the licensing agreement and finish initial setup.
12. Log in with the account created during installation.

## Screenshots

Captured in order during the walkthrough (\`screenshots/centos/\`):

**CentOS Installer Menu**

![CentOS Installer Menu](screenshots/centos/img-000.png)

**Select a language to use CentOS**

![Select a language to use CentOS](screenshots/centos/img-001.png)

**Uncompleted Installation Summary configuration**

![Uncompleted Installation Summary configuration](screenshots/centos/img-002.png)

**Select Disk to Install the system**

![Select Disk to Install the system](screenshots/centos/img-003.png)

**Complete Installation Summary configuration**

![Complete Installation Summary configuration](screenshots/centos/img-004.png)

**Uncompleted configuration of User Settings during Installation process**

![Uncompleted configuration of User Settings during Installation process](screenshots/centos/img-005.png)

**Enter root password for the system**

![Enter root password for the system](screenshots/centos/img-006.png)

**Create a new user account**

![Create a new user account](screenshots/centos/img-007.png)

**Complete configuration of user settings**

![Complete configuration of user settings](screenshots/centos/img-008.png)

**Reboot system after Installation complete**

![Reboot system after Installation complete](screenshots/centos/img-009.png)

**Uncompleted Initial setup of licensing**

![Uncompleted Initial setup of licensing](screenshots/centos/img-010.png)

**Accept the License Agreement**

![Accept the License Agreement](screenshots/centos/img-011.png)

**Complete configuration after License accepted**

![Complete configuration after License accepted](screenshots/centos/img-012.png)

**Login to your user name with password**

![Login to your user name with password](screenshots/centos/img-013.png)

**CentOS Desktop Environment**

![CentOS Desktop Environment](screenshots/centos/img-014.png)
`;
  DATA["showcase/system-administration/docs/linux-install-lab/04-fedora.md"] = `# Fedora Workstation 31

| | |
|---|---|
| **ISO source** | https://getfedora.org/en/workstation/download/ |
| **Version installed** | Fedora Workstation 31 |
| **Released** | October 29, 2019 |
| **Package manager** | dnf/yum (rpm) |
| **Boot behavior** | Either "Try Fedora" (live) or "Install Fedora" directly |

## Steps

1. Download the Fedora Workstation ISO from the official Fedora website.
2. Boot the machine from the installation media.
3. At the BIOS-mode boot menu, choose the first option.
4. From the Fedora welcome screen, choose Install to Hard Drive.
5. Choose the installer language.
6. Configure the installation destination (target disk).
7. On the Installation Summary screen, click Begin Installation.
8. After installation completes, remove the installation media and click Finish Installation to reboot.
9. On first boot, fill in your account details.
10. Set a password for the new user account.
11. Click through to start using Fedora.

## Screenshots

Captured in order during the walkthrough (\`screenshots/fedora/\`):

**Fedora Workstation Installer Menu**

![Fedora Workstation Installer Menu](screenshots/fedora/img-000.png)

**Fedora choose options to either try live or Install to Hard Drive**

![Fedora choose options to either try live or Install to Hard Drive](screenshots/fedora/img-001.png)

**Select a language to use Fedora Workstation**

![Select a language to use Fedora Workstation](screenshots/fedora/img-002.png)

**Uncompleted Installation Summary configuration**

![Uncompleted Installation Summary configuration](screenshots/fedora/img-003.png)

**Select Disk to Install the system**

![Select Disk to Install the system](screenshots/fedora/img-004.png)

**Complete Installation Summary configuration**

![Complete Installation Summary configuration](screenshots/fedora/img-005.png)

**Reboot system after Installation complete**

![Reboot system after Installation complete](screenshots/fedora/img-006.png)

**Create a new user account**

![Create a new user account](screenshots/fedora/img-007.png)

**Set a password for the new user account**

![Set a password for the new user account](screenshots/fedora/img-008.png)

**Ready to go using Fedora**

![Ready to go using Fedora](screenshots/fedora/img-009.png)

**Fedora Workstation Desktop Environment**

![Fedora Workstation Desktop Environment](screenshots/fedora/img-010.png)

**Installer screenshot**

![Installer screenshot](screenshots/fedora/img-011.png)
`;
  DATA["showcase/system-administration/docs/linux-install-lab/05-rhel8.md"] = `# Red Hat Enterprise Linux 8

| | |
|---|---|
| **ISO source** | https://redhat.rit.edu/iso/ |
| **Version installed** | Red Hat Enterprise Linux 8 |
| **Released** | November 5, 2019 |
| **Package manager** | yum (rpm) |
| **Boot behavior** | Complete install first (no live session) · ISO was 6.61 GB |

## Steps

1. Download the Red Hat Enterprise Linux 8 ISO (via a licensed source — redhat.rit.edu for this run).
2. Boot the machine from the installation media.
3. At the BIOS-mode boot menu, choose the first option.
4. Choose the installer language.
5. Configure the installation destination (target disk).
6. On the Installation Summary screen, click Begin Installation.
7. While installation runs, configure root and local user account settings.
8. Set the root password and create a new local user account.
9. After installation completes, reboot the system.
10. Accept the licensing agreement, finish initial setup, and log in.

## Screenshots

Captured in order during the walkthrough (\`screenshots/rhel8/\`):

**Red Hat Enterprise Linux Installer Menu**

![Red Hat Enterprise Linux Installer Menu](screenshots/rhel8/img-000.png)

**Select a language to use the system**

![Select a language to use the system](screenshots/rhel8/img-001.png)

**Uncompleted Installation Summary configuration**

![Uncompleted Installation Summary configuration](screenshots/rhel8/img-002.png)

**Select Disk to Install the system**

![Select Disk to Install the system](screenshots/rhel8/img-003.png)

**Complete Installation Summary configuration**

![Complete Installation Summary configuration](screenshots/rhel8/img-004.png)

**Uncompleted Configuration of User Settings during Installation process**

![Uncompleted Configuration of User Settings during Installation process](screenshots/rhel8/img-005.png)

**Enter root password for the system**

![Enter root password for the system](screenshots/rhel8/img-006.png)

**Create a new user account**

![Create a new user account](screenshots/rhel8/img-007.png)

**Complete configuration of User Settings**

![Complete configuration of User Settings](screenshots/rhel8/img-008.png)

**Reboot system after Installation complete.**

![Reboot system after Installation complete.](screenshots/rhel8/img-009.png)

**Uncompleted Initial setup of licensing**

![Uncompleted Initial setup of licensing](screenshots/rhel8/img-010.png)

**Accept the License Agreement**

![Accept the License Agreement](screenshots/rhel8/img-011.png)

**Complete configuration after License accepted**

![Complete configuration after License accepted](screenshots/rhel8/img-012.png)

**Login to your user name with password**

![Login to your user name with password](screenshots/rhel8/img-013.png)

**Red Hat Enterprise Linux Desktop Environment**

![Red Hat Enterprise Linux Desktop Environment](screenshots/rhel8/img-014.png)

**Installer screenshot**

![Installer screenshot](screenshots/rhel8/img-015.png)
`;
  DATA["showcase/system-administration/docs/linux-install-lab/06-freebsd.md"] = `# FreeBSD 12.1 (+ GNOME)

| | |
|---|---|
| **ISO source** | https://download.freebsd.org/ftp/releases/amd64/amd64/ISO-IMAGES/12.1/FreeBSD-12.1-RELEASE-amd64-disc1.iso |
| **Version installed** | FreeBSD 12.1-RELEASE |
| **Released** | November 4, 2019 |
| **Package manager** | pkg |
| **Boot behavior** | Complete install first (no live session) · ISO was 867 MB · no GUI by default |

## Steps

1. Download the FreeBSD ISO from the official FreeBSD website.
2. Boot the machine from the installation media.
3. At the BIOS-mode boot menu, choose the first option.
4. On the welcome screen, select Install.
5. Choose the system keymap.
6. Set the system hostname.
7. Partition the target disk using the guided partition editor.
8. Confirm the partitioning warning and let the base distribution fetch and extract.
9. Set the root password.
10. Configure networking — interface, DHCP or static IPv4/IPv6, and DNS resolver.
11. Select the time zone (region, then confirm the abbreviation).
12. Choose which system services to enable, and review the system-hardening options.
13. Add a local (non-root) user account.
14. Skip manual configuration (unless changes are needed) and reboot.
15. Log in with the account created during setup.
16. Update and upgrade the base system as root (\`freebsd-update\`, \`pkg update && pkg upgrade\`).
17. Install a desktop environment — GNOME, via \`pkg install gnome\`.
18. Edit \`/etc/rc.conf\` to enable the display manager and D-Bus/HAL services.
19. Edit \`/etc/fstab\` to add the \`proc\` filesystem entry GNOME expects (nano was used in place of vi here).
20. Reboot into the graphical login screen and log in — FreeBSD is now running a full GNOME desktop.

## Notes

This was the most involved install of the nine. FreeBSD's installer (bsdinstall) is text-based and doesn't ship a desktop by default, so getting to a graphical login meant a second phase after the base install: \`pkg install gnome\`, then hand-editing \`/etc/rc.conf\` (to enable \`gdm\`/\`gnome\` and \`dbus\`/\`hald\`) and \`/etc/fstab\` (to add the \`proc\` filesystem entry GNOME expects) before GDM would even start. This matches the lab's own conclusion — installing FreeBSD's base system is straightforward, but bolting a GUI on top is not.

## Screenshots

Captured in order during the walkthrough (\`screenshots/freebsd/\`):

**FreeBSD Installer boot menu**

![FreeBSD Installer boot menu](screenshots/freebsd/img-000.png)

**Welcome installer window wizard**

![Welcome installer window wizard](screenshots/freebsd/img-001.png)

**FreeBSD keymap selection**

![FreeBSD keymap selection](screenshots/freebsd/img-002.png)

**FreeBSD hostname setup**

![FreeBSD hostname setup](screenshots/freebsd/img-003.png)

**FreeBSD Partition**

![FreeBSD Partition](screenshots/freebsd/img-004.png)

**FreeBSD partition types**

![FreeBSD partition types](screenshots/freebsd/img-005.png)

**FreeBSD Partition Editor**

![FreeBSD Partition Editor](screenshots/freebsd/img-006.png)

**FreeBSD warning confirmation message**

![FreeBSD warning confirmation message](screenshots/freebsd/img-007.png)

**FreeBSD Fetching Distribution in process**

![FreeBSD Fetching Distribution in process](screenshots/freebsd/img-008.png)

**FreeBSD Archive Extraction in process**

![FreeBSD Archive Extraction in process](screenshots/freebsd/img-009.png)

**Set up new FreeBSD root password**

![Set up new FreeBSD root password](screenshots/freebsd/img-010.png)

**FreeBSD Network Configuration**

![FreeBSD Network Configuration](screenshots/freebsd/img-011.png)

**FreeBSD IPv4 network interface configuration**

![FreeBSD IPv4 network interface configuration](screenshots/freebsd/img-012.png)

**FreeBSD DHCP network configuration**

![FreeBSD DHCP network configuration](screenshots/freebsd/img-013.png)

**FreeBSD IPv6 network configuration**

![FreeBSD IPv6 network configuration](screenshots/freebsd/img-014.png)

**FreeBSD DNS resolver configuration**

![FreeBSD DNS resolver configuration](screenshots/freebsd/img-015.png)

**FreeBSD time zone selector**

![FreeBSD time zone selector](screenshots/freebsd/img-016.png)

**FreeBSD Select a country or region**

![FreeBSD Select a country or region](screenshots/freebsd/img-017.png)

**FreeBSD USA Time Zone**

![FreeBSD USA Time Zone](screenshots/freebsd/img-018.png)

**FreeBSD confirmation of Time zone abbreviation**

![FreeBSD confirmation of Time zone abbreviation](screenshots/freebsd/img-019.png)

**FreeBSD System configuration for service**

![FreeBSD System configuration for service](screenshots/freebsd/img-020.png)

**FreeBSD System hardening options**

![FreeBSD System hardening options](screenshots/freebsd/img-021.png)

**FreeBSD Add User Accounts**

![FreeBSD Add User Accounts](screenshots/freebsd/img-022.png)

**FreeBSD added user to the system**

![FreeBSD added user to the system](screenshots/freebsd/img-023.png)

**User account review message before confirming if they are correct**

![User account review message before confirming if they are correct](screenshots/freebsd/img-024.png)

**FreeBSD Manual Configuration**

![FreeBSD Manual Configuration](screenshots/freebsd/img-025.png)

**Complete FreeBSD installation**

![Complete FreeBSD installation](screenshots/freebsd/img-026.png)

**Login to FreeBSD after reboot**

![Login to FreeBSD after reboot](screenshots/freebsd/img-027.png)

**FreeBSD Update the system**

![FreeBSD Update the system](screenshots/freebsd/img-028.png)

**FreeBSD Upgrade the system**

![FreeBSD Upgrade the system](screenshots/freebsd/img-029.png)

**FreeBSD GNOME install**

![FreeBSD GNOME install](screenshots/freebsd/img-030.png)

**Number of GNOME packages to be installed**

![Number of GNOME packages to be installed](screenshots/freebsd/img-031.png)

**GNOME installation is in process**

![GNOME installation is in process](screenshots/freebsd/img-032.png)

**GNOME is successful installed to the system**

![GNOME is successful installed to the system](screenshots/freebsd/img-033.png)

**Command for edit rc.conf file**

![Command for edit rc.conf file](screenshots/freebsd/img-034.png)

**Add few texts to the next lines**

![Add few texts to the next lines](screenshots/freebsd/img-035.png)

**Command for edit fstab file**

![Command for edit fstab file](screenshots/freebsd/img-036.png)

**Add few texts on the next line (I use nano instead of vi to modify the file)**

![Add few texts on the next line (I use nano instead of vi to modify the file)](screenshots/freebsd/img-037.png)

**FreeBSD login GUI Screen**

![FreeBSD login GUI Screen](screenshots/freebsd/img-038.png)

**Complete FreeBSD GUI installed**

![Complete FreeBSD GUI installed](screenshots/freebsd/img-039.png)

**Installer screenshot**

![Installer screenshot](screenshots/freebsd/img-040.png)
`;
  DATA["showcase/system-administration/docs/linux-install-lab/07-puppy.md"] = `# Puppy Linux (BionicPup64)

| | |
|---|---|
| **ISO source** | http://distro.ibiblio.org/puppylinux/puppy-bionic/bionicpup64/ |
| **Version installed** | Puppy BionicPup64 8.0 |
| **Released** | March 25, 2019 |
| **Package manager** | pet |
| **Boot behavior** | Live CD first, install-to-disk via desktop icon · ISO was 354 MB |

## Steps

1. Download the Puppy BionicPup64 ISO from its official distribution mirror.
2. Boot the machine from the installation media.
3. At the BIOS-mode boot menu, choose the first option.
4. In the live session, close the Quick Setup and Welcome windows.
5. Launch the Install icon from the desktop to install to the hard drive.
6. Choose the internal hard drive as the install target.
7. Use GParted to create a new partition table and a partition for the install (this took a couple of attempts — see notes below).
8. Point the installer at the freshly-partitioned drive and commit to install.
9. Choose FRUGAL or FULL install mode (FULL was selected here).
10. Let the installer transfer files to the hard drive.
11. Install the GRUB bootloader and pick the target disk / boot options.

## Notes

Partitioning was the rough edge here — the first attempt through GParted hit an error and needed a second pass (create a new partition table, erase the disk, then add the volume) before the installer would accept the target drive. Everything after that point was a standard FRUGAL/FULL install-to-disk flow.

## Screenshots

Captured in order during the walkthrough (\`screenshots/puppy/\`):

**Puppy Installer Menu**

![Puppy Installer Menu](screenshots/puppy/img-000.png)

**Close Quick Setup window**

![Close Quick Setup window](screenshots/puppy/img-001.png)

**Close Welcome window**

![Close Welcome window](screenshots/puppy/img-002.png)

**Install puppy**

![Install puppy](screenshots/puppy/img-003.png)

**Install puppy to the Internal Hard Drive**

![Install puppy to the Internal Hard Drive](screenshots/puppy/img-004.png)

**Choose which drive to install**

![Choose which drive to install](screenshots/puppy/img-005.png)

**Gparted message**

![Gparted message](screenshots/puppy/img-006.png)

**Create new partition table**

![Create new partition table](screenshots/puppy/img-007.png)

**Another alternative way partition table after this error**

![Another alternative way partition table after this error](screenshots/puppy/img-008.png)

**Create Partition Table**

![Create Partition Table](screenshots/puppy/img-009.png)

**Erase All entire disk data**

![Erase All entire disk data](screenshots/puppy/img-010.png)

**Try again to create new partition under NEW tab**

![Try again to create new partition under NEW tab](screenshots/puppy/img-011.png)

**Add partition Volume**

![Add partition Volume](screenshots/puppy/img-012.png)

**Apply the change for partition**

![Apply the change for partition](screenshots/puppy/img-013.png)

**Complete Gparted Operation**

![Complete Gparted Operation](screenshots/puppy/img-014.png)

**Close GParted window**

![Close GParted window](screenshots/puppy/img-015.png)

**Click again the Hard drive where you want to install**

![Click again the Hard drive where you want to install](screenshots/puppy/img-016.png)

**Install puppy to the sda we created before**

![Install puppy to the sda we created before](screenshots/puppy/img-017.png)

**Commit to install message**

![Commit to install message](screenshots/puppy/img-018.png)

**Choose either FRUGAL or FULL to proceed (I choose FULL)**

![Choose either FRUGAL or FULL to proceed (I choose FULL)](screenshots/puppy/img-019.png)

**Partition check message to install to hard drive**

![Partition check message to install to hard drive](screenshots/puppy/img-020.png)

**Installer files are being transfer to hard drive**

![Installer files are being transfer to hard drive](screenshots/puppy/img-021.png)

**Install Grub bootloader**

![Install Grub bootloader](screenshots/puppy/img-022.png)

**Where you want to install grub bootloader**

![Where you want to install grub bootloader](screenshots/puppy/img-023.png)

**List of extra boot loader will show here**

![List of extra boot loader will show here](screenshots/puppy/img-024.png)

**Bootloader confirmation**

![Bootloader confirmation](screenshots/puppy/img-025.png)

**Successfully installed grub bootloader**

![Successfully installed grub bootloader](screenshots/puppy/img-026.png)

**Grub message if system doesn't have boot manager**

![Grub message if system doesn't have boot manager](screenshots/puppy/img-027.png)

**Installer screenshot**

![Installer screenshot](screenshots/puppy/img-028.png)

**Installer screenshot**

![Installer screenshot](screenshots/puppy/img-029.png)
`;
  DATA["showcase/system-administration/docs/linux-install-lab/08-zorin.md"] = `# Zorin OS 15 Education

| | |
|---|---|
| **ISO source** | https://zorinos.com/download/#education |
| **Version installed** | Zorin OS 15 Education |
| **Released** | June 24, 2019 |
| **Package manager** | apt (deb) |
| **Boot behavior** | Either "Try Zorin" (live) or "Install Zorin" directly · ISO was 4.21 GB |

## Steps

1. Download the Zorin OS Education ISO from the official Zorin website.
2. Boot the machine from the installation media.
3. At the BIOS-mode boot menu, choose the first option.
4. From the welcome window, choose Install Zorin OS.
5. Choose the keyboard layout.
6. Optionally install updates and third-party software during setup if connected to the internet.
7. Select the installation type (erase disk was used here) after reading the warning message.
8. Confirm and write the changes to disk.
9. Set the time zone and create the user account.
10. Wait for installation to complete, then reboot.
11. Log in with the account created during setup.

## Screenshots

Captured in order during the walkthrough (\`screenshots/zorin/\`):

**Zorin OS Installer menu**

![Zorin OS Installer menu](screenshots/zorin/img-000.png)

**Zorin OS Live CD or Install Welcome window**

![Zorin OS Live CD or Install Welcome window](screenshots/zorin/img-001.png)

**Zorin OS keyboard layout**

![Zorin OS keyboard layout](screenshots/zorin/img-002.png)

**Install Zorin OS updates and other software**

![Install Zorin OS updates and other software](screenshots/zorin/img-003.png)

**Installation type to install Zorin OS**

![Installation type to install Zorin OS](screenshots/zorin/img-004.png)

**Write the change to the disk**

![Write the change to the disk](screenshots/zorin/img-005.png)

**Select your location for time zone**

![Select your location for time zone](screenshots/zorin/img-006.png)

**Create new user account**

![Create new user account](screenshots/zorin/img-007.png)

**Zorin OS installation is in process**

![Zorin OS installation is in process](screenshots/zorin/img-008.png)

**Complete Zorin OS installation**

![Complete Zorin OS installation](screenshots/zorin/img-009.png)

**Zorin OS login Screen**

![Zorin OS login Screen](screenshots/zorin/img-010.png)

**Zorin OS Desktop Environment.**

![Zorin OS Desktop Environment.](screenshots/zorin/img-011.png)

**Installer screenshot**

![Installer screenshot](screenshots/zorin/img-012.png)

**Installer screenshot**

![Installer screenshot](screenshots/zorin/img-013.png)
`;
  DATA["showcase/system-administration/docs/linux-install-lab/09-parrot.md"] = `# Parrot OS

| | |
|---|---|
| **Base** | Debian |
| **Version installed** | Parrot OS (Home/Workstation) |
| **Package manager** | apt (deb) |
| **Boot behavior** | Install-first |

## Steps

> Note: the original lab notes for this run were incomplete — a few later steps had been accidentally copy-pasted from the CentOS section, so only the genuine Parrot-specific steps are reproduced below.

1. Download the Parrot Home/Workstation ISO from its official website.
2. Boot the machine from the installation media.
3. At the BIOS-mode boot menu, choose Install.
4. Choose the installer language and location.
5. Choose the keyboard layout.
6. Set up the user account and password.
7. Configure the system clock.
8. Partition the disk for the Parrot install.

## Screenshots

Captured in order during the walkthrough (\`screenshots/parrot/\`). Because the original write-up for this section was incomplete, the screenshots below are shown without step annotations rather than guessed at:

![Installer screenshot](screenshots/parrot/img-000.png)

![Installer screenshot](screenshots/parrot/img-001.png)

![Installer screenshot](screenshots/parrot/img-002.png)

![Installer screenshot](screenshots/parrot/img-003.png)

![Installer screenshot](screenshots/parrot/img-004.png)

![Installer screenshot](screenshots/parrot/img-005.png)

![Installer screenshot](screenshots/parrot/img-006.png)

![Installer screenshot](screenshots/parrot/img-007.png)

![Installer screenshot](screenshots/parrot/img-008.png)

![Installer screenshot](screenshots/parrot/img-009.png)

![Installer screenshot](screenshots/parrot/img-010.png)

![Installer screenshot](screenshots/parrot/img-011.png)

![Installer screenshot](screenshots/parrot/img-012.png)

![Installer screenshot](screenshots/parrot/img-013.png)

![Installer screenshot](screenshots/parrot/img-014.png)

![Installer screenshot](screenshots/parrot/img-015.png)

![Installer screenshot](screenshots/parrot/img-016.png)

![Installer screenshot](screenshots/parrot/img-017.png)
`;
  DATA["showcase/system-administration/docs/sysadmin-I/01-active-directory.md"] = `# Active Directory & Windows Server Administration

**What we set up in this lab: a working Windows Server domain with Active Directory, DNS, DHCP, and Group Policy.**

---

## Standing Up the Domain Controller

We installed and configured a Windows Server VM to act as the domain controller — the machine that authenticates users, enforces policies, and manages access to network resources across the domain.

The practical steps we performed:

- Promoted the server into a domain controller role.
- Joined a Windows 10 client and a Linux client to the domain and verified that both could authenticate against the domain controller.
- Confirmed the domain environment with PowerShell (\`Get-ADDomain\`) and checked the server's DHCP scope so clients were handed addresses automatically.

Verifying the domain from *both* a Windows and a Linux client was an important part of the lab — it proved the domain controller and DNS were actually serving clients, not just configured.

## How We Think About Active Directory

We found it helpful to think of AD as the central phone book and rules engine for the network:

- **Forest / Domain / OU / Objects** — AD organizes users, computers, groups, and other resources in a hierarchy. Organizational units (OUs) are containers that group objects so you can manage them and apply policy to them separately.
- **Objects & identities** — each object has identifiers used for logon. We worked with the \`sAMAccountName\` (the short logon name) and the User Principal Name (UPN, the logon name in \`user@domain\` form) and why both exist.
- **Security identifiers** — relative and security identifiers give each object a unique identity that allows other systems on the network to recognize and authorize it.

### Administrative Groups

Three groups carry a lot of power in a domain, and the lab drove home that you need to be selective about adding users to them:

| Group | What it controls |
|-------|------------------|
| **Enterprise Admins** | Maintains objects across the whole directory tree |
| **Schema Admins** | Maintains the AD schema and supports promoting domain controllers / restructuring the domain |
| **Domain Admins** | Full administrative control over the domain's objects and resources |

We used the **Group Policy Management** tools to review and manage group membership and permissions rather than granting broad access by default.

## DNS & AD Working Together

Active Directory is heavily dependent on DNS. Clients locate the services they need — starting with the domain controller itself — through DNS.

In the lab we:

- Confirmed that client requests for a service first go through DNS to resolve a name to an address.
- Verified the **SRV resource records** that advertise AD services (these are what let clients find controllers and other domain services without manual configuration).
- Checked name resolution from the clients so they could join and authenticate.

Without correct DNS, the domain simply doesn't work — that became obvious very quickly when a client couldn't join until its DNS pointed at the domain controller.

## DHCP

We configured DHCP scopes so client machines picked up an address, gateway, and DNS automatically rather than being configured by hand. This tied the network together: clients got onto the network, found the domain controller through DNS, and authenticated — all without manual IP setup.

## Group Policy

We created and linked **Group Policy Objects (GPOs)** to enforce settings on users and computers.

- We verified GPO reports to confirm the policies were actually applying.
- As a working example, we built a GPO that **denied a group of users access to Control Panel**, then confirmed it in the reports.

We also paid attention to how GPOs are inherited and how precedence works, so we understood *which* policy wins when several apply and how "enforced" changes the behaviour.

---

**Key takeaway:** A domain is only as good as its foundation. DNS has to point the right way before clients can join, and both DHCP and DNS have to agree or nothing authenticates. Getting all three to line up — and proving it from real client machines — is what made the whole lab team click.
`;
  DATA["showcase/system-administration/docs/sysadmin-I/02-linux-foundations.md"] = `# Linux Foundations, Remote Access & Automation

**What we covered: Linux user management, SSH key-based authentication, protecting root, and writing small scripts to automate admin tasks.**

---

## User Management on Linux

We worked with the core files and directories that Linux uses to manage users and groups:

- **\`/etc/passwd\`** — the list of user accounts and their basic details. The password field is no longer stored here; it holds a placeholder (\`x\`) and the real hashed password lives in \`/etc/shadow\`.
- **\`/etc/shadow\`** — stores the password hashes plus password-aging controls. It's readable only by root, which is a deliberate security boundary.
- **\`/etc/group\`** — defines groups and which users belong to them.
- **\`/etc/skel\`** — the skeleton directory. Default files here are copied into each new user's home directory automatically when the account is created, so every new user starts with a consistent environment.

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
`;
  DATA["showcase/system-administration/docs/sysadmin-I/03-storage-management.md"] = `# Storage Management

**What we did: added drives to a Linux system, set up RAID, worked with LVM, and wired it all up so it mounts at boot.**

---

## Adding & Preparing Drives

We attached additional virtual drives to the server and prepared them for use. Along the way we revisited the building blocks of disk layout:

- **Partition tables** — MBR vs. GPT. GPT handles larger disks and more partitions; MBR is the older scheme with a stricter 4-primary-partition limit.
- **Partition types** — primary, extended, and logical partitions, and why extended/logical partitions exist (to get around the old four-partition ceiling).

## RAID

We built software RAID arrays and verified they actually protect data:

- **RAID 1 (mirroring)** — an exact copy of data across two drives. We mounted the mirror and verified the data was readable.
- **RAID 5 (striping with parity)** — distributes data with parity across three or more drives for redundancy with better capacity than a mirror.
- **Redundancy & rebuild** — we verified that the array tolerated losing a drive, then simulated a failure and **rebuilt the array** so it was healthy again.

Watching a degraded array rebuild back to healthy is the part that made RAID "click" for us — it's not just acronyms, it's the server actually keeping the data available while it recovers.

## Logical Volume Management (LVM)

We used LVM for storage that's easier to manage than fixed partitions:

- Layered structure of **physical volume → volume group → logical volume**.
- The big practical win: **resizing volumes on the fly** without unmounting or re-partitioning, and the ability to span volumes across multiple physical disks.
- Snapshots give you a point-in-time copy of a volume, useful before making changes.

In the lab we created volumes and resized them, and we felt the difference vs. the rigidity of traditional partitioning.

## Making Mounts Permanent — \`/etc/fstab\`

With RAID and LVM volumes working, we made them mount automatically at boot via the file system table:

- Each entry specifies the device (by UUID or path), the **mount point**, the **file system type**, and **options**, plus dump/check flags.
- For network shares we used the \`_netdev\` option, which makes the system wait for the network to be up before trying to mount — important so an NFS mount doesn't fail just because networking isn't ready yet.
- We verified the mounts came up (including the RAID and LVM volumes) after configuring persistence.

## Windows vs. Linux Storage Thinking

The lab also had us compare how Windows and Linux approach storage:

- Both use partitions to divide physical disks into logical units.
- Windows leans on volume management (basic vs. dynamic disks, including spanned volumes), while Linux relies on file systems and tools like LVM.
- Linux supports a wider range of file systems (ext4, XFS, Btrfs) and can often resize a live file system where Windows needs a partition offline.

---

**Key takeaway:** The point of good storage administration isn't just "add a disk" — it's redundancy (RAID), flexibility (LVM), and reliability (persistent mounts that survive a reboot), and knowing which trade-offs you're making.
`;
  DATA["showcase/system-administration/docs/sysadmin-I/04-network-services.md"] = `# Network Services

**What we did: set up and tested FTP, rsync, Samba, and NFS for moving and sharing files across Linux and Windows machines, plus DNS validation.**

---

## FTP — File Transfers (with a security caveat)

We configured an FTP server on Linux and tested it.

- We set up both **authenticated** and **anonymous** access and verified we could transfer files.
- We checked the **transfer log (\`xferlog\`)** to confirm the file actually landed on the server, and we looked at who could see it — which depends on whether the server allows anonymous/guest access.
- The important lesson: FTP sends credentials and data **in plain text**, so it's a teaching tool and a liability, not something to use for sensitive traffic. Real-world sensitive transfers should use a secure protocol.

## rsync — Synchronizing Files

We used \`rsync\` for file synchronization between systems:

- Operated in **archive mode (\`-a\`)**, which preserves permissions, ownership, and timestamps — critical for keeping a faithful copy.
- Used **verbose (\`-v\`)** output to watch what was being transferred.
- Understood the difference between a plain copy and a true synchronization that only moves the changes.

rsync quickly became one of our go-to utilities for keeping files in sync because it's precise about *how* files are copied.

## Samba — Sharing with Windows Clients

Samba lets a Linux server share files with Windows clients using the SMB/CIFS protocol.

- We worked with the **\`smb.conf\`** configuration format — a text file of sections, including a global section plus share sections and (depending on setup) home and printer sections, each serving a distinct purpose.
- We configured shares, then **verified from a Windows client** that it could list, read, and write to the share — and confirmed the server-side Samba status.
- The "test from the client" step is what proved the configuration was actually correct, not just syntactically valid.

## NFS — Sharing with Linux Clients

We configured NFS to share directories with other Linux systems:

- Set up an export in \`/etc/exports\` and mounted it on a client.
- Worked with the key export options and their trade-offs:
  - **\`rw\`** — clients get read/write access instead of read-only.
  - **\`sync\` vs. async** — \`sync\` waits for writes to be committed (safer, slower); \`async\` is faster but risks data inconsistencies.
  - **\`no_root_squash\`** — lets a client's root user keep full access to the shared files; convenient but a real **security risk**, and we noted exactly why you'd normally avoid it.
- Used \`_netdev\` in the client's mount entry so the NFS share only mounts once the network is up (this also ties back to our storage lab).

## DNS Validation

Throughout the network-services work we validated **forward and reverse lookup zones** so that names on the network resolved correctly — the same DNS groundwork that Active Directory depends on.

---

**Key takeaway:** There are many ways to move bytes across a network, and the right choice depends on the client (Windows or Linux), the security requirements, and whether you need a copy or a live sync. Understanding *when not* to use a tool (like plain-text FTP, or \`no_root_squash\`) is as important as knowing how to configure it.
`;
  DATA["showcase/system-administration/docs/sysadmin-I/05-web-and-email.md"] = `# Web, Email & Monitoring Services

**What we did: stood up and secured an Apache web server, configured a mail server, set up centralized logging, and scheduled tasks.**

---

## Apache Web Server

We installed and configured the Apache web server on Linux.

- **Document root** — the top-level directory Apache serves files from (by default under \`/var/www/html\`). To change it, we backed up the configuration first, then edited the \`DocumentRoot\` directive to point at the new directory.
- **Virtual hosts** — we set up multiple virtual host sites on one server so a single Apache instance could serve more than one website, each with its own site files.
- **Listening ports** — the configuration's \`Listen\` directive tells the server which port to answer HTTP traffic on (e.g., port 80 for plain HTTP, 443 for HTTPS).

We made a habit of **backing up config files** (like \`httpd.conf\`) before editing them after an earlier lesson about restoring broken configs.

## SSL/TLS & Certificates

We secured the web server with encryption:

- **How keys work** — the server and client use keys to encrypt data in transit so only authorized parties can decrypt it. **Bigger keys are harder to brute-force**, which is why key size matters.
- **Self-signed certificates** — we set up a self-signed certificate for the server. It encrypts the connection, but a browser warns that it isn't trusted because it wasn't issued by a recognized certification authority.
- **CA-issued vs. self-signed** — a certificate from a certification authority lets outside clients trust the site; a self-signed certificate is fine for an internal lab network with lower trust requirements. Understanding the operational difference (trust vs. just encryption) is what the lab was really about.

## Mail Server

We configured a mail server and traced how email flows through its components:

- **Mail User Agent (MUA)** — the client that reads and writes mail (retrieving via protocols like POP or IMAP).
- **Mail Delivery Agent (MDA)** — delivers incoming mail into a user's local mailbox.
- **Mail Transfer Agent (MTA)** — moves mail between servers (sending and receiving via SMTP).

To really understand it, we captured **network traces of SMTP and IMAP traffic** to watch the actual protocol exchanges as mail was sent and received. Seeing the traffic on the wire made the MUA/MDA/MTA flow concrete instead of abstract.

## Centralized Logging with rsyslog

We configured \`rsyslog\` to **forward log messages from one system to another**:

- Enabled the input module so the log server could receive messages.
- Started the TCP listener to accept incoming syslog messages on the logging port.
- Verified the receiving server actually captured messages coming in from remote systems.

This gave us a central place to watch logs from multiple machines — the foundation of monitoring multiple servers from one spot.

## Task Scheduling — cron, at, anacron

We worked with Linux's scheduling tools and compared them:

- **\`cron\`** — for recurring tasks (e.g., "run a backup every day at 2 AM") based on a schedule in a crontab.
- **\`at\`** — for one-off tasks at a specific time ("shut down after this backup finishes").
- **\`anacron\`** — like cron, but for systems that aren't always on; it **catches up on missed jobs** when the machine comes back, which cron doesn't.

Knowing *which* tool fits the situation — a recurring job, a single future job, or a job on a machine that sleeps — is the practical skill here.

---

**Key takeaway:** Service administration is about more than getting something to run once. It's about making it secure (TLS, certificates, least-privilege), observable (log forwarding, network traces), and reliable (scheduled jobs that fit the machine's behaviour).
`;
  DATA["showcase/system-administration/docs/sysadmin-II/01-infrastructure.md"] = `# Enterprise Infrastructure & Dual-Domain Setup

**What we did: planned and built the foundation for the whole semester — two parallel identity domains (one Windows, one Linux), a shared gateway, and a documentation wiki.**

---

## Planning the Environment

Before touching any machine, my classmates and I mapped out the whole topology: domain names, server roles, a static IP addressing scheme, hostnames, and which services would live where. We settled on two separate domains so Windows and Linux could each run their own identity stack without stepping on each other:

- **Windows domain** — Active Directory, DNS, and DHCP.
- **Linux domain** — FreeIPA, running with integrated DNS.

Everything else would grow from this base across the semester, so getting the naming scheme and subnet planning right up front made the later labs much smoother.

### The Devices

| Device | Role | Networking |
|--------|------|------------|
| Windows Server | Domain controller: Active Directory + DNS + DHCP | Static |
| RHEL server | FreeIPA identity management (with BIND/DNS) | Static |
| Wiki server | Team documentation | Static |
| pfSense | Gateway, firewall, DHCP relay | WAN via DHCP; LANs static |

### pfSense as the Gateway

pfSense sat between our virtual lab and the outside world. It had three interfaces: a WAN that pulled DHCP, and two LAN interfaces — one for each domain. Because we wanted clients to be centrally managed, we configured pfSense to **relay DHCP requests** from the Linux network to the Windows DHCP server rather than handing out addresses itself.

## Windows Domain Controller (Active Directory + DNS + DHCP)

On the Windows side we installed Active Directory Domain Services along with DNS and DHCP together. The key piece was DHCP: one Windows DHCP server served **both** networks by defining two scopes — one for the Windows subnet and one for the Linux subnet. Each scope also handed out the DNS server, default gateway, DNS suffix, and a public DNS server as a secondary so clients could still resolve external names.

- Promoted the server to a domain controller and joined Windows clients to the domain.
- Verified Windows clients authenticated through Active Directory successfully.
- Enabled the firewall on the server and clients, per our security baseline.

## Linux Identity Management (FreeIPA)

FreeIPA acts as the Linux-domain equivalent of Active Directory — it bundles **LDAP** for the directory, **Kerberos** for authentication, **DNS** (integrated BIND), certificate management, and user/group management into one server. We installed it with its integrated DNS enabled so the Linux domain had its own name resolution, independent of Windows.

- Created the Linux domain and enrolled Linux clients into it.
- Confirmed clients authenticated through FreeIPA.
- Kept SELinux enforcing and the firewall on, matching the security baseline for every Linux server.

## Team Wiki

Because every later lab depended on clear, up-to-date documentation, we stood up a wiki server in the environment and used it as the single source of truth. Each team member had their own account so the wiki tracked **who documented what** — which also provided useful evidence when it came time for group evaluations. We recorded network topology, hardware specs, system information, and user accounts for every device in the environment.

---

**Key takeaway:** A well-planned dual-domain foundation — with a clear IP scheme, separate Windows and Linux identity stacks, a shared DHCP model, and a wiki discipline from day one — is what made the rest of the semester's infrastructure labs possible.
`;
  DATA["showcase/system-administration/docs/sysadmin-II/02-monitoring-logging.md"] = `# Monitoring & Centralized Logging

**What we did: stood up Zabbix to monitor our environment and Graylog to centralize logs from Linux and Windows systems.**

---

Good administration starts with visibility. In this project my classmates and I added two pillars to the environment we built earlier: **monitoring** (knowing when something is unhealthy) and **centralized logging** (knowing *what happened*, and correlating events across machines).

## Zabbix Monitoring

We deployed Zabbix, which is split into a server component with a web frontend and a database backend, plus lightweight **agents** installed on the systems we wanted to watch.

### What We Monitored
- **CPU load** — with graphs to visualize how the load changed over time.
- **Memory and disk usage** on local servers.
- **Network traffic** on the pfSense WAN interface (inbound vs. outbound).
- **Service status** — we configured Zabbix to watch the DHCP and DNS services on the domain controller and send an alert if they went down. Catching a downed name-resolution or addressing service early was a genuinely practical win.

### SNMP for Devices Without Agents
Not every device can run a Zabbix agent. To monitor those, we enabled **SNMP** on a device and configured Zabbix to query it over SNMP instead — a reminder that real environments are a mix of "agent-friendly" and "agent-hostile" gear, and you need both paths.

## Graylog Centralized Logging

Centralized logging complements monitoring: it lets you correlate events across machines to find a root cause, and it tells you when a change was made and by whom. We deployed Graylog and configured collectors to pull logs in from several sources:

- **Local syslog** from the Graylog server itself.
- **Syslog from other Linux devices** in the environment.
- **Windows Event Viewer logs** from the Windows systems — so both operating systems' logs landed in one place.
- **HTTP / web-server logs** from the wiki server.

Rather than configuring each log source by hand, we used **Graylog Sidecar**, a collector that makes it much easier to deploy and manage log collection across many remote systems.

---

**Key takeaway:** Monitoring answers "is it broken?" while centralized logging answers "what happened and who did it?" Together they turn a pile of servers into an environment you can actually operate — the difference between a network outage of minutes versus hours.
`;
  DATA["showcase/system-administration/docs/sysadmin-II/03-cross-platform-integration.md"] = `# Windows & Linux Cross-Platform Integration

**What we did: made Windows and Linux trust each other — first by adding a Linux machine directly to the Windows domain, and then by building a two-way trust between the full Active Directory and FreeIPA domains.**

---

Enterprise environments rarely run one operating system. The hard question is how to let users from a Windows domain and a Linux domain authenticate to the *other* side. In this project my classmates and I solved it two ways; a simpler "direct" route and a more realistic "indirect" route.

## Direct Integration with SSSD

The quickest way to bring a Linux machine into a Windows environment is to join it to the Active Directory domain directly, using the **realmd** service plus **SSSD** (System Security Services Daemon).

- **realmd** handles the discovery and enrollment — it makes joining a domain as simple as pointing the client at the domain.
- **SSSD** is the piece that actually provides authentication. It talks to the central directory and caches user credentials and user data locally, so authentication keeps working reliably.

We configured a Linux client to get its network settings from the Windows DHCP server, set its fully qualified domain name, discovered the domain, joined it, and then verified login by checking the user's identity and requesting a **Kerberos ticket** from the Key Distribution Center. The client was now, for practical purposes, a member of the Windows domain.

## Indirect Integration: A Cross-Forest Trust

The bigger, more realistic challenge was tying the two *separate* domains together. Direct integration works when a Linux box lives inside the Windows domain; but our two domains were distinct, so we wanted a **two-way trust** between Active Directory and FreeIPA — the "cross-realm" model. With a trust in place, users from either domain can authenticate to resources in the other, and each domain keeps managing its own users.

### DNS Is the Foundation
A trust between AD and FreeIPA only works if the two domains can resolve each other's service records. We spent real time on this because getting it wrong silently breaks the whole thing:

- Added a DNS **forwarder** on the FreeIPA side so it could resolve the Windows domain.
- Added a **forward lookup zone** on the Active Directory side for the Linux domain.
- Verified that each side could resolve the **SRV records** the trust needs:
  - the **Kerberos** SRV record (over UDP), and
  - the **LDAP** SRV record (over TCP).
- Confirmed the Windows side could also resolve the **TXT** record that advertises the Linux realm.

### Creating the Trust
On the FreeIPA server we installed the Active Directory trust support and ran the trust setup utility, then used the identity-management trust command to create and verify the two-way trust with Active Directory.

### Proving It Worked
The proof came at login. We authenticated to the Linux domain using a **Windows domain administrator account**, and likewise checked that users could traverse the trust in both directions:

\`\`\`
Windows admin  →  SSH to a Linux server  →  authenticated through the trust
Linux user     →  log in to a Windows client  →  authenticated through the trust
\`\`\`

Seeing a user cross from one OS's identity domain into the other with a single credential is exactly what a real mixed enterprise needs.

---

**Key takeaway:** Cross-platform integration comes in two flavors — direct membership (SSSD joining a client to the domain) and indirect trust (joining two *domains* at the realm level). Both hinge on DNS being bulletproof, and the two-way trust is the model real heterogeneous enterprises rely on.
`;
  DATA["showcase/system-administration/docs/sysadmin-II/04-containerization.md"] = `# Containerization with Docker

**What we did: learned how containers work by running and managing Docker containers, building images, publishing to a shared repository, and — most importantly — locking them down with SELinux so a container can't reach the host.**

---

Containers aren't virtual machines, but the two share one idea: **abstraction**. In this project my classmates and I worked through how containers package an application with its libraries and binaries, so you can move and run it anywhere consistently.

## Running Containers
We installed Docker, pulled base images (Fedora, Ubuntu, busybox), and started containers in both **interactive** and **detached** modes — learning how a container is identified by an ID, how Docker can pull an image automatically when you run it, and how to list, stop, and remove containers.

## Building Images
Beyond using someone else's images, we built our own in two ways:

- **From a running container** — we started a container, installed a web server into it, then *committed* those changes into a new image, tagged it, and **pushed it to a private repository on Docker Hub** that our group shared. Finally we pulled it back down, proving the whole publish/reuse cycle.
- **From a Dockerfile** — we wrote a Dockerfile that declaratively defines how to build an image (which base image to start from, software to install, files to add, ports to expose, and the command to run). We used this to build an **Nginx web server** image serving our own simple page, ran it, and reached it through the browser. A Dockerfile makes image builds reproducible anywhere.

## Container Security with SELinux
The most valuable part was the security material. By default, a container running as a local user can be used to reach the host: we demonstrated this by mounting the host filesystem into a container and shutting the system down from inside it. The fix is **SELinux**.

- **Type enforcement** applies labels (\`svirt_lxc_net_t\` for container processes, \`svirt_sandbox_file_t\` for container files) so a container process can only touch its own files, not the host's.
- **Multi-category security (MCS)** goes further, giving each container a unique category label so containers are isolated from each other too.

We enabled SELinux support in the Docker daemon, ran a container as a dedicated non-root Docker user, and confirmed it could **no longer write to host directories** — the permission was denied. We also learned the general security hygiene: use official base images, run Docker as a dedicated non-root user, keep the host kernel patched, enforce SELinux, and collect logs for auditing.

---

**Key takeaway:** Containers are a powerful abstraction, but by default they don't sandbox a user. Combining a dedicated Docker user, official images, and SELinux type/multi-category enforcement is what keeps a container from becoming a doorway into the host.
`;
  DATA["showcase/system-administration/docs/sysadmin-II/05-kubernetes.md"] = `# Orchestration with Kubernetes

**What we did: built a multi-node Kubernetes cluster from scratch — a control node plus worker nodes — and got Pods talking across them over a cluster network.**

---

Running containers is one thing; running dozens of them across many machines, keeping them healthy, and scaling them is why **orchestration** exists. For this project my classmates and I built a real Kubernetes cluster on-premise using \`kubeadm\`.

## Cluster Design
We deployed multiple Linux virtual machines and split them into roles:

- **One control node** (with more CPU) that runs the Kubernetes control plane.
- **Worker nodes** — one per team member — that actually run the workloads.

Before the cluster would even initialize, we had to meet Kubernetes' strict host prerequisites: swap had to be **disabled** on every node (the installer refuses to work otherwise), and we installed the container runtime as well as the Kubernetes tooling on each one.

## Initializing the Cluster
On the control node we ran the initialization command, which produced a **join token** — the secret that lets worker nodes authenticate into the cluster. We saved it carefully, set up the control-node configuration for a normal (non-root) user, and confirmed the **control plane was running**. The workers were then joined to the cluster using that token.

## Networking the Pods
A fresh cluster has no pod networking, so nodes can't yet route traffic between Pods. Kubernetes uses the **CNI (Container Network Interface)**, which works with add-ons to implement networking between nodes. We installed the **Weave** network add-on, then verified the add-on's Pods were running and that the nodes flipped to a \`Ready\` status — the signal that Pods could finally communicate with each other across the cluster.

---

**Key takeaway:** Kubernetes turns a fleet of individual machines into one logical compute environment. The hard parts aren't just installing it — it's meeting host prerequisites (like disabling swap), managing the join token securely, and wiring up a CNI network so the Pods can actually talk to each other.
`;
  DATA["showcase/system-administration/docs/sysadmin-II/06-enterprise-mail.md"] = `# Enterprise Mail with Microsoft Exchange

**What we did: deployed Microsoft Exchange Server 2016 into our Windows domain so users had an organization-wide email service.**

---

Email at an enterprise scale is more than a mail transfer agent on a box — it's a full service with its own server roles, prerequisites, and management model. In this project my classmates and I deployed **Exchange Server 2016** into our Active Directory environment.

## Setup & Prerequisites
A key rule we followed from the start: **do not install Exchange on the domain controller itself.** Exchange touches the Active Directory schema, and running both roles on one box is a bad idea. We used a dedicated Windows Server VM for the mail server.

Exchange has a long list of prerequisites. We prepared the server by:

- Installing the required Windows Server **features and roles** the mail server depends on (web-server components, management tools, and more).
- Making sure the server was fully **patched** and had the required supporting runtimes installed.
- Joining the server to the domain with a static IP.
- Logging in with a **domain account that carried the right administrative memberships** so the installer had the privileges it needed to extend and configure the organization.

## Deploying the Server
With the prerequisites in place, we installed Exchange 2016, selecting the appropriate **server roles** for our setup. The installer configured the organization, and once it completed we had a running mail infrastructure in the domain that could be managed through the Exchange administration tools — from one central console rather than per-user configuration.

This connected directly to the rest of our environment: mail is just one more service that sits on the identity foundation (Active Directory) we built in the very first project.

---

**Key takeaway:** Enterprise email isn't a single process you install — it's a service with strict prerequisites and its own roles, and it must stay separate from the domain controller. Getting the prerequisites and permissions right is most of the battle.
`;
  DATA["showcase/system-administration/docs/sysadmin-II/07-pki-security.md"] = `# Public Key Infrastructure & SSL/TLS

**What I did: went through hands-on training that covered SSL/TLS key and certificate management, then designed and built a complete private certification authority (CA) with root and subordinate certificates.**

---

Securing a network isn't just "turn on HTTPS" — it means understanding how trust is actually established. This work covered two related areas: managing the **keys and certificates** that secure connections, and **building a private certification authority** that issues and vouches for those certificates inside an organization.

## Keys & Certificates
I worked through how individual TLS certificates are created and used:

- **Generating and protecting keys** — creating strong private keys (with appropriate key sizes), understanding why the private key must be kept secret, and using standard formats like PEM.
- **Certificate signing requests (CSRs)** — generating a request that carries the subject identity and public key, which a CA then signs.
- **Certificate contents** — reading the fields inside a certificate, including the **Key Usage** and **Extended Key Usage** extensions that control what a certificate is allowed to do (e.g., TLS client vs. server), and the **Subject/Authority Key Identifier** extensions that chain a certificate back to its issuer.
- **Converting keys and certificates** between common formats so they work in different servers and tools.

## Building a Private Certification Authority
The centerpiece was standing up a *private* CA — the thing most external software assumes comes from a public vendor, but that an organization can host internally for its own systems.

### Root CA
I created a **root CA**, starting from a configuration that defines the CA's own identity and policies, a directory structure to organize certificates, and generation of the CA's key and self-signed certificate. The root is the trust anchor for everything below it.

### Subordinate CA
Rather than issuing certificates directly from the root (which is poor practice and puts the root at risk if compromised), I created a **subordinate (intermediate) CA** whose certificate is signed by the root. This subordinate CA then does the day-to-day issuing. The subordinate was configured with restricted usage so it could only issue TLS client/server certificates for a limited set of names — a "constrained" intermediate.

### Certificate Chains & Revocation
Putting it together, a server certificate issued by the subordinate chains up through the intermediate to the root, and a client validates that **certificate chain**. I also worked with how a CA revokes certificates that should no longer be trusted, and understood the role of **CRLs (certificate revocation lists)** and **OCSP** in checking a certificate's current status at validation time.

This is the same PKI machinery that real enterprises use internally to issue certificates for their web, mail, and internal services — without paying a public CA for every single one.

---

**Key takeaway:** TLS only means as much as the chain of trust behind it. Building a two-tier private CA (root + constrained subordinate) with certificate chains and revocation is how an organization issues trusted internal certificates safely and at scale, while keeping the root key protected.
`;
  DATA["showcase/system-administration/multi-distro-install-lab.md"] = `# Multi-Distro Linux & Unix Installation Lab

**Hands-on installer walkthroughs for nine desktop operating systems — installed from scratch, side by side, and compared on package management, install experience, and lineage.**

---

## Overview

For this lab I downloaded the official ISO for each of nine Unix-like operating systems and installed them from scratch in a virtual-machine lab. I captured the installer screens as I went, then wrote up each run end-to-end so the whole process is easy to follow without redoing the install.

The goal was practical, not just screenshots: to see how different distributions approach the same task — turning a bare ISO into a working desktop — and to compare what that says about each project's philosophy and target audience.

## Distros Installed

| # | Distro | Base | Package Manager | Install UX | Doc |
|---|---|---|---|---|---|
| 1 | Linux Mint 19.2 "Tina" | Ubuntu/Debian | \`apt\` | Live-first | [doc](docs/linux-install-lab/01-linux-mint.md) |
| 2 | Debian 10 "Buster" | Debian | \`apt\` | Install-first | [doc](docs/linux-install-lab/02-debian.md) |
| 3 | CentOS 8 | RHEL | \`yum\` | Install-first | [doc](docs/linux-install-lab/03-centos.md) |
| 4 | Fedora Workstation 31 | Fedora | \`dnf\`/\`yum\` | Live or install | [doc](docs/linux-install-lab/04-fedora.md) |
| 5 | Red Hat Enterprise Linux 8 | RHEL | \`yum\` | Install-first | [doc](docs/linux-install-lab/05-rhel8.md) |
| 6 | FreeBSD 12.1 (+ GNOME) | BSD | \`pkg\` | Install-first, no GUI | [doc](docs/linux-install-lab/06-freebsd.md) |
| 7 | Puppy Linux (BionicPup64) | Ubuntu Bionic | \`pet\` | Live-first | [doc](docs/linux-install-lab/07-puppy.md) |
| 8 | Zorin OS 15 Education | Ubuntu | \`apt\` | Live or install | [doc](docs/linux-install-lab/08-zorin.md) |
| 9 | Parrot OS | Debian | \`apt\` | Install-first | [doc](docs/linux-install-lab/09-parrot.md) |

Each doc walks the installer through from boot to first login, with the actual installer screens embedded in the runs where screenshots were captured.


Every distro has a written walkthrough. Most also have install-session screenshots; the \`mint/\` and \`parrot/\` runs are text-only for the reasons noted in their documents.

## What I Learned

- **Installer experience splits along "live-first" vs. "install-first" lines, not distro family.** Mint, Puppy, Fedora, and Zorin boot into a working desktop you can poke around before committing to disk. Debian, CentOS, RHEL, and FreeBSD drop you straight into the installer.

- **Package manager choice tracks lineage exactly.** Every Debian/Ubuntu descendant here (Mint, Debian, Zorin, Parrot) uses \`apt\`; every RHEL descendant (CentOS, Fedora, RHEL) uses \`yum\`/\`dnf\`. The two true outliers — FreeBSD's \`pkg\` and Puppy's \`pet\` — are also the two distros that belong to neither mainstream Linux lineage.

- **FreeBSD is a great server OS but a reluctant desktop.** The base install (\`bsdinstall\`) is clean and fast, but it ships no desktop environment. Getting to a graphical login meant a whole second phase — \`pkg install gnome\`, then hand-editing \`/etc/rc.conf\` and \`/etc/fstab\` before GDM would start. Every Linux distro here reached a desktop with zero manual config-file editing.

- **Small distros move fast.** Puppy's 354 MB ISO is a live-first system aimed at old hardware, and it installed quickly — the only rough edge was its GParted partitioning step, which took a second attempt after an initial error.

## Tooling

VirtualBox / VM-based installs, official ISOs pulled from each project's distribution site, and each installer's default guided flow. All screenshots are original captures from my own install sessions.
`;
  DATA["showcase/system-administration/system-admin-I.md"] = `# Systems Administration I — Showcase

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
- **Day-to-day verification** — used PowerShell (\`Get-ADDomain\`, user/OU creation, command history) to confirm and document the environment as configured.

### Linux Foundations & Automation
We worked directly on Linux systems covering user management, secure remote access, and administrative scripting:

- **User files & authentication** — worked with \`/etc/passwd\`, \`/etc/shadow\`, and \`/etc/group\`, and the \`/etc/skel\` skeleton that seeds new user home directories.
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
- **LVM** — used Logical Volume Management for more flexible storage, including resizing volumes on the fly, and worked with \`/etc/fstab\` (and \`_netdev\`) so file systems mount automatically at boot.
- **Comparing platforms** — compared Windows basic/dynamic disk storage with Linux storage concepts.

### Network Services
We set up and tested a range of Linux network services for file sharing and data transfer:

- **FTP** — configured an FTP server and tested both authenticated and anonymous access, including verifying transfers via the transfer log.
- **rsync** — used \`rsync\` for archive-mode file synchronization, preserving permissions, ownership, and timestamps.
- **Samba** — configured Samba so Linux shares were accessible from Windows clients, and verified remote read/write access.
- **NFS** — configured NFS exports and client mounts, and understood mount options like \`rw\`, \`sync\`, and \`no_root_squash\` — including the security implications of that last one.
- **DNS lookups** — validated both forward and reverse lookup zones.

### Web, Email & Monitoring Services
We stood up and secured services, and set up logging:

- **Apache web server** — configured the document root, set up virtual hosts, and secured sites with SSL/TLS.
- **Certificates & keys** — worked with encryption keys and certificates, including setting up a self-signed certificate and understanding how it differs operationally from a certificate issued by a certification authority.
- **Email** — configured a mail server and understood the roles of the mail user agent (MUA), mail delivery agent (MDA), and mail transfer agent (MTA), verifying delivery with network traces.
- **Centralized logging** — configured \`rsyslog\` to forward log messages between systems.
- **Task scheduling** — compared and used \`cron\`, \`at\`, and \`anacron\` for scheduling recurring and one-off tasks.

---

## What We Learned The Hard Way

- **Back up your configs before changing them.** We learned to keep a copy of configuration files (like \`httpd.conf\`) so we could restore them if a change went wrong.
- **Read the error messages and check the logs.** The troubleshooting scripts and log-forwarding setup made us pay attention to what the system is actually telling you.
- **Understand the security trade-offs.** Options like \`no_root_squash\` and plain-text protocols are convenient but have real risks — knowing when *not* to use them matters.
- **Test from the client's perspective.** Verifying that a Windows client could reach a Samba share, or that a Linux client resolved a domain, caught issues that server-side checks missed.

---

*This showcase describes the work we performed as a team and the concepts we applied. It intentionally omits course identifiers, exact assignment solutions, and source code so that it stays a portfolio of our own learning rather than a set of answers.*
`;
  DATA["showcase/system-administration/system-admin-II.md"] = `# Systems Administration II — Showcase

**A write-up of the enterprise infrastructure work we completed together as a team — dual-domain identity, monitoring, cross-platform trust, containers, orchestration, enterprise mail, and PKI.**

---

## What This Is

This is my personal record of the Systems Administration II work I completed with classmates as a team. Building on what we learned in the first course, this one went deeper into **enterprise infrastructure**: running two parallel identity domains (Windows Active Directory and Linux FreeIPA) side by side, making them trust each other, monitoring and logging the whole environment, and then layering on modern tooling — containers, orchestration, enterprise mail, and public key infrastructure.

It's written as a reflection of our work, so the focus is on what we built, what we troubleshot, and what I learned along the way. It intentionally omits course identifiers and source code so it stays a portfolio of our own learning rather than a set of answers.

## What We Built

### 01 · Enterprise Infrastructure & Dual-Domain Setup
We planned and deployed the foundation: a Windows domain controller (Active Directory + DNS + DHCP), a Linux FreeIPA server with integrated DNS, and a pfSense gateway that relayed DHCP across both networks. A shared wiki kept the whole team's documentation in one place.

- Two distinct **identity domains** — Active Directory and FreeIPA — so Windows and Linux each had their own stack.
- **Windows Server**: ADDS with DNS and DHCP, with DHCP scopes serving both the Windows and Linux networks.
- **FreeIPA**: LDAP + Kerberos + integrated BIND DNS for the Linux domain.
- **pfSense**: gateway with a WAN and two statically-assigned LAN interfaces, acting as the DHCP relay.
- **Team wiki**: per-user accounts so the documentation tracked who documented what.

### 02 · Monitoring & Centralized Logging
We made the environment observable with **Zabbix** and **Graylog**.

- **Zabbix**: monitored CPU load (with graphs), memory, disk, pfSense network traffic over SNMP, and the DHCP/DNS service status with alerting.
- **SNMP**: used for devices that couldn't run a Zabbix agent.
- **Graylog**: centralized **syslog from Linux**, **Event Viewer logs from Windows**, and **HTTP logs** from the wiki — collected with Graylog Sidecar so remote machines were easy to manage.

### 03 · Windows & Linux Cross-Platform Integration
We made the two domains trust each other, both directly and at the realm level.

- **Direct integration** with **SSSD/realmd**: joined a Linux client to the Windows Active Directory domain and verified Kerberos authentication.
- **Indirect integration**: a **two-way cross-forest trust** between Active Directory and FreeIPA, including all the DNS forwarders and SRV record verification (Kerberos/UDP, LDAP/TCP, realm TXT) the trust depends on.
- Proved it by authenticating a Windows admin account into the Linux domain (and Linux users into Windows) through the trust.

### 04 · Containerization with Docker
We learned how containers work and how to keep them safe.

- Pulled and ran containers (**Fedora, Ubuntu, busybox**) in interactive and detached modes.
- Built custom images by **committing a running, modified container** into a new image, and **published to a private Docker Hub repository** we shared.
- Wrote a **Dockerfile** to reproducibly build an **Nginx** web-server image serving our own page.
- Hardened Docker with **SELinux** (type enforcement + multi-category security) and demonstrated that a container user could no longer write to host files.

### 05 · Orchestration with Kubernetes
We built a multi-node Kubernetes cluster from scratch with **kubeadm**.

- Designed a **control node** plus **worker nodes**, meeting Kubernetes' host prerequisites (swap disabled, container runtime and tooling installed).
- Initialized the cluster, secured the **join token**, and joined the workers.
- Installed the **Weave** CNI network add-on so Pods could communicate, and verified the nodes reached \`Ready\` status.

### 06 · Enterprise Mail with Microsoft Exchange
We deployed **Exchange Server 2016** into our domain on a dedicated server (never on the domain controller).

- Installed the required Windows server features and kept the box patched and domain-joined.
- Used a domain account with the right administrative memberships.
- Installed the mail server roles, giving the organization centrally-managed email on top of our Active Directory foundation.

### 07 · Public Key Infrastructure & SSL/TLS
I completed hands-on PKI training and built a complete private certification authority.

- Managed **keys and certificates**: generation, certificate signing requests, key/reference formats, and the Key Usage / Extended Key Usage extensions.
- Built a **two-tier private CA**: a **root CA** and a constrained **subordinate (intermediate) CA**, with certificate chains and certificate **revocation** (CRLs/OCSP).

---

## Tools I Used

- **Windows Server** — Active Directory, DNS, DHCP, Exchange
- **Red Hat Enterprise Linux / CentOS** — FreeIPA, Zabbix, Graylog, Docker, Kubernetes
- **pfSense** — gateway, firewall, DHCP relay, SNMP
- **Zabbix** — monitoring and alerting
- **Graylog** — centralized logging
- **Docker** — container building and management
- **Kubernetes (kubeadm)** — cluster orchestration
- **OpenSSL** — keys, certificates, private CA
- **SSSD / realm / realmd** — cross-platform authentication
- **BIND / DNS** — integrated and forwarded name resolution
- **Wiki (DokuWiki/Tiki)** — team documentation

---

## Key Skills Summary

| Skill Area | Key Capabilities |
|------------|------------------|
| **Active Directory** | Domain controllers, DNS, DHCP scopes, group membership |
| **FreeIPA** | Linux identity, integrated DNS, LDAP/Kerberos |
| **Cross-Platform** | SSSD direct join, two-way cross-forest trust |
| **Monitoring & Logging** | Zabbix, SNMP, Graylog, Windows + Linux log correlation |
| **Containers** | Docker images, Dockerfiles, private registry, SELinux hardening |
| **Orchestration** | kubeadm cluster, control/worker nodes, CNI networking |
| **Enterprise Mail** | Exchange 2016 deployment, prerequisites, server roles |
| **Security & PKI** | Keys/certificates, private CA, certificate chains, revocation |
`;
  DATA["showcase/task-automation/README.md"] = `# Task Automation — Showcase

**A write-up of my scripting work — turning repetitive administrative tasks into Linux command one-liners, Bash scripts, and Python programs.**

---

## What This Is

This is my personal record of the automation work I completed with **interpretive scripting languages** — command-line tools, Bash, and Python. It's the practical, hands-on side of automation: writing programs that do the tedious, repeatable system-administration work faster and with fewer mistakes than a human typing by hand.

The scripts shown here are **my own cleaned-up, demonstration versions** of the work I did — I've refactored and corrected them so they read as clear, self-contained examples of the technique, rather than as a copy of any graded submission. The focus is on what they demonstrate, not on handing out ready-made answers.

## What I Can Do

### Text Processing & One-Liners
- Compose single, powerful shell pipelines using standard tools (\`find\`, \`grep\`, \`awk\`, \`cut\`, \`sort\`).
- Inspect the filesystem, filter data, and redirect output — turning raw files into answers.

### Bash Scripting
- Write structured scripts with **functions**, **command-line arguments**, **loops**, and **file I/O**.
- Automate real business logic (like provisioning a new employee's account) reliably.

### Python Programming
- Process real datasets (CSV, text files) with clean, function-based code.
- Compute statistics, detect tampered files with hashing, plot performance metrics, and automate the user lifecycle.
- Work from the command line with proper argument handling and error checking.

---

## Projects

- **01 · Linux Command-Line & Data Parsing** — one-liners to inspect the system and parse tabular data.
- **02 · Bash Scripting** — random-number generation & automated new-employee provisioning (with scripts).
- **03 · Python Data Processing** — statistics on a real dataset & hashing-based breach detection (with scripts).
- **04 · System Monitoring & Visualization** — turning CSV metrics into graphs (with script).
- **05 · User Lifecycle Automation** — bulk user create and cleanup (with scripts).

---

## Tools I Used

- **Linux shell & text tools** — \`find\`, \`grep\`, \`awk\`, \`cut\`, \`sort\`, pipelines, redirection
- **Bash** — functions, arguments, loops, file handling
- **Python** — data processing, CSV, hashing, subprocess, matplotlib

---

## Key Skills Summary

| Skill Area | Key Capabilities |
|------------|------------------|
| **Shell & Bash** | Composing one-liners, functions, argument handling, automation scripts |
| **Python** | Data processing, CSV parsing, statistics, hashing, plotting, subprocess |
| **File Handling** | Reading/writing files, redirecting output, parsing structured data |
| **Systems Management** | Automating account provisioning, monitoring, and cleanup |
`;
  DATA["showcase/task-automation/docs/01-linux-command-line.md"] = `# Linux Command-Line & Data Parsing

**What I did: sharpened my ability to compose single, powerful shell commands that inspect the system and transform real tabular data.**

---

The humble command line is where a huge amount of automation begins. Rather than clicking through a GUI, a system administrator composes a single command that does the whole job at once. This work had me solving problems with one-liners built from standard Unix text tools and filters.

## Inspecting the Filesystem with One-Liners
I wrote single commands to find specific categories of files — for example, listing all files in a core system directory (like \`/usr/bin\`) that matched certain naming patterns (\`ip*\`, \`net*\`, or ending in \`grep\`). I also worked with **permissions and access**:

- Listing all subdirectories that a standard (non-root) user **cannot access** — that is, directories where the user is denied permission.
- Redirecting command output to a log file so results were saved for later review.
- Using \`cut\` to clean up command output, keeping only the useful fields and stripping away formatting characters like colons.

## Parsing Real Data
The more interesting material involved turning raw data into answers. Working with the classic **TeddyBallgame** baseball statistics CSV, I used pipelines of text tools to:

- Strip the header line and replace the CSV delimiters with spaces for a cleaner layout.
- **Filter** the data to the seasons where the player had 100 or more runs batted in.
- **Sort and project** the seasons by home runs (most to least), keeping only the relevant columns (year, home runs, RBIs, batting average) — and re-sorting by RBIs as a follow-up.
- Combine **search + redirection** to save the list of configuration files containing an internal IP pattern to a file, properly discarding any error output.

---

**Key takeaway:** A single well-built shell pipeline can replace a whole series of manual steps. Mastering the standard text tools — \`find\`, \`grep\`, \`awk\`, \`cut\`, \`sort\`, and redirection — is the foundation of every larger automation script that came next.
`;
  DATA["showcase/task-automation/docs/02-bash-scripting.md"] = `# Bash Scripting

**What I did: wrote structured Bash scripts with functions, command-line arguments, and file I/O to automate two very different admin tasks.**

Below are my own cleaned-up, demonstration versions of the two scripts I wrote. They're refactored for clarity and correctness — shown here to illustrate the technique, not to mirror any single graded submission.

## 1. Random Number Generator

The first script generates a requested batch of random numbers (optionally within a \`min\`–\`max\` range), writes each to a file, and reports the smallest, largest, and true average of the batch.

\`\`\`bash
#!/bin/bash

# Generate num_rands random numbers, optionally within [min, max].
# Usage: ./rand_gen.sh <num_rands> [min] [max]

num_rands=$1
min=\${2:-1}      # default to 1 if no range given
max=\${3:-32767}  # default to the generator's natural max

num_writer () {
    echo "$1" >> "rands_\${num_rands}.txt"
}

# collect the numbers
i=0
while (( i < num_rands )); do
    num_writer $(( RANDOM % (max - min + 1) + min ))
    ((i++))
done

# summarize the batch by sorting the output file
sort -n "rands_\${num_rands}.txt" > .sorted.txt
smallest=$(head -n 1 .sorted.txt)
largest=$(tail -n 1 .sorted.txt)

# true average: sum the file, divide by the count
total=$(awk '{ s += $1 } END { print s }' "rands_\${num_rands}.txt")
average=$(awk -v t="$total" -v n="$num_rands" 'BEGIN { printf "%.2f", t / n }')

echo "You requested $num_rands numbers [between $min and $max]"
echo "The smallest value generated was $smallest"
echo "The largest value generated was $largest"
echo "The average value generated was $average"

rm -f .sorted.txt
\`\`\`

This script demonstrates **command-line arguments**, **a reusable function** (\`num_writer\`), **a loop** to control generation, **redirection** to write each number to a file, and using standard tools (\`sort\`, \`awk\`) to compute summary statistics.

## 2. HR New-Employee Provisioning

The second script automates the whole job of giving a new employee an account. Running with administrator privileges, it prompts for details and builds out the account, home directory, and a personalized welcome letter with the right ownership and permissions.

\`\`\`bash
#!/bin/bash

# Automatically provision a new employee's Linux account.
# Requires sudo. Loops to add multiple users.

letter_writer () {
    cat > "/home/$username/welcome.txt" <<EOF
Dear $first_name,

Welcome to the company! We're happy to have you in the $dept Department as a $job_title.
Please don't forget to submit your paperwork on time.

Sincerely,
Your HR Team
EOF
    chown "$username:$username" "/home/$username/welcome.txt"
    chmod 444 "/home/$username/welcome.txt"      # read-only letter
}

file_system_writer () {
    mkdir -p "/home/$username"/{Desktop,Documents,Downloads,Pictures}
    cp company_logo.png "/home/$username/Pictures/"
    chown -R "$username:$username" "/home/$username"
}

while true; do
    read -p "Username: " username
    read -p "Full Name: " name
    read -p "Department: " dept
    read -p "Job Title: " job_title

    useradd "$username"                 # create the account
    first_name=$(echo "$name" | awk '{ print $1 }')

    file_system_writer
    letter_writer

    echo "User $username added!"
    read -p "Add another user? (y/n): " response
    [[ "$response" == "n" ]] && break
done
\`\`\`

This demonstrates the three core concerns of good provisioning automation: a **function per responsibility** (\`file_system_writer\`, \`letter_writer\`), **heredoc** file generation for the welcome letter, and careful **ownership + permission** handling so the new user owns their files and the letter is write-protected.

---

**Key takeaway:** Bash is more than glue between commands. With functions, arguments, loops, heredocs, and file handling it can implement real business logic — like provisioning an employee — reliably and repeatably, without clicking through a GUI.
`;
  DATA["showcase/task-automation/docs/03-python-data-processing.md"] = `# Python Data Processing

**What I did: wrote Python programs that process real datasets from the command line — computing statistics, and hunting for signs of tampering in system files.**

Below are my own cleaned-up, demonstration versions of the two programs I wrote, refactored for clarity.

## 1. Statistics on a Real Dataset

This program processes a tabular dataset — the classic Iris flower dataset, where each record has four numeric measurements and a flower type — and prints a clean statistical report.

\`\`\`python
#!/usr/bin/python3
import sys


def read_data(file_name):
    """Return a list of records (rows) parsed from a CSV-style file."""
    records = []
    with open(file_name) as f:
        for line in f:
            line = line.strip()
            if line and line[0].isdigit():     # skip any non-data header lines
                records.append(line.split(","))
    return records


def process_numeric_field(records, field_num):
    """Return (min, max, average) for one 1-based numeric column."""
    values = [float(r[field_num - 1]) for r in records]
    return min(values), max(values), sum(values) / len(values)


def count_labels(records, label_col):
    """Count how many times each distinct label appears."""
    counts = {}
    for r in records:
        key = r[label_col]
        counts[key] = counts.get(key, 0) + 1
    return counts


def main():
    if len(sys.argv) != 2:
        print("Usage: iris_stats.py <datafile>")
        return

    data = read_data(sys.argv[1])
    field_names = ["Sepal Length", "Sepal Width", "Petal Length", "Petal Width"]

    for i, name in enumerate(field_names, start=1):
        lo, hi, avg = process_numeric_field(data, i)
        print(f"{name:<13}: min = {lo:>5}, max = {hi:>5}, average = {avg:.2f}")

    print("Labels:", count_labels(data, 4))


if __name__ == "__main__":
    main()
\`\`\`

This demonstrates **reading raw data**, **breaking work into small single-purpose functions**, computing **min/max/average**, and reporting results in a readable format.

## 2. Integrity Checking for a Breach

After a suspected compromise, the worry is that system executables were swapped for malicious versions. This program compares **message digests** (hashes) recorded before the incident against the current ones, and flags anything that changed.

\`\`\`python
#!/usr/bin/python3
import sys


def load_hashes(file_name):
    """Return {name: digest} from a "<digest> <name>" file."""
    result = {}
    with open(file_name) as f:
        for line in f:
            parts = line.strip().split()
            if len(parts) >= 2:
                digest, name = parts[0], parts[1:]
                result[" ".join(name)] = digest
    return result


def main():
    if len(sys.argv) != 3:
        print("Usage: check_integrity.py <known_good_hashes> <current_hashes>")
        return

    known = load_hashes(sys.argv[1])
    current = load_hashes(sys.argv[2])

    print("Files whose hash changed (possibly compromised):")
    found = False
    for name, digest in current.items():
        if known.get(name) != digest:
            print(f"  {name:<30} known={known.get(name)}  current={digest}")
            found = True
    if not found:
        print("  (none — all hashes match)")


if __name__ == "__main__":
    main()
\`\`\`

Because a digest is unique to a file's exact contents, any mismatch flags a real problem. This is a practical, scripted way to quickly **scope the damage after an incident**, comparing a known-good baseline against the current state of the filesystem.

---

**Key takeaway:** Python turns messy real-world data into answers — whether that's summarizing a dataset or catching files that have been tampered with. Small, focused functions keep the logic readable and reusable.
`;
  DATA["showcase/task-automation/docs/04-system-monitoring.md"] = `# System Monitoring & Visualization

**What I did: wrote a Python program that turns captured performance metrics into easy-to-read graphs.**

Raw numbers in a CSV can be hard to act on. Below is my cleaned-up, demonstration version of the program I wrote — it reads metrics captured from processes and from the host system, then plots them as graphs (using matplotlib).

\`\`\`python
#!/usr/bin/python3
import csv
import matplotlib.pyplot as plt


def read_csv(filename, keys):
    """Read a numeric CSV (with header) into {key: [values...]}."""
    data = {k: [] for k in keys}
    with open(filename) as f:
        reader = csv.reader(f)
        next(reader, None)               # skip header
        for row in reader:
            for key, cell in zip(keys, row):
                data[key].append(float(cell))
    return data


def plot_series(data, time_key, metric_keys, title, ylabel, output):
    plt.figure(figsize=(9, 6))
    for key in metric_keys:
        plt.plot(data[time_key], data[key], label=key)
    plt.title(title)
    plt.xlabel("Time (seconds)")
    plt.ylabel(ylabel)
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig(output)
    plt.show()


def main():
    # process-level metrics: one CSV per process, columns: time, CPU, memory
    process_files = {f"APM{i}": f"APM{i}_metrics.csv" for i in range(1, 7)}
    process_data = {name: read_csv(f, ["Time", "CPU", "Memory"])
                    for name, f in process_files.items()}

    # overlay all processes on one CPU graph and one memory graph
    for metric, title, out in [("CPU", "CPU Utilization Over Time", "cpu.png"),
                               ("Memory", "Memory Utilization Over Time", "memory.png")]:
        plt.figure(figsize=(9, 6))
        for name, d in process_data.items():
            plt.plot(d["Time"], d[metric], label=name)
        plt.title(title)
        plt.xlabel("Time (seconds)")
        plt.ylabel(f"{metric} (%)")
        plt.legend()
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        plt.savefig(out)
        plt.show()

    # system-level metrics: columns: time, RX, TX, disk_writes, disk_capacity
    sys = read_csv("system_metrics.csv", ["Time", "RX", "TX", "Writes", "Capacity"])
    plot_series(sys, "Time", ["RX", "TX"], "Network Bandwidth", "MB/s", "bandwidth.png")
    plot_series(sys, "Time", ["Writes", "Capacity"], "Disk Utilization", "%", "disk_util.png")


if __name__ == "__main__":
    main()
\`\`\`

What this demonstrates:

- **Reading structured CSV data**, skipping headers and keeping multiple time series organized in dictionaries.
- **Overlaying multiple processes** on a single CPU or memory graph so you can compare them side by side.
- **Plotting system-level trends** — inbound/outbound network bandwidth and disk behavior over time — turning a wall of numbers into graphs anyone on the team can interpret at a glance.

---

**Key takeaway:** Monitoring data is only useful if you can read it. Automating the conversion of CSV metrics into graphs is the same idea behind the dashboards used in production monitoring systems.
`;
  DATA["showcase/task-automation/docs/05-user-lifecycle-automation.md"] = `# User Lifecycle Automation

**What I did: automated creating and removing user accounts in bulk — the kind of task that's far too tedious and error-prone to do by hand.**

Below are my own cleaned-up, demonstration versions of the two programs I wrote, covering both halves of the user lifecycle.

## Bulk User Creation

This program reads employee records from a CSV (name, department, group, etc.) and creates a Linux account for each, with a consistent username, home directory, group membership, and correct permissions.

\`\`\`python
#!/usr/bin/python3
import csv
import subprocess


def read_csv(filename):
    with open(filename) as f:
        return list(csv.DictReader(f))


def make_username(first, last):
    """Build a consistent username like 'jdohn' from first + last name."""
    if not first or not last:
        return None
    clean = "".join(ch for ch in last if ch.isalnum())
    return f"{first[0].lower()}{clean.lower()}"


def run(cmd):
    subprocess.run(["sudo", *cmd], check=True)


def provision(employee):
    first, last = employee["FirstName"], employee["LastName"]
    dept, group = employee["Department"], employee["Group"]
    username = make_username(first, last)

    if not username:
        print(f"  skipping {employee['EmployeeID']}: insufficient name data")
        return

    run(["groupadd", group])
    run(["useradd", "-g", group, "-d", f"/home/{dept}/{username}", username])
    run(["mkdir", "-p", f"/home/{dept}/{username}"])
    run(["chown", "-R", f"{username}:{group}", f"/home/{dept}/{username}"])
    print(f"  created {username} -> /home/{dept}/{username}")


def main():
    for emp in read_csv("employees.csv"):
        provision(emp)


if __name__ == "__main__":
    main()
\`\`\`

One CSV can seed a whole department's worth of accounts in a single run — applying the same logic to every record consistently.

## Bulk Cleanup

The companion program does the reverse: it **removes user accounts, their groups, and leftover home directories**, by scanning the account databases for regular users (identified by UID range) and cleaning them all up.

\`\`\`python
#!/usr/bin/python3
import os
import subprocess


def regular_users():
    """Yield usernames whose UID falls in the regular-user range."""
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.split(":")
            uid = int(parts[2])
            if 1000 <= uid < 2000:          # regular, non-system users
                yield parts[0]


def main():
    for user in regular_users():
        print(f"removing {user}")
        subprocess.run(["userdel", "-r", "-f", user])

    with open("/etc/group") as f:
        for line in f:
            parts = line.split(":")
            gid = int(parts[2])
            if 1000 <= gid < 2000:
                subprocess.run(["groupdel", "-f", parts[0]])

    # reset any leftover user directories back to a clean baseline
    for entry in os.listdir("/home"):
        p = f"/home/{entry}"
        if os.path.isdir(p):
            print(f"removing leftover dir {p}")
            os.system(f"rm -rf {p}")


if __name__ == "__main__":
    main()
\`\`\`

This makes it trivial to **reset a lab environment back to a clean baseline** — exactly what you need when the same test machines get reused.

---

**Key takeaway:** The user lifecycle — create, manage, and remove — is a perfect candidate for automation because it's repetitive, identical across many records, and unforgiving of manual mistakes. Scripting both directions turns a chore into a single command.
`;
  return DATA;
})();
