#!/bin/bash
###################
# Build / deploy script
# Meant to be called by devops builder
###################

COMMIT_MSG=$1
if [ -z "$COMMIT_MSG" ]; then
    # default commit message
    COMMIT_MSG='New document'
fi

TMP_FOLDER=$(mktemp -d)

#
# Build process
#
cd ./docbuild
npm --silent install
#bower --silent install
gulp

cd ../
# Copy build files
cp -a ./docs/* $TMP_FOLDER

#
# Deployment
#

# Stash changes to allow branch switch
git stash
git checkout gh-pages
git clean -f -d
git clean -f -x
cp -a $TMP_FOLDER/* .
git add .
git commit -am "$COMMIT_MSG"
git push

# Cleanup
rm -rf $TMP_FOLDER
