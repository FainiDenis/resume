# Homework Assignments

## Chapter 1-2: Introduction to Networking

### Key Concepts Learned

**OSI Model (Bottom to Top)**
1. **Physical** - Transmits signals on the wire (bits)
2. **Data Link** - MAC addressing, frames
3. **Network** - Routing, packets (IP addresses)
4. **Transport** - Segmentation, TCP/UDP
5. **Session** - Full/half-duplex control
6. **Presentation** - Encryption, translation
7. **Application** - User services (email, web)

**Network Media**
- Copper (UTP/STP)
- Fiber optic
- Wireless
- Coaxial

**Protocols**
- TCP/IP: Primary internet protocol
- HTTP: Web browsing (port 80)
- HTTPS: Secure web (port 443)
- SMTP: Email (port 25)
- DNS: Name resolution (port 53)

### Sample Questions

**Q: What is the difference between a hub and a switch?**
A hub operates at Layer 1 (Physical) and broadcasts all traffic to all ports. A switch operates at Layer 2 (Data Link) and learns MAC addresses to forward traffic only to the correct port. Switches reduce collisions and improve network performance.

**Q: What are the 7 layers of the OSI model?**
Physical, Data Link, Network, Transport, Session, Presentation, Application.

**Q: How many collision domains does a switch create?**
Each switch port creates its own collision domain. With 12 ports, there are 12 collision domains.

---

## Chapter 3: Number Systems and IP Addressing

### Binary to Decimal Conversion

10110110 = 182
- 128 + 32 + 16 + 4 + 2 = 182

10111101 = 189
- 128 + 32 + 16 + 8 + 4 + 1 = 189

### Decimal to Binary Conversion

69 = 01000101
- 64 + 4 + 1 = 69

158 = 10011110
- 128 + 16 + 8 + 4 + 2 = 158

### Hexadecimal Conversion

11101100 = EC
10101010 = AA

### IP Address Classes

| Class | First Octet Range | Default Subnet Mask | CIDR |
|-------|-------------------|---------------------|------|
| A | 1-126 | 255.0.0.0 | /8 |
| B | 128-191 | 255.255.0.0 | /16 |
| C | 192-223 | 255.255.255.0 | /24 |

### Subnetting Example

**Given**: 203.34.175.124/28
- Class: C
- Borrowed bits: 4
- Subnet mask: 255.255.255.240
- Subnets: 16 (14 usable)
- Hosts per subnet: 16 (14 usable)

---

## Chapter 4: IPv6 Addressing

### IPv6 Abbreviation

**Full Address**: 192f:2ccd:0004:0000:f7ec:d000:23ab:0e02
**Abbreviated**: 192f:2ccd:4::f7ec:d:23ab:e02

**Full Address**: 8000:0000:0000:0000:0bbe:0000:6aa9:9df0
**Abbreviated**: 8::bbe::6aa9:9df

### EUI-64 Conversion

**MAC**: 47:CC:32:9B:00:EB
**EUI-64**: 47:CC:32:FF:FE:9B:00:EB

### IPv6 Loopback
::1/128

---

## Chapter 5-6: Router Configuration

### Router Memory Types

| Memory | Purpose |
|--------|---------|
| RAM | Running configuration, routing tables |
| ROM | Bootstrap, POST |
| NVRAM | Startup configuration |
| Flash | IOS image |

### Key Commands

| Command | Description |
| :--- | :--- |
| `enable` | Moves from User EXEC mode to Privileged EXEC mode. |
| `config terminal` | Enters Global Configuration mode to make system-wide changes. |
| `hostname GAD` | Renames the router to "GAD". |
| `enable secret [pass]` | Sets a strongly encrypted password for privileged access. |
| `enable password [pass]` | Sets a plain-text password for privileged access. |
| `line vty 0 4` | Enters configuration mode for remote access lines (SSH/Telnet). |
| `password [pass]` | Sets the password for remote login access. |
| `login` | Tells the router to prompt for a password on the VTY lines. |
| `copy running-config startup-config` | Saves the active RAM configuration to permanent NVRAM. |
| `show running-config` | Displays the current active configuration. |
| `show startup-config` | Displays the saved configuration that loads on boot. |
| `show interfaces` | Shows the status and statistics of all network ports. |
| `show ip route` | Displays the routing table. |
| `show version` | Shows hardware info, software version, and system uptime. |


---

## Chapter 7: Routing Protocols

### Routable vs Routing Protocols

**Routable (Routed) Protocols**
- TCP/IP
- IPX/SPX
- Carry network layer information

**Routing Protocols**
- RIP (Routing Information Protocol)
- IGRP (Interior Gateway Routing Protocol)
- OSPF (Open Shortest Path First)
- EIGRP (Enhanced IGRP)


