# Storage Management

**What we did: added drives to a Linux system, set up RAID, worked with LVM, and wired it all up so it mounts at boot.**

---

## Adding & Preparing Drives

We attached additional virtual drives to the server and prepared them for use. Along the way we revisited the building blocks of disk layout:

- **Partition tables** — MBR vs. GPT. GPT handles larger disks and more partitions; MBR is the older scheme with a stricter 4-primary-partition limit.
- **Partition types** — primary, extended, and logical partitions, and why extended/logical partitions exist (to get around the old four-partition ceiling).

## RAID

We built software RAID arrays and verified they actually protect data:

- **RAID 1 (mirroring)** — an exact copy of data across two drives. We mounted the mirror and verified the data was readable.
- **RAID 5 (striping with parity)** — distributes data with parity across three or more drives for redundancy with better capacity than a mirror.
- **Redundancy & rebuild** — we verified that the array tolerated losing a drive, then simulated a failure and **rebuilt the array** so it was healthy again.

Watching a degraded array rebuild back to healthy is the part that made RAID "click" for us — it's not just acronyms, it's the server actually keeping the data available while it recovers.

## Logical Volume Management (LVM)

We used LVM for storage that's easier to manage than fixed partitions:

- Layered structure of **physical volume → volume group → logical volume**.
- The big practical win: **resizing volumes on the fly** without unmounting or re-partitioning, and the ability to span volumes across multiple physical disks.
- Snapshots give you a point-in-time copy of a volume, useful before making changes.

In the lab we created volumes and resized them, and we felt the difference vs. the rigidity of traditional partitioning.

## Making Mounts Permanent — `/etc/fstab`

With RAID and LVM volumes working, we made them mount automatically at boot via the file system table:

- Each entry specifies the device (by UUID or path), the **mount point**, the **file system type**, and **options**, plus dump/check flags.
- For network shares we used the `_netdev` option, which makes the system wait for the network to be up before trying to mount — important so an NFS mount doesn't fail just because networking isn't ready yet.
- We verified the mounts came up (including the RAID and LVM volumes) after configuring persistence.

## Windows vs. Linux Storage Thinking

The lab also had us compare how Windows and Linux approach storage:

- Both use partitions to divide physical disks into logical units.
- Windows leans on volume management (basic vs. dynamic disks, including spanned volumes), while Linux relies on file systems and tools like LVM.
- Linux supports a wider range of file systems (ext4, XFS, Btrfs) and can often resize a live file system where Windows needs a partition offline.

---

**Key takeaway:** The point of good storage administration isn't just "add a disk" — it's redundancy (RAID), flexibility (LVM), and reliability (persistent mounts that survive a reboot), and knowing which trade-offs you're making.
