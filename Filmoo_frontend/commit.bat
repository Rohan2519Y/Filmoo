@echo off
REM Filmoo Frontend Auto-Commit Shortcut
REM Usage: commit.bat [commit_message]

echo 🤖 Filmoo Frontend Auto-Commit Tool
echo ======================================

REM Get commit message from command line arguments
set "commit_message=%*"
if "%commit_message%"=="" (
    set "commit_message=Auto commit changes"
)

echo 📝 Commit message: %commit_message%
echo.

REM Run the auto-commit script from tools directory
node tools/auto-commit/run-auto-commit.js "%commit_message%"

if %errorlevel% equ 0 (
    echo.
    echo ✅ Auto-commit completed successfully!
) else (
    echo.
    echo ❌ Auto-commit failed!
)

pause 