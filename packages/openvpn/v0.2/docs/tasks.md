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
---

### Options

#### User object

Name | Type | Required | Default | Valid Values | Description
----|----|----|----|----|----
name | string | True | | | The client name (ex. bob, alice)
email | string | True | | email address | The email address to send the credentials to

