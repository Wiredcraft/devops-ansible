---
description: Restart uWSGI emperor
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

#### Example in a task

    steps:
      - run: devops uwsgi app add
        options:
          name: my_app
          root: /opt/that_folder
          module: some_django_module
          port: 3000
