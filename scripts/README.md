# Note

Those script work on LINUX ONLY. 

MacOS uses different versions of `sed` that breaks the run of the script/

Don't ask me to deal with MacOS, I don't care :)

Yours truly, zbal

## Usage

Those scripts are meant to be ran on:
- the API server
- the Ansible-mb servers

They provide the packages and providers tasks and metadata that are required.

## Prepare

1. Fetch the latest code

```
git clone git@github.com:devo-ps/devops-ansible.git
```

2. Update the configuration file

```
cd scripts
cp deploy-packages.conf.sample deploy-packages.conf
vim deploy-packages.conf
```

Update the required PATH. If you are on the API server you only care about the API PATH, if you are on an ansible box, you care about the ansible one.

The `build` path should remain unchanged.

## Build packages

Go in `scripts` and run `./build-packages`

## Deploy packages

Go in `scripts` and run:

```
# For ansible
./deploy-packages ../builds ansible

# For api
./deploy-packages ../builds api
```

It will deploy the meta data and other related information in the respective folders.


