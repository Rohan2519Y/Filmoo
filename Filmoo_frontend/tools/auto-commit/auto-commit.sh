#!/bin/bash

# Filmoo Frontend Auto-Commit Shell Script
# Usage: ./auto-commit.sh [commit_message]

COMMIT_MESSAGE=${1:-"Auto commit changes"}

echo "🤖 Filmoo Frontend Auto-Commit Tool"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    read -p "Press Enter to exit"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Not in a git repository. Please run this script from a git repository."
    read -p "Press Enter to exit"
    exit 1
fi

echo "✅ Git repository found"

# Check if auto-commit.js exists
if [ ! -f "auto-commit.js" ]; then
    echo "❌ auto-commit.js not found in current directory."
    echo "Please make sure auto-commit.js is in the same directory as this script."
    read -p "Press Enter to exit"
    exit 1
fi

echo "📝 Commit message: $COMMIT_MESSAGE"
echo ""

# Run the auto-commit script
if node auto-commit.js "$COMMIT_MESSAGE"; then
    echo ""
    echo "✅ Auto-commit completed successfully!"
else
    echo ""
    echo "❌ Auto-commit failed!"
fi

read -p "Press Enter to exit" 