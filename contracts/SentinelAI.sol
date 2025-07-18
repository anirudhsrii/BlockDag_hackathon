// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title SentinelAI
 * @dev Smart contract to monitor and detect vulnerabilities in other contracts
 */
contract SentinelAI {
    address public owner;
    
    // Mapping to store high-risk contract addresses
    mapping(address => bool) public highRiskContracts;
    
    // Structure to store vulnerability details
    struct Vulnerability {
        uint256 id;
        string vulnerabilityType;
        string description;
        uint256 severityLevel; // 1-5, where 5 is highest severity
        uint256 timestamp;
        bool isResolved;
    }
    
    // Mapping from contract address to their vulnerabilities
    mapping(address => Vulnerability[]) public contractVulnerabilities;
    
    // Events
    event VulnerabilityDetected(address indexed contractAddress, uint256 vulnerabilityId, string vulnerabilityType, uint256 severityLevel);
    event VulnerabilityResolved(address indexed contractAddress, uint256 vulnerabilityId);
    event ContractMarkedHighRisk(address indexed contractAddress);
    event ContractMarkedSafe(address indexed contractAddress);
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    /**
     * @dev Report a vulnerability in a contract
     * @param contractAddress Address of the vulnerable contract
     * @param vulnerabilityType Type of vulnerability
     * @param description Detailed description of the vulnerability
     * @param severityLevel Severity level (1-5)
     */
    function reportVulnerability(
        address contractAddress,
        string memory vulnerabilityType,
        string memory description,
        uint256 severityLevel
    ) public onlyOwner {
        require(severityLevel >= 1 && severityLevel <= 5, "Severity must be between 1-5");
        
        uint256 vulnerabilityId = contractVulnerabilities[contractAddress].length;
        
        Vulnerability memory newVulnerability = Vulnerability({
            id: vulnerabilityId,
            vulnerabilityType: vulnerabilityType,
            description: description,
            severityLevel: severityLevel,
            timestamp: block.timestamp,
            isResolved: false
        });
        
        contractVulnerabilities[contractAddress].push(newVulnerability);
        
        // Mark contract as high risk if severity is 4 or higher
        if (severityLevel >= 4) {
            highRiskContracts[contractAddress] = true;
            emit ContractMarkedHighRisk(contractAddress);
        }
        
        emit VulnerabilityDetected(contractAddress, vulnerabilityId, vulnerabilityType, severityLevel);
    }
    
    /**
     * @dev Mark a vulnerability as resolved
     * @param contractAddress Address of the contract
     * @param vulnerabilityId ID of the vulnerability
     */
    function resolveVulnerability(address contractAddress, uint256 vulnerabilityId) public onlyOwner {
        require(vulnerabilityId < contractVulnerabilities[contractAddress].length, "Vulnerability does not exist");
        
        contractVulnerabilities[contractAddress][vulnerabilityId].isResolved = true;
        
        emit VulnerabilityResolved(contractAddress, vulnerabilityId);
        
        // Check if all vulnerabilities are resolved
        bool allResolved = true;
        for (uint256 i = 0; i < contractVulnerabilities[contractAddress].length; i++) {
            if (!contractVulnerabilities[contractAddress][i].isResolved) {
                allResolved = false;
                break;
            }
        }
        
        // Mark contract as safe if all vulnerabilities are resolved
        if (allResolved) {
            highRiskContracts[contractAddress] = false;
            emit ContractMarkedSafe(contractAddress);
        }
    }
    
    /**
     * @dev Get all vulnerabilities for a contract
     * @param contractAddress Address of the contract
     * @return Array of vulnerabilities
     */
    function getVulnerabilities(address contractAddress) public view returns (Vulnerability[] memory) {
        return contractVulnerabilities[contractAddress];
    }
    
    /**
     * @dev Check if a contract is marked as high risk
     * @param contractAddress Address of the contract
     * @return bool indicating if the contract is high risk
     */
    function isHighRiskContract(address contractAddress) public view returns (bool) {
        return highRiskContracts[contractAddress];
    }
    
    /**
     * @dev Transfer ownership of the contract
     * @param newOwner Address of the new owner
     */
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        owner = newOwner;
    }
}
