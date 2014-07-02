---
description: Add PHP PECL extensions
options:
  name: 
    type: string
    description: Name of the PECL extension to install
    required: true
---

#### Example in a devops task

    steps:
      - run: devops php pecl_extention add
        options:
          name: memcached
