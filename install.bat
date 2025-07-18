@echo off
echo SentinelAI: AI-Powered Smart Contract Security - Installation Script
echo ===============================================================
echo.

echo Step 1: Checking Python installation...
python --version 2>NUL
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Python is not installed. Please install Python 3.8 or higher.
    exit /b 1
)

echo Step 2: Checking Node.js installation...
node --version 2>NUL
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed. Please install Node.js 16 or higher.
    exit /b 1
)

echo Step 3: Installing Python dependencies...
cd backend
pip install -r requirements.txt
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install Python dependencies.
    exit /b 1
)
cd ..

echo Step 4: Installing Node.js dependencies...
cd frontend
npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install Node.js dependencies.
    exit /b 1
)
cd ..

echo.
echo ===============================================================
echo Installation completed successfully!
echo.
echo To start the application:
echo 1. Start the backend: cd backend ^& python app.py
echo 2. Start the frontend: cd frontend ^& npm start
echo.
echo Or use: npm start
echo ===============================================================

pause
