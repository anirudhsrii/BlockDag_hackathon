from flask import Flask, request, jsonify
import os
import json
import traceback

try:
    from model import SmartContractAnalyzer
    print("Successfully imported SmartContractAnalyzer")
except Exception as e:
    print(f"Error importing SmartContractAnalyzer: {str(e)}")
    print("Using mock analyzer instead")
    
    # Create a mock analyzer if import fails
    class MockAnalyzer:
        def __init__(self):
            self.analyzed_count = 0
            self.vulnerability_stats = {
                "Reentrancy": 8,
                "Access Control": 12,
                "Arithmetic Issues": 6,
                "Unchecked Return Values": 15,
                "Other Vulnerabilities": 4
            }
        
        def analyze_code(self, code):
            self.analyzed_count += 1
            return {
                'contract_size': len(code),
                'findings_count': 2,
                'findings': [
                    {
                        'type': "Reentrancy",
                        'line_number': 42,
                        'context': "function withdraw() external {",
                        'confidence': 'High (0.89)'
                    },
                    {
                        'type': "Unchecked Return Values",
                        'line_number': 85,
                        'context': "recipient.send(address(this).balance);",
                        'confidence': 'High (0.82)'
                    }
                ],
                'risk_level': "Medium"
            }
            
        def get_analyzed_count(self):
            return self.analyzed_count
            
        def get_vulnerability_stats(self):
            return self.vulnerability_stats

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

# Initialize our AI model
print("Initializing SentinelAI backend...")
analyzer = SmartContractAnalyzer()

@app.route('/')
def index():
    return jsonify({
        "status": "success", 
        "message": "SentinelAI API is running. Access frontend at http://localhost:3000"
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
        
        # For the prototype, we'll just return a success message
        print(f"Started monitoring contract at {contract_address} (prototype)")
        
        return jsonify({
            'status': 'success',
            'message': f'Started monitoring contract at {contract_address}'
        })
    except Exception as e:
        print(f"Error in monitor_contract: {str(e)}")
        print(traceback.format_exc())
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
        print(f"Error in get_alerts: {str(e)}")
        print(traceback.format_exc())
        return jsonify({'error': str(e)}), 500

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """
    Endpoint to retrieve statistics on analyzed contracts
    """
    try:
        # For the prototype, we'll return mock stats
        mock_stats = {
            'analyzed_contracts_count': analyzer.get_analyzed_count(),
            'vulnerabilities_detected': analyzer.get_vulnerability_stats(),
            'monitored_contracts': 16,
            'alerts_generated': len(mock_alerts)
        }
        
        return jsonify({
            'status': 'success',
            'stats': mock_stats
        })
    except Exception as e:
        print(f"Error in get_stats: {str(e)}")
        print(traceback.format_exc())
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
    print(f"Access frontend at http://localhost:3000")
    app.run(debug=True, host='0.0.0.0', port=port)
