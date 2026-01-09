# Fullstack Classroom - Backend Development

This repository follows the backend development curriculum, with separate branches dedicated to specific topics (Node.js, Express, Databases, Security, etc.).

## Git Workflow & Commands

Below are the commands used to set up this repository and the structure of the branches.

### 1. Repository Setup

```bash
# Initialize the repository
git init

# Stage all initial files (Readme.md, etc.)
git add .

# Create the initial commit
git commit -m "first commit"

# Rename the default branch to 'main'
git branch -M main

# Link the local repository to the GitHub remote
git remote add origin [https://github.com/AyuSharma176/Backend-Dev.git](https://github.com/AyuSharma176/Backend-Dev.git)

# Push the main branch to origin
git push -u origin main

# Module: Basic Setup & Tools
git checkout -b unix-commands-git-github

# Module: Core Node.js
git checkout -b nodejs-programming

# Module: File System
git checkout -b file-system-operations

# Module: Express.js Framework
git checkout -b express-framework

# Module: API Development
git checkout -b restful-apis-routing

# Module: Databases
git checkout -b introduction-to-databases

# Module: Middleware & State Management
git checkout -b middleware-express-session-cookies

# Module: Auth
git checkout -b authentication-authorization

# Module: Security
git checkout -b rest-security

# Module: DevOps
git checkout -b deployment