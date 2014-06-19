#!/bin/bash
###################
# Build / deploy script
# Meant to be called by devops builder
###################

export HERE=$(pwd)

COMMIT_MSG=$1
if [ -z "$COMMIT_MSG" ]; then
    # default commit message
    COMMIT_MSG='New deployment'
fi

# TMP_FOLDER is used to store the build
TMP_FOLDER=$(mktemp -d)

# Create storage bucket for the references and providers
mkdir -p $TMP_FOLDER/references/
mkdir -p $TMP_FOLDER/providers/

# Handle packages
sudo pip install -r packages-build/requirements.txt
python packages-build/packages.py packages $TMP_FOLDER/references/

# Handle providers
sudo pip install -r providers-build/requirements.txt
python providers-build/providers.py $TMP_FOLDER/ /home/devops/providers_config.json

#
# Prepare the providers' details iun devops-ansible
#
# cd provider-build
# sudo pip install -r requirements.txt
# python providers.py $TMP_FOLDER3 /home/devops/providers_config.json
# for provider_file in $(ls $TMP_FOLDER3/*)
# do  
#   base=$(basename $provider_file \.yml)
#   cp $provider_file $HERE/source/references/$base.md
#   echo "
# title: $base
# template: provider.html
# ---
# " >> $HERE/source/references/$base.md
# done


#
# Prepare the menu data file
#
# cd $HERE
# python build/prepare_menu.py
# make build

# Copy build files
# cp -a _site/* $TMP_FOLDER2

# Stash changes to allow branch switch
git stash
git checkout gh-pages
# Pull to merge if changes occured in the gh-pages
git pull
git clean -f -d
git clean -f -x
cp -a $TMP_FOLDER/* .
git add .
git commit -am "$COMMIT_MSG"
git push

# Cleanup
rm -rf $TMP_FOLDER
