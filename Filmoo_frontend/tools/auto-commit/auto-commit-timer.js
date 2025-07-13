const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class AutoCommitTimer {
    constructor(options = {}) {
        this.options = {
            interval: 5 * 60 * 1000, // 5 minutes default
            commitMessage: 'Auto commit changes',
            branch: 'main',
            remote: 'origin',
            dryRun: false,
            maxCommits: 100, // Maximum commits per session
            commitCount: 0,
            isRunning: false,
            timerId: null,
            countdownId: null,
            ...options
        };
    }

    // Check if we're in a git repository
    isGitRepo() {
        try {
            execSync('git rev-parse --git-dir', { stdio: 'ignore' });
            return true;
        } catch (error) {
            return false;
        }
    }

    // Get current branch
    getCurrentBranch() {
        try {
            return execSync('git branch --show-current', { encoding: 'utf8' }).trim();
        } catch (error) {
            console.error('Error getting current branch:', error.message);
            return 'main';
        }
    }

    // Check if there are any changes to commit
    hasChanges() {
        try {
            const status = execSync('git status --porcelain', { encoding: 'utf8' });
            return status.trim().length > 0;
        } catch (error) {
            console.error('Error checking git status:', error.message);
            return false;
        }
    }

    // Stage all changes
    stageChanges() {
        try {
            console.log('📁 Staging changes...');
            execSync('git add .', { stdio: 'inherit' });
            console.log('✅ Changes staged successfully');
            return true;
        } catch (error) {
            console.error('❌ Error staging changes:', error.message);
            return false;
        }
    }

    // Create commit
    createCommit(message) {
        try {
            console.log('💾 Creating commit...');
            execSync(`git commit -m "${message}"`, { stdio: 'inherit' });
            console.log('✅ Commit created successfully');
            return true;
        } catch (error) {
            console.error('❌ Error creating commit:', error.message);
            return false;
        }
    }

    // Push changes
    pushChanges(branch, remote = 'origin') {
        try {
            console.log(`🚀 Pushing to ${remote}/${branch}...`);
            execSync(`git push ${remote} ${branch}`, { stdio: 'inherit' });
            console.log('✅ Changes pushed successfully');
            return true;
        } catch (error) {
            console.error('❌ Error pushing changes:', error.message);
            return false;
        }
    }

    // Pull latest changes
    pullChanges(branch, remote = 'origin') {
        try {
            console.log(`📥 Pulling latest changes from ${remote}/${branch}...`);
            execSync(`git pull ${remote} ${branch}`, { stdio: 'inherit' });
            console.log('✅ Changes pulled successfully');
            return true;
        } catch (error) {
            console.error('❌ Error pulling changes:', error.message);
            return false;
        }
    }

    // Generate commit message with timestamp
    generateCommitMessage() {
        const now = new Date();
        const timestamp = now.toLocaleString();
        return `${this.options.commitMessage} - ${timestamp}`;
    }

    // Single commit operation
    async performCommit(customMessage = null) {
        console.log(`\n🕐 Timer-based commit #${this.options.commitCount + 1} at ${new Date().toLocaleString()}`);
        console.log('=====================================');

        // Check if we're in a git repository
        if (!this.isGitRepo()) {
            console.error('❌ Not in a git repository. Please run this script from a git repository.');
            return false;
        }

        // Check if there are changes to commit
        if (!this.hasChanges()) {
            console.log('📭 No changes to commit. Working directory is clean.');
            return true;
        }

        // Get current branch
        const currentBranch = this.getCurrentBranch();
        console.log(`🌿 Current branch: ${currentBranch}`);

        // Pull latest changes first
        if (!this.pullChanges(currentBranch, this.options.remote)) {
            console.error('❌ Failed to pull latest changes. Skipping this commit.');
            return false;
        }

        // Stage changes
        if (!this.stageChanges()) {
            return false;
        }

        // Generate or use custom commit message
        const commitMessage = customMessage || this.generateCommitMessage();

        // Create commit
        if (!this.createCommit(commitMessage)) {
            return false;
        }

        // Push changes
        if (!this.pushChanges(currentBranch, this.options.remote)) {
            return false;
        }

        this.options.commitCount++;
        console.log(`✅ Timer-based commit #${this.options.commitCount} completed successfully!`);
        return true;
    }

    // Start the timer with live countdown
    startTimer() {
        if (this.options.isRunning) {
            console.log('⏰ Timer is already running!');
            return;
        }

        console.log('🤖 Starting Auto-Commit Timer');
        console.log('=====================================');
        console.log(`⏱️  Interval: ${this.options.interval / 1000} seconds`);
        console.log(`📝 Default message: ${this.options.commitMessage}`);
        console.log(`🛑 Max commits: ${this.options.maxCommits}`);
        console.log('Press Ctrl+C to stop the timer');
        console.log('');

        this.options.isRunning = true;
        this.options.commitCount = 0;

        // Perform initial commit check
        this.performCommit().then(() => {
            this._startCountdownAndTimer();
        });
    }

    // Internal: start countdown and timer
    _startCountdownAndTimer() {
        let remaining = this.options.interval / 1000; // seconds
        const displayCountdown = () => {
            const min = Math.floor(remaining / 60);
            const sec = remaining % 60;
            process.stdout.write(`\r⏳ Next commit in: ${min}:${sec.toString().padStart(2, '0')}   `);
        };
        displayCountdown();
        this.options.countdownId = setInterval(() => {
            remaining--;
            if (remaining <= 0) {
                clearInterval(this.options.countdownId);
                process.stdout.write('\r\n');
                this._runCommitAndRestartCountdown();
            } else {
                displayCountdown();
            }
        }, 1000);
    }

    // Internal: run commit and restart countdown
    async _runCommitAndRestartCountdown() {
        await this.performCommit();
        if (this.options.isRunning && (this.options.commitCount < this.options.maxCommits)) {
            this._startCountdownAndTimer();
        } else {
            this.stopTimer();
        }
    }

    // Stop the timer
    stopTimer() {
        if (!this.options.isRunning) {
            console.log('⏰ Timer is not running!');
            return;
        }
        if (this.options.timerId) {
            clearInterval(this.options.timerId);
            this.options.timerId = null;
        }
        if (this.options.countdownId) {
            clearInterval(this.options.countdownId);
            this.options.countdownId = null;
        }
        this.options.isRunning = false;
        process.stdout.write('\r\n');
        console.log(`\n⏹️  Timer stopped! Total commits made: ${this.options.commitCount}`);
    }

    // Get timer status
    getStatus() {
        return {
            isRunning: this.options.isRunning,
            commitCount: this.options.commitCount,
            interval: this.options.interval,
            maxCommits: this.options.maxCommits
        };
    }

    // Set interval (in minutes)
    setInterval(minutes) {
        this.options.interval = minutes * 60 * 1000;
        console.log(`⏱️  Timer interval set to ${minutes} minutes`);
    }

    // Set max commits
    setMaxCommits(max) {
        this.options.maxCommits = max;
        console.log(`🛑 Max commits set to ${max}`);
    }

    // Set commit message
    setCommitMessage(message) {
        this.options.commitMessage = message;
        console.log(`📝 Commit message set to: ${message}`);
    }
}

