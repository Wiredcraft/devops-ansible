[Digital Ocean](http://digitalocean.com) is a virtual private server provider based in New York with datacenters in New York, Amsterdam, San Francisco, London and Singapore.

<em>Don't have a Digital Ocean account yet? <a href='https://www.digitalocean.com/?refcode=3918a442dbd7' target='_blank'>Sign up for an account</a>.</em>

## Example

The following [node file](http://docs.devo.ps/manual/nodes/#node-file) will create a 512MB droplet (`size: 66`) on Digital Ocean in their San Francisco 1 datacenter (`location: 3`):

    id: digitalocean_server
    name: Digital Ocean server
    type: server

    provider:
      name: digitalocean
      location: 3
      size: 66

## API keys

The devo.ps platform currently only supports the version 1 of the Digital Ocean API. Support for the v2 is on-going and will be added soon.

1. [Log on your Digital Ocean account](https://www.digitalocean.com/login)

1. Click on the `Apps & API` item from the left menu

    <p align='center'><img src='/assets/images/digitalocean_api_menu.png' alt='Digital Ocean menu' /></p>

1. Click on the `API v1.0 Page` link in the header

    <p align='center'><img src='/assets/images/digitalocean_api_v1.png' alt='Digital Ocean API v1.0' /></p>

1. Click on the `Generate new key` button, and save your keys

    <p align='center'><img src='/assets/images/digitalocean_api_create.png' alt='Digital Ocean generate API key' /></p>

1. Go in your [devo.ps profile](https://app.devo.ps/#/user/profile)

    <em>Click on `Add a Cloud Provider`, select `Digital Ocean` and enter the keys created in the previous step.</em>


