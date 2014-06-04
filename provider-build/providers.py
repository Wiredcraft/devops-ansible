import os
import sys
import json
import yaml

from libcloud.compute.types import Provider
from libcloud.compute.providers import get_driver

def usage():
    print '%s <destination_folder> [<config>]\n\n' % sys.argv[0]
    print '  <destination_folder> must already exist'
    print '  <config> must exist (defaults to ./config.json)'

if len(sys.argv) < 2:
    usage()
    sys.exit(1)

destination = sys.argv[1]
if not os.path.exists(destination) or not os.path.isdir(destination):
    usage()
    sys.exit(1)

if len(sys.argv) == 3:
    config = sys.argv[2]
else:
    config = os.path.join('.', 'config.json')
if not os.path.exists(config):
    usage()
    print "Missing config file: %s" % config
    sys.exit(1)

with open(config) as c:
    try:
        conf = json.load(c)
    except Exception as e:
        print "Error loading config: %s" % e
        sys.exit(1)

for provider in conf.get('providers', []):
    provider_type = provider.get('type')
    if provider_type == 'linode':
        from providers.linode import get
    elif provider_type == 'digital_ocean':
        from providers.digitalocean import get
    elif provider_type == 'rackspace':
        from providers.rackspace import get
    elif provider_type == 'ec2':
        from providers.ec2 import get
    else:
        print 'Provider %s not supported' % provider_type
        continue

    print 'Getting %s...' % provider_type
    data = get(**provider)

    with open(os.path.join(destination, provider_type +'.yml'), 'w') as f:
        f.write(yaml.safe_dump(data, explicit_start=True, default_flow_style=False))
        print 'Written to %s' % (provider_type +'.yml')
