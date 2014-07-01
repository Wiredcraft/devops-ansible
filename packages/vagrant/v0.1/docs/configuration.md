---
title: Vagrant
tags:
    - virtualbox
    - vm
documentation: http://docs.vagrantup.com/v2/

configuration: {}
---
Vagrant is a tool for building complete development environments. With an easy-to-use workflow and focus on automation, Vagrant lowers development environment setup time, increases development/production parity, and makes the "works on my machine" excuse a relic of the past.

## Example

    services:
      vagrant: '*'

Install the following on the node:

- Virtualbox 4.3
- Vagrant 1.6.3

## Note

Virtualbox may not be supported on all platforms, some cloud providers may lack the required CPU flags to make it run properly.

Hardware nodes that have been linked are generally better supported.