---
tasks: 
  - name: update
    description: Clone or update a git repository
    options:
      repo:
        type: string  
        description: URL of the git repository (http or ssh)
        required: true
      dest:
        type: string
        description: Folder where repository is cloned on the node
        required: true
      version:
        type: string
        description: "Version of the repository to checkout (HEAD, SHA-1, branch or tag name)"
        required: false
        default: HEAD
  - name: config
    description: Set git user configuration either globally or for a repo defined by its path on the system
    options:
      user:
        type: string
        description: Full name of the user that will perform commits
        required: true
      email:
        type: string
        description: Email address of the user used to perform the commits
        required: true
      path:
        type: string
        description: Path of the repo on the host where to set the git configuration, if no `path` provided perform a global setup
        required: false
  - name: deploy
    description: Commit and push the content of a folder to a remote repository
    options:
      source:
        type: string
        description: Source folder within the repo where the content to push is
        required: true
      repo:
        type: string
        description: Local folder where the repository is located
        required: true
      branch:
        type: string
        description: Remote branch to push the source content to (will be removed)
        required: true
---
