import React, { useState } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Button,
  Text,
  Flex,
  Icon,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Progress,
  useColorModeValue,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Link,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider
} from '@chakra-ui/react';
import { FiAlertTriangle, FiCheck, FiInfo } from 'react-icons/fi';
import Editor from '@monaco-editor/react';

const ContractAnalyzer = () => {
  const [code, setCode] = useState(
`// SPDX-License-Identifier: MIT
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
}`);
  
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  
  const handleEditorChange = (value) => {
    setCode(value);
  };
  
  const analyzeContract = () => {
    setAnalyzing(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      // Mock results
      setResults({
        contract_size: code.length,
        findings_count: 2,
        findings: [
          {
            type: "Access Control",
            line_number: 8,
            context: "function store(uint256 _value) external {",
            confidence: "High (0.92)"
          },
          {
            type: "Unchecked Return Values",
            line_number: 16,
            context: "recipient.send(address(this).balance);",
            confidence: "High (0.95)"
          }
        ],
        risk_level: "Medium"
      });
      
      setAnalyzing(false);
    }, 2000);
  };
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  const RiskBadge = ({ level }) => {
    let color;
    switch (level) {
      case 'High':
        color = 'red';
        break;
      case 'Medium':
        color = 'orange';
        break;
      case 'Low':
        color = 'green';
        break;
      default:
        color = 'gray';
    }
    
    return (
      <Badge colorScheme={color} px={2} py={1} borderRadius="md">
        {level} Risk
      </Badge>
    );
  };
  
  return (
    <Box>
      <Heading size="lg" mb={6}>Smart Contract Analyzer</Heading>
      
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        {/* Code Editor */}
        <Card bg={cardBg} shadow="md" height="600px">
          <CardHeader>
            <Heading size="md">Contract Code</Heading>
          </CardHeader>
          <CardBody pt={0}>
            <Box height="450px" borderWidth="1px" borderRadius="md">
              <Editor
                height="100%"
                defaultLanguage="sol"
                defaultValue={code}
                onChange={handleEditorChange}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  scrollBeyondLastLine: false
                }}
              />
            </Box>
            
            <Flex mt={4} justify="flex-end">
              <Button
                colorScheme="brand"
                isLoading={analyzing}
                loadingText="Analyzing..."
                onClick={analyzeContract}
              >
                Analyze Contract
              </Button>
            </Flex>
          </CardBody>
        </Card>
        
        {/* Results Panel */}
        <Card bg={cardBg} shadow="md" height="600px">
          <CardHeader>
            <Heading size="md">Analysis Results</Heading>
          </CardHeader>
          <CardBody pt={0} overflowY="auto">
            {analyzing ? (
              <VStack spacing={4} align="stretch">
                <Text>Analyzing smart contract code...</Text>
                <Progress size="xs" isIndeterminate colorScheme="brand" />
              </VStack>
            ) : results ? (
              <VStack spacing={4} align="stretch">
                <Flex justifyContent="space-between" alignItems="center">
                  <Text fontWeight="bold">Contract Size: {results.contract_size} bytes</Text>
                  <RiskBadge level={results.risk_level} />
                </Flex>
                
                <Box>
                  <Alert status={results.findings_count > 0 ? 'warning' : 'success'} borderRadius="md">
                    <AlertIcon />
                    <Box>
                      <AlertTitle>
                        {results.findings_count > 0 
                          ? `${results.findings_count} Vulnerabilities Found` 
                          : 'No Vulnerabilities Found'}
                      </AlertTitle>
                      <AlertDescription>
                        {results.findings_count > 0
                          ? 'The contract has potential security issues that should be addressed.'
                          : 'The contract appears to be free from common vulnerabilities.'}
                      </AlertDescription>
                    </Box>
                  </Alert>
                </Box>
                
                <Tabs variant="enclosed">
                  <TabList>
                    <Tab>Vulnerabilities</Tab>
                    <Tab>Recommendations</Tab>
                    <Tab>Gas Analysis</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel px={0}>
                      <VStack spacing={4} align="stretch">
                        {results.findings.map((finding, index) => (
                          <Box key={index} borderWidth="1px" borderRadius="md" p={4}>
                            <Flex align="center" mb={2}>
                              <Icon as={FiAlertTriangle} color="orange.500" boxSize={5} mr={2} />
                              <Heading size="sm">{finding.type}</Heading>
                            </Flex>
                            
                            <Text fontSize="sm" mb={2}>
                              <strong>Line {finding.line_number}</strong>: {finding.context}
                            </Text>
                            
                            <Flex justifyContent="space-between" alignItems="center">
                              <Badge colorScheme="purple">Confidence: {finding.confidence}</Badge>
                              <Link color="brand.500" fontSize="sm">
                                Learn More
                              </Link>
                            </Flex>
                          </Box>
                        ))}
                      </VStack>
                    </TabPanel>
                    
                    <TabPanel>
                      <VStack spacing={4} align="stretch">
                        <Box borderWidth="1px" borderRadius="md" p={4}>
                          <Flex align="center" mb={2}>
                            <Icon as={FiInfo} color="brand.500" boxSize={5} mr={2} />
                            <Heading size="sm">Access Control Issue</Heading>
                          </Flex>
                          <Text fontSize="sm" mb={3}>
                            Add access control mechanisms to restrict sensitive functions.
                          </Text>
                          <Box bg="gray.50" p={2} borderRadius="md" fontSize="sm" fontFamily="monospace">
                            <Text color="gray.800">
                              // Add this modifier<br/>
                              modifier onlyOwner() &#123;<br/>
                              &nbsp;&nbsp;require(msg.sender == owner, "Not authorized");<br/>
                              &nbsp;&nbsp;_;<br/>
                              &#125;<br/><br/>
                              
                              // Update function<br/>
                              function store(uint256 _value) external onlyOwner &#123;
                            </Text>
                          </Box>
                        </Box>
                        
                        <Box borderWidth="1px" borderRadius="md" p={4}>
                          <Flex align="center" mb={2}>
                            <Icon as={FiInfo} color="brand.500" boxSize={5} mr={2} />
                            <Heading size="sm">Unchecked Return Value</Heading>
                          </Flex>
                          <Text fontSize="sm" mb={3}>
                            Always check return values from external calls or use transfer() instead of send().
                          </Text>
                          <Box bg="gray.50" p={2} borderRadius="md" fontSize="sm" fontFamily="monospace">
                            <Text color="gray.800">
                              // Option 1: Check return value<br/>
                              bool success = recipient.send(address(this).balance);<br/>
                              require(success, "Transfer failed");<br/><br/>
                              
                              // Option 2: Use transfer<br/>
                              recipient.transfer(address(this).balance);
                            </Text>
                          </Box>
                        </Box>
                      </VStack>
                    </TabPanel>
                    
                    <TabPanel>
                      <VStack spacing={4} align="stretch">
                        <Text>Gas usage analysis will help optimize contract deployment and function execution costs.</Text>
                        
                        <Box borderWidth="1px" borderRadius="md" p={4}>
                          <Heading size="sm" mb={3}>Gas Usage Estimation</Heading>
                          <SimpleGrid columns={2} spacing={4}>
                            <Box>
                              <Text fontSize="sm" color="gray.500">Deployment Cost</Text>
                              <Text fontWeight="bold">~289,000 gas</Text>
                            </Box>
                            <Box>
                              <Text fontSize="sm" color="gray.500">store() Function</Text>
                              <Text fontWeight="bold">~43,000 gas</Text>
                            </Box>
                            <Box>
                              <Text fontSize="sm" color="gray.500">retrieve() Function</Text>
                              <Text fontWeight="bold">~23,000 gas</Text>
                            </Box>
                            <Box>
                              <Text fontSize="sm" color="gray.500">withdraw() Function</Text>
                              <Text fontWeight="bold">~35,000 gas</Text>
                            </Box>
                          </SimpleGrid>
                        </Box>
                      </VStack>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </VStack>
            ) : (
              <VStack spacing={4} align="center" justify="center" height="100%">
                <Icon as={FiInfo} boxSize={12} color="gray.400" />
                <Text color="gray.500">
                  Enter your smart contract code and click "Analyze Contract" to get started.
                </Text>
              </VStack>
            )}
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default ContractAnalyzer;
