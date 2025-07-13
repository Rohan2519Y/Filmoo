#!/usr/bin/env node

/**
 * Global Auto-Commit Timer Runner for Filmoo Frontend
 * This script can be run from anywhere in the project
 * Usage: node tools/auto-commit/timer-runner.js [options]
 */

const path = require('path');
const fs = require('fs');

// Get the project root directory (where package.json is located)
function findProjectRoot() {
    let currentDir = process.cwd();
    const maxDepth = 10; // Prevent infinite loops
    
    for (let i = 0; i < maxDepth; i++) {
        if (fs.existsSync(path.join(currentDir, 'package.json'))) {
            return currentDir;
        }
        
        const parentDir = path.dirname(currentDir);
        if (parentDir === currentDir) {
            break; // Reached filesystem root
        }
        currentDir = parentDir;
    }
    
    return null;
}

// Find the auto-commit timer script
function findTimerScript() {
    const projectRoot = findProjectRoot();
    if (!projectRoot) {
        console.error('❌ Could not find project root (no package.json found)');
        process.exit(1);
    }
    
    const timerPath = path.join(projectRoot, 'tools', 'auto-commit', 'auto-commit-timer.js');
    
    if (!fs.existsSync(timerPath)) {
        console.error('❌ Auto-commit timer script not found at:', timerPath);
        console.error('Please make sure the auto-commit tools are properly installed.');
        process.exit(1);
    }
    
    return timerPath;
}

// Main execution
function main() {
    const args = process.argv.slice(2);
    
    console.log('⏰ Filmoo Frontend Auto-Commit Timer');
    console.log('=====================================');
    console.log('');
    
    const timerScript = findTimerScript();
    console.log('📁 Found timer script at:', timerScript);
    console.log('');
    
    // Change to project root directory
    const projectRoot = path.dirname(path.dirname(path.dirname(timerScript)));
    process.chdir(projectRoot);
    console.log('📂 Working directory:', projectRoot);
    console.log('');
    
    // Execute the timer script with all arguments
    try {
        const AutoCommitTimer = require(timerScript);
        
        if (typeof AutoCommitTimer === 'function') {
            // Parse command line arguments
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
                    console.log('⏰ Auto-Commit Timer Usage:');
                    console.log('node tools/auto-commit/timer-runner.js [options]');
                    console.log('');
                    console.log('Options:');
                    console.log('  --interval, -i <minutes>    Set commit interval in minutes (default: 5)');
                    console.log('  --max-commits, -m <number>  Set maximum commits per session (default: 100)');
                    console.log('  --message, -msg <text>      Set default commit message');
                    console.log('  --help, -h                  Show this help message');
                    console.log('');
                    console.log('Examples:');
                    console.log('  node tools/auto-commit/timer-runner.js');
                    console.log('  node tools/auto-commit/timer-runner.js --interval 10');
                    console.log('  node tools/auto-commit/timer-runner.js -i 15 -m 50 -msg "Auto backup"');
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
        } else {
            throw new Error('Invalid timer script format');
        }
    } catch (error) {
        console.error('❌ Error loading timer script:', error.message);
        process.exit(1);
    }
}

// Run if this file is executed directly
if (require.main === module) {
    main();
}

module.exports = { findProjectRoot, findTimerScript }; 