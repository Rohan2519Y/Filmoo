# Filmoo Frontend Auto-Commit Timer PowerShell Shortcut
# Usage: .\timer.ps1 [options]

param(
    [string]$Interval = "",
    [string]$MaxCommits = "",
    [string]$Message = "",
    [switch]$Help
)

Write-Host "⏰ Filmoo Frontend Auto-Commit Timer" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Build arguments string
$args = @()

if ($Help) {
    $args += "--help"
} else {
    if ($Interval) { $args += "--interval"; $args += $Interval }
    if ($MaxCommits) { $args += "--max-commits"; $args += $MaxCommits }
    if ($Message) { $args += "--message"; $args += $Message }
}

Write-Host "📝 Timer options: $($args -join ' ')" -ForegroundColor Yellow
Write-Host ""

# Run the timer script from tools directory
try {
    $result = node tools/auto-commit/timer-runner.js @args
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Timer completed successfully!" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "❌ Timer failed!" -ForegroundColor Red
    }
} catch {
    Write-Host ""
    Write-Host "❌ Error running timer script: $($_.Exception.Message)" -ForegroundColor Red
}

Read-Host "Press Enter to exit" 