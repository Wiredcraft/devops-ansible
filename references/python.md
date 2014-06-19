---
configuration:
  packages:
    default: []
    description: List of pip packages to install globally on the system
    required: false
    type: array
include:
  menu_manual: manual.html
links:
- title: Official website
  url: https://www.python.org/
tags:
- language
template: page.html
title: Python

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