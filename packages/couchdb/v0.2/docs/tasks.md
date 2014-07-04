---
tasks:
  - name: start
    description: Start CouchDB if stopped
  - name: stop
    description: Stop CouchDB if started
  - name: reload
    description: Reload CouchDB, reload the configuration and perform a graceful restart
  - name: restart
    description: Restart CouchDB, reload the configuration (but kills existing connection)
---

### Notes

For better user experience you may prefer the use of the `reload` task instead of `restart`.
