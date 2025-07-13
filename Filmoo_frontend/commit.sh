#!/bin/bash

# Filmoo Frontend Auto-Commit Shell Shortcut
# Usage: ./commit.sh [commit_message]

COMMIT_MESSAGE=${1:-"Auto commit changes"}

echo "🤖 Filmoo Frontend Auto-Commit Tool"
echo "======================================"
echo ""

echo "📝 Commit message: $COMMIT_MESSAGE"
echo ""

# Run the auto-commit script from tools directory
if node tools/auto-commit/run-auto-commit.js "$COMMIT_MESSAGE"; then
    echo ""
    echo "✅ Auto-commit completed successfully!"
else
    echo ""
    echo "❌ Auto-commit failed!"
fi

read -p "Press Enter to exit" 