# Puppy Linux (BionicPup64)

| | |
|---|---|
| **ISO source** | http://distro.ibiblio.org/puppylinux/puppy-bionic/bionicpup64/ |
| **Version installed** | Puppy BionicPup64 8.0 |
| **Released** | March 25, 2019 |
| **Package manager** | pet |
| **Boot behavior** | Live CD first, install-to-disk via desktop icon · ISO was 354 MB |

## Steps

1. Download the Puppy BionicPup64 ISO from its official distribution mirror.
2. Boot the machine from the installation media.
3. At the BIOS-mode boot menu, choose the first option.
4. In the live session, close the Quick Setup and Welcome windows.
5. Launch the Install icon from the desktop to install to the hard drive.
6. Choose the internal hard drive as the install target.
7. Use GParted to create a new partition table and a partition for the install (this took a couple of attempts — see notes below).
8. Point the installer at the freshly-partitioned drive and commit to install.
9. Choose FRUGAL or FULL install mode (FULL was selected here).
10. Let the installer transfer files to the hard drive.
11. Install the GRUB bootloader and pick the target disk / boot options.

## Notes

Partitioning was the rough edge here — the first attempt through GParted hit an error and needed a second pass (create a new partition table, erase the disk, then add the volume) before the installer would accept the target drive. Everything after that point was a standard FRUGAL/FULL install-to-disk flow.

## Screenshots

Captured in order during the walkthrough (`screenshots/puppy/`):

**Puppy Installer Menu**

![Puppy Installer Menu](screenshots/puppy/img-000.png)

**Close Quick Setup window**

![Close Quick Setup window](screenshots/puppy/img-001.png)

**Close Welcome window**

![Close Welcome window](screenshots/puppy/img-002.png)

**Install puppy**

![Install puppy](screenshots/puppy/img-003.png)

**Install puppy to the Internal Hard Drive**

![Install puppy to the Internal Hard Drive](screenshots/puppy/img-004.png)

**Choose which drive to install**

![Choose which drive to install](screenshots/puppy/img-005.png)

**Gparted message**

![Gparted message](screenshots/puppy/img-006.png)

**Create new partition table**

![Create new partition table](screenshots/puppy/img-007.png)

**Another alternative way partition table after this error**

![Another alternative way partition table after this error](screenshots/puppy/img-008.png)

**Create Partition Table**

![Create Partition Table](screenshots/puppy/img-009.png)

**Erase All entire disk data**

![Erase All entire disk data](screenshots/puppy/img-010.png)

**Try again to create new partition under NEW tab**

![Try again to create new partition under NEW tab](screenshots/puppy/img-011.png)

**Add partition Volume**

![Add partition Volume](screenshots/puppy/img-012.png)

**Apply the change for partition**

![Apply the change for partition](screenshots/puppy/img-013.png)

**Complete Gparted Operation**

![Complete Gparted Operation](screenshots/puppy/img-014.png)

**Close GParted window**

![Close GParted window](screenshots/puppy/img-015.png)

**Click again the Hard drive where you want to install**

![Click again the Hard drive where you want to install](screenshots/puppy/img-016.png)

**Install puppy to the sda we created before**

![Install puppy to the sda we created before](screenshots/puppy/img-017.png)

**Commit to install message**

![Commit to install message](screenshots/puppy/img-018.png)

**Choose either FRUGAL or FULL to proceed (I choose FULL)**

![Choose either FRUGAL or FULL to proceed (I choose FULL)](screenshots/puppy/img-019.png)

**Partition check message to install to hard drive**

![Partition check message to install to hard drive](screenshots/puppy/img-020.png)

**Installer files are being transfer to hard drive**

![Installer files are being transfer to hard drive](screenshots/puppy/img-021.png)

**Install Grub bootloader**

![Install Grub bootloader](screenshots/puppy/img-022.png)

**Where you want to install grub bootloader**

![Where you want to install grub bootloader](screenshots/puppy/img-023.png)

**List of extra boot loader will show here**

![List of extra boot loader will show here](screenshots/puppy/img-024.png)

**Bootloader confirmation**

![Bootloader confirmation](screenshots/puppy/img-025.png)

**Successfully installed grub bootloader**

![Successfully installed grub bootloader](screenshots/puppy/img-026.png)

**Grub message if system doesn't have boot manager**

![Grub message if system doesn't have boot manager](screenshots/puppy/img-027.png)

**Installer screenshot**

![Installer screenshot](screenshots/puppy/img-028.png)

**Installer screenshot**

![Installer screenshot](screenshots/puppy/img-029.png)
