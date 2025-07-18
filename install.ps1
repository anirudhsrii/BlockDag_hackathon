Write-Host "SentinelAI: AI-Powered Smart Contract Security - Installation Script" -ForegroundColor Green
Write-Host "===============================================================" -ForegroundColor Green
Write-Host ""

Write-Host "Step 1: Checking Python installation..." -ForegroundColor Cyan
try {
    $pythonVersion = python --version
    Write-Host "Found $pythonVersion" -ForegroundColor Green
}
catch {
    Write-Host "ERROR: Python is not installed. Please install Python 3.8 or higher." -ForegroundColor Red
    exit 1
}

Write-Host "Step 2: Checking Node.js installation..." -ForegroundColor Cyan
try {
    $nodeVersion = node --version
    Write-Host "Found Node.js $nodeVersion" -ForegroundColor Green
}
catch {
    Write-Host "ERROR: Node.js is not installed. Please install Node.js 16 or higher." -ForegroundColor Red
    exit 1
}

Write-Host "Step 3: Installing Python dependencies..." -ForegroundColor Cyan
Set-Location -Path "backend"
pip install -r requirements.txt
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to install Python dependencies." -ForegroundColor Red
    exit 1
}
Set-Location -Path ".."

Write-Host "Step 4: Installing Node.js dependencies..." -ForegroundColor Cyan
Set-Location -Path "frontend"
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to install Node.js dependencies." -ForegroundColor Red
    exit 1
}
Set-Location -Path ".."

Write-Host ""
Write-Host "===============================================================" -ForegroundColor Green
Write-Host "Installation completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "To start the application:" -ForegroundColor Yellow
Write-Host "1. Start the backend: cd backend; python app.py" -ForegroundColor Yellow
Write-Host "2. Start the frontend: cd frontend; npm start" -ForegroundColor Yellow
Write-Host ""
Write-Host "Or use: .\run.ps1" -ForegroundColor Yellow
Write-Host "===============================================================" -ForegroundColor Green

Read-Host "Press Enter to exit"
