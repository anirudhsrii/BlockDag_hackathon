from flask import Flask, request, jsonify, render_template, redirect
import os
import json
import re

app = Flask(__name__)

# Sample vulnerability patterns
VULNERABILITY_PATTERNS = {
    "Reentrancy": [
        r"\.call\.value\([^\)]*\)\([^\)]*\)",
        r"\.call{value:",
        r"function\s+withdraw"
    ],
    "Access Control": [
        r"selfdestruct\s*\(",
        r"suicide\s*\(",
        r"onlyOwner"
    ],
    "Arithmetic Issues": [
        r"[^safe]Math\.",
        r"[^safe][Aa]dd\(",
        r"[^safe][Ss]ub\(",
        r"[^safe][Mm]ul\(",
        r"[^safe][Dd]iv\("
    ],
    "Unchecked Return Values": [
        r"\.send\(",
        r"\.transfer\(",
        r"\.call\([^\)]*\)"
    ]
}

# Sample contract for demo
SAMPLE_CONTRACT = """// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private value;
    
    // Example vulnerability: No access control
    function store(uint256 _value) external {
        value = _value;
    }
    
    function retrieve() external view returns (uint256) {
        return value;
    }
    
    // Example vulnerability: Unchecked send
    function withdraw(address payable recipient) external {
        recipient.send(address(this).balance);
    }
}"""

# Simulated analysis results
def analyze_contract(code):
    findings = []
    
    # Simple pattern matching for vulnerabilities
    for vuln_type, patterns in VULNERABILITY_PATTERNS.items():
        for pattern in patterns:
            matches = re.finditer(pattern, code)
            for match in matches:
                start, end = match.span()
                line_number = code[:start].count('\n') + 1
                context_start = max(0, start - 50)
                context_end = min(len(code), end + 50)
                findings.append({
                    'type': vuln_type,
                    'line_number': line_number,
                    'context': code[context_start:context_end],
                    'confidence': 'High' if 'withdraw' in code[context_start:context_end] else 'Medium'
                })
    
    # Calculate risk level
    risk_level = "Low"
    if len(findings) >= 3:
        risk_level = "High"
    elif len(findings) >= 1:
        risk_level = "Medium"
    
    return {
        'contract_size': len(code),
        'findings_count': len(findings),
        'findings': findings,
        'risk_level': risk_level
    }

@app.route('/')
def index():
    return render_template('index.html', sample_contract=SAMPLE_CONTRACT)

@app.route('/analyze', methods=['POST'])
def analyze():
    code = request.form.get('code', '')
    if not code:
        return redirect('/')
    
    results = analyze_contract(code)
    return render_template('results.html', 
                          contract=code, 
                          results=results)

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/api/stats')
def get_stats():
    # Mock stats for the dashboard
    stats = {
        'analyzed_contracts_count': 42,
        'vulnerabilities': {
            'Reentrancy': 8,
            'Access Control': 12,
            'Arithmetic Issues': 6,
            'Unchecked Return Values': 15,
            'Other': 4
        },
        'monitored_contracts': 16,
        'alerts_generated': 7
    }
    return jsonify(stats)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    print(f"Starting SentinelAI simple prototype on port {port}")
    print(f"Open your browser and navigate to: http://localhost:{port}")
    app.run(debug=True, host='0.0.0.0', port=port)
