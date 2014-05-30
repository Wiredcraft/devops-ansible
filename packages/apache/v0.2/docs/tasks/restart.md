# Restart

Do a full restart of the Apache service, killing existing HTTP connections.

For better user experience you may prefer the use of the `reload` task instead.

# Example in a devops task

    do:
      - run: devops apache restart