[Linode](https://www.linode.com/?r=a278f28e12e5e4e08adc41d8491a1988363e80d6) is a virtual private server provider based in New Jersey with datacenters in Tokyo, the US (US West, US Central, US South, US East) and London.

<em>Don't have a Linode account yet? <a href='https://www.linode.com/?r=a278f28e12e5e4e08adc41d8491a1988363e80d6' target='_blank'>Sign up for an account</a>.</em>

## Example

The following [node file](http://docs.devo.ps/manual/nodes/#node-file) will create a Linode 1024 server (`size: 1`) in their droplet Dallas datacenter (`location: 2`):

    id: linode_server
    name: Linode server
    type: server

    provider:
      name: linode
      location: 2
      size: 1
