# Add uwsgi app

Define a uWsgi app to be ran via Emperor. It will create the Emperor configuration file based on the passed options' task and ensure it is running.

# Example in a task

    do:
      - run: devops uwsgi add_app
        options:
          name: my_app
          root: /opt/that_folder
          module: some_django_module
          port: 3000