// Export for use as module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AutoCommitTimer;
}

// Auto-execute if run directly
if (require.main === module) {
    const args = process.argv.slice(2);
    
    // Parse command line arguments
    const options = {};
    let interval = 5; // Default 5 minutes
    let maxCommits = 100;
    let commitMessage = 'Auto commit changes';

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        
        if (arg === '--interval' || arg === '-i') {
            interval = parseInt(args[i + 1]) || 5;
            i++;
        } else if (arg === '--max-commits' || arg === '-m') {
            maxCommits = parseInt(args[i + 1]) || 100;
            i++;
        } else if (arg === '--message' || arg === '-msg') {
            commitMessage = args[i + 1] || 'Auto commit changes';
            i++;
        } else if (arg === '--help' || arg === '-h') {
            console.log('🤖 Auto-Commit Timer Usage:');
            console.log('node auto-commit-timer.js [options]');
            console.log('');
            console.log('Options:');
            console.log('  --interval, -i <minutes>    Set commit interval in minutes (default: 5)');
            console.log('  --max-commits, -m <number>  Set maximum commits per session (default: 100)');
            console.log('  --message, -msg <text>      Set default commit message');
            console.log('  --help, -h                  Show this help message');
            console.log('');
            console.log('Examples:');
            console.log('  node auto-commit-timer.js');
            console.log('  node auto-commit-timer.js --interval 10');
            console.log('  node auto-commit-timer.js -i 15 -m 50 -msg "Auto backup"');
            process.exit(0);
        }
    }

    const timer = new AutoCommitTimer({
        interval: interval * 60 * 1000,
        commitMessage: commitMessage,
        maxCommits: maxCommits
    });

    // Handle graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n🛑 Received interrupt signal. Stopping timer...');
        timer.stopTimer();
        process.exit(0);
    });

    process.on('SIGTERM', () => {
        console.log('\n🛑 Received terminate signal. Stopping timer...');
        timer.stopTimer();
        process.exit(0);
    });

    // Start the timer
    timer.startTimer();
} 