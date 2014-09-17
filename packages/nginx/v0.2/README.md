Nginx is an open source reverse proxy server for HTTP, HTTPS, SMTP, POP3, and IMAP protocols, as well as a load balancer, HTTP cache, and a Web server.

## Examples

* ### PHP app

  ```example
  configuration:
    nginx:
      vhosts:
        - id: my_vhost_php
          domain: mydomain.com
          indexes: index.php
          routes:
            - uri: '~ \.php$'
              type: fastcgi
              to: localhost:9001
  ```

  We here define a vhost that will answer to the `mydomain.com` domain and will pass all requests which URL ends up with `.php` to a `fastcgi` process listening on `http://localhost:9001` (Typically a php-fpm process).

  This configuration will generate the following Nginx configuration file (also linked and enabled in `sites-enabled`):

  #### /etc/nginx/sites-available/my_vhost_php

  ```snippet
  server {
      listen   80;
      root /var/www/my_vhost_php;

      index index.php index.html index.htm;

      access_log /var/log/nginx/my_vhost_php-access.log;
      error_log /var/log/nginx/my_vhost_php-error.log;

      # Make site accessible from http://localhost/
      # server_name _;
      server_name mydomain.com;

      location ~ \.php$ {
          # Route type: fastcgi
          fastcgi_pass localhost:9001;
          fastcgi_split_path_info ^(.+\.php)(/.+)$;
          # NOTE: You should have "cgi.fix_pathinfo = 0;" in php.ini
          fastcgi_index index.php; 
          include fastcgi_params;
      }
  }
  ```

* ### Node.js app

  ```example
  configuration:
    nginx:
      vhosts:
        - id: my_vhost_node
          domain: mydomain.com
          routes:
            - uri: '/'
              type: proxy
              to: localhost:3000
  ```

  We here define a vhost that will answer to the `mydomain.com` domain and will proxy all requests to a http process listening on `http://localhost:3000` (Typically your Node.js service).

  #### /etc/nginx/sites-available/my_vhost_node

  ```snippet
  server {
      listen   80;
      root /var/www/my_vhost_node;

      index index.html index.htm;

      access_log /var/log/nginx/my_vhost_node-access.log;
      error_log /var/log/nginx/my_vhost_node-error.log;

      # Make site accessible from http://localhost/
      # server_name _;
      server_name mydomain.com;

      location / {
          # Route type: proxy
          proxy_pass localhost:3000;
          proxy_pass_header Set-Cookie;
      }
  }
  ```

## vhosts

Save for a few settings, you'll most likely end up adding vhosts to your Nginx configuration.

In a nutshell, each vhost defines a directory of files, where your application or Web site resides, and a list of domains associated with it. Whenever you add a vhost, we'll create a Web root associated with its id: `var/www/{vhost_id}` where `{vhost_id}` is the id of your vhost.

<em>You can use the `webroot` if you're serving files out of a sub-folder of the default Web root. For example, if you serve files out of the `public/` subfolder of your app, adding the `webroot: public` to your vhost will make it serve files out of the `/var/www/my_vhost/public` folder.</em>

## Routes

Routes allow you to define a list of ways to handle different types of requests, based on the `uri` (order matter, first routes in the list have precedence). These routes have a `type` attribute:

- `custom` (default): routes of this type have a `custom` attribute that will take the content of a regular [Nginx location block](http://nginx.org/en/docs/http/ngx_http_core_module.html#location).
- `fastcgi`: sends requests to a fastcgi backend or upstream. Common for **PHP apps**.
- `proxy`: sends requests to a http proxy (local or remote). Common for **node.js apps**.
- `websocket`: assumes requests are handled as websocket traffic.
- `uwsgi`: sends requests to a uwsgi service. Common for **Python apps**.
- `static`: serves files as static assets without any processing.

<em><strong>You can add supported technologies with the `support` attribute</strong>. This attribute willl help your vhost figure out what index to serve. By default it includes `index.html` and `index.html`, adding `php` to `support` will extend it to `index.php`.</em>
