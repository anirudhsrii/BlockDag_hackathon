@echo off
echo SentinelAI: AI-Powered Smart Contract Security - Startup Script
echo ===============================================================
echo.

echo Starting SentinelAI application...
echo.
echo This will start both the backend and frontend services.
echo Press Ctrl+C to stop the application.
echo.

start cmd /k "cd backend && python app.py"
start cmd /k "cd frontend && npm start"

echo.
echo ===============================================================
echo SentinelAI is now running!
echo.
echo Backend API: http://localhost:5000
echo Frontend UI: http://localhost:3000
echo ===============================================================
