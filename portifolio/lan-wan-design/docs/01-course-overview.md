# Course Overview

## Description

This course covered the fundamentals of local area network (LAN) and wide area network (WAN) design. Topics included the OSI model, IP addressing, routing protocols, switching technologies, network services, and security. The course combined theoretical concepts with hands-on lab exercises using Cisco networking equipment.

## Learning Objectives

By the end of this course, I was able to:

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

## Grading Breakdown

| Component | Percentage |
|-----------|------------|
| Homework Assignments | 30% |
| Lab Reports | 40% |
| Quizzes | 15% |
| Final Exam | 15% |

## Weekly Schedule

| Week | Topic | Key Labs |
|------|-------|----------|
| 1 | OSI Model, Network Media | Lab 1.3 - Address Identification |
| 2 | IP Addressing, ARP | ARP Lab, Week 2 Lab |
| 3 | Number Systems, Subnetting | Week 3 Lab - Router CLI |
| 4 | IPv6, Router Commands | Week 4 Lab - Serial Interfaces |
| 5 | Routing Protocols Intro | Lab 5 - RIP Configuration |
| 6 | RIP, Static Routing | Week 6 Lab - Challenge RIP |
| 7 | RIPv2, OSPF | Lab 7 - Switch Configuration |
| 8 | EIGRP | Week 8 - Router-on-a-Stick |
| 9 | NAT, DHCP | Lab 9 - SSH Configuration |
| 10 | VLANs, Trunking | Bonus OSPF Lab |
| 11-12 | STP, VTP | Final Review |
| 13 | Final Exam | - |

## Key Concepts Learned

### OSI Model (Chapters 1-2)
I learned each layer's function and how they work together. The Physical layer transmits bits, Data Link handles MAC addresses, Network routes packets, Transport manages segmentation, Session controls data exchange, Presentation handles encryption and translation, and Application provides services to users.

### IP Addressing and Subnetting (Chapter 3, 4)
This was challenging at first. I learned to convert between binary, decimal, and hexadecimal. I can now calculate subnet masks, identify network and broadcast addresses, and determine usable host ranges. I also learned about IPv6 addressing and EUI-64 conversion.

### Router Configuration (Chapters 5-6)
I learned the Cisco IOS command structure, password management, and interface configuration. Understanding the difference between enable password and enable secret, and knowing when to use each, became second nature.

### Routing Protocols (Chapters 7-8)
RIP was straightforward - broadcast every 30 seconds, count hops. IGRP and EIGRP added more metrics. OSPF was the most complex but also the most powerful. I learned about autonomous systems, administrative distance, and route summarization.

### Switching Technologies (Chapters 12-13)
Switches work differently than routers. VLANs allow logical segmentation without physical separation. Trunking carries multiple VLANs on one link. Spanning Tree Protocol prevents loops. VTP simplifies VLAN management.

### Network Services (Chapter 9)
NAT allows private IP addresses to access the internet. PAT (overload) maps many private addresses to one public address. DHCP automates IP address assignment. DNS translates names to addresses.

---

**Next Section**: [Homework Assignments](02-homework-assignments.md)