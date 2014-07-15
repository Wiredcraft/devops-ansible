---
tasks:
  - name: start
    description: Start OpenVPN if stopped
  - name: stop
    description: Stop OpenVPN if started
  - name: reload
    description: Reload OpenVPN, reload the configuration and perform a graceful restart
  - name: restart
    description: Restart OpenVPN, reload the configuration (but kills existing connection)
  - name: user add
    description: Add OpenVPN client users and send credentials by email
    options:
      users:
        type: array
        description: list of user objects
        required: true
        options:
          name:
            description: The client name (ex. bob, alice)
            type: string
            required: true
          email:
            description: The email address to send the credentials to 
            type: string
            required: true
            valid_values: email address 

---

