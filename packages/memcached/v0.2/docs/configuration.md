---
title: Memcached
layout: page
links:
    - title: Official website
      url: http://memcached.org/
configuration: 
    user:
        default: memcache
        description: Memcached running user.
        type: string
        required: false
    enable:
        default: "yes"
        description: Enable or disable memcached service.
        type: string
        required: false
        enum:
            - "yes"
            - "no"
    logfile:
        default: /var/log/memcached.log
        description: Log file path
        type: string
        required: false
    memory:
        default: 64
        description: Amount of memory allocated in MB.
        type: integer
        required: false
        minimum: 0
    port:
        default: 11211
        description: Connection port.
        type: integer
        required: false
        minimum: 1025
        maximum: 65536
    listen:
        default: 127.0.0.1
        description: Binding IP address.
        type: string
        required: false
    connection:
        default: 1024
        description: Maximumum number of concurrent inbound connections.
        type: integer
        required: false
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