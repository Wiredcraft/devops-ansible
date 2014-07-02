---
title: Vagrant
tags:
    - virtualbox
    - vm
documentation: http://docs.vagrantup.com/v2/

configuration: {}
---

## Example

    services:
      vagrant: '*'

Installs the following on the node:

- Virtualbox 4.3
- Vagrant 1.6.3

## Note

Virtualbox may not be supported on all platforms, some cloud providers may lack the required CPU flags to make it run properly.

Hardware nodes that have been linked are generally better supported.