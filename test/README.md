# Ansible playbook test

## Technologies and requirements

We currently rely on the following technologies to perform the testing:

- [Ansible](http://ansible.cc); need to be installed
- [Vagrant](http://vagrantup.com); need to be installed, including VirtualBox
- [Node.js & npm](http://nodejs.org); required by mocha and should, need to be installed before hand; version > 0.8.X
- [Mocha](http://visionmedia.github.com/mocha/); installed via ```npm install```
- [Should](https://github.com/visionmedia/should.js/); installed via ```npm install```

Also, all the vagrant servers will be build based on a ```base``` box; assumed to be __Ubuntu 12.04 LTS 64bits__.

## Why mocha / should / node.js?

Because:

- devo.ps is node.js based and ansible will be called by it,
- unify the testing / development approach already used in devo.ps,
- because vagrant is available on all platform and doesn't require to use AWS (name your favorite cloud)

## Known "issues"

Running the tests locally in vagrant may be slow and highly depends on your connection speed; remember we are talking provisioning and packages will be downloaded and installed on those test servers.