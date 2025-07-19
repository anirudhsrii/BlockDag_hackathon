# SentinelAI: Blockchain Security Platform

![BlockDag Hackathon](https://via.placeholder.com/800x100?text=BlockDag+Hackathon+2025)

## 🔍 Project Overview

SentinelAI is a comprehensive blockchain security platform that uses artificial intelligence to detect vulnerabilities in smart contracts and monitor on-chain transactions for suspicious activities. It was developed for the BlockDag Hackathon 2025 to address the critical need for proactive security measures in the blockchain ecosystem.

The platform offers real-time analysis and monitoring, enabling developers and organizations to secure their smart contracts before deployment and continuously monitor them afterward to prevent costly exploits and vulnerabilities.

![SentinelAI Dashboard](https://via.placeholder.com/800x400?text=SentinelAI+Dashboard+Preview)

## 🚀 Key Features

- **Smart Contract Analysis**: Pre-deployment vulnerability scanning with AI-powered detection
- **Transaction Monitoring**: Real-time analysis of on-chain transactions
- **Vulnerability Detection**: Identifies common security issues like reentrancy, access control problems, etc.
- **Security Alerts**: Instant notifications when suspicious activities are detected
- **Interactive Dashboard**: Visual representation of security metrics and insights
- **Detailed Reports**: Comprehensive analysis with actionable recommendations

## 🛠️ Technology Stack

### Frontend
- **Static Version**: HTML5, CSS3, JavaScript (ES6+), Bootstrap 5
- **Full Version**: React.js, Chakra UI, Chart.js
- **API Communication**: Fetch API, Axios

### Backend
- **Language**: Python 3.6+ (compatible with Python 3.13+)
- **Framework**: Flask 3.1+ with Flask-CORS
- **AI Simulation**: Mock AI model responses (production would use PyTorch/TensorFlow)
- **API Design**: RESTful endpoints with JSON responses

### Smart Contracts
- **Language**: Solidity 0.8.17+
- **Framework**: Hardhat/Truffle (for development)
- **Standards**: ERC compatibility with BlockDag extensions

## 🏃‍♂️ Quick Start Guide

### Simplest Method (One-Click Launch)

1. Run one of the launcher scripts in the root directory:

   For Windows PowerShell:
   ```powershell
   .\open_frontend.ps1
   ```

   For Windows Command Prompt:
   ```
   open_frontend.bat
   ```

   This will:
   - Start the backend server if it's not running
   - Open the static frontend in your default browser

### Simplified Setup (Alternative)

1. Run one of the simplified setup scripts:

   For Windows PowerShell:
   ```powershell
   .\run_sentinelai_simple.ps1
   ```

   For Windows Command Prompt:
   ```
   run_sentinelai_simple.bat
   ```

2. Then open the static frontend in your browser:
   - Navigate to the `static_frontend` folder
   - Open `index.html` in any web browser

### Manual Setup

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
   python -m pip install flask flask-cors
   ```

4. Run the standalone application:
   ```
   cd backend
   python standalone_app.py
   ```

5. Open the static frontend in your browser:
   - Open `static_frontend/index.html` in any web browser

## 📊 Available Demo Features

1. **Dashboard**:
   - Overview of analyzed contracts
   - Vulnerability statistics
   - Recent security alerts

2. **Smart Contract Analysis**:
   - Paste Solidity code to analyze
   - Get detailed vulnerability reports
   - Severity ratings for each issue

3. **Transaction Monitoring**:
   - Add contract addresses to monitor
   - Configure monitoring parameters
   - Receive alerts for suspicious activities

4. **Alert System**:
   - View all security alerts
   - Filter by severity or contract
   - Get detailed information about each alert

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/stats` | GET | Get dashboard statistics |
| `/api/alerts` | GET | Get security alerts |
| `/api/analyze` | POST | Analyze smart contract code |
| `/api/monitor` | POST | Start monitoring a contract |

## 📁 Project Structure

```
BlockDag_hackathon/
│
├── backend/
│   ├── app.py                 # Main Flask application
│   ├── standalone_app.py      # Simplified version with minimal dependencies
│   ├── model.py               # Contract analysis simulation
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment variables (optional)
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
├── run_sentinelai_simple.ps1  # PowerShell script for simplified setup
├── run_sentinelai_simple.bat  # Batch script for simplified setup
├── open_frontend.ps1          # PowerShell script for one-click launch
├── open_frontend.bat          # Batch script for one-click launch
├── SETUP.md                   # Detailed setup instructions
├── TROUBLESHOOTING.md         # Solutions for common issues
└── README.md                  # This documentation file
```

## 🔄 Development Workflow

1. **Analysis Flow**:
   - User submits smart contract code via the frontend
   - Backend processes the code and identifies vulnerabilities
   - Results are displayed with recommendations

2. **Monitoring Flow**:
   - User adds contract address to monitor
   - System tracks transactions involving the contract
   - Alerts are generated when suspicious patterns are detected

## 🧪 Prototype Limitations

This is a prototype version with the following limitations:

- Uses mock data instead of connecting to actual blockchains
- AI functionality is simulated for demonstration purposes
- Limited set of vulnerability detection patterns
- Designed for demonstration, not production use

## 🛠️ Troubleshooting

If you encounter issues:

1. Refer to the `TROUBLESHOOTING.md` file for common solutions
2. For Python 3.13 users, use the simplified setup to avoid dependency issues
3. Make sure Flask is properly installed (`python -m pip install flask flask-cors`)
4. Ensure ports 5000 (backend) are not being used by other applications

## 🤝 Contributing

This project was developed for the BlockDag Hackathon 2025. For feature requests or bug reports, please open an issue in the GitHub repository.

## 📄 License

MIT License - See LICENSE file for details.

---

Developed by [anirudhsrii](https://github.com/anirudhsrii) for the BlockDag Hackathon 2025.
