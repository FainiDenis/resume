# Overview

## What This Is

This is my hands-on work in local area network (LAN) and wide area network (WAN) design. It covers the OSI model, IP addressing, routing protocols, switching technologies, network services, and security, combining theory with practical lab exercises on real Cisco networking equipment.

## What I Learned to Do

By the end of this body of work, I was able to:

1. **Understand Network Fundamentals**
   - OSI and TCP/IP models
   - Physical and logical addressing
   - Network media and topologies

2. **Configure Cisco Devices**
   - Router and switch configuration
   - Interface configuration
   - Password and security settings

3. **Implement Routing Protocols**
   - Static and default routing
   - RIP (v1 and v2)
   - OSPF
   - Route redistribution concepts

4. **Configure Switching Technologies**
   - VLAN creation and management
   - Trunking (802.1Q, ISL)
   - Port security
   - Spanning Tree Protocol

5. **Deploy Network Services**
   - DHCP
   - NAT and PAT
   - DNS
   - SSH

## Equipment Used

### Routers
| Model | Description |
|-------|-------------|
| Cisco 1760 | Entry-level router for lab exercises |
| Cisco 2600 | Modular router for advanced labs |
| Cisco 2901 | Modern router with Gigabit Ethernet |
| Cisco 2691 | Used for OSPF and RIP labs |

### Switches
| Model | Description |
|-------|-------------|
| Cisco 2950 | Basic switch for VLAN and port security |
| Cisco 3745 | Modified for switch functionality in GNS3 |

### Software Tools
| Tool | Purpose |
|------|---------|
| GNS3 | Network simulation and emulation |
| Wireshark | Packet analysis and protocol debugging |
| PuTTY | Terminal emulation for console access |
| TFTP32/64 | File transfer for IOS backups |

## Lab Environment

Most labs were completed using:
- Physical equipment in the campus lab
- GNS3 simulation software for complex topologies
- Direct console connections via rollover cables

## Key Concepts Learned

### OSI Model
I learned each layer's function and how they work together. The Physical layer transmits bits, Data Link handles MAC addresses, Network routes packets, Transport manages segmentation, Session controls data exchange, Presentation handles encryption and translation, and Application provides services to users.

### IP Addressing and Subnetting
This was challenging at first. I learned to convert between binary, decimal, and hexadecimal. I can now calculate subnet masks, identify network and broadcast addresses, and determine usable host ranges. I also learned about IPv6 addressing and EUI-64 conversion.

### Router Configuration
I learned the Cisco IOS command structure, password management, and interface configuration. Understanding the difference between enable password and enable secret, and knowing when to use each, became second nature.

### Routing Protocols
RIP was straightforward — broadcast every 30 seconds, count hops. IGRP and EIGRP added more metrics. OSPF was the most complex but also the most powerful. I learned about autonomous systems, administrative distance, and route summarization.

### Switching Technologies
Switches work differently than routers. VLANs allow logical segmentation without physical separation. Trunking carries multiple VLANs on one link. Spanning Tree Protocol prevents loops. VTP simplifies VLAN management.

### Network Services
NAT allows private IP addresses to access the internet. PAT (overload) maps many private addresses to one public address. DHCP automates IP address assignment. DNS translates names to addresses.

---

**Next Section**: [Homework Assignments](02-homework-assignments.md)
