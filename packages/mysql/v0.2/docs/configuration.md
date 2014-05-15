---
title: MySQL
layout: page
links:
    - title: Official website
      url: http://www.mysql.com/
tags:
    - database
configuration: 
    port:
        default: 3306
        description: Connection port.
        type: integer
        required: false
        minimum: 1025
        maximum: 65536
    bind_address:
        default: 127.0.0.1
        description: Binding IP address.
        type: string
        required: false
    socket:
        default: /var/run/mysqld/mysqld.sock
        description: Mysql listening socket.
        type: string
        required: false
    pid_file:
        default: /var/run/mysqld/mysqld.pid
        description: Pid file.
        type: string
        required: false
    base_dir:
        default: /usr
        description: Base folder.
        type: string
        required: false
    data_dir:
        default: /var/lib/mysql
        description: Database files path.
        type: string
        required: false
    auto_increment_increment:
        default: 1
        description: Auto increment.
        type: integer
        required: false
        minimum: 1
    auto_increment_offset:
        default: 1
        description: Auto increment offset.
        type: integer
        required: false
        minimum: 1
    old_passwords:
        default: 0
        description: Allow old (non-secure) passwords.
        type: integer
        required: false
        enum:
            - 0
            - 1
    tunable:
        key_buffer:
            default: 256M
            description: Size of the buffer used for index blocks. The key buffer is also known as the key cache.
            type: string
            required: false
            regex: '/^\d+[KMG]$/'
        max_allowed_packet:
            default: 16M
            description: The maximum size of one packet or any generated/intermediate string.
            type: string
            required: false
            regex: '/^\d+[KMG]$/'
        thread_stack:
            default: 256K
            description: The stack size for each thread.
            type: string
            required: false
            regex: '/^\d+[KMG]$/'
        thread_cache_size:
            default: 32
            description: Number of threads the server should cache for reuse.
            type: integer
            required: false
            minimum: 1
        max_connections:
            default: 256
            description: The maximum permitted number of simultaneous client connections.
            type: integer
            required: false
            minimum: 1
        wait_timeout:
            default: 180
            description: The number of seconds the server waits for activity on a noninteractive connection before closing it.
            type: integer
            required: false
            minimum: 1
        net_read_timeout:
            default: 30
            description: The number of seconds to wait for more data from a connection before aborting the read.
            type: integer
            required: false
            minimum: 1
        net_write_timeout:
            default: 30
            description: The number of seconds to wait for a block to be written to a connection before aborting the write.
            type: integer
            required: false
            minimum: 1
        back_log:
            default: 128
            description: The number of outstanding connection requests MySQL can have. In other words this value is the size of the listen queue for incoming TCP/IP connections.
            type: integer
            required: false
            minimum: 1
        table_open_cache:
            default: 1024
            description: The number of open tables for all threads.
            type: integer
            required: false
            minimum: 1
        max_heap_table_size:
            default: 64M
            description: Maximum size to which user-created MEMORY tables are permitted to grow.
            type: string
            required: false
            regex: '/^\d+[KMG]$/'
    query_cache:
        query_cache_limit:
            default: 2M
            description: Do not cache results that are larger than this number of bytes.
            type: string
            required: false
            regex: '/^\d+[KMG]$/'
        query_cache_size:
            default: 64M
            description: The amount of memory allocated for caching query results.
            type: string
            required: false
            regex: '/^\d+[KMG]$/'
    logs:
        log_error:
            default: /var/log/mysql/mysql.log
            description: The location of the error log.
            type: string
            required: false
        slow_query_log:
            default: 1
            description: Whether the slow query log is enabled.
            type: integer
            required: false
            enum:
                - 0
                - 1
        slow_query_log_file:
            default: /var/log/mysql/slow.log
            description: The name of the slow query log file.
            type: string
            required: false
        long_query_time:
            default: 1
            description: Increment slow_queries variable and log if a query takes longer than this many seconds.
            type: number
            required: false
        log_queries_not_using_indexes:
            default: Off
            description: If you are using this option with the slow query log enabled then queries that are expected to retrieve all rows are logged.
            type: string
            required: false
            enum:
                - On
                - Off
    replication:
        server_id:
            default: 10
            description: Is used in replication to enable master and slave servers to identify themselves uniquely.
            type: integer
            required: false
            minimum: 1
        log_bin:
            default: mysql-bin
            description: Enable binary logging. The option value is the basename for the log sequence.
            type: string
            required: false
        log_slave_updates:
            default: On
            description: This option tells the slave to log the updates performed by its SQL thread to its own binary log.
            type: string
            required: false
            enum:
                - On
                - Off
        log_bin_trust_function_creators:
            default: Off
            description: Controls whether stored function creators can be trusted not to create stored functions that will cause unsafe events to be written to the binary log.
            type: string
            required: false
            enum:
                - On
                - Off
        expire_logs_days:
            default: 10
            description: The number of days for automatic binary log file removal.
            type: integer
            required: false
            minimum: 1
        max_binlog_size:
            default: 100M
            description: If a write to the binary log causes the current log file size to exceed the value of this variable then the server rotates the binary logs.
            type: string
            required: false
            regex: '/^\d+[KMG]$/'
        relay_log:
            default: relay-bin
            description: The basename for the relay log.
            type: string
            required: false
        sync_binlog:
            default: 1
            description: If the value of this variable is greater than 0 then the MySQL server synchronizes its binary log to disk (using fdatasync()) after every sync_binlog writes to the binary log.
            type: integer
            required: false
            minimum: 1
        skip_slave_start:
            default: true
            description: Tells the slave server not to start the slave threads when the server starts.
            type: string
            required: false
            enum:
                - true
                - false
    innodb:
        innodb_buffer_pool_size:
            default: 128M
            description: The size in bytes of the memory buffer InnoDB uses to cache data and indexes of its tables.
            type: string
            required: false
            regex: '/^\d+[KMG]$/'
        innodb_log_file_size:
            default: 5M
            description: The size in bytes of each log file in a log group.
            type: string
            required: false
            regex: '/^\d+[KMG]$/'
        innodb_additional_mem_pool_size:
            default: 8M
            description: The size in bytes of a memory pool InnoDB uses to store data dictionary information and other internal data structures.
            type: string
            required: false
            regex: '/^\d+[KMG]$/'
        innodb_data_file_path:
            default: ibdata1:10M:autoextend:max:500M
            description: The paths to individual data files and their sizes.
            type: string
            required: false
        innodb_flush_log_at_trx_commit:
            default: 1
            description: If 0 the log buffer is written out to the log file once per second. If 1 the log buffer is written out to the log file at each transaction commit and the flush to disk operation is performed on the log file. If 2 the log buffer is written out to the file at each commit but the flush to disk operation is not performed on it.
            type: integer
            required: false
            enum:
                - 0
                - 1
                - 2
        innodb_flush_method:
            default: O_DIRECT
            description: Flush method for InnoDB, either of fdatasync, O_DSYNC or O_DIRECT
            type: string
            required: false
            enum:
                - O_DIRECT
                - O_DSYNC
                - fdatasync
        innodb_log_buffer_size:
            default: 8M
            description: The size in bytes of the buffer that InnoDB uses to write to the log files on disk.
            type: string
            required: false
            regex: '/^\d+[KMG]$/'
        innodb_adaptive_flushing:
            default: On
            description: Specifies whether to dynamically adjust the rate of flushing dirty pages in the InnoDB buffer pool based on the workload.
            type: string
            required: false
            enum:
                - On
                - Off
---
The world's most popular open source relational database

## Example

    services:
      mysql: '*'
    configuration:
      mysql:
        bind_address: 0.0.0.0
        innodb:
          innodb_buffer_pool_size: 8G

Install MySQL on the node, make it listen on all interfaces (0.0.0.0) and allocate 8GB of RAM to the InnoDB buffer pool.
