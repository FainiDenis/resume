# FreeBSD 12.1 (+ GNOME)

| | |
|---|---|
| **ISO source** | https://download.freebsd.org/ftp/releases/amd64/amd64/ISO-IMAGES/12.1/FreeBSD-12.1-RELEASE-amd64-disc1.iso |
| **Version installed** | FreeBSD 12.1-RELEASE |
| **Released** | November 4, 2019 |
| **Package manager** | pkg |
| **Boot behavior** | Complete install first (no live session) · ISO was 867 MB · no GUI by default |

## Steps

1. Download the FreeBSD ISO from the official FreeBSD website.
2. Boot the machine from the installation media.
3. At the BIOS-mode boot menu, choose the first option.
4. On the welcome screen, select Install.
5. Choose the system keymap.
6. Set the system hostname.
7. Partition the target disk using the guided partition editor.
8. Confirm the partitioning warning and let the base distribution fetch and extract.
9. Set the root password.
10. Configure networking — interface, DHCP or static IPv4/IPv6, and DNS resolver.
11. Select the time zone (region, then confirm the abbreviation).
12. Choose which system services to enable, and review the system-hardening options.
13. Add a local (non-root) user account.
14. Skip manual configuration (unless changes are needed) and reboot.
15. Log in with the account created during setup.
16. Update and upgrade the base system as root (`freebsd-update`, `pkg update && pkg upgrade`).
17. Install a desktop environment — GNOME, via `pkg install gnome`.
18. Edit `/etc/rc.conf` to enable the display manager and D-Bus/HAL services.
19. Edit `/etc/fstab` to add the `proc` filesystem entry GNOME expects (nano was used in place of vi here).
20. Reboot into the graphical login screen and log in — FreeBSD is now running a full GNOME desktop.

## Notes

This was the most involved install of the nine. FreeBSD's installer (bsdinstall) is text-based and doesn't ship a desktop by default, so getting to a graphical login meant a second phase after the base install: `pkg install gnome`, then hand-editing `/etc/rc.conf` (to enable `gdm`/`gnome` and `dbus`/`hald`) and `/etc/fstab` (to add the `proc` filesystem entry GNOME expects) before GDM would even start. This matches the lab's own conclusion — installing FreeBSD's base system is straightforward, but bolting a GUI on top is not.

## Screenshots

Captured in order during the walkthrough (`screenshots/freebsd/`):

**FreeBSD Installer boot menu**

![FreeBSD Installer boot menu](screenshots/freebsd/img-000.png)

**Welcome installer window wizard**

![Welcome installer window wizard](screenshots/freebsd/img-001.png)

**FreeBSD keymap selection**

![FreeBSD keymap selection](screenshots/freebsd/img-002.png)

**FreeBSD hostname setup**

![FreeBSD hostname setup](screenshots/freebsd/img-003.png)

**FreeBSD Partition**

![FreeBSD Partition](screenshots/freebsd/img-004.png)

**FreeBSD partition types**

![FreeBSD partition types](screenshots/freebsd/img-005.png)

**FreeBSD Partition Editor**

![FreeBSD Partition Editor](screenshots/freebsd/img-006.png)

**FreeBSD warning confirmation message**

![FreeBSD warning confirmation message](screenshots/freebsd/img-007.png)

**FreeBSD Fetching Distribution in process**

![FreeBSD Fetching Distribution in process](screenshots/freebsd/img-008.png)

**FreeBSD Archive Extraction in process**

![FreeBSD Archive Extraction in process](screenshots/freebsd/img-009.png)

**Set up new FreeBSD root password**

![Set up new FreeBSD root password](screenshots/freebsd/img-010.png)

**FreeBSD Network Configuration**

![FreeBSD Network Configuration](screenshots/freebsd/img-011.png)

**FreeBSD IPv4 network interface configuration**

![FreeBSD IPv4 network interface configuration](screenshots/freebsd/img-012.png)

**FreeBSD DHCP network configuration**

![FreeBSD DHCP network configuration](screenshots/freebsd/img-013.png)

**FreeBSD IPv6 network configuration**

![FreeBSD IPv6 network configuration](screenshots/freebsd/img-014.png)

**FreeBSD DNS resolver configuration**

![FreeBSD DNS resolver configuration](screenshots/freebsd/img-015.png)

**FreeBSD time zone selector**

![FreeBSD time zone selector](screenshots/freebsd/img-016.png)

**FreeBSD Select a country or region**

![FreeBSD Select a country or region](screenshots/freebsd/img-017.png)

**FreeBSD USA Time Zone**

![FreeBSD USA Time Zone](screenshots/freebsd/img-018.png)

**FreeBSD confirmation of Time zone abbreviation**

![FreeBSD confirmation of Time zone abbreviation](screenshots/freebsd/img-019.png)

**FreeBSD System configuration for service**

![FreeBSD System configuration for service](screenshots/freebsd/img-020.png)

**FreeBSD System hardening options**

![FreeBSD System hardening options](screenshots/freebsd/img-021.png)

**FreeBSD Add User Accounts**

![FreeBSD Add User Accounts](screenshots/freebsd/img-022.png)

**FreeBSD added user to the system**

![FreeBSD added user to the system](screenshots/freebsd/img-023.png)

**User account review message before confirming if they are correct**

![User account review message before confirming if they are correct](screenshots/freebsd/img-024.png)

**FreeBSD Manual Configuration**

![FreeBSD Manual Configuration](screenshots/freebsd/img-025.png)

**Complete FreeBSD installation**

![Complete FreeBSD installation](screenshots/freebsd/img-026.png)

**Login to FreeBSD after reboot**

![Login to FreeBSD after reboot](screenshots/freebsd/img-027.png)

**FreeBSD Update the system**

![FreeBSD Update the system](screenshots/freebsd/img-028.png)

**FreeBSD Upgrade the system**

![FreeBSD Upgrade the system](screenshots/freebsd/img-029.png)

**FreeBSD GNOME install**

![FreeBSD GNOME install](screenshots/freebsd/img-030.png)

**Number of GNOME packages to be installed**

![Number of GNOME packages to be installed](screenshots/freebsd/img-031.png)

**GNOME installation is in process**

![GNOME installation is in process](screenshots/freebsd/img-032.png)

**GNOME is successful installed to the system**

![GNOME is successful installed to the system](screenshots/freebsd/img-033.png)

**Command for edit rc.conf file**

![Command for edit rc.conf file](screenshots/freebsd/img-034.png)

**Add few texts to the next lines**

![Add few texts to the next lines](screenshots/freebsd/img-035.png)

**Command for edit fstab file**

![Command for edit fstab file](screenshots/freebsd/img-036.png)

**Add few texts on the next line (I use nano instead of vi to modify the file)**

![Add few texts on the next line (I use nano instead of vi to modify the file)](screenshots/freebsd/img-037.png)

**FreeBSD login GUI Screen**

![FreeBSD login GUI Screen](screenshots/freebsd/img-038.png)

**Complete FreeBSD GUI installed**

![Complete FreeBSD GUI installed](screenshots/freebsd/img-039.png)

**Installer screenshot**

![Installer screenshot](screenshots/freebsd/img-040.png)
