#!/bin/bash
###############################
# Simple setup script to define the config
###############################

# Update config/global.yml
base=$(readlink -f $(dirname $0))
protected=$(echo $base | sed -e 's/\//\\\//g')

sed -e "s/BASE_FOLDER/$protected/" $base/config/global.yml.src > $base/config/global.yml

echo "Done."