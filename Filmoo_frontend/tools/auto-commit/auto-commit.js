const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class AutoCommit {
    constructor(options = {}) {
        this.options = {
            commitMessage: 'Auto commit changes',
            branch: 'main',
            remote: 'origin',
            includePatterns: ['**/*'],
            excludePatterns: ['node_modules/**', '.git/**', 'dist/**', 'build/**'],
            dryRun: false,
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

    // Generate commit message based on changes
    generateCommitMessage() {
        try {
            const status = execSync('git status --porcelain', { encoding: 'utf8' });
            const lines = status.trim().split('\n').filter(line => line.length > 0);
            
            const changes = {
                modified: 0,
                added: 0,
                deleted: 0,
                renamed: 0
            };

            lines.forEach(line => {
                const status = line.substring(0, 2).trim();
                if (status === 'M') changes.modified++;
                else if (status === 'A') changes.added++;
                else if (status === 'D') changes.deleted++;
                else if (status === 'R') changes.renamed++;
            });

            let message = 'Auto commit: ';
            const parts = [];
            
            if (changes.added > 0) parts.push(`${changes.added} added`);
            if (changes.modified > 0) parts.push(`${changes.modified} modified`);
            if (changes.deleted > 0) parts.push(`${changes.deleted} deleted`);
            if (changes.renamed > 0) parts.push(`${changes.renamed} renamed`);

            message += parts.join(', ');
            return message;
        } catch (error) {
            return this.options.commitMessage;
        }
    }

    // Main auto-commit function
    async autoCommit(customMessage = null) {
        console.log('🤖 Starting auto-commit process...\n');

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
            console.error('❌ Failed to pull latest changes. Aborting commit.');
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

        console.log('\n🎉 Auto-commit completed successfully!');
        return true;
    }

    // Quick commit function for simple usage
    static async quickCommit(message = null) {
        const autoCommit = new AutoCommit();
        return await autoCommit.autoCommit(message);
    }
}

// Export for use as module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AutoCommit;
}

// Auto-execute if run directly
if (require.main === module) {
    const args = process.argv.slice(2);
    const message = args.length > 0 ? args[0] : null;
    
    AutoCommit.quickCommit(message)
        .then(success => {
            process.exit(success ? 0 : 1);
        })
        .catch(error => {
            console.error('❌ Auto-commit failed:', error.message);
            process.exit(1);
        });
} 