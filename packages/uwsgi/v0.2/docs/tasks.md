---
tasks:
  - name: start
    description: Start uWSGI emperor if stopped
  - name: stop
    description: Stop uWSGI emperor if started
  - name: restart
    description: Restart uWSGI emperor, reload the configuration (but kills existing connection)
  - name: app add
    description: Add a new uWSGI application configuration
    options:
      name:
        type: string
        description: Name of the app
        required: true
      root:
        type: string
        description: root folder of the application
        required: true
      module:
        type: string
        description: stuff
        required: false
      port: 
        type: int
        description: listening TCP port
        required: true
---
