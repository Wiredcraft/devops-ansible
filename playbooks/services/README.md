# Services

The ```services``` folder holds the tasks and handlers of the various services supported by devops.

Conceptually speaking we are supporting those services on a per service basis and do not handle linking of the services with one another (ex. change php conf is not expected to restart nginx or trigger a config change of haproxy.). Such behavior may eventually be added in the future but at the space level only.