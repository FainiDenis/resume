# IPv4/IPv6 Addressing

A worksheet on IP address classes, subnet masks, CIDR notation, and public/private address ranges.

## Address classes

| Class | First-octet decimal range | First-octet binary range | Default subnet mask | CIDR |
|---|---|---|---|---|
| A | 1 – 127 | `00000001`–`01111111` | 255.0.0.0 | /8 |
| B | 128 – 191 | `10000000`–`10111111` | 255.255.0.0 | /16 |
| C | 192 – 223 | `11000000`–`11011111` | 255.255.255.0 | /24 |

**Binary → dotted decimal:** `10110101.00000010.11110000.11111001` → **181.2.240.249**

## Network / broadcast addresses

The first address in a network is the **network address**; the last is the **broadcast address** — both are reserved and can't be assigned to a host.

| Host address (default mask) | Network address | Broadcast address |
|---|---|---|
| 39.16.79.100 | 39.0.0.0 | 39.255.255.255 |
| 161.14.69.89 | 161.14.0.0 | 161.14.255.255 |

## CIDR / slash notation

A subnet mask can be abbreviated by counting its `1` bits — e.g. `255.0.0.0` (8 ones) = `/8`.

| Address + mask | Class | Default mask for that class in use? |
|---|---|---|
| 193.25.16.79 / 255.255.255.0 (`/24`) | C | Yes |
| 181.56.199.2 / 24 | B | No — this is a subnetted Class B network |

If the default mask for the address's class is in use, the network hasn't been subnetted. If a non-default mask is in use, the administrator has divided the network into smaller subnets — more manageable and generally more secure.

## Public vs. private address ranges

| Class | Private range |
|---|---|
| A | 10.0.0.0 – 10.255.255.255 |
| B | 172.16.0.0 – 172.31.255.255 |
| C | 192.168.0.0 – 192.168.255.255 |

Public addresses must be globally unique; private addresses don't need to be, since they aren't routed on the open internet.

## Dynamic vs. static addressing

- **Dynamic** — assigned automatically by a DHCP server, and "leased" for a period of time (`ipconfig /all` shows the lease).
- **Static** — assigned manually by an administrator and doesn't change until they change it.

## MAC addresses & bit/byte basics

- 1 byte = 1 octet = 8 bits.
- An IPv4 address is 32 bits (4 bytes); an IPv6 address is 128 bits (16 bytes).
- Example IPv6 address: `fe80::6512:9f05:ccd3:513a`

---

**Next Section**: [Week 02 — Introducing Windows Server 2012 R2](week02-introducing-server-2012r2.md)