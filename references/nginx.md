---
configuration:
  events:
    worker_connections:
      default: 1024
      description: Number of concurrent http connection handled per nginx process
      minimum: 1
      required: false
      type: integer
  http:
    access_log:
      default: /var/log/nginx/access.log
      description: Global access log file path
      required: false
      type: string
    error_log:
      default: /var/log/nginx/error.log
      description: Global error log file path
      required: false
      type: string
    gzip:
      default: 'on'
      description: Enable gzip compression
      required: false
      type: string
    gzip_disable:
      default: msie6
      description: Space separated list of browser to disable gzip compression for
      required: false
      type: string
    keepalive_timeout:
      default: 65
      description: Keepalive timeout (sec) - 0 to disable
      minimum: 0
      required: false
      type: integer
    sendfile:
      default: 'on'
      description: Enable sendfile
      required: false
      type: string
    tcp_nodelay:
      default: 'on'
      description: Enable tcp_nodelay
      required: false
      type: string
    tcp_nopush:
      default: 'on'
      description: Enable tcp_nopush
      required: false
      type: string
    types_hash_max_size:
      default: 2048
      description: Maximum size of hash tables
      minimum: 0
      required: false
      type: integer
  pid:
    default: /var/run/nginx.pid
    description: Pid file path
    required: false
    type: string
  user:
    default: www-data
    description: Nginx running user.
    required: false
    type: string
  worker_processes:
    default: 4
    description: Number of Nginx processes
    minimum: 1
    required: false
    type: integer
include:
  menu_manual: manual.html
links:
- title: Official website
  url: http://wiki.nginx.org/Main
tags:
- web
template: page.html
title: Nginx

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

## Tasks
### restart
# Task Restart

Restart Nginx

### reload
# Task Reload

Reload Nginx config

### start
# Task Start

Start Nginx

### stop
# Task Stop

Stop Nginx

### add http vhost
# vhost add

Ensure a HTTP virtual host is defined in the node, creating it and restarting nginx if needed

# Example in a devops task

    do:
      - run: devops nginx vhost add
        options:
          domain: example.com
          aliases: www.example.com
          port: 80
          webroot: html
          upstreams:
            - name: my_backend
              backends:
                - http://localhost:9000
                  unix:///var/run/file.sock
          routes:
            - uri: /
              type: proxy
              to: my_backend
              custom: >
                some_custom_nginx;
                configuration...;

Name | Type | Required | Default |Description
----|----|----|----|----|----
domain | string | True | | The domain name the host will reply to
aliases | string / array | False | | The list of domain aliases the vhost will reply to
port | int | True | | The HTTP port
webroot | string | False | '' | The subfolder to serve data from based on the root /var/www/_domain_
upstreams | array | False | | Beware the upstreams can only be specified once and will be shared across all the vhosts
routes | array of route | True | | Sorted list of URI and their handlers

Format of a route:

Name | Type | Required | Default | Valid Values | Description
----|----|----|----|----|----
uri | string | True | | Any string including regex | Any string / regex that nginx understand as a `location`
type | string | True | | proxy / fastcgi / websocket / uwsgi / static | The type of handler for that route
to | string | True | | | Either an upstream name, or a service / url, or a path
custom | string | False | | | Custom inline nginx config to include within the route (e.g. auth, custom timeout)
static | string | False | root | alias / root | For type static only, define how to consider the source folder - alias or root

