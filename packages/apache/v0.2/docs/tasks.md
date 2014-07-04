---
tasks:
  - name: start
    description: Start Apache if stopped
  - name: stop
    description: Stop Apache if started
  - name: reload
    description: Reload Apache, reload the configuration and perform a graceful restart
  - name: restart
    description: Restart Apache, reload the configuration (but kills existing connection)
---

### Notes

For better user experience you may prefer the use of the `reload` task instead of `restart`.

