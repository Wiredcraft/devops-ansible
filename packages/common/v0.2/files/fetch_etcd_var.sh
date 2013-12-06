#!/usr/bin/env python

import sys
import json
import urllib2

etcd_host = sys.argv[1]
etcd_key = sys.argv[2]

# Read the value
f = urllib2.urlopen('http://' + etcd_host + ':4001/v1/keys/' + etcd_key)
result = json.load(f)
if 'value' not in keys:
    raise RuntimeError('Could not find the etcd item for key: %s' % etcd_key)
etcd_value = result['value']
f.close()

# Write the value
env_file = open('/opt/devops/etc/profile.d/devops.sh', 'a')
env_file.write('export %s="%s\n"' % etcd_key, etcd_value)
env_file.close()
