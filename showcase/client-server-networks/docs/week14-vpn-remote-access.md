# Week 14 — Remote Access & Long-Distance Communications (Ch. 3)

**Objective:** install and use a campus VPN, then compare two remote-desktop tools (LogMeIn and TeamViewer) for accessing a machine remotely.

## Task I — Installing the campus VPN

**Setup:** two laptops (Windows + Mac) connected by Ethernet through a patch panel, Wi-Fi disabled on both.

| Machine | DNS | IPv4 (no VPN) |
|---|---|---|
| Windows | 10.1.100.10, 10.1.100.20 | 10.1.40.102 |
| Mac | 10.1.100.10, 10.1.100.20 | 10.1.40.104 |

![Windows IP config](../screenshots/week14/image1.png)
![Mac IP config](../screenshots/week14/image2.png)
![Mac IP config detail](../screenshots/week14/image3.png)

- One Ethernet adapter/Local Area Connection was visible in the command output before connecting the VPN.

**Downloading and installing the client:** navigated to the university IT site, agreed to the VPN download terms, and reviewed system requirements before installing.

![System requirements & download](../screenshots/week14/image4.png)

- **Windows requirement:** Windows 7 SP1 or newer.
- **Mac requirement:** Mac OS X 10.9 or newer.
- **MD5** — a checksum used to verify a downloaded file wasn't corrupted or tampered with in transit.
- Installing software requires **administrator rights** — a standard account isn't permitted to install software on the machine.

![Install prompt](../screenshots/week14/image5.png)
![Client installed](../screenshots/week14/image6.png)
![Connect dialog](../screenshots/week14/image7.png)

**After connecting:**

| Machine | IPv4 with VPN |
|---|---|
| Mac | 129.21.12.26 |
| Windows | 129.21.12.23 |

![Mac VPN IP](../screenshots/week14/image8.png)
![Windows VPN IP](../screenshots/week14/image9.png)

- Two Ethernet adapters now appear in the command output — the VPN adds a virtual adapter alongside the physical one.
- IPv4 addresses differ before/after the VPN connects on both machines, but DNS servers stay the same on both.
- **VPN advantages observed:** masking your real IP/location, browsing anonymously, and cutting long-distance access costs versus other remote-access methods.

## Task II — Remote Desktop via LogMeIn

Installed LogMeIn on the "host" laptop, created an account, then logged into the LogMeIn web console from the "client" laptop to connect back to it.

![LogMeIn installed](../screenshots/week14/image10.png)
![LogMeIn welcome](../screenshots/week14/image11.png)
![LogMeIn login](../screenshots/week14/image12.png)
![LogMeIn dashboard](../screenshots/week14/image13.png)

- **1** computer registered under Home.
- **Updates** page reported no updates available.

![Updates page](../screenshots/week14/image14.png)
![No updates](../screenshots/week14/image15.png)
![Login to remote computer](../screenshots/week14/image16.png)

**LogMeIn feature set used:** File Manager, Remote Sound, Desktop Sharing, File Sharing, LastPass integration.

Remote system details pulled through the LogMeIn console:

| Metric | Value |
|---|---|
| CPU | Intel Core i5-4300U @ 1.90 GHz (2.50 GHz turbo) |
| Physical memory | 8 GB RAM |
| Committed memory | 2.1 / 9.8 GB |
| Last booted | 36 minutes ago |
| Interactive user | Student |
| Disk size | 119.23 GB |
| Network traffic | Max inbound 0.1 Mbps · Max outbound 0 Mbps |

![System info panels](../screenshots/week14/image17.png)

- Best remote-screen color quality: **Options → Color Quality → Choose best image quality**.
- Encryption used by LogMeIn: **256-bit SSL**.

Confirmed a successful remote desktop session from the Mac to the Dell laptop.

![Remote session](../screenshots/week14/image25.png)

## Task III — Remote Desktop via TeamViewer (bonus)

Installed and configured TeamViewer on both laptops and confirmed a working remote session in both directions.

![TeamViewer session 1](../screenshots/week14/image26.png)
![TeamViewer session 2](../screenshots/week14/image27.png)

### LogMeIn vs. TeamViewer

| Feature | LogMeIn | TeamViewer |
|---|---|---|
| Cost | Free trial only; paid plans from $249/yr | Free for personal use; commercial from $660/yr |
| Remote sound | Yes | Yes |
| HD video stream | Yes | Yes |
| Remote-to-local printing | Yes | Yes |
| Desktop sharing | Yes | Yes |
| File transfer | Yes | Yes |
| Online meeting | No | Yes |
| Remote access | Yes | Free and Pro tiers |
| Security | 256-bit SSL | 1024-bit RSA key exchange + 256-bit AES session encryption |

**Takeaway:** TeamViewer came out ahead for this use case — free for personal use (vs. a short trial for LogMeIn), no email sharing required, and ID/password-based access control.
