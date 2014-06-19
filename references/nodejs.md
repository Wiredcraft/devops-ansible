---
configuration:
  packages:
    default: []
    description: List of packages to have globally installed on the server
    required: false
    type: array
include:
  menu_manual: manual.html
links:
- title: Official website
  url: http://nodejs.org/
tags:
- language
template: page.html
title: Node.js

---
Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.

## Example

    services:
      nodejs: '*'
    configuration:
      nodejs: 
        packages:
          - forever
          - bower
          - grunt-cli

Install Node.js on the node, and install globally `forever`, `bower` and `grunt-cli` (as in `npm install -g xxx`).
## Tasks
### restart
# Task Restart

Restart node.js forever service

### add app
# Task Add_app

### start
# Task Start

Start node.js forever service

### stop
# Task Stop

Stop node.js forever service
