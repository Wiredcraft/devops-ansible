import json
import os
import sys
import re
import yaml

docs_pattern = re.compile('packages/(?P<service>\w+)/(?P<version>[\w.]+)')

def usage():
    print 'Usage: %s <source_folder> <destination_folder>\n' % sys.argv[0]
    print '  <source_folder> must already exist'
    print '  <destination_filename> filename (no / allowed)'
    print ''

if len(sys.argv) < 3:
    usage()
    sys.exit(1)

source = sys.argv[1]
if not os.path.exists(source) or not os.path.isdir(source):
    usage()
    sys.exit(1)

destination = sys.argv[2]
if '/' in destination:
    usage()
    sys.exit(1)


def service_walker(src_dir, meta=True, tasks=False, readme=False):
    for root, dirs, files in os.walk(src_dir):
        # Only consider files within the docs subfolders
        match = docs_pattern.search(root)
        if match:
            matches = match.groupdict()
            service = matches.get('service')
            version = matches.get('version')

            if meta and 'meta.yml' in files:
                with open(os.path.join(root, 'meta.yml')) as f:
                    content = f.read()
                content = yaml.safe_load(content)
                yield service, version, 'meta', content
            if tasks and 'tasks.yml' in files:
                with open(os.path.join(root, 'tasks.yml')) as f:
                    content = f.read()
                content = yaml.safe_load(content)
                yield service, version, 'task', content
            if readme and 'README.md' in files:
                with open(os.path.join(root, 'README.md')) as f:
                    content = f.read()
                yield service, version, 'readme', content


services = {}
for service, version, type, content in service_walker(source, meta=True):
    if type == 'meta':
        if service not in services or version > services[service]['version']:
            services[service] = {}
            services[service]['version'] = version
            if 'title' in content:
                services[service]['label'] = content['title']
            else:
                print "WARNING: No title for service: %s %s" % (service, version)

            if 'documentation' in content:
                services[service]['documentation'] = content['documentation']
            else:
                print "WARNING: No documentation for service: %s %s" % (service, version)


for srv in services.values():
    del srv['version']

json.dump(services, open(destination, 'w'), indent=2)
