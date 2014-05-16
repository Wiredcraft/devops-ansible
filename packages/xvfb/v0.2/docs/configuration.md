---
title: Xvfb
template: page.html
include: 
  menu_manual: manual.html
links:
    - title: Official website
      url: http://www.x.org/wiki/
tags:
    - app
configuration: {}
---
Add support for Xfvb (X Virtual FrameBuffer) service; useful when trying to run karma tests (for example) in a headless server.

## Example

    services:
      xvfb: '*'

Install Xvfb on the node and ensure it is running on the node.