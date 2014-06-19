---
configuration: {}
include:
  menu_manual: manual.html
links:
- title: Official website
  url: http://www.x.org/wiki/
tags:
- app
template: page.html
title: Xvfb

---
Add support for Xfvb (X Virtual FrameBuffer) service; useful when trying to run karma tests (for example) in a headless server.

## Example

    services:
      xvfb: '*'

Install Xvfb on the node and ensure it is running on the node.
## Tasks
### restart
# Restart Xvfb
### start
# Start Xvfb
### stop
# Stop Xvfb