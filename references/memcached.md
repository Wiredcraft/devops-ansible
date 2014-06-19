---
configuration:
  connection:
    default: 1024
    description: Maximumum number of concurrent inbound connections.
    required: false
    type: integer
  enable:
    default: 'yes'
    description: Enable or disable memcached service.
    enum:
    - 'yes'
    - 'no'
    required: false
    type: string
  listen:
    default: 127.0.0.1
    description: Binding IP address.
    required: false
    type: string
  logfile:
    default: /var/log/memcached.log
    description: Log file path
    required: false
    type: string
  memory:
    default: 64
    description: Amount of memory allocated in MB.
    minimum: 0
    required: false
    type: integer
  port:
    default: 11211
    description: Connection port.
    maximum: 65536
    minimum: 1025
    required: false
    type: integer
  user:
    default: memcache
    description: Memcached running user.
    required: false
    type: string
include:
  menu_manual: manual.html
links:
- title: Official website
  url: http://memcached.org/
tags:
- caching
template: page.html
title: Memcached

---
Free & open source, high-performance, distributed memory object caching system, generic in nature, but intended for use in speeding up dynamic web applications by alleviating database load.

Memcached is an in-memory key-value store for small chunks of arbitrary data (strings, objects) from results of database calls, API calls, or page rendering.

Memcached is simple yet powerful. Its simple design promotes quick deployment, ease of development, and solves many problems facing large data caches. Its API is available for most popular languages.

## Example

    services:
      memcached: '*'
    configuration:
      memcached:
        memory: 128
        port: 11212

Install Memcached on the node, allocate 128MB of RAM to the service and make it listen on port TCP/11212
## Tasks
### restart
# Task Restart

Restart Memcached

### reload
# Task Reload

### start
# Task Start

Start Memcached

### stop
# Task Stop

Stop Memcached
