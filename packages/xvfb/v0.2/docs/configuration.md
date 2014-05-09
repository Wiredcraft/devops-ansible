---
title: Xvfb
layout: page
links:
    - title: Official website
      url: http://www.x.org/wiki/
configuration: {}
---
Add support for Xfvb (X Virtual FrameBuffer) service; useful when trying to run karma tests (for example) in a headless server.

## Configuration example

    services:
      xvfb: '*'
    configuration:
      xvfb: {}
