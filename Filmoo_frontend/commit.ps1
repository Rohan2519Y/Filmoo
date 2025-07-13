# Filmoo Frontend Auto-Commit PowerShell Shortcut
# Usage: .\commit.ps1 [commit_message]

param(
    [string]$CommitMessage = "Auto commit changes"
)

Write-Host "🤖 Filmoo Frontend Auto-Commit Tool" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "📝 Commit message: $CommitMessage" -ForegroundColor Yellow
Write-Host ""

# Run the auto-commit script from tools directory
try {
    $result = node tools/auto-commit/run-auto-commit.js $CommitMessage
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