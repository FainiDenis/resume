# Systems Administration II — Showcase

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
- Installed the **Weave** CNI network add-on so Pods could communicate, and verified the nodes reached `Ready` status.

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
