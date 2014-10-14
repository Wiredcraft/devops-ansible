[Rackspace](http://rackspace.com) is a managed cloud computing company base in Texas with datacenters in Texas, Illinois, Virginia, the United Kingdom, Australia, and Hong Kong.

<em>Don't have a Rackspace account yet? <a href='https://www.rackspace.com/' target='_blank'>Sign up for an account</a>.</em>

## Example

The following [node file](http://docs.devo.ps/manual/nodes/#node-file) will create a 512MB Standard Instance (`size: 2`) on Rackspace in their Dallas datacenter (`location: DFW`):

    id: rackspace_server
    name: Rackspace server
    type: server

    provider:
      name: rackspace
      location: DFW
      size: 2

<em>Note that all the location's ID must be UPPERCASE</em>

<em>The `performance` sizes are only available in the following locations: `IAD`, `ORD`, `LON`.</em>