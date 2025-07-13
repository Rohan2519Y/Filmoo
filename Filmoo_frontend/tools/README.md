# 🛠️ Filmoo Frontend Development Tools

This directory contains development tools and utilities for the Filmoo frontend project.

## 📁 Directory Structure

```
tools/
├── auto-commit/           # Auto-commit tools and scripts
│   ├── auto-commit.js     # Main Node.js auto-commit script
│   ├── auto-commit.bat    # Windows batch file
│   ├── auto-commit.ps1    # PowerShell script (Windows)
│   ├── auto-commit.sh     # Shell script (Unix/Linux/macOS)
│   ├── run-auto-commit.js # Global runner script
│   └── AUTO_COMMIT_README.md # Detailed documentation
└── README.md              # This file
```

## 🚀 Quick Start - Auto-Commit Tool

### Method 1: Using npm scripts (Recommended)
```bash
# Basic auto-commit
npm run commit

# With custom message
npm run commit:msg "Your custom message"
```

### Method 2: Using root shortcuts
```bash
# Windows
commit.bat
commit.bat "Your custom message"

# PowerShell (Windows)
.\commit.ps1
.\commit.ps1 "Your custom message"

# Unix/Linux/macOS
./commit.sh
./commit.sh "Your custom message"
```

### Method 3: Direct script execution
```bash
# From anywhere in the project
node tools/auto-commit/run-auto-commit.js
node tools/auto-commit/run-auto-commit.js "Your custom message"
```

### Method 4: Using individual platform scripts
```bash
# Windows
tools/auto-commit/auto-commit.bat
tools/auto-commit/auto-commit.bat "Your custom message"

# PowerShell
.\tools\auto-commit\auto-commit.ps1
.\tools\auto-commit\auto-commit.ps1 "Your custom message"

# Unix/Linux/macOS
./tools/auto-commit/auto-commit.sh
./tools/auto-commit/auto-commit.sh "Your custom message"
```

## 🎯 Features

- ✅ **Global Access**: Run from anywhere in the project
- ✅ **Smart Detection**: Automatically finds project root
- ✅ **Cross-Platform**: Works on Windows, macOS, and Linux
- ✅ **Multiple Entry Points**: Choose your preferred method
- ✅ **Error Handling**: Comprehensive error checking
- ✅ **No Dependencies**: Uses only built-in Node.js modules

## 📋 What the Auto-Commit Tool Does

1. **Finds Project Root**: Automatically locates the project root directory
2. **Checks Prerequisites**: Verifies Node.js and git repository
3. **Pulls Latest Changes**: Fetches latest changes from remote
4. **Stages Changes**: Adds all modified files to staging
5. **Creates Commit**: Generates smart commit message or uses custom one
6. **Pushes Changes**: Pushes to remote repository

## 🔧 Usage Examples

### Basic Usage
```bash
# From project root
npm run commit

# From any subdirectory
cd src/admin/Movie/
npm run commit
```

### Custom Commit Messages
```bash
# Using npm
npm run commit:msg "Fixed movie display bug"

# Using shortcuts
commit.bat "Updated admin interface"
.\commit.ps1 "Added new features"
./commit.sh "Bug fixes and improvements"
```

### From Different Directories
```bash
# Works from any directory in the project
cd src/admin/Movie/
node ../../tools/auto-commit/run-auto-commit.js "Updated movie interface"

cd public/
node ../tools/auto-commit/run-auto-commit.js "Updated assets"
```

## 📖 Detailed Documentation

For complete documentation, see:
- `tools/auto-commit/AUTO_COMMIT_README.md` - Comprehensive guide
- `tools/auto-commit/auto-commit.js` - Source code with comments

## 🆘 Troubleshooting

### Common Issues

1. **"Node.js not found"**
   - Install Node.js from [nodejs.org](https://nodejs.org/)

2. **"Not in git repository"**
   - Make sure you're in a git repository
   - Run `git init` if needed

3. **"Auto-commit script not found"**
   - Ensure the tools directory structure is intact
   - Check file permissions

4. **"Failed to push changes"**
   - Check git credentials
   - Verify repository permissions
   - Check branch protection rules

### Getting Help

1. Check the error messages in the console
2. Verify your git configuration
3. Ensure you have necessary permissions
4. Check your internet connection

## 🔄 Adding New Tools

To add new development tools:

1. Create a new directory in `tools/`
2. Add your tool files
3. Update this README with usage instructions
4. Consider adding npm scripts in `package.json`

## 📞 Support

For issues with the auto-commit tool:
1. Check the detailed documentation in `tools/auto-commit/`
2. Review error messages carefully
3. Verify your git and Node.js setup

---

**Happy coding! 🎉** 