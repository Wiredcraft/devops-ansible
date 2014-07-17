---
title: MongoDB
tags:
    - database
    - nosql
documentation: http://docs.mongodb.org/manual/

configuration: 
    user:
        default: mongodb
        description: Mongodb running user.
        type: string
        required: false
    enable:
        default: "yes"
        description: Enable or disable mongodb service.
        type: string
        required: false
        enum:
            - "yes"
            - "no"
    dbpath:
        default: /var/lib/mongodb
        description: Database files path.
        type: string
        required: false
    logpath:
        default: /var/log/mongodb/mongodb.log
        description: Database log file path.
        type: string
        required: false
    bindip:
        default: 127.0.0.1
        description: Binding IP address.
        type: string
        required: false
    port:
        default: 27017
        description: Connection port.
        type: integer
        required: false
        minimum: 1025
        maximum: 65536
    nohttp:
        default: "false"
        description: Disable entirely the HTTP interface.
        type: string
        required: false
        enum:
            - "true"
            - "false"
    enable_rest:
        default: false
        description: Enable REST over the HTTP interface
        type: boolean
        required: false
---