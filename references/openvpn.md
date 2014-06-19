---
configuration:
  cipher:
    default: BF-CBC
    description: cipher
    enum:
    - BF-CBC
    - AES-128-CBC
    - DES-EDE3-CBC
    required: false
    type: string
  dev:
    default: tun
    description: Device type
    enum:
    - tun
    - tap
    required: false
    type: string
  dns1:
    default: 208.67.222.222
    description: DNS to propagate to the clients (default to OpenDNS)
    required: false
    type: string
  dns2:
    default: 208.67.220.220
    description: DNS to propagate to the clients (default to OpenDNS)
    required: false
    type: string
  group:
    default: nogroup
    description: Running group of openvpn (must exist)
    required: false
    type: string
  key:
    ca_expire:
      default: 3650
      description: CA validity period (in days)
      required: false
      type: integer
    city:
      default: SanFrancisco
      description: Key city
      required: false
      type: string
    common_name:
      default: server
      description: Key Common Name (CN)
      required: false
      type: string
    country:
      default: US
      description: Key country
      required: false
      type: string
    email:
      default: admin@server
      description: Key email
      required: false
      type: string
    key_expire:
      default: 3650
      description: Key validity period (in days)
      required: false
      type: integer
    key_size:
      default: 1024
      description: Increase key size if you are paranoid; it will slow down TLS negociation
      required: false
      type: integer
    name:
      default: server
      description: Key name
      required: false
      type: string
    org:
      default: Fort-Funston
      description: Key Organization
      required: false
      type: string
    org_unit:
      default: server
      description: Key Organization Unit (OU)
      required: false
      type: string
    province:
      default: CA
      description: Key province
      required: false
      type: string
  max_client:
    default: 100
    description: Maximum number of simultaneous clients
    required: false
    type: integer
  netmask:
    default: 255.255.255.0
    description: Netmask to apply on IP range for clients
    required: false
    type: string
  network:
    default: 10.8.0.0
    description: Network IP range for clients
    required: false
    type: string
  port:
    default: 1194
    description: Listening port
    maximum: 65536
    minimum: 1025
    required: false
    type: integer
  proto:
    default: udp
    description: Protocol
    enum:
    - udp
    - tcp
    required: false
    type: string
  user:
    default: nobody
    description: Running user of openvpn (must exist)
    required: false
    type: string
include:
  menu_manual: manual.html
links:
- title: Official website
  url: http://openvpn.net/
tags:
- app
template: page.html
title: OpenVPN

---
SSL/TLS based user-space VPN. Supports Linux, Solaris, OpenBSD, FreeBSD, NetBSD, Mac OS X, and Windows 2000/XP.

## Example

    services:
      openvpn: '*'
    configuration:
      openvpn:
        port: 6543
        proto: 'tcp'
        max_client: 10
        key:
          key_size: 2048
          email: me@example.com

Install OpenVPN on the node, configure the service so it listen on TCP/6543 (instead of regular UDP/1194), limit the number of concurrent clients to 10 and set the server's key to be 2048bits with a custom email in the certificate.

Note that the default values of the configuration will satisfy most of the use and those customization are more for advanced users.

The management of OpenVPN clients is handled by dedicated tasks.
## Tasks
### restart
# Task Restart

Restart OpenVPN

### reload
# Task Reload

### add user
# Task Add_user

Add a new OpenVPN client

### stop
# Task Stop

Stop OpenVPN

### start
# Task Start

Start OpenVPN
