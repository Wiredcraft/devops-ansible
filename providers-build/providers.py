import os
import sys
import json
import yaml

from libcloud.compute.types import Provider
from libcloud.compute.providers import get_driver

def usage():
    print 'Usage: %s <source> <destination_folder> [<config>]\n' % sys.argv[0]
    print '  <source> source folder where the providers yml are'
    print '  <destination_folder> must already exist'
    print '  <config> must exist (defaults to ./config.json)'
    print ''

# http://stackoverflow.com/questions/6432605/any-yaml-libraries-in-python-that-support-dumping-of-long-strings-as-block-liter
class folded_unicode(unicode): pass
class literal_unicode(unicode): pass

def folded_unicode_representer(dumper, data):
    return dumper.represent_scalar(u'tag:yaml.org,2002:str', data, style='>')
def literal_unicode_representer(dumper, data):
    return dumper.represent_scalar(u'tag:yaml.org,2002:str', data, style='|')

yaml.add_representer(folded_unicode, folded_unicode_representer)
yaml.add_representer(literal_unicode, literal_unicode_representer)

if len(sys.argv) < 3:
    usage()
    sys.exit(1)

src = sys.argv[1]
destination = sys.argv[2]
if not os.path.exists(destination) or not os.path.isdir(destination):
    usage()
    sys.exit(1)

if len(sys.argv) == 4:
    config = sys.argv[3]
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
    title = ''
    if provider_type == 'linode':
        title = 'Linode'
        from providers.linode import get
    elif provider_type == 'digitalocean':
        title = 'Digital Ocean'
        from providers.digitalocean import get
    elif provider_type == 'rackspace':
        title = 'Rackspace'
        from providers.rackspace import get
    elif provider_type == 'ec2':
        title = 'Ec2'
        from providers.ec2 import get
    else:
        print 'Provider %s not supported' % provider_type
        continue

    print 'Getting %s...' % provider_type
    data = get(**provider)

    # Fetch the data from the source yaml file
    meta = {}
    meta_file = os.path.join(src, provider_type, 'v0.3', 'meta.yml')
    if os.path.exists(meta_file):
        with open(meta_file) as s:
            meta = yaml.safe_load(s.read())


    with open(os.path.join(destination, provider_type +'.md'), 'w') as f:
        data.update({'title': title})
        # data.update({'title': provider_type.replace('_', ' ').replace('-', ' ').title()})
        data.update({'template': 'provider.html'})
        data.update({'defaults': meta.get('defaults')})
        data.update({'description': folded_unicode(meta.get('description'))})
        f.write(yaml.safe_dump(data, explicit_start=True, default_flow_style=False))
        f.write('\n---')
        print 'Written to %s' % (provider_type +'.md')
