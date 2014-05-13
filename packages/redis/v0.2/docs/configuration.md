---
title: Redis
layout: page
links:
    - title: Official website
      url: http://redis.io/
configuration: 
    port:
        default: 6379
        description: Connection port.
        type: integer
        required: false
        minimum: 1025
        maximum: 65536
    bind:
        default: 127.0.0.1
        description: Binding IP address.
        type: string
        required: false
    timeout:
        default: 0
        description: Close the connection after a client is idle for N seconds (0 to disable)
        type: integer
        required: false
    databases:
        default: 1
        description: Number of databases within the redis server
        type: integer
        required: false
        minimum: 1
        maximum: 16
    loglevel:
        default: notice
        description: Server log verbosity
        type: string
        required: false
        enum:
            - debug
            - verbose
            - notice
            - warning
    logfile:
        default: /var/log/redis/redis-server.log
        description: Server log file
        type: string
        required: false
    syslog:
        enable:
            default: "no"
            description: Send log to syslog
            type: string
            required: false
            enum:
                - "no"
                - "yes"
        ident:
            default: redis
            description: Syslog identity
            type: string
            required: false
        facility:
            default: local0
            description: Syslog facility
            type: string
            required: false
            enum:
                - user
                - local0
                - local1
                - local2
                - local3
                - local4
                - local5
                - local6
                - local7
    snapshotting:
        save:
            default:
                - seconds: 900
                  changes: 1
                - seconds: 300
                  changes: 10
                - seconds: 60
                  changes: 10000
            description: Array of save rules including seconds and number of changes that trigger a save
            type: array
            required: false
        rdbcompression:
            default: "yes"
            description: Enable database compression
            type: string
            required: false
            enum:
                - "yes"
                - "no"
        rdbchecksum:
            default: "yes"
            description: Enable database checksum (use ~10% extra CPU)
            type: string
            required: false
            enum:
                - "yes"
                - "no"
        dbfilename:
            default: dump.rdb
            description: Filename where to dump the DB
            type: string
            required: false
        dir:
            default: /var/lib/redis
            description: Folder where to store the snapshots
            type: string
            required: false
    replication:
        is_slave:
            default: no
            description: Is this redis instance a slave?
            type: string
            required: false
            enum:
                - no
                - yes
        masterip:
            default: ''
            description: IP or host of the master server
            type: string
            required: false
        masterport:
            default: 6379
            description: Redis port of the master server
            type: integer
            required: false
        masterauth:
            default: null
            description: Redis master auth password (if required)
            type: string
            required: false
        serve_stale_data:
            default: 'yes'
            description: Slave redis serves stale data if the connection is lost with the master
            type: string
            required: false
            enum:
                - 'yes'
                - 'no'
        read_only:
            default: 'yes'
            description: Make the slave server read-only (preferred option)
            type: string
            required: false
            enum:
                - 'yes'
                - 'no'
        ping_slave_period:
            default: 10
            description: Frequency (in sec) to ping the master server as health check
            type: integer
            required: false
            minimum: 1
        timeout:
            default: 60
            description: Timeout to Bulk IO transfer and ping response to mark the master as unreachable
            type: integer
            required: false
            minimum: 1
        priority:
            default: 100
            description: Slave priority
            type: integer
            required: false
            minimum: 1
    security:
        requirepass:
            default: null
            description: Require a password to connect (either client or slave)
            type: string
            required: false
    limits:
        maxclients:
            default: 10000
            description: Max number of clients connected
            type: integer
            required: false
        maxmemory:
            default: null
            description: Maximum RAM used by Redis to store data (no limit by default) in bytes
            type: integer
            required: false
        policy:
            default: volatile-lru
            description: Define how Redis will remove keys when maxmemory is reached
            type: string
            required: false
            enum:
                - volatile-lru
                - allkeys-lru
                - volatile-random
                - allkeys-random
                - volatile-ttl
                - noeviction
        samples:
            default: 3
            description: Sample size to use to base the policy eviction for LRU and TTL policy algorithms
            type: integer
            required: false
    aom:
        enable:
            default: 'no'
            description: Enable Append Only Mode
            type: string
            required: false
            enum:
                - 'no'
                - 'yes'
        filename:
            default: appendonly.aof
            description: Name of the append only file
            type: string
            required: false
        fsync:
            default: everysec
            description: Fsync mode to sync the append only file
            type: string
            required: false
            enum:
                - everysec
                - always
                - no
        no_appendfsync_on_rewrite:
            default: 'no'
            description: Define whether to (not) append fsync operations if another fsync op is already in progress
            type: string
            required: false
            enum:
                - 'no'
                - 'yes'
        aof_rewrite_percentage:
            default: 100
            description: Automatically trigger AOF rewrite if the AOF grows by more of the specified percentage (0 to disable)
            type: integer
            minimum: 0
            maximum: 100
        aof_rewrite_min_size:
            default: 64mb
            description: Minimum size of the AOF to consider auto rewrite of the AOF based on the percentage
            type: string
            required: false
    lua:
        time_limit:
            default: 5000
            description: Time limit (in ms) for the execution of a LUA script
            type: integer
            minimum: 1
    slowlog:
        log_slower_than:
            default: 10000
            description: Execution time in microsecond to catpure the slow logs; negative value to disable; 0 to log all queries
            type: integer
            required: false
        max_len:
            default: 128
            description: Length of the slow log to capture (FIFO based)
            type: integer
            required: false
            minimum: 1
---
Redis is an open source, BSD licensed, advanced key-value store. It is often referred to as a data structure server since keys can contain strings, hashes, lists, sets and sorted sets.

## Example

    services:
      redis: '*'
    configuration:
      redis:
        port: 16379
        bind: 0.0.0.0

Install Redis on the node, making it listen on all interfaces (0.0.0.0) and on port TCP/16379 instead of TCP/6379 default.
