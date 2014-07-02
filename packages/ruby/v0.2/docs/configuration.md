---
title: Ruby
tags:
    - language
documentation: https://www.ruby-lang.org/en/documentation/

configuration: 
    gems:
        description: List of gems to install globally on the system
        type: array
        default: []
        required: false
---

## Example

    services:
      ruby: '*'
    configuration:
      ruby:
        gems:
          - compass

Add ruby support to allow install of Gem packages (globally) on the system.