import os
import sys
import re
import yaml

services = {}
docs_pattern = re.compile('packages/(?P<service>\w+)/(?P<version>[\w.]+)/docs')

def usage():
    print 'Usage: %s <source_folder> <destination_folder>\n' % sys.argv[0]
    print '  <source_folder> must already exist'
    print '  <destination_folder> must already exist'
    print ''

def parse_mixed_content(text):
    '''
    Extract the yaml header of text and returns a header dict + stripped content
    '''
    # Keep only the yaml header
    try:
        delimiter = text.index('---\n', 2)
        raw_header = text[:delimiter]
        content = text[delimiter+4:]
        header = yaml.safe_load(raw_header)
    except:
        header = {}
        content = text
    return header, content

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
        if 'configuration.md' in files:
            with open(os.path.join(root, 'configuration.md')) as f:
                config = f.read()
            header, content = parse_mixed_content(config)
            services[service].update({'header': header})
            services[service].update({'config': content})
        if 'tasks.md' in files:
            with open(os.path.join(root, 'tasks.md')) as f:
                config = f.read()
            header, content = parse_mixed_content(config)
            services[service].update({'tasks_header': header})
            services[service].update({'tasks_content': content})

# Write the compiles files
for service, data in services.iteritems():
    with open(os.path.join(destination, service +'.md'), 'w') as f:
        # Start to prepare the yaml header
        header = data.get('header', {})
        content = data.get('config', '')
        tasks_header = data.get('tasks_header', {})
        tasks_content = data.get('tasks_content', None)

        if tasks_content:
            content += '\n'+ tasks_content
        header.update(tasks_header)

        f.write(yaml.safe_dump(header, explicit_start=True, default_flow_style=False))
        f.write('\n---')
        f.write('\n%s' % content)