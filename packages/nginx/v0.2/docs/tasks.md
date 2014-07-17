---
tasks:
- description: Start Nginx if stopped
  name: start
- description: Stop Nginx if started
  name: stop
- description: Reload Nginx, reload the configuration and perform a graceful restart
  name: reload
- description: Restart Nginx, reload the configuration (but kills existing connection)
  name: restart
- description: Defines a HTTP virtual host in Nginx config
  name: vhost add
  options:
    aliases:
      description: space separated list of domain name aliases
      required: false
      type: string
    domain:
      description: domain name
      required: true
      type: string
    port:
      description: listening port
      required: true
      type: integer
    routes:
      description: list of route objects
      required: true
      type: array
      options:
        uri:
          description: Any string / regex that nginx understand as a `location`
          required: true
          type: string
          valid_values: Any string including regex
        type:
          description: The type of handler for that route
          required: true
          type: string
          valid_values: Either of proxy / fastcgi / websocket / uwsgi / static
        to:
          description: Either an upstream name, or a service / url, or a path
          required: true
          type: string
        custom:
          description: Custom inline nginx config to include within the route (e.g. auth, custom timeout)
          required: false
          type: string
        static:
          description: For type static only, define how to consider the source folder - alias or root
          required: false
          type: string
          default: root
          valid_values: Either of alias / root
    upstreams:
      description: list of upstream objects
      required: false
      type: array      
      options:
        name:
          description: Name of the upstream - it must be unique on the entire node
          required: true
          type: string
          valid: Unique name on the node
        backends:
          description: List of backends associated with the upstream
          required: true
          type: array
          valid: TCP URL and Unix socket path
    webroot:
      description: subfolder to serve data from based on the root /var/www/_domain_
      required: false
      type: string

---