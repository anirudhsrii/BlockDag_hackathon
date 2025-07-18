# SentinelAI - AI-Powered Smart Contract Security

This directory contains the prototype for SentinelAI, an AI-powered smart contract security platform that was shortlisted in the BlockDag hackathon. SentinelAI protects decentralized applications (dApps) and user assets by providing proactive, scalable, and intelligent security solutions.

## Project Structure

The prototype is structured as follows:

```
BlockDag_hackathon/
├── backend/             # Python backend with AI/ML models
│   ├── app.py           # Flask API server
│   ├── model.py         # Smart contract analyzer with AI models
│   ├── transaction_monitor.py  # Real-time blockchain monitoring
│   └── requirements.txt # Python dependencies
├── contracts/           # Solidity smart contracts
│   ├── SentinelAI.sol   # Main contract for vulnerability reporting
│   └── VulnerabilityRegistry.sol # Registry of vulnerability patterns
├── frontend/            # React.js frontend
│   ├── public/          # Static assets
│   └── src/             # React components and pages
├── .env                 # Environment variables
├── install.bat          # Windows installation script
├── run.bat              # Windows startup script
├── package.json         # Project configuration
└── README.md            # This documentation
```

## Features

- **Pre-deployment Contract Analysis**: AI-powered vulnerability detection before deployment
- **Real-time Transaction Monitoring**: Continuous monitoring for suspicious on-chain activity
- **Vulnerability Classification**: Identification and categorization of security risks
- **Intuitive Dashboard**: User-friendly interface for security insights
- **Alert System**: Notification system for potential security threats

## Installation

### Prerequisites

- Python 3.8+
- Node.js 16+
- Web3 provider (Infura, Alchemy, or local node)

### Windows Installation

1. Run the installation script:
   ```
   install.bat
   ```

2. Start the application:
   ```
   run.bat
   ```

### Manual Installation

1. Install backend dependencies:
   ```
   cd backend
   pip install -r requirements.txt
   ```

2. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

3. Start the application:
   ```
   cd ..
   npm start
   ```

## Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## Future Development

- Integration with formal verification techniques
- Support for additional smart contract languages
- Decentralized governance model
- Blockchain insurance protocol integrations

## License

MIT

---

Developed for the BlockDag Hackathon by SentinelAI Team
