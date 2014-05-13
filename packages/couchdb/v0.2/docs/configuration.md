---
title: CouchDB
layout: page
links:
    - title: Official website
      url: http://couchdb.apache.org/
configuration: 
    max_document_size:
        default: 4294967296
        description: Maximum document size
        type: integer
        required: false
    port:
        default: 5984
        description: Listening port
        type: integer
        required: false
        minimum: 1025
        maximum: 65536
    bind_address:
        default: '127.0.0.1'
        description: The IP address to bind to.
        type: string
        required: false
    admin_user:
        default: 'admin'
        description: Define the admin username
        type: string
        required: false
    admin_pass:
        default: 'admin'
        description: Define the admin password
        type: string
        required: false
    enable:
        default: "1"
        description: Define whether CouchDB should start at bood time
        type: integer
        required: false
    running_user:
        default: 'couchdb'
        description: Define the running user for the CouchDB process (it needs to exist)
        type: string
        required: false
    stdout_file:
        default: '/dev/null'
        description: Where to send the process STDOUT
        type: string
        required: false
    stderr_file:
        default: '/dev/null'
        description: Where to send the process STDERR
        type: string
        required: false
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