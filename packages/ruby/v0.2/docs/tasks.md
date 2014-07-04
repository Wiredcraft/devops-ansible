---
tasks:
  - name: gems add
    description: Add Ruby gems globally
    options:
      gems:
        type: array
        description: List of gems (string) to add
        required: true
  - name: gems remove
    description: Remove Ruby gems globally
    options:
      gems:
        type: array
        description: List of gems (string) to remove
        required: true
---
