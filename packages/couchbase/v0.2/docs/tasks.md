---
tasks:
  - name: start
    description: Start CouchBase if stopped
  - name: stop
    description: Stop CouchBase if started
  - name: reload
    description: Reload CouchBase, reload the configuration and perform a graceful restart
  - name: restart
    description: Restart CouchBase, reload the configuration (but kills existing connection)
---

### Notes

For better user experience you may prefer the use of the `reload` task instead of `restart`.
