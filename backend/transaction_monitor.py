import time
import json
import threading
from web3 import Web3
from web3.middleware import geth_poa_middleware

class TransactionMonitor:
    def __init__(self, web3_instance):
        self.web3 = web3_instance
        self.web3.middleware_onion.inject(geth_poa_middleware, layer=0)
        
        # Monitored contracts
        self.monitored_contracts = {}
        
        # Transaction patterns to monitor
        self.tx_patterns = {
            "high_value": lambda tx: float(Web3.fromWei(tx["value"], "ether")) > 10.0,
            "gas_price_anomaly": lambda tx: tx["gasPrice"] > self.web3.toWei(500, "gwei"),
            "contract_creation": lambda tx: "to" not in tx or tx["to"] is None,
            "self_destruct": lambda tx: "input" in tx and tx["input"].startswith("0x9cb8a26a")  # selfdestruct function signature
        }
        
        # Alerts storage
        self.alerts = []
        
        # Stats
        self.alert_count = 0
    
    def start_monitoring(self, contract_address):
        """
        Start monitoring a contract
        """
        if not self.web3.isAddress(contract_address):
            raise ValueError(f"Invalid Ethereum address: {contract_address}")
        
        contract_address = self.web3.toChecksumAddress(contract_address)
        
        if contract_address in self.monitored_contracts:
            return f"Contract {contract_address} is already being monitored"
        
        # Get contract ABI and code
        try:
            code = self.web3.eth.get_code(contract_address)
            if code == "0x":
                return f"No code at address {contract_address}"
        except Exception as e:
            return f"Error fetching contract code: {str(e)}"
        
        # Store contract details
        self.monitored_contracts[contract_address] = {
            "address": contract_address,
            "start_time": time.time(),
            "last_checked_block": self.web3.eth.block_number
        }
        
        # Start monitoring thread
        threading.Thread(
            target=self._monitor_contract_thread,
            args=(contract_address,),
            daemon=True
        ).start()
        
        return f"Started monitoring contract at {contract_address}"
    
    def _monitor_contract_thread(self, contract_address):
        """
        Background thread for monitoring a specific contract
        """
        while contract_address in self.monitored_contracts:
            try:
                contract_data = self.monitored_contracts[contract_address]
                current_block = self.web3.eth.block_number
                
                if current_block > contract_data["last_checked_block"]:
                    # Process new blocks
                    for block_num in range(contract_data["last_checked_block"] + 1, current_block + 1):
                        self._process_block_for_contract(block_num, contract_address)
                    
                    # Update last checked block
                    contract_data["last_checked_block"] = current_block
                
                time.sleep(15)  # Check every 15 seconds
            
            except Exception as e:
                # Log error and continue
                print(f"Error monitoring contract {contract_address}: {str(e)}")
                time.sleep(60)  # Longer delay on error
    
    def _process_block_for_contract(self, block_number, contract_address):
        """
        Process a block for transactions related to the contract
        """
        try:
            block = self.web3.eth.get_block(block_number, full_transactions=True)
            
            for tx in block["transactions"]:
                # Check if transaction is related to our contract
                is_related = (
                    ("to" in tx and tx["to"] == contract_address) or
                    ("from" in tx and tx["from"] == contract_address)
                )
                
                if is_related:
                    self._analyze_transaction(tx, contract_address, block["timestamp"])
        
        except Exception as e:
            print(f"Error processing block {block_number}: {str(e)}")
    
    def _analyze_transaction(self, tx, contract_address, block_timestamp):
        """
        Analyze a transaction for potential threats
        """
        # Check for known patterns
        for pattern_name, pattern_func in self.tx_patterns.items():
            try:
                if pattern_func(tx):
                    self._create_alert(
                        contract_address=contract_address,
                        tx_hash=tx["hash"].hex(),
                        alert_type=pattern_name,
                        severity="High" if pattern_name in ["high_value", "self_destruct"] else "Medium",
                        timestamp=block_timestamp,
                        details={
                            "from": tx["from"],
                            "to": tx["to"] if "to" in tx else "Contract Creation",
                            "value": str(self.web3.fromWei(tx["value"], "ether")),
                            "gas": str(tx["gas"]),
                            "gasPrice": str(self.web3.fromWei(tx["gasPrice"], "gwei"))
                        }
                    )
            except Exception as e:
                # Skip pattern if there's an error
                print(f"Error checking pattern {pattern_name}: {str(e)}")
    
    def _create_alert(self, contract_address, tx_hash, alert_type, severity, timestamp, details):
        """
        Create and store an alert
        """
        alert = {
            "id": len(self.alerts) + 1,
            "contract_address": contract_address,
            "tx_hash": tx_hash,
            "alert_type": alert_type,
            "severity": severity,
            "timestamp": timestamp,
            "human_time": time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime(timestamp)),
            "details": details
        }
        
        self.alerts.append(alert)
        self.alert_count += 1
        
        # In a real system, you would also emit this to a notification system
        print(f"ALERT: {alert_type} detected in contract {contract_address}")
    
    def get_alerts_for_contract(self, contract_address):
        """
        Get alerts for a specific contract
        """
        if not self.web3.isAddress(contract_address):
            raise ValueError(f"Invalid Ethereum address: {contract_address}")
        
        contract_address = self.web3.toChecksumAddress(contract_address)
        
        return [
            alert for alert in self.alerts 
            if alert["contract_address"] == contract_address
        ]
    
    def get_all_alerts(self):
        """
        Get all alerts
        """
        return self.alerts
    
    def stop_monitoring(self, contract_address):
        """
        Stop monitoring a contract
        """
        if not self.web3.isAddress(contract_address):
            raise ValueError(f"Invalid Ethereum address: {contract_address}")
        
        contract_address = self.web3.toChecksumAddress(contract_address)
        
        if contract_address in self.monitored_contracts:
            del self.monitored_contracts[contract_address]
            return f"Stopped monitoring contract at {contract_address}"
        else:
            return f"Contract {contract_address} is not being monitored"
    
    def get_monitored_count(self):
        """
        Get count of monitored contracts
        """
        return len(self.monitored_contracts)
    
    def get_alert_count(self):
        """
        Get count of alerts
        """
        return self.alert_count
