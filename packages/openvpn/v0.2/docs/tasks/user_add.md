---
description: Add OpenVPN client users and send credentials by email
options:
  users:
    type: array
    description: list of user objects
    required: true
---

#### Example in a devops task

    steps:
      - run: devops openvpn user add
        options:
          users:
            - name: bob
              email: bob@example.com
            - name: alice
              email: alice@example.com


