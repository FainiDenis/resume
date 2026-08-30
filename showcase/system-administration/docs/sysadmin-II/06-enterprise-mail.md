# Enterprise Mail with Microsoft Exchange

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
