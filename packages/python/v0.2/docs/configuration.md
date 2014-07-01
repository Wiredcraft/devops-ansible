---
title: Python
tags:
    - language
documentation: https://docs.python.org/2/

configuration: 
    packages:
        default: []
        description: List of pip packages to install globally on the system
        type: array
        required: false
---
Python is a programming language that lets you work quickly and integrate systems more effectively.

## Example

    services:
      python: '*'
    configuration:
      python:
        packages:
          - pyyaml

Add support for Python, allowing custom packages to be installed (globally) on the node.