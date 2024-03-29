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
TMP_FOLDER2=$(mktemp -d)

# Create storage bucket for the services and providers
mkdir -p $TMP_FOLDER/services/
mkdir -p $TMP_FOLDER/providers/

# Handle packages
sudo pip install -r packages-build/requirements.txt
python packages-build/packages.py packages $TMP_FOLDER/services/

# Handle providers
sudo pip install -r providers-build/requirements.txt
python providers-build/providers.py providers $TMP_FOLDER/providers /home/devops/providers_config.json

# Gonna push the results to the other repo..
cd $TMP_FOLDER2
git clone --branch metalsmith git@github.com:devo-ps/docs.devo.ps
cd docs.devo.ps

# Cleaning up the docs.devo.ps repo from its old sources.
git rm -r source/providers/*
git rm -r source/services/*

cp -a $TMP_FOLDER/* source

# Adding
git add .
git commit -am "$COMMIT_MSG"
git push

# Cleanup
rm -rf $TMP_FOLDER
rm -rf $TMP_FOLDER2
