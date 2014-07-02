---
title: ElasticSearch
tags:
    - database
    - full text
documentation: http://www.elasticsearch.org/guide/

configuration: 
    bind_host:
        default: '127.0.0.1'
        description: The IP address to bind to.
        type: string
        required: false
    http_port:
        default: 9200
        description: Listening port for HTTP traffic
        type: integer
        required: false
        minimum: 1025
        maximum: 65536
    transport_port:
        default: 9300
        description: Listening port for inter-node traffic (cluster)
        type: integer
        required: false
        minimum: 1025
        maximum: 65536
    user:
        default: elasticsearch
        description: Running user for the elasticsearch process
        type: string
        required: false
    group:
        default: elasticsearch
        description: Running group for the elasticsearch process
        type: string
        required: false
    heap_size:
        default: 256m
        description: Heap size for the elasticsearch process (unit as 256m 1g)
        type: string
        required: false
    plugins:
        default: []
        type: array
        required: false
        description: List of extra plugins to install
---

## Example

    services:
      elasticsearch: '*'
    configuration:
      elasticsearch:
          bind_host: 0.0.0.0
          http_port: 9200
          heap_size: 4g

Install ElasticSearch on the node, make it listen on all interfaces (0.0.0.0), use the TCP/9200 port for the HTTP access and give the service a maximum of 4GB of RAM to operate.

Note that if your node does not have enough RAM the service will eventually crash.