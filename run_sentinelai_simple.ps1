# SentinelAI Simple Setup Script for Windows
# This script sets up and runs the SentinelAI prototype with minimal dependencies

# Clear the screen
Clear-Host

Write-Host "==============================================="
Write-Host "  SentinelAI Prototype Setup - BlockDag Hackathon"
Write-Host "==============================================="
Write-Host ""

# Function to check if a command exists
function Test-Command {
    param ($command)
    $oldPreference = $ErrorActionPreference
    $ErrorActionPreference = 'stop'
    try {
        if (Get-Command $command) { return $true }
    }
    catch {
        return $false
    }
    finally {
        $ErrorActionPreference = $oldPreference
    }
}

# Check if python is installed
if (-not (Test-Command python)) {
    Write-Host "Python is not installed or not in PATH. Please install Python 3.6+ and try again." -ForegroundColor Red
    Exit 1
}

Write-Host "Step 1: Checking Python version..." -ForegroundColor Cyan
$pythonVersion = python --version
Write-Host "Detected: $pythonVersion"

# Create a virtual environment if it doesn't exist
$venvPath = ".\venv"
if (-not (Test-Path $venvPath)) {
    Write-Host "`nStep 2: Setting up Python virtual environment..." -ForegroundColor Cyan
    
    # First try with built-in venv
    try {
        python -m venv $venvPath
    }
    catch {
        Write-Host "Error creating virtual environment with venv. Trying alternative method..." -ForegroundColor Yellow
        
        # Try with the virtualenv package if available
        if (Test-Command pip) {
            Write-Host "Installing virtualenv package..."
            python -m pip install virtualenv
            python -m virtualenv $venvPath
        }
        else {
            Write-Host "Failed to create virtual environment. Please ensure Python has venv support." -ForegroundColor Red
            Exit 1
        }
    }
}
else {
    Write-Host "`nStep 2: Virtual environment already exists." -ForegroundColor Cyan
}

# Activate the virtual environment
Write-Host "`nStep 3: Activating virtual environment..." -ForegroundColor Cyan
if (Test-Path "$venvPath\Scripts\Activate.ps1") {
    & "$venvPath\Scripts\Activate.ps1"
}
else {
    Write-Host "Could not find activation script. Virtual environment may be corrupt." -ForegroundColor Red
    Exit 1
}

# Install minimal requirements
Write-Host "`nStep 4: Installing minimal dependencies..." -ForegroundColor Cyan
python -m pip install flask flask-cors

# Change to the backend directory
Set-Location -Path ".\backend"

# Run the standalone application
Write-Host "`nStep 5: Starting SentinelAI API server..." -ForegroundColor Cyan
Write-Host "The API will be available at http://localhost:5000"
Write-Host "Press Ctrl+C to stop the server when done."
Write-Host "`n==============================================="

# Run the Flask application
python standalone_app.py
