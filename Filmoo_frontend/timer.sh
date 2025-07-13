#!/bin/bash

# Filmoo Frontend Auto-Commit Timer Shell Shortcut
# Usage: ./timer.sh [options]

echo "⏰ Filmoo Frontend Auto-Commit Timer"
echo "======================================"
echo ""

# Pass all arguments to the timer runner
echo "📝 Timer options: $*"
echo ""

# Run the timer script from tools directory
if node tools/auto-commit/timer-runner.js "$@"; then
    echo ""
    echo "✅ Timer completed successfully!"
else
    echo ""
    echo "❌ Timer failed!"
fi

read -p "Press Enter to exit" 