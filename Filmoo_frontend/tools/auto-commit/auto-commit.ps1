# Filmoo Frontend Auto-Commit PowerShell Script
# Usage: .\auto-commit.ps1 [commit_message]

param(
    [string]$CommitMessage = "Auto commit changes"
)

Write-Host "🤖 Filmoo Frontend Auto-Commit Tool" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version 2>$null
    if ($LASTEXITCODE -ne 0) {
        throw "Node.js not found"
    }
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if we're in a git repository
try {
    git rev-parse --git-dir 2>$null | Out-Null
    if ($LASTEXITCODE -ne 0) {
        throw "Not in git repository"
    }
    Write-Host "✅ Git repository found" -ForegroundColor Green
} catch {
    Write-Host "❌ Not in a git repository. Please run this script from a git repository." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if auto-commit.js exists
if (-not (Test-Path "auto-commit.js")) {
    Write-Host "❌ auto-commit.js not found in current directory." -ForegroundColor Red
    Write-Host "Please make sure auto-commit.js is in the same directory as this script." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "📝 Commit message: $CommitMessage" -ForegroundColor Yellow
Write-Host ""

# Run the auto-commit script
try {
    $result = node auto-commit.js $CommitMessage
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Auto-commit completed successfully!" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "❌ Auto-commit failed!" -ForegroundColor Red
    }
} catch {
    Write-Host ""
    Write-Host "❌ Error running auto-commit script: $($_.Exception.Message)" -ForegroundColor Red
}

Read-Host "Press Enter to exit" 