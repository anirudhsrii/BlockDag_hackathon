@echo off
echo ===============================================
echo   SentinelAI Prototype Setup - BlockDag Hackathon
echo ===============================================
echo.

REM Check if Python is available
where python >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Python is not installed or not in PATH. Please install Python 3.6+ and try again.
    exit /b 1
)

echo Step 1: Checking Python version...
python --version

REM Create a virtual environment if it doesn't exist
if not exist "venv\" (
    echo.
    echo Step 2: Setting up Python virtual environment...
    python -m venv venv
    if %ERRORLEVEL% NEQ 0 (
        echo Failed to create virtual environment with venv. Trying alternative method...
        pip install virtualenv
        python -m virtualenv venv
        if %ERRORLEVEL% NEQ 0 (
            echo Failed to create virtual environment. Please ensure Python has venv support.
            exit /b 1
        )
    )
) else (
    echo.
    echo Step 2: Virtual environment already exists.
)

REM Activate the virtual environment
echo.
echo Step 3: Activating virtual environment...
call venv\Scripts\activate.bat

REM Install minimal requirements
echo.
echo Step 4: Installing minimal dependencies...
python -m pip install flask flask-cors

REM Change to the backend directory
cd backend

REM Run the standalone application
echo.
echo Step 5: Starting SentinelAI API server...
echo The API will be available at http://localhost:5000
echo Press Ctrl+C to stop the server when done.
echo.
echo ===============================================

REM Run the Flask application
python standalone_app.py
