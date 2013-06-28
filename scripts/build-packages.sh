#!/bin/bash
###########################
# This build script will:
#  - fetch the latest code
#  - create tar files for each of the packages version
###########################

# Doesn't work in MacOS ...
# CURRENT_FOLDER=$(readlink -f $(dirname $0))

BUILD_FOLDER='../builds'

cd $(dirname $0)
mkdir -p $BUILD_FOLDER
# Cleaning folder
rm -rf $BUILD_FOLDER/*

# Fetch latest code
git pull

for package in $(ls -d ../packages/*/.); do
    cd $package
    for version in $(ls -d */.); do
        PKG_VERSION=$(dirname $version)
        PKG_FOLDER=$(dirname $package)
        PKG_NAME=$(basename $(dirname $package))
        tar cvfz ../$BUILD_FOLDER/${PKG_NAME}-${PKG_VERSION}.tar.gz ${PKG_VERSION} \
            > /dev/null 2>&1
        if [ $? -eq 0 ]; then
            echo "[SUCCESS] $PKG_NAME - $PKG_VERSION: package created."
        else
            echo "[ERROR] $PKG_NAME - $PKG_VERSION: package creation failed."
        fi
    done
    cd ..
done