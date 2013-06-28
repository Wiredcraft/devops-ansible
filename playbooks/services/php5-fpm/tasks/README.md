# Tasks
Drop here all the tasks files that will be applied to a server.

Tasks are run sequentially; ex. 

- name: Ensure git is installed
    apt: pkg=git state=present

Tasks are all YAML files; ex. main.yml

Extra details:
    - http://ansible.cc/docs/index.html