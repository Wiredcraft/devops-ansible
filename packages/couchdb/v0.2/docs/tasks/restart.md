# Restart

Do a full restart of the CouchDB service, effectively stopping and re-starting the service.

For better user experience you may prefer the use of the `reload` task instead.

# Example in a devops task

    do:
      - run: devops couchdb restart