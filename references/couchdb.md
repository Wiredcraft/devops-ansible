---
configuration:
  admin_pass:
    default: admin
    description: Define the admin password
    required: false
    type: string
  admin_user:
    default: admin
    description: Define the admin username
    required: false
    type: string
  bind_address:
    default: 127.0.0.1
    description: The IP address to bind to.
    required: false
    type: string
  enable:
    default: '1'
    description: Define whether CouchDB should start at bood time
    required: false
    type: integer
  insecure:
    default: false
    description: Allow insecure setup (no admin user)
    required: true
    type: boolean
  max_document_size:
    default: 4294967296
    description: Maximum document size
    required: false
    type: integer
  port:
    default: 5984
    description: Listening port
    maximum: 65536
    minimum: 1025
    required: false
    type: integer
  running_user:
    default: couchdb
    description: Define the running user for the CouchDB process (it needs to exist)
    required: false
    type: string
  stderr_file:
    default: /dev/null
    description: Where to send the process STDERR
    required: false
    type: string
  stdout_file:
    default: /dev/null
    description: Where to send the process STDOUT
    required: false
    type: string
include:
  menu_manual: manual.html
links:
- title: Official website
  url: http://couchdb.apache.org/
tags:
- database
template: page.html
title: CouchDB

---
A Database for the Web

CouchDB is a database that completely embraces the web. Store your data with JSON documents. Access your documents and query your indexes with your web browser, via HTTP. Index, combine, and transform your documents with JavaScript. CouchDB works well with modern web and mobile apps. You can even serve web apps directly out of CouchDB. And you can distribute your data, or your apps, efficiently using CouchDB’s incremental replication. CouchDB supports master-master setups with automatic conflict detection.

CouchDB comes with a suite of features, such as on-the-fly document transformation and real-time change notifications, that makes web app development a breeze. It even comes with an easy to use web administration console. You guessed it, served up directly out of CouchDB! We care a lot about distributed scaling. CouchDB is highly available and partition tolerant, but is also eventually consistent. And we care a lot about your data. CouchDB has a fault-tolerant storage engine that puts the safety of your data first.

## Example

    services:
      couchdb: '*'
    configuration:
      couchdb:
        bind_address: 0.0.0.0

Install CouchDB on the node and make the service listen on all interfaces (0.0.0.0)
## Tasks
### restart
# Restart

Do a full restart of the CouchDB service, effectively stopping and re-starting the service.

For better user experience you may prefer the use of the `reload` task instead.

# Example in a devops task

    do:
      - run: devops couchdb restart

### reload
# Reload

Do a graceful restart of the CouchDB service, reloading the configuration.

# Example in a devops task

    do:
      - run: devops couchdb reload

### start
# Start

Start the CouchDB service, it does not do anything if it is already running.

# Example in a devops task

    do:
      - run: devops couchdb start

### stop
# Stop

Stop the CouchDB service, it does not do anything if it is already stopped.

# Example in a devops task

    do:
      - run: devops couchdb stop
