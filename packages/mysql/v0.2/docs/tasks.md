---
tasks:
  - name: start
    description: Start MySQL if stopped
  - name: stop
    description: Stop MySQL if started
  - name: reload
    description: Reload MySQL, reload the configuration and perform a graceful restart
  - name: restart
    description: Restart MySQL, reload the configuration (but kills existing connection)
  - name: user add
    description: Add a new MySQL user and a dedicated database
    options:
      user: 
        type: string
        description: Name of the user to create
        required: true
      db: 
        type: string
        description: Name of the database to create
        required: true
---