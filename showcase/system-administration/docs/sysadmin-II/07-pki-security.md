# Public Key Infrastructure & SSL/TLS

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
