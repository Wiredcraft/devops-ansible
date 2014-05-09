---
title: OpenVPN
layout: page
links:
    - title: Official website
      url: http://openvpn.net/
configuration: 
    port:
        default: 1194
        description: Listening port
        type: integer
        required: false
        minimum: 1025
        maximum: 65536
    proto:
        default: udp
        description: Protocol
        type: string
        enum:
            - udp
            - tcp
        required: false
    dev:
        default: tun
        description: Device type
        type: string
        enum:
            - tun
            - tap
        required: false
    network:
        default: 10.8.0.0
        description: Network IP range for clients
        type: string
        required: false
    netmask:
        default: 255.255.255.0
        description: Netmask to apply on IP range for clients
        type: string
        required: false
    dns1:
        default: 208.67.222.222
        description: DNS to propagate to the clients (default to OpenDNS)
        type: string
        required: false
    dns2:
        default: 208.67.220.220
        description: DNS to propagate to the clients (default to OpenDNS)
        type: string
        required: false
    cipher:
        default: BF-CBC
        description: cipher
        type: string
        enum:
            - BF-CBC
            - AES-128-CBC
            - DES-EDE3-CBC
        required: false
    max_client:
        default: 100
        description: Maximum number of simultaneous clients
        type: integer
        required: false
    user:
        default: nobody
        description: Running user of openvpn (must exist)
        type: string
        required: false
    group:
        default: nogroup
        description: Running group of openvpn (must exist)
        type: string
        required: false
    key:
        key_size:
            default: 1024
            description: Increase key size if you are paranoid; it will slow down TLS negociation
            type: integer
            required: false
        ca_expire:
            default: 3650
            description: CA validity period (in days)
            type: integer
            required: false
        key_expire:
            default: 3650
            description: Key validity period (in days)
            type: integer
            required: false
        country:
            default: US
            description: Key country
            type: string
            required: false
        province:
            default: CA
            description: Key province
            type: string
            required: false
        city:
            default: SanFrancisco
            description: Key city
            type: string
            required: false
        org:
            default: Fort-Funston
            description: Key Organization
            type: string
            required: false
        email:
            default: admin@server
            description: Key email
            type: string
            required: false
        common_name:
            default: server
            description: Key Common Name (CN)
            type: string
            required: false
        name:
            default: server
            description: Key name
            type: string
            required: false
        org_unit:
            default: server
            description: Key Organization Unit (OU)
            type: string
            required: false
---
SSL/TLS based user-space VPN. Supports Linux, Solaris, OpenBSD, FreeBSD, NetBSD, Mac OS X, and Windows 2000/XP.

## Configuration example

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