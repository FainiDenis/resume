# LAN/WAN Design

---

### About This

This contains my hands-on work in LAN/WAN network design — the fundamentals of network design, routing protocols, switching, and network security, learned through lab exercises on real Cisco equipment plus written assignments.

### What's Inside

#### Homework Assignments
- **Chapters 1-2**: OSI Model, Network Media, Protocols
- **Chapter 3**: Number Systems, IP Addressing, Subnetting
- **Chapter 4**: IPv6 Addressing, MAC-to-EUI-64 Conversion
- **Chapter 5-6**: Router Commands, Cisco IOS, Memory Types
- **Chapter 7**: Routing Protocols (RIP, IGRP, Static Routes)
- **Chapter 8**: Advanced Routing (RIPv2, OSPF, EIGRP)
- **Chapter 9**: NAT, DHCP, DNS Services
- **Chapters 12-13**: Switching, VLANs, STP, VTP

#### Lab Exercises
1. **Identifying Data Link and Network Layer Addresses** - MAC and IP address analysis
2. **ARP Protocol Analysis** - Using Wireshark to observe ARP in action
3. **Router Command Line Fundamentals** - Cisco IOS basics
4. **Configuring Serial Interfaces** - Router-to-router connections
5. **Basic RIP Configuration** - Classful routing with RIPv1
6. **DHCP and NAT Configuration** - Dynamic addressing and address translation
7. **Basic Switch Configuration** - VLANs, port security, MAC tables
8. **Router-on-a-Stick** - Inter-VLAN routing
9. **Configuring Remote Router Using SSH** - Secure remote access
10. **Bonus: OSPF Configuration** - Link-state routing protocol

### Skills Demonstrated

#### Routing Protocols
- RIP (v1 and v2)
- OSPF
- Static Routing
- Default Routing
- EIGRP (conceptual)

#### Switching Technologies
- VLAN Configuration
- VLAN Trunking Protocol (VTP)
- Port Security
- MAC Address Tables
- Spanning Tree Protocol (STP)

#### Network Services
- DHCP Server Configuration
- Static and Dynamic NAT
- Port Address Translation (PAT)
- DNS Configuration

#### Security
- SSH Configuration
- Password Security
- Access Control Lists (ACL)
- Port Security

#### Tools Used
- **Cisco Routers**: 1760, 2600, 2901, 2691
- **Cisco Switches**: 2950, 3745 (modified)
- **Simulation**: GNS3
- **Analysis**: Wireshark
- **Terminal**: PuTTY, HyperTerminal
- **TFTP**: TFTP32/TFTP64

### Project Highlights

#### Router-on-a-Stick (Lab 8)
Configured a single router interface with sub-interfaces to route traffic between multiple VLANs. This demonstrated understanding of:
- 802.1Q trunking
- Sub-interface configuration
- Inter-VLAN routing

#### DHCP & NAT (Lab 6)
Set up a Cisco router as a DHCP server with:
- IP address pools for multiple subnets
- Excluded addresses for static devices
- Static and dynamic NAT with address pools
- PAT (Port Address Translation) for internet connectivity

#### SSH Remote Access (Lab 9)
Configured secure remote access to routers:
- RSA key generation
- SSH version 2 support
- Remote access without physical console
- TFTP backup of IOS images

### Key Takeaways

This work gave me hands-on experience with enterprise networking equipment and protocols. I learned:

1. **The OSI Model isn't just theory** - Every layer has practical applications in network configuration
2. **Routing protocols have trade-offs** - RIP for simplicity, OSPF for scalability
3. **Security matters** - SSH over Telnet, MFA concepts, password policies
4. **Switches are complex** - VLANs, trunking, STP, port security
5. **Documentation is essential** - Every configuration needs to be saved and explained

### Future Learning

Building on this foundation, I plan to explore:
- Network automation (Python, Ansible)
- Cloud networking (AWS, Azure)
- Network security (Firewalls, VPNs)
- CCNP certification
