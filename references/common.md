---
configuration: {}
include:
  menu_manual: manual.html
template: page.html
title: Common

---
Common package, available in every node. Lets you run which ever task defined there.
## Tasks
### custom packages
# Task Custom_packages

---
{}

---

### devops user
# Task Devops_user

---
{}

---

### monitoring
# Task Monitoring

---
{}

---

### dependencies
# Task Dependencies

---
{}

---

### etcd fetch and set
# Task Etcd_fetch_and_set

Fetch value from etcd server and set it up as env var

---
- id:  etcd_host
  label:  Host name or ip for etcd server
  required:  true
  default:  _

- id:  etcd_key
  label:  Key name (without leading slash) of an etcd item
  required:  true
  default:  _

---

### devops
# Task Devops

---
{}

---

### script
# Task Script

---
{}

---

### users
# Task Users

---
{}

---

### env
# Task Env

---
{}

---

### kernel
# Task Kernel

---
{}

---

### packages
# Task Packages

---
{}
---

### git clone
# Task Git_clone

Clone git repository

---
- id: git_repo_address
  label: Git repository address
  required: true

- id: git_repo_dest
  label: Directory where repo is cloned
  required: true

- id: git_repo_version
  label: "Version of the repository to checkout (HEAD, SHA-1, branch or tag name)"
  required: false
  default: HEAD
---
