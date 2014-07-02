---
description: Add Ruby gems globally
options:
  gems:
    type: array
    description: List of gems to install
    required: true
---

#### Example in a devops task

    steps:
      - run: devops ruby gems add
        options:
          gems:
            - compass
