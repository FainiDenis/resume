# Active Directory & Windows Server Administration

**What we set up in this lab: a working Windows Server domain with Active Directory, DNS, DHCP, and Group Policy.**

---

## Standing Up the Domain Controller

We installed and configured a Windows Server VM to act as the domain controller — the machine that authenticates users, enforces policies, and manages access to network resources across the domain.

The practical steps we performed:

- Promoted the server into a domain controller role.
- Joined a Windows 10 client and a Linux client to the domain and verified that both could authenticate against the domain controller.
- Confirmed the domain environment with PowerShell (`Get-ADDomain`) and checked the server's DHCP scope so clients were handed addresses automatically.

Verifying the domain from *both* a Windows and a Linux client was an important part of the lab — it proved the domain controller and DNS were actually serving clients, not just configured.

## How We Think About Active Directory

We found it helpful to think of AD as the central phone book and rules engine for the network:

- **Forest / Domain / OU / Objects** — AD organizes users, computers, groups, and other resources in a hierarchy. Organizational units (OUs) are containers that group objects so you can manage them and apply policy to them separately.
- **Objects & identities** — each object has identifiers used for logon. We worked with the `sAMAccountName` (the short logon name) and the User Principal Name (UPN, the logon name in `user@domain` form) and why both exist.
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
