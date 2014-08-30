import os
import sys
import re
import yaml

services = {}
docs_pattern = re.compile('packages/(?P<service>\w+)/(?P<version>[\w.]+)')

def usage():
    print 'Usage: %s <source_folder> <destination_folder>\n' % sys.argv[0]
    print '  <source_folder> must already exist'
    print '  <destination_folder> must already exist'
    print ''

if len(sys.argv) < 3:
    usage()
    sys.exit(1)

source = sys.argv[1]
if not os.path.exists(source) or not os.path.isdir(source):
    usage()
    sys.exit(1)

destination = sys.argv[2]
if not os.path.exists(destination) or not os.path.isdir(destination):
    usage()
    sys.exit(1)


for root, dirs, files in os.walk(source):
    # Only consider files within the docs subfolders
    match = docs_pattern.search(root)
    if match:
        matches = match.groupdict()
        service = matches.get('service')
        version = matches.get('version')
        services.setdefault(service, {})
        if 'meta.yml' in files:
            with open(os.path.join(root, 'meta.yml')) as f:
                content = f.read()
            meta = yaml.safe_load(content)
            services[service].update({'meta': meta})
        if 'tasks.yml' in files:
            with open(os.path.join(root, 'tasks.yml')) as f:
                content = f.read()
            tasks = yaml.safe_load(content)
            services[service].update({'tasks': tasks})
        if 'README.md' in files:
            content = ''
            with open(os.path.join(root, 'README.md')) as f:
                content = f.read()
            services[service].update({'content': content})

# Write the compiles files
for service, data in services.iteritems():
    with open(os.path.join(destination, service +'.md'), 'w') as f:
        # Start to prepare the yaml header
        if not
        meta = data.get('meta', {})
        tasks = data.get('tasks', {})
        content = data.get('content', '')

        # merge meta and tasks objects
        if isinstance(None, tasks):
            tasks = {}
        meta.update(tasks)

        f.write(yaml.safe_dump(meta, explicit_start=True, default_flow_style=False))
        f.write('\n---')
        f.write('\n%s' % content)
