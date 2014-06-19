---
configuration:
  apc:
    enable_cli:
      default: '0'
      description: Enable / disable APC for the CLI version of PHP (Mostly for testing
        and debugging).
      enum:
      - 0
      - 1
      required: false
      type: integer
    enabled:
      default: '1'
      description: Enable / disable APC (0 - disabled).
      enum:
      - 0
      - 1
      required: false
      type: integer
    gc_ttl:
      default: 3600
      description: The number of seconds that a cache entry may remain on the garbage-collection
        list.
      minimum: 1
      required: false
      type: integer
    max_file_size:
      default: 1M
      description: Cache files up to this file size. Prevents large files from being
        cached.
      regex: /^\d+[kmgKMG]$/
      required: false
      type: string
    shm_segments:
      default: '1'
      description: The number of shared memory segments to allocate for the compiler
        cache.
      minimum: 1
      required: false
      type: integer
    shm_size:
      default: 128M
      description: The size of each shared memory segment in MB. (add unit)
      regex: /^\d+[kmgKMG]$/
      required: false
      type: string
    ttl:
      default: 14400
      description: The number of seconds a cache entry is allowed to idle in a slot
        in case this cache entry slot is needed by another entry.
      minimum: 1
      required: false
      type: integer
    user_ttl:
      default: 7200
      description: The number of seconds a user cache entry is allowed to idle in
        a slot in case this cache entry slot is needed by another entry.
      minimum: 1
      required: false
      type: integer
  cgi:
    fix_pathinfo:
      default: '1'
      description: cgi.fix_pathinfo provides *real* PATH_INFO/PATH_TRANSLATED support
        for CGI.
      enum:
      - 0
      - 1
      required: false
      type: integer
  display_errors:
    default: 'Off'
    description: Define whether PHP will output errors, notices and warnings.
    enum:
    - true
    - false
    required: false
    type: string
  error_log:
    default: syslog
    description: Log errors to specified file (or syslog).
    required: false
    type: string
  error_reporting:
    default: E_ALL & ~E_DEPRECATED
    description: Define which errors, warnings and notices to report.
    required: false
    type: string
  expose_php:
    default: 'Off'
    description: Decides whether PHP may expose the fact that it is installed on the
      server.
    enum:
    - true
    - false
    required: false
    type: string
  extensions:
    default: []
    description: List of extra php extensions installable via the regular OS package
      manager
    required: false
    type: array
  fpm:
    emergency_restart_interval:
      default: '0'
      description: Time within which an emergency graceful restart should be initiated
        (along with the threshold) - Available Units s(econds) default, m(inutes),
        h(ours), or d(ays)
      required: false
      type: string
    emergency_restart_threshold:
      default: '0'
      description: If more than X processes restart with SIGSEGV or SIGBUS within
        the emergency restart interval, php-fpm will restart
      required: false
      type: integer
    error_log:
      default: /var/log/php-fpm/php5-fpm.log
      description: Location of the error log file - can use `syslog` instead of file.
      required: false
      type: string
    log_level:
      default: notice
      description: Minimum log level to capture the logs for
      enum:
      - alert
      - error
      - warning
      - notice
      - debug
      required: false
      type: string
    pid:
      default: /var/run/php5-fpm.pid
      description: Location of the php5-fpm process PID file
      required: false
      type: string
    pool:
      bind:
        allowed_clients:
          default: 127.0.0.1
          description: List (comma separated) of ipv4 addresses of FastCGI clients
            which are allowed to connect.
          required: false
          type: string
        group:
          default: www-data
          description: Group owner of the unix socket (only relevant if listen is
            a path)
          required: false
          type: string
        mode:
          default: '0666'
          description: Permission of the socket file (only relevant if listen is a
            path)
          required: false
          type: string
        owner:
          default: www-data
          description: Owner of the unix socket (only relevant if listen is a path)
          required: false
          type: string
      group:
        default: www-data
        description: Running unix group of the pool
        required: false
        type: string
      listen:
        default: 127.0.0.1:9000
        description: The address on which to accept FastCGI requests (ip.add.re.ss;port,
          port, sock path)
        required: false
        type: string
      name:
        default: www
        description: Pool name
        required: false
        type: string
      ping:
        path:
          default: /ping
          description: URL path to simple ping
          required: false
          type: string
        response:
          default: pong
          description: Message to be sent back on ping
          required: false
          type: string
      pm:
        max_children:
          default: 10
          description: Maximum number of children (usually cpu-core * 2)
          required: false
          type: integer
        max_requests:
          default: '0'
          description: Maximum number of requests processed by a single process before
            being respawned
          required: false
          type: integer
        max_spare_servers:
          default: 6
          description: Maximum number of spare servers to keep running
          required: false
          type: integer
        min_spare_servers:
          default: 2
          description: Minimum number of spare servers to keep running
          required: false
          type: integer
        process_idle_timeout:
          default: 10s
          description: Maximum time to keep a server idle running (ondemand)
          required: false
          type: string
        start_servers:
          default: 4
          description: Number of server to start (dynamic)
          required: false
          type: integer
        status_path:
          default: /status
          description: URL path to access the status of the php pool
          required: false
          type: string
        type:
          default: static
          description: Choose how the process manager will control the number of child
            processes. (static, dynamic, ondemand)
          enum:
          - static
          - dynamic
          - ondemand
          required: false
          type: string
      request_slowlog_timeout:
        default: '0'
        description: Time after which a backtrace is sent to the slowlogs (0; disabled);
          Available Units; s(econds) default, m(inutes), h(ours), or d(ays)
        required: false
        type: string
      request_terminate_timeout:
        default: '0'
        description: Time after which a the process gets terminated (0; disabled);
          Available Units; s(econds) default, m(inutes), h(ours), or d(ays)
        required: false
        type: string
      slowlog:
        default: /var/log/php-fpm/$pool.log.slow
        description: Path for the slow log file of this pool
        required: false
        type: string
      user:
        default: www-data
        description: Running unix user of the pool
        required: false
        type: string
    process_control_timeout:
      default: '0'
      description: Time limit for child processes to wait for a reaction on signals
        from master. Available Units; s(econds) default, m(inutes), h(ours), or d(ays)
      required: false
      type: string
    process_max:
      default: '0'
      description: The maximum number of processes FPM will fork across all the pools.
        0 means no limit.
      required: false
      type: integer
    syslog:
      facility:
        default: daemon
        description: Syslog facility to send the log to (only if error_log=syslog)
        required: false
        type: string
      ident:
        default: php-fpm
        description: String that is prepended to the syslog message
        required: false
        type: string
  log_errors:
    default: 'On'
    description: Define whether PHP should log errors to locations such as a server-specific
      log, STDERR, or a location specified by the error_log.
    enum:
    - true
    - false
    required: false
    type: string
  max_execution_time:
    default: 60
    description: Maximum execution time of each script, in seconds.
    minimum: 1
    required: false
    type: integer
  max_input_time:
    default: 120
    description: Maximum amount of time each script may spend parsing request data.
    minimum: 1
    required: false
    type: integer
  memory_limit:
    default: 128M
    description: Maximum amount of memory a script may consume.
    regex: /^\d+[kmgKMG]$/
    required: false
    type: string
  pecl_extenstions:
    default: []
    description: List of extra php extensions installable via PECL
    required: false
    type: array
  post_max_size:
    default: 16M
    description: Maximum size of POST data that PHP will accept.
    regex: /^\d+[kmgKMG]$/
    required: false
    type: string
  realpath_cache_size:
    default: 256k
    description: Determines the size of the realpath cache to be used.
    regex: /^\d+[kmgKMG]$/
    required: false
    type: string
  realpath_cache_ttl:
    default: 3600
    description: Duration of time, in seconds for which to cache realpath information
      for a given file or directory.
    minimum: 1
    required: false
    type: integer
  safe_mode:
    default: 'Off'
    description: Enable / disable php safe_mode.
    enum:
    - true
    - false
    required: false
    type: string
  safe_mode_gid:
    default: 'Off'
    description: Compare GID instead of UID when php safe_mode is enabled.
    enum:
    - true
    - false
    required: false
    type: string
  session:
    save_handler:
      default: files
      description: Handler used to store/retrieve session data.
      enum:
      - files
      - memcache
      required: false
      type: string
    save_path:
      default: /var/lib/php/session
      description: Folder PATH where sessions will be stored (if save_habdler is file).
      required: false
      type: string
  upload_max_filesize:
    default: 16M
    description: Maximum allowed size for uploaded files.
    regex: /^\d+[kmgKMG]$/
    required: false
    type: string
include:
  menu_manual: manual.html
links:
- title: Official website
  url: http://php.net/
tags:
- language
template: page.html
title: PHP

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

## Tasks
### restart
# Task Restart

Restart php-fpm

### reload
# Task Reload

Reload php-fpm config

### stop
# Task Stop

Stop php-fpm

### add pecl extension
# Task Add_pecl_extension

Add pecl extension

---
- id:  php_pecl_extension_name
  label:  Name of the PECL extension
  required:  true
  default:  

---

### start
# Task Start

Start php-fpm
