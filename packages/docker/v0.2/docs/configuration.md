---
title: Docker
layout: page
links:
    - title: Official website
      url: https://www.docker.io/
configuration: {}
---
Docker is an open-source project to easily create lightweight, portable, self-sufficient containers from any application. The same container that a developer builds and tests on a laptop can run at scale, in production, on VMs, bare metal, OpenStack clusters, public clouds and more.

## Example

    services:
      docker: '*'

Add support for Docker containers on the node.

Note that the server will be restarted in order to apply the proper option to the kernel.