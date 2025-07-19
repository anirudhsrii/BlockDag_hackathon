# SentinelAI Installation and Setup Guide

## Project Status

This prototype has been successfully tested with the following:

- The simplified version works with Python 3.13+ using minimal dependencies
- The static frontend can be launched with one click using `open_frontend.ps1` or `open_frontend.bat`

## Optional Enhancements

For better environment variable support, you can install python-dotenv:

```
python -m pip install python-dotenv
```

Note: Always use `python -m pip install` rather than just `install` to avoid command not found errors.

This is optional and not required for the basic functionality.

## Quick Start (Recommended)

For the simplest experience:

1. Run `open_frontend.ps1` (PowerShell) or `open_frontend.bat` (Command Prompt)
2. This will automatically start the backend and open the frontend in your browser

## Alternative Methods

### Simplified Version

For a lightweight setup with minimal dependencies:

```
.\run_sentinelai_simple.ps1
```
or
```
run_sentinelai_simple.bat
```

Then open `static_frontend/index.html` in your browser.

### Manual Setup

If you prefer to set things up manually:

1. Create a virtual environment:
   ```
   python -m venv venv
   ```

2. Activate it:
   ```
   venv\Scripts\activate
   ```

3. Install minimal dependencies:
   ```
   pip install flask flask-cors
   ```

4. Run the standalone app:
   ```
   cd backend
   python standalone_app.py
   ```

5. Open the static frontend:
   - Open `static_frontend/index.html` in your browser

## Understanding the Output

When you run the backend, you'll see output similar to:

```
Starting SentinelAI backend on port 5000
Access the API at http://localhost:5000
 * Tip: There are .env files present. Install python-dotenv to use them.
 * Serving Flask app 'standalone_app'
 * Debug mode: on
 * Running on http://127.0.0.1:5000
```

Notes:
- The message about .env files is informational and can be ignored for the prototype
- If you want to use environment variables, install python-dotenv as mentioned in the Optional Enhancements section
- The Debugger PIN is for Flask's debugger and can be ignored for normal usage

## Troubleshooting

If you encounter any issues, please refer to the `TROUBLESHOOTING.md` file for detailed solutions.
