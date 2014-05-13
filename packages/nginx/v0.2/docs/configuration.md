---
title: Nginx
layout: page
links:
    - title: Official website
      url: http://wiki.nginx.org/Main
configuration: 
    user:
        default: www-data
        description: Nginx running user.
        type: string
        required: false
    worker_processes:
        default: 4
        description: Number of Nginx processes
        type: integer
        required: false
        minimum: 1
    pid:
        default: /var/run/nginx.pid
        description: Pid file path
        type: string
        required: false
    events:
        worker_connections:
            default: 1024
            description: Number of concurrent http connection handled per nginx process
            type: integer
            required: false
            minimum: 1
    http:
        sendfile:
            default: "on"
            description: Enable sendfile
            type: string
            required: false
        tcp_nopush:
            default: "on"
            description: Enable tcp_nopush
            type: string
            required: false
        tcp_nodelay:
            default: "on"
            description: Enable tcp_nodelay
            type: string
            required: false
        keepalive_timeout:
            default: 65
            description: Keepalive timeout (sec) - 0 to disable
            type: integer
            required: false
            minimum: 0
        types_hash_max_size:
            default: 2048
            description: Maximum size of hash tables
            type: integer
            required: false
            minimum: 0
        access_log:
            default: /var/log/nginx/access.log
            description: Global access log file path
            type: string
            required: false
        error_log:
            default: /var/log/nginx/error.log
            description: Global error log file path
            type: string
            required: false
        gzip:
            default: "on"
            description: Enable gzip compression
            type: string
            required: false
        gzip_disable:
            default: "msie6"
            description: Space separated list of browser to disable gzip compression for
            type: string
            required: false
---
High performance HTTP server.

## Example

    services:
      nginx: '*'
    configuration:
      nginx:
        worker_processes: 1

Install Nginx on the node, but spawn 1 worker only instead of 4 (default).

Managing virtual hosts and domains is handled by dedicated tasks.
