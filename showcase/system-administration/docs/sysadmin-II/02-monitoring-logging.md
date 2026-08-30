# Monitoring & Centralized Logging

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
