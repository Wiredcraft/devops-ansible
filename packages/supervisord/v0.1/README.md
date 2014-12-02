Supervisor is a client/server system that allows its users to monitor and control a number of processes on UNIX-like operating systems.

It can be used to manage any type of process, from custom python code to node.js application.

## Examples

* ### Node.js app

  ```example
  configuration:
    supervisord:
      programs:
        - name: api
          user: nobody
          command: node app.js
          env: NODE_ENV=prod,MANDRILL_API_KEY=qwerty
          extra: |
            directory = /opt/api
            autorestart = true
  ```

  We here define a node.js application that will run as `nobody` user, execute the `app.js` code from the `/opt/api` folder. It will restart automatically no matter how. Both `NODE_ENV` and `MANDRILL_API_KEY` environment variable will be passed along to the running process.

* ### Python app

  ```example
  configuration:
    supervisord:
      programs:
        - name: app
          user: nobody
          command: python /opt/my_app/app.py
          env: DEBUG=true
  ```

  We here define a simple program that will execute `app.py` as nobody, passing the `DEBUG` environment variable along.

* ### Custom app

  ```example
  configuration:
    supervisord:
      programs:
        - name: consul
          command: /bin/consul agent -config-dir /etc/consul.d/
  ```

  We here define a simple program that will execute a custom command; in this case the `consul` agent as root.

## Parameters

Supervisord has dozens of available options, but for improved user experience we only selected a few that we considered essential enough for having their dedicated devo.ps attribute. You can check below for the available options.

You can however extensively customize your program execution by using the `extra` option. Note that with the `Yaml` format of the server (and task), you need to use the proper "scalar" to maintain the proper new-line character.

```example
supervisord:
  programs:
    ...
      extra: |
        first = parameter
        second = parameter
```

Note the `|` after `extra:`, it will ensure both lines below are effectively treated as lines (instead of space separated strings of a larger `extra` string). See the [official YAML documentation](http://www.yaml.org/spec/1.2/spec.html#id2760844) for more details about the scalars format.
