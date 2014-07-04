---
tasks: 
  - name: git_clone
    description: Clone or update a git repository
    options:
      git_repo_address:
        type: string  
        description: URL of the git repository (http or ssh)
        required: true
      git_repo_dest:
        type: string
        description: Folder where repository is cloned on the node
        required: true
      git_repo_version:
        type: string
        description: "Version of the repository to checkout (HEAD, SHA-1, branch or tag name)"
        required: false
        default: HEAD
---
