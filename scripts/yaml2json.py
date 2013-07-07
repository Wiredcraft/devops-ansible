#!/usr/bin/env python
import sys
import yaml
import json

try:
    raw = sys.stdin.read()
    data = json.dumps(yaml.safe_load(raw), indent=4)
    print data
except Exception, e:
    print "you suck at yaml biatch - %s" % (e,)
    sys.exit(1)
