from flask import Flask, request, jsonify
import os
import json
from model import SmartContractAnalyzer
from transaction_monitor import TransactionMonitor
from web3 import Web3

app = Flask(__name__)

# Initialize Web3 connection
web3 = Web3(Web3.HTTPProvider(os.environ.get('ETHEREUM_RPC_URL', 'http://localhost:8545')))

# Initialize our AI models
analyzer = SmartContractAnalyzer()
monitor = TransactionMonitor(web3)

@app.route('/api/analyze', methods=['POST'])
def analyze_contract():
    """
    Endpoint for analyzing smart contract code
    """
    try:
        data = request.get_json()
        if 'code' not in data:
            return jsonify({'error': 'Contract code is required'}), 400
        
        contract_code = data['code']
        
        # Analyze the contract code using our AI model
        vulnerabilities = analyzer.analyze_code(contract_code)
        
        return jsonify({
            'status': 'success',
            'vulnerabilities': vulnerabilities
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/monitor', methods=['POST'])
def monitor_contract():
    """
    Endpoint for starting monitoring of a deployed contract
    """
    try:
        data = request.get_json()
        if 'address' not in data:
            return jsonify({'error': 'Contract address is required'}), 400
        
        contract_address = data['address']
        
        # Start monitoring the contract
        monitor.start_monitoring(contract_address)
        
        return jsonify({
            'status': 'success',
            'message': f'Started monitoring contract at {contract_address}'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/alerts', methods=['GET'])
def get_alerts():
    """
    Endpoint to retrieve alerts for monitored contracts
    """
    try:
        contract_address = request.args.get('address')
        
        if contract_address:
            alerts = monitor.get_alerts_for_contract(contract_address)
        else:
            alerts = monitor.get_all_alerts()
            
        return jsonify({
            'status': 'success',
            'alerts': alerts
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """
    Endpoint to retrieve statistics on analyzed contracts
    """
    try:
        stats = {
            'analyzed_contracts_count': analyzer.get_analyzed_count(),
            'vulnerabilities_detected': analyzer.get_vulnerability_stats(),
            'monitored_contracts': monitor.get_monitored_count(),
            'alerts_generated': monitor.get_alert_count()
        }
        
        return jsonify({
            'status': 'success',
            'stats': stats
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
