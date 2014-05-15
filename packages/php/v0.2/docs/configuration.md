---
title: PHP
layout: page
links:
    - title: Official website
      url: http://php.net/
tags:
    - language
configuration: 
    extensions: 
        description: List of extra php extensions installable via the regular OS package manager
        default: []
        type: array
        required: false
    pecl_extenstions: 
        description: List of extra php extensions installable via PECL
        default: []
        type: array
        required: false
    safe_mode:
        default: "Off"
        description: Enable / disable php safe_mode.
        type: string
        required: false
        enum:
            - On
            - Off
    safe_mode_gid:
        default: "Off"
        description: Compare GID instead of UID when php safe_mode is enabled.
        type: string
        required: false
        enum:
            - On
            - Off
    realpath_cache_size:
        default: 256k
        description: Determines the size of the realpath cache to be used.
        type: string
        required: false
        regex: '/^\d+[kmgKMG]$/'
    realpath_cache_ttl:
        default: 3600
        description: Duration of time, in seconds for which to cache realpath information for a given file or directory.
        type: integer
        required: false
        minimum: 1
    expose_php:
        default: "Off"
        description: Decides whether PHP may expose the fact that it is installed on the server.
        type: string
        required: false
        enum:
            - On
            - Off
    max_execution_time:
        default: 60
        description: Maximum execution time of each script, in seconds.
        type: integer
        required: false
        minimum: 1
    max_input_time:
        default: 120
        description: Maximum amount of time each script may spend parsing request data.
        type: integer
        required: false
        minimum: 1
    memory_limit:
        default: 128M
        description: Maximum amount of memory a script may consume.
        type: string
        required: false
        regex: '/^\d+[kmgKMG]$/'
    error_reporting:
        default: "E_ALL & ~E_DEPRECATED"
        description: Define which errors, warnings and notices to report.
        type: string
        required: false
    display_errors:
        default: "Off"
        description: Define whether PHP will output errors, notices and warnings.
        type: string
        required: false
        enum:
            - On
            - Off
    log_errors:
        default: "On"
        description: Define whether PHP should log errors to locations such as a server-specific log, STDERR, or a location specified by the error_log.
        type: string
        required: false
        enum:
            - On
            - Off
    error_log:
        default: syslog
        description: Log errors to specified file (or syslog).
        type: string
        required: false
    post_max_size:
        default: 16M
        description: Maximum size of POST data that PHP will accept.
        type: string
        required: false
        regex: '/^\d+[kmgKMG]$/'
    upload_max_filesize:
        default: 16M
        description: Maximum allowed size for uploaded files.
        type: string
        required: false
        regex: '/^\d+[kmgKMG]$/'
    cgi:
        fix_pathinfo:
            default: "1"
            description: cgi.fix_pathinfo provides *real* PATH_INFO/PATH_TRANSLATED support for CGI.
            type: integer
            required: false
            enum:
                - 0
                - 1
    session:
        save_handler:
            default: files
            description: Handler used to store/retrieve session data.
            type: string
            required: false
            enum:
                - files
                - memcache
        save_path:
            default: /var/lib/php/session
            description: Folder PATH where sessions will be stored (if save_habdler is file).
            type: string
            required: false
    apc:
        enabled:
            default: "1"
            description: Enable / disable APC (0 - disabled).
            type: integer
            required: false
            enum:
                - 0
                - 1
        enable_cli:
            default: "0"
            description: Enable / disable APC for the CLI version of PHP (Mostly for testing and debugging).
            type: integer
            required: false
            enum:
                - 0
                - 1
        shm_segments:
            default: "1"
            description: The number of shared memory segments to allocate for the compiler cache.
            type: integer
            required: false
            minimum: 1
        shm_size:
            default: 128M
            description: The size of each shared memory segment in MB. (add unit)
            type: string
            required: false
            regex: '/^\d+[kmgKMG]$/'
        ttl:
            default: 14400
            description: The number of seconds a cache entry is allowed to idle in a slot in case this cache entry slot is needed by another entry.
            type: integer
            required: false
            minimum: 1
        user_ttl:
            default: 7200
            description: The number of seconds a user cache entry is allowed to idle in a slot in case this cache entry slot is needed by another entry.
            type: integer
            required: false
            minimum: 1
        gc_ttl:
            default: 3600
            description: The number of seconds that a cache entry may remain on the garbage-collection list.
            type: integer
            required: false
            minimum: 1
        max_file_size:
            default: 1M
            description: Cache files up to this file size. Prevents large files from being cached.
            type: string
            required: false
            regex: '/^\d+[kmgKMG]$/'
    fpm:
        pid:
            default: /var/run/php5-fpm.pid
            description: Location of the php5-fpm process PID file
            type: string
            required: false
        error_log:
            default: /var/log/php-fpm/php5-fpm.log
            description: Location of the error log file - can use `syslog` instead of file.
            type: string
            required: false
        syslog:
            facility:
                default: daemon
                description: Syslog facility to send the log to (only if error_log=syslog)
                type: string
                required: false
            ident:
                default: php-fpm
                description: String that is prepended to the syslog message
                type: string
                required: false
        log_level:
            default: notice
            description: Minimum log level to capture the logs for
            type: string
            required: false
            enum:
                - alert
                - error
                - warning
                - notice
                - debug
        emergency_restart_threshold:
            default: "0"
            description: If more than X processes restart with SIGSEGV or SIGBUS within the emergency restart interval, php-fpm will restart
            type: integer
            required: false
        emergency_restart_interval:
            default: "0"
            description: Time within which an emergency graceful restart should be initiated (along with the threshold) - Available Units s(econds) default, m(inutes), h(ours), or d(ays)
            type: string
            required: false
        process_control_timeout:
            default: "0"
            description: Time limit for child processes to wait for a reaction on signals from master. Available Units; s(econds) default, m(inutes), h(ours), or d(ays)
            type: string
            required: false
        process_max:
            default: "0"
            description: The maximum number of processes FPM will fork across all the pools. 0 means no limit.
            type: integer
            required: false
        pool:
            name:
                default: www
                description: Pool name
                type: string
                required: false
            user:
                default: www-data
                description: Running unix user of the pool
                type: string
                required: false
            group:
                default: www-data
                description: Running unix group of the pool
                type: string
                required: false
            listen:
                default: 127.0.0.1:9000
                description: The address on which to accept FastCGI requests (ip.add.re.ss;port, port, sock path)
                type: string
                required: false
            bind:
                owner:
                    default: www-data
                    description: Owner of the unix socket (only relevant if listen is a path)
                    type: string
                    required: false
                group:
                    default: www-data
                    description: Group owner of the unix socket (only relevant if listen is a path)
                    type: string
                    required: false
                mode:
                    default: "0666"
                    description: Permission of the socket file (only relevant if listen is a path)
                    type: string
                    required: false
                allowed_clients:
                    default: 127.0.0.1
                    description: List (comma separated) of ipv4 addresses of FastCGI clients which are allowed to connect.
                    type: string
                    required: false
            pm:
                type:
                    default: static
                    description: Choose how the process manager will control the number of child processes. (static, dynamic, ondemand)
                    type: string
                    required: false
                    enum:
                        - static
                        - dynamic
                        - ondemand
                max_children:
                    default: 10
                    description: Maximum number of children (usually cpu-core * 2)
                    type: integer
                    required: false
                start_servers:
                    default: 4
                    description: Number of server to start (dynamic)
                    type: integer
                    required: false
                min_spare_servers:
                    default: 2
                    description: Minimum number of spare servers to keep running
                    type: integer
                    required: false
                max_spare_servers:
                    default: 6
                    description: Maximum number of spare servers to keep running
                    type: integer
                    required: false
                process_idle_timeout:
                    default: 10s
                    description: Maximum time to keep a server idle running (ondemand)
                    type: string
                    required: false
                max_requests:
                    default: "0"
                    description: Maximum number of requests processed by a single process before being respawned
                    type: integer
                    required: false
                status_path:
                    default: /status
                    description: URL path to access the status of the php pool
                    type: string
                    required: false
            ping:
                path:
                    default: /ping
                    description: URL path to simple ping
                    type: string
                    required: false
                response:
                    default: pong
                    description: Message to be sent back on ping
                    type: string
                    required: false
            slowlog:
                default: /var/log/php-fpm/$pool.log.slow
                description: Path for the slow log file of this pool
                type: string
                required: false
            request_slowlog_timeout:
                default: "0"
                description: Time after which a backtrace is sent to the slowlogs (0; disabled); Available Units; s(econds) default, m(inutes), h(ours), or d(ays)
                type: string
                required: false
            request_terminate_timeout:
                default: "0"
                description: Time after which a the process gets terminated (0; disabled); Available Units; s(econds) default, m(inutes), h(ours), or d(ays)
                type: string
                required: false
---
PHP is a popular general-purpose scripting language that is especially suited to web development.

Fast, flexible and pragmatic, PHP powers everything from your blog to the most popular websites in the world.

## Example

    services:
      php: '*'
    configuration:
      php:
        memory_limit: 64M
        post_max_size: 32M
        upload_max_filesize: 32M
        apc:
          shm_size: 256M

Install PHP on the node, setting the max limit of a php process to 64MB, allowing 32MB files upload, and giving 256MB of room to APC cache.
