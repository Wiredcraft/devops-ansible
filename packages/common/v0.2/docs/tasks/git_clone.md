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
