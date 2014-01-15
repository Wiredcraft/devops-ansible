#!/usr/bin/env python

import os
import sys
import requests
import base64
import re
try:
    import json
except ImportError:
    import simplejson

# Need at least 1 arg
if len(sys.argv) < 2:
    sys.stderr.write('Missing arguments.')
    sys.exit(1)

# If more than 2, we need a list of key value key value key value
if len(sys.argv) > 2:
    if not len(sys.argv) % 2:
        sys.stderr.write('Invalid arguments count (k v k v k v....)')
        sys.exit(1)
    # Prepare argument to receive the data to process
    arg = {}
    while len(sys.argv) > 2:
        k = sys.argv.pop(1)
        v = sys.argv.pop(1)
        arg.update({k: v})

# Exactly 1 arg, it needs to be a json in a base64 string
if len(sys.argv) == 2:
    arg = sys.argv[1]
    try:
        arg = base64.decodestring(arg)
    except Exception, e:
        sys.stderr.write('Error while decoding argument: %s' % e)
        sys.exit(1)
    
    try:
        arg = json.loads(arg)
    except Exception, e:
        sys.stderr.write('Error while loading json object: %s' % e)
        sys.exit(1)

    # Check if this is an inventory or .. a random stuff
    host = arg.get('inventory_hostname')
    if host:
        KEY_PREFIX = 'DEVOPS'

def save_key(path, value):
    '''
    Save key to etcd, using path as key
    TODO: check if the current exist and is the same, skip if needed
    '''
    print path
    payload = {'value': value}
    r = requests.put('http://localhost:4001/v2/keys/'+ path, data=payload)
    # Do some extra checks with the performed requests
    if r.status_code == 200:
        return True
    else:
        print r.content
        return False

def process(key, value):
    '''
    Process a key/value pair
    - key is either a string or a list
    - value is either a string or a dict

    Keys are stringified using '__' as separator
    Depending on the value type, either save or recursively process children

    '''
    # The key is an array of upper case with only alphanum + _
    if isinstance(key, basestring):
        if KEY_PREFIX:
            # Dealing with the inventory - we only want uppercase
            key = [KEY_PREFIX, re.sub('[^A-Z0-9]', '_', key.upper())]
        else:
            # Custom keys - allow lowercase as well
            key = [re.sub('[^a-zA-Z0-9]', '_', key)]

    # If the value is a string we save it to etcd
    if isinstance(value, basestring):
        save_key('__'.join(key), value)

    # If the value is a dict, then recursively process each attribute
    # In practice it only ever happen to the inventory, not to manually 
    # registered key / value pairs
    if isinstance(value, dict):
        for k, v in value.iteritems():
            # Clone the key to avoid weird errors ... 
            inner_key = list(key)
            inner_key.append(re.sub('[^A-Z0-9]', '_', k.upper()))
            process(inner_key, v)

for k, v in arg.iteritems():
    # Skip ansible inventory stuff if this is an inventory
    if KEY_PREFIX:
        # We skip all the ansible private vars
        if k.startswith('ansible_'):
            continue
        if k.startswith('groups_'):
            continue
        if k.startswith('inventory_'):
            continue
    # We skip some more stuff
    # Later
    process(k, v)
