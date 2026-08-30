# Skills & Competencies

## Summary

Throughout LAN/WAN Design, I developed practical networking skills through hands-on configuration of Cisco routers and switches. Below is a comprehensive list of what I learned and can now do.

---

## Routing Protocols

### Static Routing
- Configure static routes for specific networks
- Configure default routes for unknown destinations
- Understand when to use static vs dynamic routing
- **Example**: `ip route 192.168.16.0 255.255.255.0 192.168.15.2`

### RIP (v1 and v2)
- Configure RIPv1 for classful networks
- Configure RIPv2 for classless networks
- Understand RIP's limitations (15 hop max)
- **Example**: `router rip` `network 172.16.0.0`

### OSPF
- Configure OSPF with wildcard masks
- Understand OSPF areas and their purpose
- Use `default-information originate` for default routes
- **Example**: `router ospf 1` `network 172.16.0.0 0.0.0.3 area 0`

### Route Selection
- Understand administrative distance
- Know when routes are preferred
- **Example**: Connected (0) > Static (1) > OSPF (110) > RIP (120)

---

## Switching Technologies

### VLANs
- Create and name VLANs
- Assign ports to VLANs
- Understand VLAN membership (static vs dynamic)
- **Example**: `vlan 2 name Engineering` `switchport access vlan 2`

### Trunking
- Configure 802.1Q trunking
- Understand ISL (Cisco proprietary)
- Differentiate between native VLAN and tagged VLANs
- **Example**: `switchport mode trunk`

### VTP (VLAN Trunking Protocol)
- Configure VTP servers and clients
- Understand VTP modes (Server, Client, Transparent)
- **Example**: `vtp server`

### STP (Spanning Tree Protocol)
- Understand root bridge election
- Know port roles (Root, Designated, Blocking)
- Understand STP states (Blocking, Listening, Learning, Forwarding)

---

## Network Services

### DHCP
- Configure router as DHCP server
- Exclude addresses from DHCP pools
- Define DHCP pools with network, default gateway, DNS
- Use `ip helper-address` for cross-subnet DHCP
- **Example**: `ip dhcp pool R1_LAN10` `network 172.16.10.0`

### NAT (Network Address Translation)
- Configure Static NAT (one-to-one)
- Configure Dynamic NAT (pool-based)
- Configure PAT/NAT Overload (many-to-one)
- Define inside and outside interfaces
- **Example**: `ip nat inside source list NAT pool NAT-POOL`

### DNS
- Configure DNS server on router
- Use `ip host` for local name resolution
- Disable domain lookup with `no ip domain-lookup`

---

## Security

### Authentication
- Set enable password and enable secret
- Configure console line password
- Configure VTY (Telnet/SSH) password
- Understand local vs AAA authentication

### SSH
- Generate RSA keys
- Enable SSH on VTY lines
- Configure SSH version 2
- **Example**: `crypto key generate rsa` `transport input ssh`

### Port Security
- Enable port security on switch ports
- Set maximum MAC addresses
- Configure violation modes (shutdown, restrict, protect)
- Use sticky MAC addresses
- **Example**: `switchport port-security maximum 1`

---

## Cisco IOS Proficiency

### Navigation
- Move between user EXEC, privileged EXEC, global config, and sub-modes
- Use `exit` and `end` to navigate
- Understand abbreviated commands

### Help System
- Use `?` for context-sensitive help
- Use Tab for command completion
- Use `show ?` to explore options

### Configuration Management
- Save configs with `copy run start`
- Erase configs with `erase startup-config`
- Reload router with `reload`
- View configs with `show running-config` and `show startup-config`

### Troubleshooting
- Use `ping` and `traceroute` for connectivity
- Use `show ip route` for routing table
- Use `show interface` for interface status
- Use `debug` for real-time troubleshooting

---

## IP Addressing

### Subnetting
- Convert binary to decimal and vice versa
- Calculate subnet masks from CIDR notation
- Determine network and broadcast addresses
- Calculate usable host ranges

### IPv4 Addressing
- Identify address classes (A, B, C)
- Understand private vs public addresses
- Identify network, host, and broadcast addresses

### IPv6 Addressing
- Understand IPv6 address formats
- Compress and expand IPv6 addresses
- Convert MAC to EUI-64 format
- Identify loopback address (::1)

---

## Hardware Knowledge

### Router Components
- RAM: Running configuration, routing tables
- ROM: POST, bootstrap
- NVRAM: Startup configuration
- Flash: IOS image

### Switch Components
- MAC address table
- VLAN database
- Port configurations

---

## Tools & Software

### GNS3
- Build network topologies
- Connect routers and switches
- Simulate networks without physical hardware

### Wireshark
- Capture packets
- Analyze protocols (ARP, ICMP, TCP, UDP)
- Filter traffic for specific protocols

### PuTTY
- Console connections (serial)
- SSH connections
- Telnet connections

### TFTP
- Backup IOS images
- Backup configuration files
- Transfer files to/from routers

---

## Real-World Applications

The skills I learned here apply directly to:

1. **Network Administrator**: Configuring routers and switches for small to medium businesses
2. **Network Engineer**: Designing and implementing LAN/WAN infrastructure
3. **IT Support**: Troubleshooting network issues using Cisco tools
4. **Security Analyst**: Understanding network security fundamentals
5. **Network Consultant**: Advising clients on network design and implementation

---

## Future Learning Path

### Certifications
- **CCNA**: A natural next step after this networking work
- **Network+**: Vendor-neutral networking certification

### Advanced Topics
- **EIGRP**: Cisco's proprietary routing protocol
- **BGP**: Border Gateway Protocol for internet routing
- **MPLS**: Multiprotocol Label Switching for WANs
- **Network Automation**: Python, Ansible, SDN

### Specializations
- **Security**: Firewalls, VPNs, intrusion detection
- **Cloud Networking**: AWS, Azure, Google Cloud
- **Wireless**: Wi-Fi design and implementation

---

## Final Thoughts

This work gave me a solid foundation in network design and configuration. I'm comfortable with:
- Router and switch commands
- Routing protocols and their configuration
- VLANs and switching technologies
- DHCP and NAT services
- Basic security practices

I look forward to building on this foundation in future work and professional practice.