---
description: Remove Ruby gems if installed 
options:
  gems:
    type: array
    description: List of gems to remove
    required: true
---

#### Example in a devops task

    steps:
      - run: devops ruby gems remove
        options:
          gems:
            - compass
