[Digital Ocean](http://digitalocean.com) is a virtual private server provider based in New York with datacenters in New York, Amsterdam, San Francisco, London and Singapore.

<em>Don't have a Digital Ocean account yet? <a href='https://www.digitalocean.com/?refcode=3918a442dbd7' target='_blank'>Sign up for an account</a>.</em>

<em>Don't know how to create your Digital Ocean API keys? Check out this <a href='/how-to/create-digitalocean-api-key'>tutorial</a>.</em>

## Example

The following [node file](http://docs.devo.ps/manual/nodes/#node-file) will create a 512MB droplet (`size: 66`) on Digital Ocean in their San Francisco 1 datacenter (`location: 3`):

    id: digitalocean_server
    name: Digital Ocean server
    type: server

    provider:
      name: digitalocean
      location: 3
      size: 66

