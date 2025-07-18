@echo off
echo SentinelAI Prototype - Quick Start
echo ===============================
echo.

echo This script will start the SentinelAI prototype with simplified dependencies.
echo.

choice /C YN /M "Do you want to continue?"
if errorlevel 2 goto :end

echo.
echo Step 1: Installing minimal backend dependencies...
cd backend
pip install flask torch numpy
if %ERRORLEVEL% NEQ 0 (
    echo Warning: Some dependencies might not have installed correctly.
    echo You can try manual installation: pip install -r requirements.txt
    pause
)
cd ..

echo.
echo Step 2: Starting the backend server...
start cmd /k "cd backend && python app.py"

echo.
echo Step 3: Starting the frontend development server...
echo.
echo The frontend will open in your browser automatically.
echo.

cd frontend
npm install --no-audit
if %ERRORLEVEL% NEQ 0 (
    echo Warning: NPM install might have issues.
    echo You can try manual installation: cd frontend ^&^& npm install
    pause
)

npm start
cd ..

:end
echo.
echo Thank you for using SentinelAI!
echo.
