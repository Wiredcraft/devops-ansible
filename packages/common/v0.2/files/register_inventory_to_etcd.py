#!/usr/bin/env python

import os
import sys
import urllib2
import base64
try:
    import json
except ImportError:
    import simplejson

inventory = sys.argv[1]

try:
    inventory = base64.decodestring(inventory)
except Exception, e:
    print 'Da Fouk1: %s' % e

try:
    inventory = json.loads(inventory)
except Exception, e:
    print 'Da Fouk2: %s' % e

print inventory

