---
title: Node.js
tags:
    - language
documentation: http://nodejs.org/api/

configuration: 
    packages: 
        description: List of packages to have globally installed on the server
        type: array
        default: []
        required: false
---

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