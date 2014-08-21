---
title: Nginx
tags:
    - web
documentation: http://wiki.nginx.org/Modules

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
    vhosts:
        default: []
        description: Array of virtual hosts objects
        required: false
        type: array
        object_id: vhost

objects:
    vhost:
        description: A virtual host object.
        options:
            id:
                description: Virtual host identifier, used to perform lookup in the vhosts array. Also used to name the configuration files and the default web root.
                required: false
                type: string
            aliases:
                description: Space separated list of domain name aliases
                required: false
                type: string
            domain:
                description: Primary domain name, use '_' as wildcard to respond to every domain / IP
                required: false
                default: _
                type: string
            port:
                description: Listening port (TCP/80 by default, TCP/443 if SSL is enabled)
                required: false
                default: 80
                type: integer
            ssl:
                description: Enable HTTPS
                required: false
                options:
                    certificate:
                        description: HTTPS certificate file path (chained if needed)
                        required: false
                        default: /etc/nginx/ssl/{domain}.pem
                        type: string
                    private_key:
                        description: Private key file path used to generate the certificate (password-less)
                        required: false
                        default: /etc/nginx/ssl/{domain}.key
                        type: string          
            routes:
                description: List of route objects. The order matters and the routes will be applied sequentially.
                required: true
                type: array
                object_id: route
            upstreams:
                description: list of upstream objects
                required: false
                type: array
                object_id: upstream
            webroot:
                description: Subfolder to serve data from based on the root /var/www/_vhost_id_
                required: false
                type: string
            support:
                description: List of technologies the vhost will support (only 'php' for the moment)
                required: false
                type: array
    route:
        description: A route object used in a vhost.
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
                required: false
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
    upstream:
        description: An upstream object used in a vhost.
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


---
