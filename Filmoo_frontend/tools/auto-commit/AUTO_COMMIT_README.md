# 🤖 Filmoo Frontend Auto-Commit Tool

This tool provides an easy way to automatically stage, commit, and push changes to your git repository. It's designed to work anywhere in your Filmoo frontend project.

## 📁 Files Included

- `auto-commit.js` - Main Node.js script (works on all platforms)
- `auto-commit.bat` - Windows batch file for easy execution
- `auto-commit.ps1` - PowerShell script for Windows (recommended)
- `auto-commit.sh` - Shell script for Unix/Linux/macOS

## 🚀 Quick Start

### Method 1: Using Node.js directly (All Platforms)

```bash
# Basic usage with auto-generated commit message
node auto-commit.js

# With custom commit message
node auto-commit.js "Your custom commit message"
```

### Method 2: Using Windows Batch File

```cmd
# Basic usage
auto-commit.bat

# With custom commit message
auto-commit.bat "Your custom commit message"
```

### Method 3: Using PowerShell (Windows - Recommended)

```powershell
# Basic usage
.\auto-commit.ps1

# With custom commit message
.\auto-commit.ps1 "Your custom commit message"
```

### Method 4: Using Shell Script (Unix/Linux/macOS)

```bash
# Make executable first time
chmod +x auto-commit.sh

# Basic usage
./auto-commit.sh

# With custom commit message
./auto-commit.sh "Your custom commit message"
```

## 🔧 Features

- ✅ **Automatic staging** of all changes
- ✅ **Smart commit messages** based on file changes
- ✅ **Pull latest changes** before committing
- ✅ **Push to remote** after committing
- ✅ **Error handling** with clear messages
- ✅ **Cross-platform** support
- ✅ **No dependencies** (uses built-in Node.js modules)

## 📋 What the Tool Does

1. **Checks prerequisites**:
   - Verifies Node.js is installed
   - Confirms you're in a git repository
   - Ensures the script file exists

2. **Pulls latest changes**:
   - Fetches and merges latest changes from remote
   - Prevents conflicts

3. **Stages changes**:
   - Adds all modified files to staging area
   - Includes new files and removes deleted files

4. **Creates commit**:
   - Generates smart commit message based on changes
   - Or uses your custom message

5. **Pushes changes**:
   - Pushes to the current branch
   - Uses 'origin' as default remote

## 🎯 Smart Commit Messages

The tool automatically generates commit messages based on your changes:

- `Auto commit: 3 modified, 1 added` - When you modify 3 files and add 1 new file
- `Auto commit: 2 deleted` - When you delete 2 files
- `Auto commit: 1 renamed` - When you rename 1 file

## 📍 Usage Examples

### Basic Usage
```bash
node auto-commit.js
```
*Result: Automatically stages, commits, and pushes all changes with a smart message*

### Custom Commit Message
```bash
node auto-commit.js "Fixed movie display bug in admin panel"
```
*Result: Commits with your custom message*

### Using in Different Directories
You can copy these files to any directory in your project and use them:

```bash
# Copy to src/admin/Movie/
cp auto-commit.js src/admin/Movie/
cd src/admin/Movie/
node auto-commit.js "Updated movie interface"
```

## ⚠️ Important Notes

1. **Git Repository Required**: The tool only works in git repositories
2. **Node.js Required**: Make sure Node.js is installed on your system
3. **Internet Connection**: Required for pulling and pushing changes
4. **Git Credentials**: Make sure your git credentials are configured
5. **Branch Protection**: If your branch has protection rules, the push might fail

## 🔍 Troubleshooting

### "Node.js is not installed"
- Download and install Node.js from [nodejs.org](https://nodejs.org/)

### "Not in a git repository"
- Make sure you're in a directory that contains a `.git` folder
- Run `git init` if you need to initialize a new repository

### "Failed to pull latest changes"
- Check your internet connection
- Verify your git remote is configured correctly
- Run `git remote -v` to check your remotes

### "Error pushing changes"
- Check if you have write permissions to the repository
- Verify your git credentials are configured
- Check if the branch has protection rules

## 🛠️ Advanced Usage

### Using as a Module
You can also use the AutoCommit class in your own scripts:

```javascript
const AutoCommit = require('./auto-commit.js');

// Create instance with custom options
const autoCommit = new AutoCommit({
    branch: 'develop',
    remote: 'upstream',
    commitMessage: 'Custom default message'
});

// Run auto-commit
autoCommit.autoCommit('My custom message');
```

### Custom Options
```javascript
const autoCommit = new AutoCommit({
    branch: 'main',           // Default branch
    remote: 'origin',         // Default remote
    commitMessage: 'Auto commit changes', // Default message
    dryRun: false            // Set to true for testing
});
```

## 📞 Support

If you encounter any issues:

1. Check the error messages in the console
2. Verify your git configuration
3. Ensure you have the necessary permissions
4. Check your internet connection

---

**Happy coding! 🎉** 