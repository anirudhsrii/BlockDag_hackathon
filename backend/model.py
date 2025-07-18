import re
import json
import os

# For prototype only - no actual ML/DL dependencies
print("Loading lightweight prototype version")

# Mock classes for prototype compatibility
class MockModule:
    def __init__(self):
        pass
    
    def to(self, device):
        return self
    
    def eval(self):
        return self

class SmartContractAnalyzer:
    def __init__(self):
        print("Initializing Smart Contract Analyzer (Prototype Mode)")
        
        # For prototype, we'll just use mock objects instead of actual ML models
        self.device = "cpu"
        self.model = None
        
        # In a real scenario, you would have a pre-trained model
        self.model_path = os.path.join(os.path.dirname(__file__), 'model', 'vulnerability_model.pt')
        try:
            if os.path.exists(self.model_path):
                print(f"Found model at {self.model_path}")
                # For prototype, we use a mock model
                self.model = MockModule()
                self.model.to(self.device)
                self.model.eval()
            else:
                print(f"No model found at {self.model_path}, using prototype simulation")
                self.model = None
        except Exception as e:
            print(f"Error loading model (using prototype simulation): {str(e)}")
            self.model = None
        
        # For prototype, we'll use simulated behavior even if model is None
        
        self.vulnerability_types = [
            "Reentrancy",
            "Access Control",
            "Arithmetic Issues",
            "Unchecked Return Values",
            "Other Vulnerabilities"
        ]
        
        # Load common patterns for basic rule-based detection
        self.patterns = {
            "Reentrancy": [
                r"\.call\.value\([^\)]*\)\([^\)]*\)",
                r"\.call{value:"
            ],
            "Access Control": [
                r"selfdestruct\s*\(",
                r"suicide\s*\("
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
        
        # Keep track of analyzed contracts
        self.analyzed_count = 0
        self.vulnerability_stats = {vtype: 0 for vtype in self.vulnerability_types}
    
    def _preprocess_code(self, code):
        # Clean up the code
        code = code.replace('\t', '    ')
        return code
    
    def _rule_based_detection(self, code):
        findings = []
        
        for vuln_type, patterns in self.patterns.items():
            for pattern in patterns:
                matches = re.finditer(pattern, code)
                for match in matches:
                    start, end = match.span()
                    context_start = max(0, start - 50)
                    context_end = min(len(code), end + 50)
                    findings.append({
                        'type': vuln_type,
                        'pattern': pattern,
                        'line_number': code[:start].count('\n') + 1,
                        'context': code[context_start:context_end],
                        'confidence': 'Medium'  # Rule-based detections have medium confidence
                    })
        
        return findings
    
    def _ml_based_detection(self, code):
        # In the prototype, we'll just return simulated findings
        # In a real implementation, this would use the actual model
        print("Using simulated ML-based detection for prototype")
        return self._simulate_ml_findings(code)
    
    def _split_code_into_chunks(self, code):
        # Split code into manageable chunks for the model
        lines = code.split('\n')
        chunks = []
        current_chunk = ""
        
        for line in lines:
            if len(current_chunk) + len(line) > 450:
                chunks.append(current_chunk)
                current_chunk = line
            else:
                current_chunk += line + "\n"
        
        if current_chunk:
            chunks.append(current_chunk)
        
        return chunks
    
    def analyze_code(self, code):
        """
        Analyze smart contract code for vulnerabilities
        
        Args:
            code (str): Solidity code to analyze
            
        Returns:
            dict: Analysis results including vulnerabilities
        """
        code = self._preprocess_code(code)
        
        # Combine rule-based and ML-based findings
        all_findings = []
        
        # Rule-based detection
        rule_findings = self._rule_based_detection(code)
        all_findings.extend(rule_findings)
        
        # ML-based detection (in a real implementation)
        # ml_findings = self._ml_based_detection(code)
        # all_findings.extend(ml_findings)
        
        # For prototype purposes, we'll simulate ML findings
        simulated_ml_findings = self._simulate_ml_findings(code)
        all_findings.extend(simulated_ml_findings)
        
        # Update stats
        self.analyzed_count += 1
        for finding in all_findings:
            if finding['type'] in self.vulnerability_stats:
                self.vulnerability_stats[finding['type']] += 1
        
        return {
            'contract_size': len(code),
            'findings_count': len(all_findings),
            'findings': all_findings,
            'risk_level': self._calculate_risk_level(all_findings)
        }
    
    def _simulate_ml_findings(self, code):
        """
        Simulate ML findings for the prototype
        In a real implementation, this would use the actual model
        """
        findings = []
        
        # Check for possible reentrancy
        if "function withdraw" in code.lower() and (".transfer" in code.lower() or ".send" in code.lower() or ".call" in code.lower()):
            findings.append({
                'type': "Reentrancy",
                'context': "Withdrawal function that uses external calls",
                'confidence': 'High (0.89)'
            })
        
        # Check for possible unchecked return values
        if ".call" in code.lower() and "require" not in code.lower():
            findings.append({
                'type': "Unchecked Return Values",
                'context': "Call without checking return value",
                'confidence': 'High (0.82)'
            })
        
        return findings
    
    def _calculate_risk_level(self, findings):
        """
        Calculate overall risk level based on findings
        """
        if not findings:
            return "Low"
        
        high_risk_count = sum(1 for f in findings if "High" in f.get('confidence', ''))
        medium_risk_count = sum(1 for f in findings if "Medium" in f.get('confidence', ''))
        
        if high_risk_count >= 2 or len(findings) >= 5:
            return "High"
        elif high_risk_count >= 1 or medium_risk_count >= 3:
            return "Medium"
        else:
            return "Low"
    
    def get_analyzed_count(self):
        """Return the number of contracts analyzed"""
        return self.analyzed_count
    
    def get_vulnerability_stats(self):
        """Return vulnerability statistics"""
        return self.vulnerability_stats
