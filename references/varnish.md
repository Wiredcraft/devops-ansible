---
configuration:
  admin_listen_address:
    default: 127.0.0.1
    description: Telnet admin interface listen address, usually only bind localhost
      IP address for the admin interface.
    required: false
    type: string
  admin_listen_port:
    default: 6082
    description: Telnet admin interface listen port.
    maximum: 65536
    minimum: 1
    required: false
    type: integer
  listen_address:
    default: ''
    description: Blank address means all IPv4 and IPv6 interfaces, otherwise specify
      a host name, an IPv4 dotted quad.
    required: false
    type: string
  listen_port:
    default: 6081
    description: Listen port.
    maximum: 65536
    minimum: 1
    required: false
    type: integer
  max_threads:
    default: 1000
    description: The maximum number of worker threads to start.
    minimum: 1
    required: false
    type: integer
  min_threads:
    default: '1'
    description: The minimum number of worker threads to start.
    minimum: 1
    required: false
    type: integer
  secret_file:
    default: /etc/varnish/secret
    description: File containing administration secret.
    required: false
    type: string
  storage_file:
    default: /var/lib/varnish/$INSTANCE/varnish_storage.bin
    description: Storage file, only used if storage_type is file.
    required: false
    type: string
  storage_size:
    default: 256M
    description: 'Cache size: in bytes, optionally using k / M / G / T suffix.'
    regex: /^\d+[kMGT]$/
    required: false
    type: string
  storage_type:
    default: malloc
    description: Store objects either in memory (malloc), on in a file (file).
    enum:
    - malloc
    - file
    required: false
    type: string
  thread_timeout:
    default: 120
    description: Idle timeout for worker threads.
    minimum: 1
    required: false
    type: integer
  ttl:
    default: 120
    description: Default TTL used when the backend does not specify one.
    minimum: 1
    required: false
    type: integer
  vcl_conf:
    default: /etc/varnish/default.vcl
    description: Main configuration file.
    required: false
    type: string
include:
  menu_manual: manual.html
links:
- title: Official website
  url: https://www.varnish-cache.org/
tags:
- caching
template: page.html
title: Varnish

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
## Tasks
### restart
# Task Restart

Restart Varnish

### reload
# Task Reload

Reload Varnish config

### start
# Task Start

Start Varnish

### stop
# Task Stop

Stop Varnish
