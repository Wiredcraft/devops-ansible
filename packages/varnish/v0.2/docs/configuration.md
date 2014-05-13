---
title: Varnish
layout: page
links:
    - title: Official website
      url: https://www.varnish-cache.org/
configuration: 
    vcl_conf:
        default: /etc/varnish/default.vcl
        description: Main configuration file.
        type: string
        required: false
    listen_address:
        default: ''
        description: "Blank address means all IPv4 and IPv6 interfaces, otherwise specify a host name, an IPv4 dotted quad."
        type: string
        required: false
    listen_port:
        default: 6081
        description: Listen port.
        type: integer
        required: false
        minimum: 1
        maximum: 65536
    admin_listen_address:
        default: 127.0.0.1
        description: "Telnet admin interface listen address, usually only bind localhost IP address for the admin interface."
        type: string
        required: false
    admin_listen_port:
        default: 6082
        description: Telnet admin interface listen port.
        type: integer
        required: false
        minimum: 1
        maximum: 65536
    secret_file:
        default: /etc/varnish/secret
        description: File containing administration secret.
        type: string
        required: false
    min_threads:
        default: "1"
        description: The minimum number of worker threads to start.
        type: integer
        required: false
        minimum: 1
    max_threads:
        default: 1000
        description: The maximum number of worker threads to start.
        type: integer
        required: false
        minimum: 1
    thread_timeout:
        default: 120
        description: Idle timeout for worker threads.
        type: integer
        required: false
        minimum: 1
    storage_type:
        default: malloc
        description: "Store objects either in memory (malloc), on in a file (file)."
        type: string
        required: false
        enum:
            - malloc
            - file
    storage_file:
        default: /var/lib/varnish/$INSTANCE/varnish_storage.bin
        description: "Storage file, only used if storage_type is file."
        type: string
        required: false
    storage_size:
        default: 256M
        description: "Cache size: in bytes, optionally using k / M / G / T suffix."
        type: string
        required: false
        regex: '/^\d+[kMGT]$/'
    ttl:
        default: 120
        description: Default TTL used when the backend does not specify one.
        type: integer
        required: false
        minimum: 1
---
Varnish is a web application accelerator. You install it in front of your web application and it will speed it up significantly.

## Example

    services:
      varnish: '*'
    configuration:
      varnish:
        listen_port: 80
        listen_address: 0.0.0.0
        storage_type: malloc
        storage_size: 512M

Install Varnish on the node, making it listen on all interfaces (0.0.0.0) and on TCP/80. The cache is set to be held in RAM (Malloc) for a maximum size of 512MB.