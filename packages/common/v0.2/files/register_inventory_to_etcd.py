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

KEY_PREFIX = 'DEVOPS'

inventory = sys.argv[1]
if not inventory:
    sys.stderr.write('Missing inventory.')
    sys.exit(1)

try:
    inventory = base64.decodestring(inventory)
except Exception, e:
    sys.stderr.write('Error while decoding inventory: %s' % e)
    sys.exit(1)

try:
    inventory = json.loads(inventory)
except Exception, e:
    sys.stderr.write('Error while loading inventory object: %s' % e)
    sys.exit(1)

host = inventory.get('inventory_hostname')
if not host:
    sys.stderr.write('Missing host')
    sys.exit(1)

def save_key(path, value):
    '''
    Save key to etcd, using path as key
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
    Process a key
    '''
    if isinstance(key, basestring):
        key = [KEY_PREFIX, re.sub('[^A-Z0-9]', '_', key.upper())]
    if isinstance(value, basestring):
        save_key('__'.join(key), value)
    # Only care about dict
    if isinstance(value, dict):
        for k, v in value.iteritems():
            inner_key = list(key)
            inner_key.append(re.sub('[^A-Z0-9]', '_', k.upper()))
            process(inner_key, v)

for k, v in inventory.iteritems():
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
