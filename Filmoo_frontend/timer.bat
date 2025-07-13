@echo off
REM Filmoo Frontend Auto-Commit Timer Shortcut
REM Usage: timer.bat [options]

echo ⏰ Filmoo Frontend Auto-Commit Timer
echo ======================================

REM Get all command line arguments
set "args=%*"

echo 📝 Timer options: %args%
echo.

REM Run the timer script from tools directory
node tools/auto-commit/timer-runner.js %args%

if %errorlevel% equ 0 (
    echo.
    echo ✅ Timer completed successfully!
) else (
    echo.
    echo ❌ Timer failed!
)

pause 