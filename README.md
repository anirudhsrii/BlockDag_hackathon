# SentinelAI: Blockchain Security Platform

![BlockDag Hackathon](https://via.placeholder.com/800x100?text=BlockDag+Hackathon+2025)

> **🚀 QUICK START:** Run `open_frontend.bat` (or `.ps1`) to launch the application instantly!

## 🔍 Project Overview

SentinelAI is an innovative blockchain security solution that leverages custom-designed AI algorithms to identify vulnerabilities in smart contract code and detect anomalous transaction patterns on-chain. Created specifically for the BlockDag Hackathon 2025, this project addresses the growing challenge of securing distributed applications in an increasingly complex blockchain ecosystem.

Our distinctive approach combines static code analysis with dynamic transaction monitoring to create a multi-layered security system that protects blockchain assets at every stage of their lifecycle, from development to deployment and beyond.

![SentinelAI Dashboard](https://via.placeholder.com/800x400?text=SentinelAI+Dashboard+Preview)

## 🚀 Key Features

- **Smart Contract Guardian**: Our proprietary code scanning technology that identifies potential security flaws before deployment
- **BlockWatch Monitor**: Custom-designed system for analyzing transaction patterns and flagging suspicious activities
- **VulnScan Technology**: Unique detection algorithms for identifying specific security weaknesses like reentrancy loops and access control flaws
- **AlertShield System**: Our novel notification framework that prioritizes alerts based on risk severity and context
- **InsightBoard**: Custom-built visualization interface that transforms complex security data into actionable insights
- **SecureGuide Reports**: Tailored security recommendations with step-by-step mitigation instructions

## 🛠️ Our Technical Architecture

### Interface Layer
- **Lightweight Version**: Custom HTML5/CSS3 implementation with vanilla JavaScript and lightweight Bootstrap integration
- **Advanced Version**: Custom React component library with Chakra UI extensions and proprietary chart visualizations
- **Connection Layer**: Custom-built API communication modules utilizing Fetch API and Axios

### Processing Core
- **Runtime**: Python 3.6+ ecosystem with full 3.13+ compatibility
- **Service Layer**: Custom Flask application with enhanced CORS handling
- **Analysis Engine**: Proprietary code simulation framework (with planned ML integration path)
- **Service Interface**: Custom-designed REST API with structured JSON communication protocol

### Blockchain Integration
- **Contract Language**: Solidity 0.8.17+ with custom security extensions
- **Development Tools**: Modified toolchain based on industry standards
- **Compatibility**: Enhanced ERC support with BlockDag-specific optimizations

## ⚡ HOW TO RUN THIS APPLICATION

Follow these simple steps to run SentinelAI:

### Method 1: One-Click Launch (Recommended)

Simply double-click one of these files in the project root:

- **Windows PowerShell**: `open_frontend.ps1`
- **Command Prompt**: `open_frontend.bat`

This single command will:
1. Check if the backend is running and start it if needed
2. Automatically open the frontend in your default browser
3. Connect all components for a seamless experience

### Method 2: Two-Step Launch

If the one-click method doesn't work for any reason:

1. Start the backend server:
   - **Windows PowerShell**: Run `.\run_sentinelai_simple.ps1`
   - **Command Prompt**: Run `run_sentinelai_simple.bat`

2. Open the frontend:
   - Navigate to the `static_frontend` folder
   - Open `index.html` in any web browser
   
This method gives you more control over each component.

### Method 3: Manual Setup (For Developers)

For complete control over the environment:

1. Set up Python environment:
   ```
   python -m venv venv
   venv\Scripts\activate
   ```

2. Install dependencies:
   ```
   python -m pip install flask flask-cors
   ```

3. Start the backend server:
   ```
   cd backend
   python standalone_app.py
   ```

4. Open the frontend in a new browser window:
   ```
   # In a new terminal or file explorer
   open static_frontend/index.html
   ```

This method is recommended for developers who want to customize the setup.

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

## 🧪 Prototype Scope

This hackathon submission represents our proof-of-concept with the following current boundaries:

- Utilizes synthesized transaction data that mimics blockchain activity patterns
- Features our preliminary AI simulation framework instead of the full neural network implementation
- Includes our first set of vulnerability detection signatures (expanded library coming in future versions)
- Created specifically for the BlockDag Hackathon to demonstrate core concepts and functionality

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
