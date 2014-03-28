#!/bin/bash
cd /etc/openvpn/easy-rsa
if [ ! -e "keys/server.key" ]; then
    source ./vars
    ./clean-all
    ./build-dh
    ./pkitool --initca
    ./pkitool --server server
    cd keys
    openvpn --genkey --secret ta.key 
    cp server.crt server.key ca.crt dh1024.pem ta.key ../../
fi