# Windows & Linux Cross-Platform Integration

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

```
Windows admin  →  SSH to a Linux server  →  authenticated through the trust
Linux user     →  log in to a Windows client  →  authenticated through the trust
```

Seeing a user cross from one OS's identity domain into the other with a single credential is exactly what a real mixed enterprise needs.

---

**Key takeaway:** Cross-platform integration comes in two flavors — direct membership (SSSD joining a client to the domain) and indirect trust (joining two *domains* at the realm level). Both hinge on DNS being bulletproof, and the two-way trust is the model real heterogeneous enterprises rely on.
