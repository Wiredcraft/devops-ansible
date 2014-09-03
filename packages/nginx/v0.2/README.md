# Virtual Hosts

In practive virtual hosts allows you to compartment your web files and allow you to run different domains at the same time on the same host.

## Default web roots

The default web roots are created based on the vhost id supploed on creation:

    /var/www/{vhost_id}

Sometime your public files are hosted in a subfolder of the main web root (e.g. `public`), in that case you want to use the `webroot` parameter in the vhost definition. It will be appended to the main webroot. For example, with the following configuration:

    configuration:
      nginx:
        vhosts:
          - id: my_vhost
            webroot: public

The root will be set to `/var/www/my_vhost/public`

## Routes

Routes define how the web server will handle the requests based on the `uri` provided in the request. You can read more about the routes objects below.

Routes will define the `locations` within the nginx configuration file. The order matters, the 1st routes will be processed before the last ones.

There is several types of routes:

- custom (default): allows you to fully specify the content of the location. It usually goes along with the `custom` property where you can specify exactly the content.
- fastcgi: will send the request to a fastcgi backend or upstream. It usually applies to PHP.
- proxy: will send the request to a http proxy, eiter local or remote. It usually applies to backend services like a node.js process, a django service (running as http), etc.
- websocket: will assume the request is meant to be processed as websocket traffic. It will change several of the headers.
- uwsgi: will send the request to a uwsgi service. It typically applies to Python apps.
- static: will simply consider the traffic to be served as-is, and that the files do not require any processing.

## Supported technologies

An extra attribute `support` is available in the definition of a _vhost_; it should list the technologies that this vhost needs to support. 

Currently only `php` is relevant and will change the behavior of the vhost by ensuring the `index` includes `index.php` along with the `index.html` and `index.htm`.

## Example

The following configuration snippet:

    configuration:
      nginx:
        vhosts:
          - id: my_vhost
            port: 8080
            domain: mydomain.com
            aliases: alias.mydomain.com alias2.mydomain.com
            webroot: public
            support:
              - php
            routes:
              - uri: '@php'
                type: fastcgi
                to: localhost:9001
              - uri: '~ ^/(app|app_dev|config)\.php(/|$)'
                type: custom
                custom: >
                  try_files $uri @php

Will generate the following config file in `/etc/nginx/sites-available/my_vhost` (also linked and enabled in `sites-enabled`):

    server {
        listen   8080;
        root /var/www/my_vhost/public;

        index index.php index.html index.htm;

        access_log /var/log/nginx/my_vhost-access.log;
        error_log /var/log/nginx/my_vhost-error.log;

        # Make site accessible from http://localhost/
        # server_name _;
        server_name mydomain.com alias.mydomain.com alias2.mydomain.com;

        location @php {
            # Route type: fastcgi
            fastcgi_pass localhost:9001;
            fastcgi_split_path_info ^(.+\.php)(/.+)$;
            # NOTE: You should have "cgi.fix_pathinfo = 0;" in php.ini
            fastcgi_index index.php; 
            include fastcgi_params;
        }

        location ~ ^/(app|app_dev|config)\.php(/|$) {
            # Route type: custom
            try_files $uri @php
        }
    }

