# Enterprise Infrastructure & Dual-Domain Setup

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
