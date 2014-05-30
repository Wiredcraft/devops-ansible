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