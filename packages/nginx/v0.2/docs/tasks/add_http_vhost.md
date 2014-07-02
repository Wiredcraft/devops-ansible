---
description: Defines a HTTP virtual host in Nginx config
options:
  domain: 
    type: string
    description: domain name
    required: true
  aliases:
    type: string
    description: space separated list of domain name aliases
    required: false
  port:
    type: int
    description: listening port
    required: true
  webroot:
    type: string
    description: subfolder to serve data from based on the root /var/www/_domain_
    required: false
  upstreams:
    type: array
    description: list of upstream objects
    required: false
  routes:
    type: array
    description: list of route objects
    required: true
---

#### Example in a devops task

    steps:
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

