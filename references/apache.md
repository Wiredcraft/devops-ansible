---
configuration:
  event:
    maxclients:
      default: 150
      description: Maximum number of simultaneous client connections
      minimum: 0
      required: false
      type: integer
    maxrequestsperchild:
      default: 0
      description: Maximum number of requests a server process serves.
      minimum: 0
      required: false
      type: integer
    maxsparethreads:
      default: 75
      description: Maximum number of worker threads which are kept spare.
      minimum: 0
      required: false
      type: integer
    minsparethreads:
      default: 25
      description: Minimum number of worker threads which are kept spare,
      minimum: 0
      required: false
      type: integer
    startservers:
      default: 5
      description: Initial number of server processes to start.
      minimum: 0
      required: false
      type: integer
    threadlimit:
      default: 64
      description: ThreadsPerChild can be changed to this maximum value during a graceful
        restart. ThreadLimit can only be changed by stopping and starting Apache.
      minimum: 0
      required: false
      type: integer
    threadsperchild:
      default: 25
      description: Constant number of worker threads in each server process.
      minimum: 0
      required: false
      type: integer
  group:
    default: www-data
    description: Apache running group.
    required: false
    type: string
  keepalive:
    default: true
    description: Whether or not to allow persistent connections.
    enum:
    - true
    - false
    - true
    - false
    required: false
    type: string
  keepalivetimout:
    default: 5
    description: Number of seconds to wait for the next request from the same client
      on the same connection.
    minimum: 0
    required: false
    type: integer
  maxkeepaliverequests:
    default: 100
    description: The maximum number of requests to allow during a persistent connection.
    minimum: 0
    required: false
    type: integer
  prefork:
    maxclients:
      default: 150
      description: Maximum number of server processes allowed to start.
      minimum: 0
      required: false
      type: integer
    maxrequestsperchild:
      default: 4000
      description: Maximum number of requests a server process serves.
      minimum: 0
      required: false
      type: integer
    maxspareservers:
      default: 10
      description: Maximum number of server processes which are kept spare.
      minimum: 0
      required: false
      type: integer
    minspareservers:
      default: 2
      description: Minimum number of server processes which are kept spare.
      minimum: 0
      required: false
      type: integer
    startservers:
      default: 5
      description: Number of server processes to start.
      minimum: 1
      required: false
      type: integer
  timeout:
    default: 300
    description: The number of seconds before receives and sends time out.
    minimum: 0
    required: false
    type: integer
  user:
    default: www-data
    description: Apache running user.
    required: false
    type: string
  worker:
    maxclients:
      default: 150
      description: Maximum number of simultaneous client connections
      minimum: 0
      required: false
      type: integer
    maxrequestsperchild:
      default: 0
      description: Maximum number of requests a server process serves.
      minimum: 0
      required: false
      type: integer
    maxsparethreads:
      default: 75
      description: Maximum number of worker threads which are kept spare.
      minimum: 0
      required: false
      type: integer
    minsparethreads:
      default: 25
      description: Minimum number of worker threads which are kept spare,
      minimum: 0
      required: false
      type: integer
    startservers:
      default: 5
      description: Initial number of server processes to start.
      minimum: 1
      required: false
      type: integer
    threadlimit:
      default: 64
      description: ThreadsPerChild can be changed to this maximum value during a graceful
        restart. ThreadLimit can only be changed by stopping and starting Apache.
      minimum: 0
      required: false
      type: integer
    threadsperchild:
      default: 25
      description: Constant number of worker threads in each server process.
      minimum: 0
      required: false
      type: integer
include:
  menu_manual: manual.html
links:
- title: Official website
  url: http://httpd.apache.org/
tags:
- web
template: page.html
title: Apache

---
The Number One HTTP Server On The Internet

The Apache HTTP Server Project is an effort to develop and maintain an open-source HTTP server for modern operating systems including UNIX and Windows NT. The goal of this project is to provide a secure, efficient and extensible server that provides HTTP services in sync with the current HTTP standards.

Apache httpd has been the most popular web server on the Internet since April 1996, and celebrated its 17th birthday as a project this February.

The Apache HTTP Server ("httpd") is a project of The Apache Software Foundation.

## Example

    services:
      apache: '*'
    configuration:
      apache:
        timeout: 60
        prefork:
          maxclients: 20
          maxrequestsperchild: 1000

Install Apache on the node, sets a timeout of 60 seconds on receive / send, set the prefork MPM to start at most 20 Apache child processes and ensure each Apache child process will handle at most 1000 requests before respawning.

## Tasks
### restart
# Restart

Do a full restart of the Apache service, killing existing HTTP connections.

For better user experience you may prefer the use of the `reload` task instead.

# Example in a devops task

    do:
      - run: devops apache restart

### reload
# Reload

Do a graceful restart of the Apache service, reloading the configuration.

# Example in a devops task

    do:
      - run: devops apache reload

### start
# Start

Start the Apache service, it does not do anything if it is already running.

# Example in a devops task

    do:
      - run: devops apache start

### stop
# Stop

Stop the Apache service, it does not do anything if it is already stopped.

# Example in a devops task

    do:
      - run: devops apache stop
