# Client-Server Networks 

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
| Configuring TCP/IP (binary, CIDR, `arp`/`tracert`, IPv6) | [docs/week09-ch9-tcpip.md](docs/week09-ch9-tcpip.md) |
| Configuring DNS | [docs/week10-dns.md](docs/week10-dns.md) |
| Configuring DHCP | [docs/week11-dhcp.md](docs/week11-dhcp.md) |
| Introduction to Linux (Ubuntu Desktop + Server) | [docs/week12-linux-intro.md](docs/week12-linux-intro.md) |
| Remote access — VPN, LogMeIn, TeamViewer | [docs/week14-vpn-remote-access.md](docs/week14-vpn-remote-access.md) |

The [addresses worksheet](docs/00-addressing-extra-credit.md) is a standalone fundamentals exercise; the rest follow the environment built top-down below. Two labs (OUs/AD accounts and DNS/DHCP) were largely instructor-checkpoint screenshots with limited written Q&A in the source material, so those docs are presented as a checkpoint table rather than a full narrative.

## Environment

All server-side labs ran as VMware Workstation VMs (`410Server1`, `410Server2`) on a shared external SSD, built up incrementally:

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
- **VPN changes your visible IP but not your DNS servers** — confirmed directly by comparing `ipconfig /all` output before and after connecting.
