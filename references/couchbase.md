---
configuration: {}
include:
  menu_manual: manual.html
links:
- title: Official website
  url: http://www.couchbase.com/
tags:
- database
template: page.html
title: CouchBase

---
Couchbase Server is the leading enterprise NoSQL database for scalability, performance, and availability.

CouchBase Community 2.1.1

## Example

    services:
      couchbase: '*'
    configuration:
      couchbase: {}

Install CouchBase Community on the node and perform no additional customization.

## Tasks
### restart
# Restart

Do a full restart of the CouchBase service, effectively stopping and re-starting the service.

For better user experience you may prefer the use of the `reload` task instead.

# Example in a devops task

    do:
      - run: devops couchbase restart

### reload
# Reload

Do a graceful restart of the CouchBase service, reloading the configuration.

# Example in a devops task

    do:
      - run: devops couchbase reload

### start
# Start

Start the CouchBase service, it does not do anything if it is already running.

# Example in a devops task

    do:
      - run: devops couchbase start

### stop
# Stop

Stop the Couchbase service, it does not do anything if it is already stopped.

# Example in a devops task

    do:
      - run: devops couchbase stop
