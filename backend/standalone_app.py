import os
import sys
from flask import Flask, request, jsonify

# Make sure we can find the project files
sys.path.append(os.path.dirname(__file__))

app = Flask(__name__)

# Mock data for the prototype
mock_alerts = [
    {
        "id": 1,
        "contract_address": "0x7F268357A8c2552623316e2562D90e642bB538E5",
        "alert_type": "high_value",
        "severity": "High",
        "timestamp": 1626350000,
        "human_time": "2023-07-15 14:32:45"
    },
    {
        "id": 2,
        "contract_address": "0x2F832D630cCBF8A35AECDE0E3a9DA5cC80035CC0",
        "alert_type": "gas_price_anomaly",
        "severity": "Medium",
        "timestamp": 1626349700,
        "human_time": "2023-07-15 14:28:12"
    }
]

# Mock vulnerability patterns
vulnerability_types = [
    "Reentrancy",
    "Access Control",
    "Arithmetic Issues",
    "Unchecked Return Values",
    "Other Vulnerabilities"
]

# Mock vulnerability statistics
vulnerability_stats = {
    "Reentrancy": 8,
    "Access Control": 12,
    "Arithmetic Issues": 6,
    "Unchecked Return Values": 15,
    "Other Vulnerabilities": 4
}

# Mock analyzer
analyzed_count = 0

@app.route('/')
def index():
    return jsonify({
        "status": "success", 
        "message": "SentinelAI API is running. This is a prototype version."
    })

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
        
        # For the prototype, we'll just return mock analysis results
        global analyzed_count
        analyzed_count += 1
        
        # Check for some basic patterns
        findings = []
        
        # Check for possible reentrancy
        if "function withdraw" in contract_code.lower() and (".transfer" in contract_code.lower() or ".send" in contract_code.lower() or ".call" in contract_code.lower()):
            findings.append({
                'type': "Reentrancy",
                'line_number': contract_code.lower().find("function withdraw") // 30 + 1,
                'context': "Withdrawal function that uses external calls",
                'confidence': 'High (0.89)'
            })
        
        # Check for possible unchecked return values
        if ".call" in contract_code.lower() and "require" not in contract_code.lower():
            findings.append({
                'type': "Unchecked Return Values",
                'line_number': contract_code.lower().find(".call") // 30 + 1,
                'context': "Call without checking return value",
                'confidence': 'High (0.82)'
            })
        
        results = {
            'contract_size': len(contract_code),
            'findings_count': len(findings),
            'findings': findings,
            'risk_level': "High" if len(findings) >= 2 else "Medium" if len(findings) == 1 else "Low"
        }
        
        return jsonify({
            'status': 'success',
            'vulnerabilities': results
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
            # Filter alerts for the specific contract
            alerts = [a for a in mock_alerts if a["contract_address"] == contract_address]
        else:
            # Return all alerts
            alerts = mock_alerts
            
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
        # For the prototype, we'll return mock stats
        mock_stats = {
            'analyzed_contracts_count': analyzed_count,
            'vulnerabilities_detected': vulnerability_stats,
            'monitored_contracts': 16,
            'alerts_generated': len(mock_alerts)
        }
        
        return jsonify({
            'status': 'success',
            'stats': mock_stats
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Enable CORS for development
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"Starting SentinelAI backend on port {port}")
    print(f"Access the API at http://localhost:{port}")
    app.run(debug=True, host='0.0.0.0', port=port)
