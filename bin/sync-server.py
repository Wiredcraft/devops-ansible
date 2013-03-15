import sys
import os
import json
import getopt
import commands
from ansible.inventory import Inventory

invalid_groups = ["all", "ungrouped"]
valid_services = ["apache", "php", "php5-fpm", "varnish", "mysql", "mongodb", "memcached"]

def usage():
    print "Usage:"
    print ""
    print "  -h | --help                        - This help"
    print "  -g | --group | --space space-name  - The ansible inventory to run from"
    print "  -n | --name server-name            - The server defined in the inventory"
    print "                                       to run the sync for."
    print "  -i | --inventory inventory         - inventory file name (default: hosts)"

def main(argv):
    host = '';
    space = '';
    config = 'hosts';
    
    # To improve..
    cwd = os.path.dirname(os.path.realpath(__file__))
    space_root = os.path.join(cwd, '../spaces');
    
    try:
        opts, args = getopt.getopt(argv, "hg:n:i:d", ["help", "group=", "space=", "name=", "inventory="])
    except getopt.GetoptError:
        usage()
        sys.exit(2)

    for opt, arg in opts:
        if opt in ("-h", "--help"):
            usage()
            sys.exit()
        elif opt == "-d":
            global _debug
            _debug = 1
        elif opt in ("-g", "--group", "--space"):
            space = arg
        elif opt in ("-n", "--name"):
            host = arg
        elif opt in ("-i", "--inventory"):
            config = arg

    if host == '' or space == '':
        print "Host and space are both required. Aborting"
        usage()
        sys.exit(1)

    # Need to load the config file of the webnode
    space_dir = os.path.join(space_root, space)
    inventory_file = os.path.join(space_dir, config)
    inventory = Inventory(inventory_file)
    hosts = inventory.list_hosts();
    # groups = inventory.list_groups();

    if host not in hosts:
        print "Unknown host: "+ host
        print ""
        print "Existing: "
        print hosts
        sys.exit(1)

    groups = inventory.get_variables(host)['group_names'];

    # filter groups
    groups = [ x for x in groups if x not in invalid_groups ]
    groups = [ x for x in groups if x in valid_services ]
    
    for group in groups:
        result = commands.getoutput('cd '+ space_dir +' && ansible-playbook playbooks/services/'+ group +'/playbook.yml -i '+ inventory_file +' -e "server='+ host +'" -s')
        print result

if __name__ == "__main__":
    main(sys.argv[1:])