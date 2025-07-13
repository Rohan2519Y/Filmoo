# ⏰ Auto-Commit Timer for Filmoo Frontend

The Auto-Commit Timer automatically commits and pushes your changes at regular intervals, ensuring your work is continuously saved to the repository.

## 🚀 Quick Start

### Method 1: Using npm scripts (Recommended)
```bash
# Start timer with default settings (5-minute intervals)
npm run timer

# Get help
npm run timer:help
```

### Method 2: Using root shortcuts
```bash
# Windows
timer.bat
timer.bat --interval 10 --message "Auto backup"

# PowerShell (Windows)
.\timer.ps1
.\timer.ps1 -Interval 10 -Message "Auto backup"

# Unix/Linux/macOS
./timer.sh
./timer.sh --interval 10 --message "Auto backup"
```

### Method 3: Direct script execution
```bash
# From anywhere in the project
node tools/auto-commit/timer-runner.js
node tools/auto-commit/timer-runner.js --interval 15 --max-commits 50
```

## ⚙️ Configuration Options

### Command Line Arguments

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `--interval` | `-i` | Commit interval in minutes | 5 |
| `--max-commits` | `-m` | Maximum commits per session | 100 |
| `--message` | `-msg` | Default commit message | "Auto commit changes" |
| `--help` | `-h` | Show help message | - |

### Examples

```bash
# Commit every 10 minutes
npm run timer -- --interval 10

# Commit every 30 minutes, max 20 commits
npm run timer -- --interval 30 --max-commits 20

# Custom commit message
npm run timer -- --message "Auto backup - Filmoo development"

# PowerShell with parameters
.\timer.ps1 -Interval 15 -MaxCommits 50 -Message "Development backup"

# Shell script with options
./timer.sh --interval 20 --max-commits 30 --message "Work in progress"
```

## 🎯 Features

- ✅ **Automatic Timing**: Commits at regular intervals
- ✅ **Smart Detection**: Only commits when there are changes
- ✅ **Pull Before Commit**: Fetches latest changes first
- ✅ **Push After Commit**: Automatically pushes to remote
- ✅ **Graceful Shutdown**: Handles Ctrl+C properly
- ✅ **Configurable Limits**: Set maximum commits per session
- ✅ **Timestamped Messages**: Includes timestamps in commit messages
- ✅ **Cross-Platform**: Works on Windows, macOS, and Linux

## 📋 What the Timer Does

1. **Initial Check**: Performs an immediate commit if there are changes
2. **Set Timer**: Starts a recurring timer based on your interval
3. **Regular Commits**: At each interval:
   - Checks for changes
   - Pulls latest changes from remote
   - Stages all changes
   - Creates commit with timestamp
   - Pushes to remote
4. **Safety Limits**: Stops after reaching maximum commits
5. **Graceful Stop**: Handles interruption signals properly

## 🔧 Usage Examples

### Basic Timer (5-minute intervals)
```bash
npm run timer
```
*Result: Commits every 5 minutes until stopped or max commits reached*

### Custom Interval (15-minute intervals)
```bash
npm run timer -- --interval 15
```
*Result: Commits every 15 minutes*

### Limited Session (10 commits max)
```bash
npm run timer -- --interval 10 --max-commits 10
```
*Result: Commits every 10 minutes, stops after 10 commits*

### Custom Message
```bash
npm run timer -- --message "Filmoo development backup"
```
*Result: Uses custom message with timestamps*

### PowerShell with Parameters
```powershell
.\timer.ps1 -Interval 30 -MaxCommits 20 -Message "Daily backup"
```

## 🛑 Stopping the Timer

### Method 1: Keyboard Interrupt
```bash
# Press Ctrl+C in the terminal
^C
🛑 Received interrupt signal. Stopping timer...
⏹️  Timer stopped! Total commits made: 5
```

### Method 2: Automatic Stop
The timer automatically stops when:
- Maximum commits reached
- Process terminated
- Error occurs

## 📊 Timer Status

The timer provides real-time status information:

```
🤖 Starting Auto-Commit Timer
=====================================
⏱️  Interval: 300 seconds
📝 Default message: Auto commit changes
🛑 Max commits: 100
Press Ctrl+C to stop the timer

🕐 Timer-based commit #1 at 12/25/2024, 2:30:15 PM
=====================================
🌿 Current branch: main
📥 Pulling latest changes from origin/main...
✅ Changes pulled successfully
📁 Staging changes...
✅ Changes staged successfully
💾 Creating commit...
✅ Commit created successfully
🚀 Pushing to origin/main...
✅ Changes pushed successfully
✅ Timer-based commit #1 completed successfully!
⏰ Timer started successfully!
```

## ⚠️ Important Notes

1. **Git Repository Required**: Timer only works in git repositories
2. **Node.js Required**: Make sure Node.js is installed
3. **Internet Connection**: Required for pulling and pushing changes
4. **Git Credentials**: Ensure your git credentials are configured
5. **Branch Protection**: Protected branches may prevent pushes
6. **Disk Space**: Regular commits can use disk space over time

## 🔍 Troubleshooting

### "Timer is already running"
- Only one timer instance can run at a time
- Check for other timer processes
- Restart your terminal if needed

### "Failed to pull latest changes"
- Check your internet connection
- Verify git remote configuration
- Ensure you have read access to the repository

### "Error pushing changes"
- Check git credentials
- Verify write permissions to repository
- Check branch protection rules

### "Maximum commits reached"
- This is normal behavior
- Timer stops automatically
- Restart with higher limit if needed

## 🎛️ Advanced Configuration

### Using as a Module
```javascript
const AutoCommitTimer = require('./tools/auto-commit/auto-commit-timer.js');

const timer = new AutoCommitTimer({
    interval: 10 * 60 * 1000, // 10 minutes
    commitMessage: 'Custom backup',
    maxCommits: 50
});

timer.startTimer();

// Stop after some time
setTimeout(() => {
    timer.stopTimer();
}, 60 * 60 * 1000); // Stop after 1 hour
```

### Custom Timer Settings
```javascript
const timer = new AutoCommitTimer({
    interval: 5 * 60 * 1000,      // 5 minutes
    commitMessage: 'Auto backup',   // Custom message
    branch: 'develop',             // Custom branch
    remote: 'upstream',           // Custom remote
    maxCommits: 100,              // Max commits
    dryRun: false                 // Set to true for testing
});
```

## 📞 Support

For timer-related issues:

1. **Check Help**: Run `npm run timer:help`
2. **Review Logs**: Check console output for error messages
3. **Verify Setup**: Ensure git and Node.js are properly configured
4. **Test Manual**: Try manual commit first with `npm run commit`

## 🔄 Integration with Development Workflow

### During Development
```bash
# Start timer when beginning work
npm run timer -- --interval 10 --message "Development session"

# Work on your code...
# Timer automatically commits every 10 minutes
```

### For Long Sessions
```bash
# Extended development session
npm run timer -- --interval 30 --max-commits 20 --message "Extended development"
```

### For Different Branches
```bash
# Feature branch development
git checkout feature/new-feature
npm run timer -- --interval 15 --message "Feature development"
```

---

**Happy coding with automatic backups! 🎉** 