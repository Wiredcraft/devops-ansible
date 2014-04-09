#!/bin/bash
USER="$1"
if [ -z "$USER" ]; then
    echo "Missing user - aborting creation."
    exit 1
fi

mkdir -p "/etc/openvpn/clients/$USER"
cp /etc/openvpn/ta.key "/etc/openvpn/clients/$USER"
cp /etc/openvpn/ca.crt "/etc/openvpn/clients/$USER"

cd /etc/openvpn/easy-rsa
if [ ! -e "keys/$USER.key" ]; then
    source ./vars
    KEY_CN=$USER ./pkitool $USER
    cp -a keys/$USER.* "/etc/openvpn/clients/$USER"
fi

cd "/etc/openvpn/clients/"
tar cvfz $USER.tar.gz --exclude="$USER.csr" $USER