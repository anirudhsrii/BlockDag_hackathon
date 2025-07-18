# SentinelAI: AI-Powered Smart Contract Security

SentinelAI is a proactive, scalable, and intelligent solution to combat widespread vulnerabilities and costly exploits in the blockchain ecosystem. The system protects decentralized applications (dApps) and user assets by moving beyond reactive manual audits.

## Project Components

1. **Smart Contracts** - Solidity contracts for vulnerability detection and monitoring
2. **Backend** - Python-based AI/ML core using TensorFlow/PyTorch for smart contract analysis
3. **Frontend** - React.js dashboard for intuitive user interaction

## Features

- Pre-deployment smart contract vulnerability analysis
- Real-time on-chain transaction monitoring
- Anomaly and malicious activity detection
- User-friendly dashboard for security insights

## Target Users

- Smart contract developers
- dApp development teams
- DeFi protocols
- Independent blockchain auditors

## Getting Started

### Prerequisites
- Python 3.6+ (the simplified version avoids dependencies that may cause issues in Python 3.13)

### Simplified Setup (Recommended)

Run the simplified PowerShell script (for Windows PowerShell):
```powershell
.\run_sentinelai_simple.ps1
```

OR use the batch file (for Windows Command Prompt):
```
run_sentinelai_simple.bat
```

Then open the static frontend in your browser:
- Navigate to the `static_frontend` folder
- Open `index.html` in any web browser

### Alternative Setup

If the simplified setup doesn't work, you can try:

1. Create a Python virtual environment:
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   ```
   venv\Scripts\activate
   ```

3. Install minimal dependencies:
   ```
   pip install flask flask-cors
   ```

4. Run the standalone application:
   ```
   cd backend
   python standalone_app.py
   ```

5. Open the static frontend in your browser:
   - Open `static_frontend/index.html` in any web browser

### Full Setup (Requires Additional Dependencies)

For the complete experience with React frontend and full backend:

1. Install frontend dependencies
   ```
   cd frontend
   npm install
   ```

2. Install backend dependencies
   ```
   cd backend
   pip install -r requirements.txt
   ```

3. Start the backend
   ```
   cd backend
   python app.py
   ```

4. In a separate terminal, start the frontend
   ```
   cd frontend
   npm start
   ```

### Troubleshooting

If you encounter issues with Python dependencies:
- Try the simplified setup which uses minimal dependencies
- For Python 3.13 users: This version may have issues with some packages as it doesn't include distutils by default

## Project Structure

```
BlockDag_hackathon/
│
├── backend/
│   ├── app.py                 # Main Flask application
│   ├── standalone_app.py      # Simplified version with minimal dependencies
│   ├── model.py               # Contract analysis simulation
│   └── requirements.txt       # Python dependencies
│
├── contracts/
│   ├── SentinelAI.sol         # Main contract for the platform
│   └── VulnerabilityRegistry.sol # Contract for storing vulnerability data
│
├── frontend/                  # React frontend (requires npm setup)
│
├── static_frontend/           # Simple HTML/JS frontend (no build required)
│   └── index.html             # Static frontend that works with the backend API
│
├── run_sentinelai_simple.ps1  # PowerShell script to run the simplified version
├── run_sentinelai_simple.bat  # Batch script to run the simplified version
└── README.md                  # Documentation
```

## API Endpoints

- `GET /api/stats` - Get dashboard statistics
- `GET /api/alerts` - Get security alerts
- `POST /api/analyze` - Analyze smart contract code
- `POST /api/monitor` - Start monitoring a deployed contract

## Prototype Notes

This is a prototype version with:
- Simulated AI functionality instead of actual ML models
- Mock data for demonstration purposes
- Simplified architecture for easier setup and demonstration
- Static frontend option that doesn't require Node.js

For a production version, additional configuration, real ML model integration, and actual blockchain data sources would be required.

## License
MIT
