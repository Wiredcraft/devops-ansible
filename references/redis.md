---
configuration:
  aom:
    aof_rewrite_min_size:
      default: 64mb
      description: Minimum size of the AOF to consider auto rewrite of the AOF based
        on the percentage
      required: false
      type: string
    aof_rewrite_percentage:
      default: 100
      description: Automatically trigger AOF rewrite if the AOF grows by more of the
        specified percentage (0 to disable)
      maximum: 100
      minimum: 0
      type: integer
    enable:
      default: 'no'
      description: Enable Append Only Mode
      enum:
      - 'no'
      - 'yes'
      required: false
      type: string
    filename:
      default: appendonly.aof
      description: Name of the append only file
      required: false
      type: string
    fsync:
      default: everysec
      description: Fsync mode to sync the append only file
      enum:
      - everysec
      - always
      - false
      required: false
      type: string
    no_appendfsync_on_rewrite:
      default: 'no'
      description: Define whether to (not) append fsync operations if another fsync
        op is already in progress
      enum:
      - 'no'
      - 'yes'
      required: false
      type: string
  bind:
    default: 127.0.0.1
    description: Binding IP address.
    required: false
    type: string
  databases:
    default: 1
    description: Number of databases within the redis server
    maximum: 16
    minimum: 1
    required: false
    type: integer
  limits:
    maxclients:
      default: 10000
      description: Max number of clients connected
      required: false
      type: integer
    maxmemory:
      default: null
      description: Maximum RAM used by Redis to store data (no limit by default) in
        bytes
      required: false
      type: integer
    policy:
      default: volatile-lru
      description: Define how Redis will remove keys when maxmemory is reached
      enum:
      - volatile-lru
      - allkeys-lru
      - volatile-random
      - allkeys-random
      - volatile-ttl
      - noeviction
      required: false
      type: string
    samples:
      default: 3
      description: Sample size to use to base the policy eviction for LRU and TTL
        policy algorithms
      required: false
      type: integer
  logfile:
    default: /var/log/redis/redis-server.log
    description: Server log file
    required: false
    type: string
  loglevel:
    default: notice
    description: Server log verbosity
    enum:
    - debug
    - verbose
    - notice
    - warning
    required: false
    type: string
  lua:
    time_limit:
      default: 5000
      description: Time limit (in ms) for the execution of a LUA script
      minimum: 1
      type: integer
  port:
    default: 6379
    description: Connection port.
    maximum: 65536
    minimum: 1025
    required: false
    type: integer
  replication:
    is_slave:
      default: false
      description: Is this redis instance a slave?
      enum:
      - false
      - true
      required: false
      type: string
    masterauth:
      default: null
      description: Redis master auth password (if required)
      required: false
      type: string
    masterip:
      default: ''
      description: IP or host of the master server
      required: false
      type: string
    masterport:
      default: 6379
      description: Redis port of the master server
      required: false
      type: integer
    ping_slave_period:
      default: 10
      description: Frequency (in sec) to ping the master server as health check
      minimum: 1
      required: false
      type: integer
    priority:
      default: 100
      description: Slave priority
      minimum: 1
      required: false
      type: integer
    read_only:
      default: 'yes'
      description: Make the slave server read-only (preferred option)
      enum:
      - 'yes'
      - 'no'
      required: false
      type: string
    serve_stale_data:
      default: 'yes'
      description: Slave redis serves stale data if the connection is lost with the
        master
      enum:
      - 'yes'
      - 'no'
      required: false
      type: string
    timeout:
      default: 60
      description: Timeout to Bulk IO transfer and ping response to mark the master
        as unreachable
      minimum: 1
      required: false
      type: integer
  security:
    requirepass:
      default: null
      description: Require a password to connect (either client or slave)
      required: false
      type: string
  slowlog:
    log_slower_than:
      default: 10000
      description: Execution time in microsecond to catpure the slow logs; negative
        value to disable; 0 to log all queries
      required: false
      type: integer
    max_len:
      default: 128
      description: Length of the slow log to capture (FIFO based)
      minimum: 1
      required: false
      type: integer
  snapshotting:
    dbfilename:
      default: dump.rdb
      description: Filename where to dump the DB
      required: false
      type: string
    dir:
      default: /var/lib/redis
      description: Folder where to store the snapshots
      required: false
      type: string
    rdbchecksum:
      default: 'yes'
      description: Enable database checksum (use ~10% extra CPU)
      enum:
      - 'yes'
      - 'no'
      required: false
      type: string
    rdbcompression:
      default: 'yes'
      description: Enable database compression
      enum:
      - 'yes'
      - 'no'
      required: false
      type: string
    save:
      default:
      - changes: 1
        seconds: 900
      - changes: 10
        seconds: 300
      - changes: 10000
        seconds: 60
      description: Array of save rules including seconds and number of changes that
        trigger a save
      required: false
      type: array
  syslog:
    enable:
      default: 'no'
      description: Send log to syslog
      enum:
      - 'no'
      - 'yes'
      required: false
      type: string
    facility:
      default: local0
      description: Syslog facility
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
      required: false
      type: string
    ident:
      default: redis
      description: Syslog identity
      required: false
      type: string
  timeout:
    default: 0
    description: Close the connection after a client is idle for N seconds (0 to disable)
    required: false
    type: integer
include:
  menu_manual: manual.html
links:
- title: Official website
  url: http://redis.io/
tags:
- database
template: page.html
title: Redis

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

## Tasks
### restart
# Task Restart

Restart Redis Server

### reload
# Task Reload

### start
# Task Start

Start Redis Server

### stop
# Task Stop

Stop Redis Server
