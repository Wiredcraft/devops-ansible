---
tasks:
  - name: start
    description: Start MongoDB if stopped
  - name: stop
    description: Stop MongoDB if started
  - name: reload
    description: Reload MongoDB, reload the configuration and perform a graceful restart
  - name: restart
    description: Restart MongoDB, reload the configuration (but kills existing connection)
  - name: vhost add
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

### Options

#### Route object

Name | Type | Required | Default | Valid Values | Description
----|----|----|----|----|----
uri | string | True | | Any string including regex | Any string / regex that nginx understand as a `location`
type | string | True | | proxy / fastcgi / websocket / uwsgi / static | The type of handler for that route
to | string | True | | | Either an upstream name, or a service / url, or a path
custom | string | False | | | Custom inline nginx config to include within the route (e.g. auth, custom timeout)
static | string | False | root | alias / root | For type static only, define how to consider the source folder - alias or root

#### Upstream object

Name | Type | Required | Default | Valid Values | Description
----|----|----|----|----|----
name | string | True | | unique name on the node | Name of the upstream
backends | array | True | | TCP URL and Unix socket path | List of backends associated with the upstream

Note that the upstream name MUST be unique on the node.