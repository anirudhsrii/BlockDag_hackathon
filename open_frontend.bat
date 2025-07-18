@echo off
echo Opening SentinelAI Static Frontend...

REM First, check if the backend is running
powershell -Command "& {try { $result = Invoke-WebRequest -Uri http://localhost:5000 -Method GET -TimeoutSec 2; echo 'Backend is running.' } catch { echo 'Backend is not running. Starting it now...'; start cmd.exe /c 'cd backend && python standalone_app.py' }}"

REM Open the static frontend in the default browser
echo Opening static frontend in browser...
start "" "%~dp0static_frontend\index.html"

echo SentinelAI prototype launched.
