---
title: uWSGI
layout: page
links:
    - title: Official website
      url: http://projects.unbit.it/uwsgi/
configuration: {}
---
The uWSGI project aims at developing a full stack for building hosting services.

Application servers (for various programming languages and protocols), proxies, process managers and monitors are all implemented using a common api and a common configuration style.

Thanks to its pluggable architecture it can be extended to support more platforms and languages.

Currently, you can write plugins in C, C++ and Objective-C.

The "WSGI" part in the name is a tribute to the namesake Python standard, as it has been the first developed plugin for the project.

Versatility, performance, low-resource usage and reliability are the strengths of the project (and the only rules followed).

## Example

    services:
      uwsgi: '*'

Add support for uWSGI on the node, installing Python Emperor to manage the applications.

Note that the applications are managed via dedicated tasks.