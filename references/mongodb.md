---
configuration:
  bindip:
    default: 127.0.0.1
    description: Binding IP address.
    required: false
    type: string
  dbpath:
    default: /var/lib/mongodb
    description: Database files path.
    required: false
    type: string
  enable:
    default: 'yes'
    description: Enable or disable mongodb service.
    enum:
    - 'yes'
    - 'no'
    required: false
    type: string
  enable_rest:
    default: false
    description: Enable REST over the HTTP interface
    required: false
    type: boolean
  logpath:
    default: /var/log/mongodb/mongodb.log
    description: Database log file path.
    required: false
    type: string
  nohttp:
    default: 'false'
    description: Disable entirely the HTTP interface.
    enum:
    - 'true'
    - 'false'
    required: false
    type: string
  port:
    default: 27017
    description: Connection port.
    maximum: 65536
    minimum: 1025
    required: false
    type: integer
  user:
    default: mongodb
    description: Mongodb running user.
    required: false
    type: string
include:
  menu_manual: manual.html
links:
- title: Official website
  url: https://www.mongodb.org/
tags:
- database
template: page.html
title: MongoDB

---
MongoDB (from "humongous") is an open-source document database, and the leading NoSQL database. Written in C++.

## Example

    services:
      mongodb: '*'
    configuration:
      mongodb:
        bindip: 0.0.0.0
        port: 27018
        enable_rest: true

Install MongoDB on the node, make the service listen on all interfaces (0.0.0.0), change the listening port to TCP/27018 (instead of 27017 by default), and enable the REST interface (allowing REST api calls against the Mongo database)
## Tasks
### restart
# Task Restart

Restart MongoDB

### reload
# Task Reload

### start
# Task Start

Start MongoDB

### stop
# Task Stop

Stop MongoDB
