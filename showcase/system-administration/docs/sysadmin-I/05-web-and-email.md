# Web, Email & Monitoring Services

**What we did: stood up and secured an Apache web server, configured a mail server, set up centralized logging, and scheduled tasks.**

---

## Apache Web Server

We installed and configured the Apache web server on Linux.

- **Document root** — the top-level directory Apache serves files from (by default under `/var/www/html`). To change it, we backed up the configuration first, then edited the `DocumentRoot` directive to point at the new directory.
- **Virtual hosts** — we set up multiple virtual host sites on one server so a single Apache instance could serve more than one website, each with its own site files.
- **Listening ports** — the configuration's `Listen` directive tells the server which port to answer HTTP traffic on (e.g., port 80 for plain HTTP, 443 for HTTPS).

We made a habit of **backing up config files** (like `httpd.conf`) before editing them after an earlier lesson about restoring broken configs.

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

We configured `rsyslog` to **forward log messages from one system to another**:

- Enabled the input module so the log server could receive messages.
- Started the TCP listener to accept incoming syslog messages on the logging port.
- Verified the receiving server actually captured messages coming in from remote systems.

This gave us a central place to watch logs from multiple machines — the foundation of monitoring multiple servers from one spot.

## Task Scheduling — cron, at, anacron

We worked with Linux's scheduling tools and compared them:

- **`cron`** — for recurring tasks (e.g., "run a backup every day at 2 AM") based on a schedule in a crontab.
- **`at`** — for one-off tasks at a specific time ("shut down after this backup finishes").
- **`anacron`** — like cron, but for systems that aren't always on; it **catches up on missed jobs** when the machine comes back, which cron doesn't.

Knowing *which* tool fits the situation — a recurring job, a single future job, or a job on a machine that sleeps — is the practical skill here.

---

**Key takeaway:** Service administration is about more than getting something to run once. It's about making it secure (TLS, certificates, least-privilege), observable (log forwarding, network traces), and reliable (scheduled jobs that fit the machine's behaviour).
