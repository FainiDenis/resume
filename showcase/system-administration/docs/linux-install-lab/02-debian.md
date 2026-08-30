# Debian 10 (Buster)

| | |
|---|---|
| **ISO source** | https://www.debian.org/CD/http-ftp/#stable |
| **Version installed** | Debian 10 "Buster" |
| **Released** | July 6, 2019 |
| **Package manager** | apt (deb) |
| **Boot behavior** | Complete install first (no live session) |

## Steps

1. Download the Debian ISO from the official Debian website.
2. Boot the target machine from the installation media (USB or DVD ISO).
3. At the BIOS-mode boot menu, choose the first (Install) option.
4. Choose the installer language.
5. Select your location, which also sets the time zone.
6. Choose the keyboard layout.
7. Set a hostname for the machine.
8. Set a domain name, or leave it blank if none applies.
9. Set the root password.
10. Create a local (non-root) user account with its own password.
11. Choose a disk partitioning scheme — guided (recommended) is the simplest path.
12. Let the base system install; this stage runs unattended for a while.
13. On the software-selection screen, choose a desktop environment (GNOME was selected here).
14. Install the GRUB bootloader and pick the target disk for it.
15. Remove the installation media once setup finishes, then continue to reboot.
16. Log in with the user account created during setup.
17. Confirm Debian booted successfully into the desktop environment.

## Screenshots

Captured in order during the walkthrough (`screenshots/debian/`):

**Debian Linux installer menu**

![Debian Linux installer menu](screenshots/debian/img-000.png)

**Select a language to use debian system**

![Select a language to use debian system](screenshots/debian/img-001.png)

**Select a location for time zone**

![Select a location for time zone](screenshots/debian/img-002.png)

**Select your keyboard keymap to use**

![Select your keyboard keymap to use](screenshots/debian/img-003.png)

**Enter hostname for Debian**

![Enter hostname for Debian](screenshots/debian/img-004.png)

**Leave blank if you don't have domain name**

![Leave blank if you don't have domain name](screenshots/debian/img-005.png)

**Set up root password for debian**

![Set up root password for debian](screenshots/debian/img-006.png)

**Re-Enter debian root password**

![Re-Enter debian root password](screenshots/debian/img-007.png)

**New user full name**

![New user full name](screenshots/debian/img-008.png)

**username account for new user**

![username account for new user](screenshots/debian/img-009.png)

**Password for new user**

![Password for new user](screenshots/debian/img-010.png)

**Re enter password for new user**

![Re enter password for new user](screenshots/debian/img-011.png)

**Choose partitioning method to use the disk**

![Choose partitioning method to use the disk](screenshots/debian/img-012.png)

**Select disk to partition**

![Select disk to partition](screenshots/debian/img-013.png)

**Partitioning scheme choose recommended one**

![Partitioning scheme choose recommended one](screenshots/debian/img-014.png)

**Finish partitioning and write the change to disk**

![Finish partitioning and write the change to disk](screenshots/debian/img-015.png)

**Write the changes to disk**

![Write the changes to disk](screenshots/debian/img-016.png)

**Loading installing the base system**

![Loading installing the base system](screenshots/debian/img-017.png)

**Choose if you want to participate in the package usage survey**

![Choose if you want to participate in the package usage survey](screenshots/debian/img-018.png)

**Choose GNOME to use GUI**

![Choose GNOME to use GUI](screenshots/debian/img-019.png)

**Install the Grub boot loader to MBR**

![Install the Grub boot loader to MBR](screenshots/debian/img-020.png)

**Choose disk for boot loader**

![Choose disk for boot loader](screenshots/debian/img-021.png)

**Complete Debian installation**

![Complete Debian installation](screenshots/debian/img-022.png)

**Login to your user name with password**

![Login to your user name with password](screenshots/debian/img-023.png)
