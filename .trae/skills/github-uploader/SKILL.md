---
name: "github-uploader"
description: "Uploads a project to GitHub, handles Git initialization, remote connection, commits, branch management, and authentication. Invoke when user needs to upload project to GitHub or when initializing Git repository."
---

# GitHub Uploader

This skill provides step-by-step guidance for uploading a project to GitHub, including Git initialization, remote repository connection, file commits, branch management, and authentication handling.

## When to Invoke

Invoke this skill when:
- User wants to upload a project to GitHub
- User asks to "push to GitHub" or "upload to GitHub"
- User needs help with Git initialization
- User asks about GitHub Personal Access Token (PAT)
- User encounters authentication errors when pushing to GitHub

## Workflow

### Step 1: Environment Check

First, verify Git is available:

```bash
# Check Git installation
git --version

# Check Git configuration
git config --list
```

If Git is not installed, guide user to download from: https://git-scm.com/download/win

### Step 2: Git Configuration

Configure user identity (required for commits):

```bash
# Set global user name
git config --global user.name "Your GitHub Username"

# Set global email (use GitHub registered email)
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list
```

### Step 3: Initialize Git Repository

```bash
# Navigate to project directory
cd "path/to/your/project"

# Initialize Git repository
git init
```

### Step 4: Prepare .gitignore

Check if `.gitignore` exists. If not, create one for Node.js/React projects:

```gitignore
# Dependencies
node_modules/

# Build output
dist/
build/
.vite/

# Environment files
.env
.env.local
.env.*.local

# IDE
.idea/
.vscode/
*.swp

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Cache
.cache/
.parcel-cache/
```

### Step 5: Add and Commit Files

```bash
# Add all files (respects .gitignore)
git add .

# Check status
git status

# Commit with message
git commit -m "Initial commit"
```

### Step 6: Create GitHub Repository

Guide user to create repository on GitHub:
1. Open https://github.com/new
2. Enter Repository name
3. **DO NOT check** "Add a README file"
4. **DO NOT check** "Add .gitignore"
5. **DO NOT check** "Choose a license"
6. Click "Create repository"

### Step 7: Connect Remote Repository

Method A: Using HTTPS with Personal Access Token (Recommended for new GitHub accounts)

```bash
# Add remote with PAT in URL
git remote add origin https://<your-token>@github.com/<username>/<repo-name>.git

# Rename branch to main (if not already)
git branch -M main

# Push to remote
git push -u origin main
```

Method B: Using GitHub Desktop (Simpler, handles auth automatically)

1. Install GitHub Desktop: https://desktop.github.com/
2. File -> Add Local Repository
3. Select your project folder
4. Click "Publish repository"

### Step 8: Create Personal Access Token (If using HTTPS)

Guide user to create PAT:
1. Go to GitHub -> Settings -> Developer settings -> Personal access tokens -> Tokens (classic)
2. Click "Generate new token" -> "Generate new token (classic)"
3. Set Note (e.g., "project-upload")
4. Set Expiration (recommend 90 days or No expiration)
5. Check **repo** scope (full control of private repositories)
6. Click "Generate token"
7. **Copy the token immediately** (shown only once)

### Step 9: Verification

After push completes:
1. Check remote repository on GitHub
2. Verify all files are uploaded
3. Verify commit history

## Common Issues and Solutions

### Issue 1: "src refspec main does not match any"

**Cause**: No commits in local repository

**Solution**:
```bash
git add .
git commit -m "Initial commit"
git push -u origin main
```

### Issue 2: "remote: Support for password authentication was removed"

**Cause**: GitHub no longer accepts account passwords for HTTPS

**Solution**: Use Personal Access Token instead of password

### Issue 3: "fatal: remote origin already exists"

**Cause**: Remote already configured

**Solution**:
```bash
# Update remote URL
git remote set-url origin https://<token>@github.com/<username>/<repo-name>.git

# Or remove and re-add
git remote remove origin
git remote add origin https://<token>@github.com/<username>/<repo-name>.git
```

### Issue 4: "error: bad tree object" or Git corruption

**Cause**: Git repository corrupted

**Solution**:
```bash
# Delete .git directory and reinitialize
# Windows:
Remove-Item -Recurse -Force ".git"

# Reinitialize
git init
git add .
git commit -m "Initial commit"
git remote add origin <repo-url>
git push -u origin main
```

### Issue 5: "nothing to commit, working tree clean" but still needs push

**Cause**: Files already committed but not pushed

**Solution**:
```bash
# Check status
git status

# Check branch
git branch -a

# Push if branch exists
git push -u origin main
```

## Complete Workflow Summary

```powershell
# Windows PowerShell complete workflow

# 1. Configure Git
git config --global user.name "your-username"
git config --global user.email "your-email@example.com"

# 2. Navigate to project
cd "path/to/project"

# 3. Initialize
git init

# 4. Add files and commit
git add .
git commit -m "Initial commit"

# 5. Add remote (with PAT for authentication)
git remote add origin "https://ghp_yourToken@github.com/username/repo-name.git"

# 6. Rename to main and push
git branch -M main
git push -u origin main
```

## Checklist Before Upload

- [ ] Git installed
- [ ] Git user configured (name, email)
- [ ] `.gitignore` file exists
- [ ] No sensitive files committed (API keys, passwords, .env)
- [ ] GitHub repository created (empty, no README)
- [ ] Personal Access Token created (if using HTTPS)
- [ ] Remote URL correctly configured

## Parameters

When user calls this skill, collect:

| Parameter | Required | Description |
|-----------|----------|-------------|
| project_path | Yes | Path to project directory |
| github_username | Yes | GitHub username |
| github_email | Yes | GitHub registered email |
| repo_name | Yes | Target repository name |
| github_token | No | Personal Access Token (if HTTPS) |
| commit_message | No | Default: "Initial commit" |
