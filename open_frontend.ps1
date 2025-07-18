# Open SentinelAI Static Frontend
Write-Host "Opening SentinelAI Static Frontend..." -ForegroundColor Cyan

# First, check if the backend is running
try {
    $result = Invoke-WebRequest -Uri http://localhost:5000 -Method GET -TimeoutSec 2 -ErrorAction Stop
    Write-Host "Backend is running." -ForegroundColor Green
} catch {
    Write-Host "Backend is not running. Starting it now..." -ForegroundColor Yellow
    Start-Process -FilePath "powershell" -ArgumentList "-NoExit", "-Command", "Set-Location $PSScriptRoot\backend; python standalone_app.py"
    # Give the server a moment to start
    Start-Sleep -Seconds 3
}

# Open the static frontend in the default browser
Write-Host "Opening static frontend in browser..." -ForegroundColor Cyan
Start-Process "$PSScriptRoot\static_frontend\index.html"

Write-Host "SentinelAI prototype launched." -ForegroundColor Green
