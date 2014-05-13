---
title: Node.js
layout: page
links:
    - title: Official website
      url: http://nodejs.org/
configuration: 
    packages: 
        description: List of packages to have globally installed on the server
        type: array
        default: []
        required: false
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