---
title: Ruby
layout: page
links:
    - title: Official website
      url: https://www.ruby-lang.org/
tags:
    - language
configuration: 
    gems:
        description: List of gems to install globally on the system
        type: array
        default: []
        required: false
---
A dynamic, open source programming language with a focus on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write.

## Example

    services:
      ruby: '*'
    configuration:
      ruby:
        gems:
          - compass

Add ruby support to allow install of Gem packages (globally) on the system.