### Administrative Distance

| Route Type | AD |
|------------|-----|
| Connected | 0 |
| Static | 1 |
| EIGRP | 90 |
| OSPF | 110 |
| RIP | 120 |

---

## Chapter 8: Advanced Routing

### RIPv1 vs RIPv2

| Feature | RIPv1 | RIPv2 |
|---------|-------|-------|
| Classless | No | Yes |
| Subnet Mask | Not sent | Sent in updates |
| Authentication | No | MD5 |
| Update Type | Broadcast | Multicast (224.0.0.9) |

### OSPF Configuration
```
Router(config)# router ospf 1
Router(config-router)# network 192.168.1.0 0.0.0.255 area 0
Router(config-router)# network 172.16.0.0 0.0.0.255 area 0
```

**Wildcard Mask**: Inverse of subnet mask
- 255.255.255.0 → 0.0.0.255
- 255.255.255.240 → 0.0.0.15

### Static Route Configuration
```
Router(config)# ip route 192.168.16.0 255.255.255.0 192.168.15.2
```


---

## Chapter 9: NAT and DHCP

### NAT Types

**Static NAT**
- One-to-one mapping
- Internal IP to external IP
- Example: 192.168.1.10 → 209.165.201.10

**Dynamic NAT**
- Pool of external addresses
- Assigned as needed
- Example: 192.168.1.0/24 → 209.165.201.9-14

**PAT (NAT Overload)**
- Many internal addresses to one external IP
- Uses ports to distinguish sessions
- Most common for small networks

### DHCP Configuration
```
R2(config)# ip dhcp excluded-address 172.16.10.1 172.16.10.10
R2(config)# ip dhcp pool R1_LAN10
R2(dhcp-config)# network 172.16.10.0 255.255.255.0
R2(dhcp-config)# default-router 172.16.10.1
R2(dhcp-config)# dns-server 172.16.11.5
```

### NAT Configuration
```
R2(config)# ip nat pool NAT-POOL 209.165.201.9 209.165.201.14 netmask 255.255.255.248
R2(config)# ip nat inside source list NAT pool NAT-POOL
R2(config)# ip access-list extended NAT
R2(config-ext-nacl)# permit ip 172.16.10.0 0.0.0.255 any
R2(config-ext-nacl)# permit ip 172.16.11.0 0.0.0.255 any
```

---

## Chapter 12-13: Switching and VLANs

### Switching Fundamentals

**MAC Address Table**
- Maps MAC addresses to ports
- Learned dynamically
- Can be statically configured

**Frame Forwarding Methods**
- Cut-through: Low latency, no error checking
- Store-and-forward: Full error checking, higher latency
- Fragment-free: Checks first 64 bytes

**CSMA/CD**
- Carrier Sense Multiple Access with Collision Detection
- Used in Ethernet networks
- Collision domains isolated by switches

### VLAN Configuration

**Create VLAN**
```
S1(config)# vlan 2
S1(config-vlan)# name Engineering
S1(config-vlan)# exit
```

**Assign Ports to VLAN**
```
S1(config)# interface range f0/4 - f0/9
S1(config-if-range)# switchport access vlan 2
S1(config-if-range)# exit
```

**Trunk Configuration**
```
S1(config)# interface f1/1
S1(config-if)# switchport mode trunk
```

### VTP Configuration
```
S1# vlan database
S1(vlan)# vtp server
S1(vlan)# vlan 2 name Engineering
S1(vlan)# vlan 3 name Marketing
S1(vlan)# vlan 4 name Production
```

### Port Security
```
S1(config)# interface f0/4
S1(config-if)# switchport mode access
S1(config-if)# switchport port-security
S1(config-if)# switchport port-security mac-address sticky
S1(config-if)# switchport port-security maximum 1
S1(config-if)# switchport port-security violation shutdown
```

---

## Sample Questions & Answers

### Q: Why can't RIPv1 be used on networks with subnets?
RIPv1 is classful and doesn't carry subnet mask information in updates. It summarizes networks to their major boundaries, which breaks subnetting.

### Q: What is the benefit of using DHCP?
DHCP automates IP address assignment, reducing administrative overhead and preventing duplicate IP addresses. It's essential for large networks.

### Q: What is the difference between Telnet and SSH?
Telnet transmits data in plaintext, which is insecure. SSH encrypts all traffic, including passwords. SSH uses port 22, Telnet uses port 23.

### Q: What is the purpose of STP?
STP prevents loops in networks with redundant paths. It blocks some paths to create a logical tree topology, preventing broadcast storms.

---

**Next Section**: [Lab Exercises](03-lab-exercises.md)