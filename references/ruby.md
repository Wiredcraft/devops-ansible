---
configuration:
  gems:
    default: []
    description: List of gems to install globally on the system
    required: false
    type: array
include:
  menu_manual: manual.html
links:
- title: Official website
  url: https://www.ruby-lang.org/
tags:
- language
template: page.html
title: Ruby

---
A dynamic, open source programming language with a focus on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write.

## Example

    services:
      ruby: '*'
    configuration:
      ruby:
        gems:
          - compass

Add ruby support to allow install of Gem packages (globally) on the system.
## Tasks
### add gems
# Add Ruby gems

Install ruby gems globally on the server.

### remove gems
# Remove Ruby gems

Remove Ruby gems installed globally from the server. If the gems are not installed it doesn't do anything.
