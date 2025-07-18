# SentinelAI - AI-Powered Smart Contract Security

## Quick Start Guide

### 1. Run the Quick Start Script

For Windows users, run the `quickstart.bat` script to automatically install dependencies and start both the backend and frontend:

```
quickstart.bat
```

### 2. Manual Setup

If the quick start script doesn't work, you can run the components manually:

#### Backend Setup

```
cd backend
pip install -r requirements.txt
python app.py
```

The backend server will run on http://localhost:5000

#### Frontend Setup

```
cd frontend
npm install
npm start
```

The frontend will automatically open in your browser at http://localhost:3000

## Troubleshooting

### Common Issues

#### 1. Python Dependency Issues

If you have issues with the Python dependencies, try installing just the minimum required packages:

```
pip install flask numpy
```

The prototype can run with a simplified backend without all the AI/ML components.

#### 2. Node.js/NPM Errors

If you encounter Node.js or NPM errors, make sure you have the latest version installed:

```
npm -v
node -v
```

You may need to upgrade to a newer version if you're using an older release.

#### 3. Port Already in Use

If you see an error that port 3000 or 5000 is already in use, you can:

- Close other applications that might be using those ports
- Change the port in the frontend: `PORT=3001 npm start`
- Change the port in the backend by editing `app.py` and changing the port number

#### 4. Missing Web3 Provider

For the prototype, you don't need a real Web3 provider. The backend has been simplified to work without an Ethereum connection.

## Prototype Limitations

This is a hackathon prototype with the following limitations:

1. The AI model is simulated and doesn't perform actual deep learning
2. Blockchain interactions are mocked
3. Real-time monitoring is simulated

## Contact

For any issues or questions about the prototype, please contact the SentinelAI team.
