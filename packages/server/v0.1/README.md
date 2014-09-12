You can perform fine tuning of your node.

## Hostname

By default the hostname of your node will be your node id. You can override the hostname by specifying:
    
```example
configuration:
  server:
    hostname: mybox
```

## Deb Repositories

You can add any custom repository by defining the following:

```example
configuration:
  server:
    repositories:
      - name: 'ppa:nginx/stable'
      - name: 'deb http://packages.elasticsearch.org/elasticsearch/1.3/debian stable main'
        key: 'http://packages.elasticsearch.org/GPG-KEY-elasticsearch'
```

## Deb packages

You can install custom DEB packages on your node by defining the following in the configuration:

```example
configuration:
  server:
    packages:
      - some-package
      - some-other-package
```

Those packages are expected to be found within the deb packages repositories defined in your node.

## Sysctl settings

You can specify extra parameters to your node with:

```example
configuration:
  server:
    sysctl:
      vm.swappiness: 10
      net.ipv4.ip_forward: 1
```

## SWAP settings

By default some swap will be created on the node. This can be disabled or tuned to match your needs.

The following example will change the default size and path, and create a 4GB swap file at `/custom_path`:

```example
configuration:
  server:
    swap:
      enable: true
      size: 4096
      path: /custom_path
```

This example, will ensure no swap file is being created

```example
configuration:
  server:
    swap:
      enable: false
```