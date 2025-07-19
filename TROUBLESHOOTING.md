# Troubleshooting Guide for SentinelAI Prototype

## Quick Solution: Use Simplified Version

We've created a simplified version that works with minimal dependencies:

```powershell
# For PowerShell:
.\run_sentinelai_simple.ps1

# For Command Prompt:
run_sentinelai_simple.bat

# OR use the direct launcher (opens both backend and frontend):
.\open_frontend.ps1
```

Then open `static_frontend/index.html` in your browser.

## Common Installation Issues

### Python 3.13 Compatibility (distutils error)

If you're using Python 3.13, you might see this error:
```
ModuleNotFoundError: No module named 'distutils'
```

**Solution:** Use the simplified version which doesn't require distutils.

### PowerShell Script Execution

If you encounter errors running the scripts, try these commands:

```powershell
# For simplified version:
.\run_sentinelai_simple.ps1
.\open_frontend.ps1

# For full version (if all dependencies are installed):
.\install.ps1
.\run.ps1
```

### "Install" Command Not Found

If you see an error like:
```
install : The term 'install' is not recognized as the name of a cmdlet, function...
```

Always use the full Python command for installing packages:
```
python -m pip install package_name
```

Do not use just `install package_name` as this is not a valid PowerShell command.

### Module Import Errors

If you see errors about missing Python modules:

1. Install the minimal required packages:
   ```
   pip install flask flask-cors
   ```

2. Use the standalone app:
   ```
   cd backend
   python standalone_app.py
   ```

3. Or use the static frontend:
   ```
   open static_frontend/index.html
   ```

### Running the Backend Only

If you want to run just the backend for testing:

```
cd backend
python standalone_app.py
```

Then access the API at: http://localhost:5000

### Port Already in Use

If you see errors about ports already being in use:

1. Find the process using the port:
   ```
   netstat -ano | findstr :5000
   netstat -ano | findstr :3000
   ```

2. Kill the process using the Task Manager or:
   ```
   taskkill /PID <process_id> /F
   ```

## Frontend Development

If you want to work on the frontend only:

1. Install dependencies:
   ```
   cd frontend
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

## Prototype Limitations

This is a prototype version with several limitations:

- The AI model is simulated, not a real trained model
- The blockchain connection is mocked with sample data
- The transaction monitoring uses predefined patterns

## Getting Support

If you encounter issues not covered here, please contact the development team or create an issue in the GitHub repository.

## Quick Commands Reference

### Simplified Version (Recommended)
```
# All-in-one launcher (starts backend and opens frontend)
.\open_frontend.ps1
# or
open_frontend.bat

# OR run just the backend with minimal dependencies
.\run_sentinelai_simple.ps1
# or
run_sentinelai_simple.bat
```

### Full Version (Requires all dependencies)
```
# Setup
.\install.ps1

# Run both services
.\run.ps1

# Run backend only
.\run_backend.bat

# Run frontend only
cd frontend
npm start
```

### Manual Steps (Most Compatible)
```
# Create virtual environment
python -m venv venv

# Activate it
venv\Scripts\activate

# Install minimal dependencies
pip install flask flask-cors

# Run the standalone app
cd backend
python standalone_app.py

# Then open in browser
open static_frontend/index.html
```
