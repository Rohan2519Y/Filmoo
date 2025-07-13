@echo off
echo 🤖 Filmoo Frontend Auto-Commit Tool
echo ======================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if we're in a git repository
git rev-parse --git-dir >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Not in a git repository. Please run this script from a git repository.
    pause
    exit /b 1
)

REM Get commit message from command line arguments
set "commit_message=%*"
if "%commit_message%"=="" (
    set "commit_message=Auto commit changes"
)

echo 📝 Commit message: %commit_message%
echo.

REM Run the auto-commit script
node auto-commit.js "%commit_message%"

if %errorlevel% equ 0 (
    echo.
    echo ✅ Auto-commit completed successfully!
) else (
    echo.
    echo ❌ Auto-commit failed!
)

pause 