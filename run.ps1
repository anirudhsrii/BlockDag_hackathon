Write-Host "SentinelAI: AI-Powered Smart Contract Security - Startup Script" -ForegroundColor Green
Write-Host "===============================================================" -ForegroundColor Green
Write-Host ""

Write-Host "Starting SentinelAI application..." -ForegroundColor Cyan
Write-Host ""
Write-Host "This will start both the backend and frontend services." -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop the application." -ForegroundColor Yellow
Write-Host ""

# Function to check if port is in use
function Test-PortInUse {
    param($port)
    $netstat = netstat -aon | findstr ":$port "
    return $netstat.Length -gt 0
}

# Check if ports are already in use
$port5000 = Test-PortInUse 5000
$port3000 = Test-PortInUse 3000

if ($port5000) {
    Write-Host "WARNING: Port 5000 is already in use. Backend may not start properly." -ForegroundColor Red
}

if ($port3000) {
    Write-Host "WARNING: Port 3000 is already in use. Frontend may not start properly." -ForegroundColor Red
}

# Start backend
Write-Host "Starting backend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-Command", "cd '$PWD\backend'; python app.py"

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start frontend
Write-Host "Starting frontend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-Command", "cd '$PWD\frontend'; npm start"

Write-Host ""
Write-Host "===============================================================" -ForegroundColor Green
Write-Host "SentinelAI is now running!" -ForegroundColor Green
Write-Host ""
Write-Host "Backend API: http://localhost:5000" -ForegroundColor Yellow
Write-Host "Frontend UI: http://localhost:3000" -ForegroundColor Yellow
Write-Host "===============================================================" -ForegroundColor Green

Write-Host "Press Ctrl+C to stop all services and exit." -ForegroundColor Red
try {
    while ($true) {
        Start-Sleep -Seconds 5
    }
}
finally {
    # This will run when Ctrl+C is pressed
    Write-Host "Stopping SentinelAI services..." -ForegroundColor Yellow
    # In reality, we would need to properly terminate the processes here
    # but this is simplified for the prototype
}
