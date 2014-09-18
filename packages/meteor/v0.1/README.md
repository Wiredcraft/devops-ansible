Meteor is an ultra-simple environment for building modern websites. What once took weeks, even with the best tools, now takes hours with Meteor.

## Examples

* ### Meteor application

  ```example
  services:
    meteor: '*'
    nodejs: '*'
    mongodb: '*'

  configuration:
    mongodb:
      users:
        - name: meteor
          databases:
            - meteor
  ```

  You need to explicitely define both `meteor` and `nodejs` as services available on your node. 

  The snippet above will install meteor, nodejs and mongodb. It also will create a meteor user with admin access to a meteor database. Check the service documentation for more details about [MongoDB settings](/services/mongodb/)
