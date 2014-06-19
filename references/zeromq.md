---
configuration: {}
include:
  menu_manual: manual.html
links:
- title: Official website
  url: http://zeromq.org/
tags:
- messagebus
template: page.html
title: ZeroMQ

---
ØMQ (also spelled ZeroMQ, 0MQ or ZMQ) is a high-performance asynchronous messaging library aimed at use in scalable distributed or concurrent applications. It provides a message queue, but unlike message-oriented middleware, a ØMQ system can run without a dedicated message broker. The library is designed to have a familiar socket-style API.

ØMQ is developed by a large community of contributors, founded by iMatix, which holds the domain name and trademarks. There are third-party bindings for many popular programming languages.

## Example

    services:
      zeromq: '*'

Install the ZeroMQ libraries on the node.