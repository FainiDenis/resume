# Client-Server Networks Lab — Windows Server 2012 R2 Administration

A semester of hands-on Windows Server administration: standing up a domain controller from a bare VM, then building out Active Directory, Group Policy, DNS, DHCP, file/print services, TCP/IP addressing, a Linux comparison lab, and remote-access tooling on top of it.

Originally written up as coursework for NACT-161 (Client/Server Networks); rebuilt here as a reference walkthrough for anyone setting up the same kind of Windows Server lab environment.

## What's in here

| Week | Topic | Docs |
|---|---|---|
| — | Client-server fundamentals (homework) | [docs/00-day1-homework.md](docs/00-day1-homework.md) |
| — | IPv4 addressing & subnetting (extra credit) | [docs/00-addressing-extra-credit.md](docs/00-addressing-extra-credit.md) |
| 02 | Introducing Windows Server 2012 R2 | [docs/week02-introducing-server-2012r2.md](docs/week02-introducing-server-2012r2.md) |
| 03 | Installing Windows Server 2012 R2 | [docs/week03-installing-server-2012r2.md](docs/week03-installing-server-2012r2.md) |
| 04 | File & printer services (NTFS, shares, printing) | [docs/week04-file-and-printer-services.md](docs/week04-file-and-printer-services.md) |
| 05 | Introducing Active Directory (AD DS, DNS, Group Policy basics) | [docs/week05-active-directory-intro.md](docs/week05-active-directory-intro.md) |
| 06 | Managing OUs and AD accounts (Ch. 7) | [docs/week06-ch7-ous-and-ad-accounts.md](docs/week06-ch7-ous-and-ad-accounts.md) |
| 07 | Configuring Group Policy (Ch. 8) | [docs/week07-ch8-group-policies.md](docs/week07-ch8-group-policies.md) |
| 09 | Configuring TCP/IP (binary, CIDR, `arp`/`tracert`, IPv6) | [docs/week09-ch9-tcpip.md](docs/week09-ch9-tcpip.md) |
| 10 | Configuring DNS | [docs/week10-dns.md](docs/week10-dns.md) |
| 11 | Configuring DHCP | [docs/week11-dhcp.md](docs/week11-dhcp.md) |
| 12 | Introduction to Linux (Ubuntu Desktop + Server) | [docs/week12-linux-intro.md](docs/week12-linux-intro.md) |
| 14 | Remote access — VPN, LogMeIn, TeamViewer | [docs/week14-vpn-remote-access.md](docs/week14-vpn-remote-access.md) |

Each lab doc keeps the original objectives and Q&A, cleaned up and reformatted, with the actual screenshots taken during the work embedded inline. Two labs (Week 06 and Week 10/11) were mostly instructor-checkpoint screenshots with limited written Q&A in the source material, so those docs are presented as a checkpoint table rather than a full narrative.

> **Scope note:** weeks 1, 8, and 13 weren't part of the uploaded materials, and are left out rather than filled in with guesses.

## Repo structure

```
.
├── README.md
├── docs/
│   ├── 00-day1-homework.md
│   ├── 00-addressing-extra-credit.md
│   ├── week02-introducing-server-2012r2.md
│   ├── week03-installing-server-2012r2.md
│   ├── week04-file-and-printer-services.md
│   ├── week05-active-directory-intro.md
│   ├── week06-ch7-ous-and-ad-accounts.md
│   ├── week07-ch8-group-policies.md
│   ├── week09-ch9-tcpip.md
│   ├── week10-dns.md
│   ├── week11-dhcp.md
│   ├── week12-linux-intro.md
│   └── week14-vpn-remote-access.md
└── screenshots/
    ├── week02/ … week14/
```

## Environment

All server-side labs ran as VMware Workstation VMs (`410Server1`, `410Server2`) on a shared external SSD, built up incrementally over the semester:

1. **Week 3** — fresh Windows Server 2012 R2 Datacenter install, static IP, hostname, workgroup.
2. **Week 5** — promoted to a domain controller (AD DS + DNS roles).
3. **Weeks 6–7** — OU structure, bulk user accounts, and Group Policy layered on top of the domain.
4. **Weeks 9–11** — TCP/IP addressing theory, then DNS and DHCP server roles.
5. **Week 12** — a second, independent VM pair (Ubuntu Desktop + Ubuntu Server) for a Windows-vs-Linux comparison.
6. **Week 14** — client-side remote access tooling (VPN, LogMeIn, TeamViewer), run on physical laptops rather than the VM lab.

## Key takeaways

- **Permissions in Windows are inherited by default and grouped predictably**: CREATOR OWNER and Everyone get the same baseline; SYSTEM and Administrators get another. Once you know the pattern, most "why can't I access this" questions in the file/printer lab (Week 4) answer themselves.
- **Group Policy inheritance has real teeth.** Editing the *Default Domain Policy* directly (rather than a policy scoped to one OU) applies everywhere it's linked — the lab's Week 5 warning dialog about this is Windows trying to stop you from making that mistake by accident.
- **DHCP and DNS depend on each other in practice, not just in theory** — the Week 10/11 labs both point back at the AD DS + DNS install from Week 5 as a hard prerequisite.
- **Ubuntu Server vs. Desktop is a storage and interface trade-off, not a capability one** — Server needs as little as 2 GB of disk and drops the GUI entirely in favor of the terminal, while Desktop needs over 10× that for the same base OS plus a full desktop environment.
- **VPN changes your visible IP but not your DNS servers** — confirmed directly in the Week 14 lab by comparing `ipconfig /all` output before and after connecting.
