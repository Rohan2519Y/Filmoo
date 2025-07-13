#!/usr/bin/env node

/**
 * Global Auto-Commit Runner for Filmoo Frontend
 * This script can be run from anywhere in the project
 * Usage: node tools/auto-commit/run-auto-commit.js [commit_message]
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

// Find the auto-commit script
function findAutoCommitScript() {
    const projectRoot = findProjectRoot();
    if (!projectRoot) {
        console.error('❌ Could not find project root (no package.json found)');
        process.exit(1);
    }
    
    const autoCommitPath = path.join(projectRoot, 'tools', 'auto-commit', 'auto-commit.js');
    
    if (!fs.existsSync(autoCommitPath)) {
        console.error('❌ Auto-commit script not found at:', autoCommitPath);
        console.error('Please make sure the auto-commit tools are properly installed.');
        process.exit(1);
    }
    
    return autoCommitPath;
}

// Main execution
function main() {
    const args = process.argv.slice(2);
    const commitMessage = args.length > 0 ? args[0] : null;
    
    console.log('🤖 Filmoo Frontend Auto-Commit Tool');
    console.log('=====================================');
    console.log('');
    
    const autoCommitScript = findAutoCommitScript();
    console.log('📁 Found auto-commit script at:', autoCommitScript);
    console.log('');
    
    // Change to project root directory
    const projectRoot = path.dirname(path.dirname(path.dirname(autoCommitScript)));
    process.chdir(projectRoot);
    console.log('📂 Working directory:', projectRoot);
    console.log('');
    
    // Execute the auto-commit script
    try {
        const AutoCommit = require(autoCommitScript);
        
        if (typeof AutoCommit === 'function') {
            // If it's a class constructor
            const autoCommit = new AutoCommit();
            autoCommit.autoCommit(commitMessage)
                .then(success => {
                    process.exit(success ? 0 : 1);
                })
                .catch(error => {
                    console.error('❌ Auto-commit failed:', error.message);
                    process.exit(1);
                });
        } else if (AutoCommit.quickCommit) {
            // If it has a static method
            AutoCommit.quickCommit(commitMessage)
                .then(success => {
                    process.exit(success ? 0 : 1);
                })
                .catch(error => {
                    console.error('❌ Auto-commit failed:', error.message);
                    process.exit(1);
                });
        } else {
            throw new Error('Invalid auto-commit script format');
        }
    } catch (error) {
        console.error('❌ Error loading auto-commit script:', error.message);
        process.exit(1);
    }
}

// Run if this file is executed directly
if (require.main === module) {
    main();
}

module.exports = { findProjectRoot, findAutoCommitScript }; 