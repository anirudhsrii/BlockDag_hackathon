import React, { useState } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Text,
  Flex,
  Icon,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useColorModeValue,
  FormControl,
  FormLabel,
  Switch,
  Divider,
  useToast
} from '@chakra-ui/react';
import { FiSearch, FiAlertCircle, FiCheck, FiInfo, FiEye, FiEyeOff, FiActivity } from 'react-icons/fi';

const TransactionMonitor = () => {
  const [searchAddress, setSearchAddress] = useState('');
  const [monitoring, setMonitoring] = useState(false);
  const [monitoredContracts, setMonitoredContracts] = useState([
    {
      address: '0x7F268357A8c2552623316e2562D90e642bB538E5',
      name: 'FlashLoan Contract',
      status: 'Active',
      alertCount: 2,
      riskLevel: 'High',
      lastActivity: '2023-04-22 14:32:45'
    },
    {
      address: '0x2F832D630cCBF8A35AECDE0E3a9DA5cC80035CC0',
      name: 'Token Swap',
      status: 'Active',
      alertCount: 1,
      riskLevel: 'Medium',
      lastActivity: '2023-04-22 13:15:20'
    }
  ]);
  
  const [recentTransactions, setRecentTransactions] = useState([
    {
      hash: '0x8a39e5df7d963a781f2a90817c690b53c0c29118c2393128cb7787b908292515',
      contract: '0x7F268357A8c2552623316e2562D90e642bB538E5',
      method: 'executeFlashLoan',
      from: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
      value: '10.5 ETH',
      timestamp: '2023-04-22 14:32:45',
      alert: true
    },
    {
      hash: '0x3b73e47a43454a56a48e3cebf66b4cd1ffa3e8f9e717b22ba79af93d9d39d0ed',
      contract: '0x7F268357A8c2552623316e2562D90e642bB538E5',
      method: 'repayLoan',
      from: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
      value: '10.6 ETH',
      timestamp: '2023-04-22 14:35:12',
      alert: false
    },
    {
      hash: '0xc9b0db4549211b27be7948e92ac7a952e09d7ceb2e43894e493a86fc9c651171',
      contract: '0x2F832D630cCBF8A35AECDE0E3a9DA5cC80035CC0',
      method: 'swap',
      from: '0x1aD91ee08f21bE3dE0BA2ba6918E714dA6B45836',
      value: '0.2 ETH',
      timestamp: '2023-04-22 13:15:20',
      alert: true
    }
  ]);
  
  const toast = useToast();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  const startMonitoring = () => {
    if (!searchAddress) {
      toast({
        title: 'Address required',
        description: 'Please enter a valid contract address',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    // Check if already monitoring
    if (monitoredContracts.some(c => c.address === searchAddress)) {
      toast({
        title: 'Already monitoring',
        description: `Contract ${searchAddress} is already being monitored`,
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    // Simulate adding the contract
    const newContract = {
      address: searchAddress,
      name: 'Unknown Contract',
      status: 'Active',
      alertCount: 0,
      riskLevel: 'Unknown',
      lastActivity: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    
    setMonitoredContracts([...monitoredContracts, newContract]);
    
    toast({
      title: 'Monitoring started',
      description: `Now monitoring contract at ${searchAddress}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    
    setSearchAddress('');
  };
  
  const toggleContractStatus = (address) => {
    setMonitoredContracts(monitoredContracts.map(c => {
      if (c.address === address) {
        return {
          ...c,
          status: c.status === 'Active' ? 'Paused' : 'Active'
        };
      }
      return c;
    }));
    
    const contract = monitoredContracts.find(c => c.address === address);
    const newStatus = contract.status === 'Active' ? 'Paused' : 'Active';
    
    toast({
      title: `Monitoring ${newStatus.toLowerCase()}`,
      description: `Contract ${address} is now ${newStatus.toLowerCase()}`,
      status: newStatus === 'Active' ? 'success' : 'info',
      duration: 3000,
      isClosable: true,
    });
  };
  
  return (
    <Box>
      <Heading size="lg" mb={6}>Transaction Monitor</Heading>
      
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={6}>
        {/* Search and Add Contract */}
        <Card bg={cardBg} shadow="md">
          <CardHeader>
            <Heading size="md">Monitor Contract</Heading>
          </CardHeader>
          <CardBody pt={0}>
            <Text mb={4}>Enter a contract address to begin monitoring for suspicious transactions.</Text>
            
            <InputGroup size="md" mb={4}>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiSearch} color="gray.500" />
              </InputLeftElement>
              <Input 
                placeholder="Contract Address (0x...)" 
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
              />
            </InputGroup>
            
            <Flex justifyContent="space-between" alignItems="center">
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="high-alert" mb="0">
                  High Alert Mode
                </FormLabel>
                <Switch id="high-alert" colorScheme="brand" />
              </FormControl>
              
              <Button 
                colorScheme="brand"
                onClick={startMonitoring}
              >
                Start Monitoring
              </Button>
            </Flex>
          </CardBody>
        </Card>
        
        {/* Recent Transactions */}
        <Card bg={cardBg} shadow="md">
          <CardHeader>
            <Heading size="md">Recent Transactions</Heading>
          </CardHeader>
          <CardBody pt={0} overflowX="auto">
            <TableContainer>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Status</Th>
                    <Th>Contract</Th>
                    <Th>Method</Th>
                    <Th>Value</Th>
                    <Th>Time</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {recentTransactions.map((tx, index) => (
                    <Tr key={index}>
                      <Td>
                        {tx.alert ? 
                          <Icon as={FiAlertCircle} color="red.500" /> : 
                          <Icon as={FiCheck} color="green.500" />
                        }
                      </Td>
                      <Td>{`${tx.contract.substring(0, 6)}...${tx.contract.substring(tx.contract.length - 4)}`}</Td>
                      <Td>{tx.method}</Td>
                      <Td>{tx.value}</Td>
                      <Td>{tx.timestamp}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </SimpleGrid>
      
      {/* Monitored Contracts */}
      <Card bg={cardBg} shadow="md" mb={6}>
        <CardHeader>
          <Heading size="md">Monitored Contracts</Heading>
        </CardHeader>
        <CardBody pt={0} overflowX="auto">
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Status</Th>
                  <Th>Contract Address</Th>
                  <Th>Name</Th>
                  <Th>Risk Level</Th>
                  <Th>Alerts</Th>
                  <Th>Last Activity</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {monitoredContracts.map((contract, index) => (
                  <Tr key={index}>
                    <Td>
                      <Badge colorScheme={contract.status === 'Active' ? 'green' : 'gray'}>
                        {contract.status}
                      </Badge>
                    </Td>
                    <Td>{`${contract.address.substring(0, 6)}...${contract.address.substring(contract.address.length - 4)}`}</Td>
                    <Td>{contract.name}</Td>
                    <Td>
                      <Badge colorScheme={
                        contract.riskLevel === 'High' ? 'red' : 
                        contract.riskLevel === 'Medium' ? 'orange' : 
                        contract.riskLevel === 'Low' ? 'green' : 'gray'
                      }>
                        {contract.riskLevel}
                      </Badge>
                    </Td>
                    <Td>
                      {contract.alertCount > 0 ? (
                        <Badge colorScheme="red">{contract.alertCount}</Badge>
                      ) : (
                        <Badge colorScheme="green">0</Badge>
                      )}
                    </Td>
                    <Td>{contract.lastActivity}</Td>
                    <Td>
                      <Flex>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          colorScheme="brand" 
                          leftIcon={<Icon as={contract.status === 'Active' ? FiEyeOff : FiEye} />}
                          onClick={() => toggleContractStatus(contract.address)}
                          mr={2}
                        >
                          {contract.status === 'Active' ? 'Pause' : 'Resume'}
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          
          {monitoredContracts.length === 0 && (
            <Alert status="info" borderRadius="md" mt={4}>
              <AlertIcon />
              <AlertTitle>No contracts monitored</AlertTitle>
              <AlertDescription>Start by adding a contract above.</AlertDescription>
            </Alert>
          )}
        </CardBody>
      </Card>
      
      {/* Monitoring Settings */}
      <Card bg={cardBg} shadow="md">
        <CardHeader>
          <Heading size="md">Monitoring Settings</Heading>
        </CardHeader>
        <CardBody pt={0}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Box>
              <Heading size="sm" mb={3}>Alert Thresholds</Heading>
              <FormControl display="flex" alignItems="center" mb={2}>
                <FormLabel htmlFor="high-value" mb="0" flex="1">
                  High Value Transactions (ETH)
                </FormLabel>
                <Input id="high-value" type="number" defaultValue={10} w="100px" />
              </FormControl>
              
              <FormControl display="flex" alignItems="center" mb={2}>
                <FormLabel htmlFor="gas-price" mb="0" flex="1">
                  Gas Price Anomaly (Gwei)
                </FormLabel>
                <Input id="gas-price" type="number" defaultValue={500} w="100px" />
              </FormControl>
            </Box>
            
            <Box>
              <Heading size="sm" mb={3}>Notification Settings</Heading>
              <FormControl display="flex" alignItems="center" mb={2}>
                <FormLabel htmlFor="email-alerts" mb="0" flex="1">
                  Email Alerts
                </FormLabel>
                <Switch id="email-alerts" colorScheme="brand" defaultChecked />
              </FormControl>
              
              <FormControl display="flex" alignItems="center" mb={2}>
                <FormLabel htmlFor="webhook-alerts" mb="0" flex="1">
                  Webhook Notifications
                </FormLabel>
                <Switch id="webhook-alerts" colorScheme="brand" />
              </FormControl>
              
              <FormControl display="flex" alignItems="center" mb={2}>
                <FormLabel htmlFor="push-alerts" mb="0" flex="1">
                  Push Notifications
                </FormLabel>
                <Switch id="push-alerts" colorScheme="brand" />
              </FormControl>
            </Box>
          </SimpleGrid>
          
          <Divider my={4} />
          
          <Flex justifyContent="flex-end">
            <Button colorScheme="brand">Save Settings</Button>
          </Flex>
        </CardBody>
      </Card>
    </Box>
  );
};

export default TransactionMonitor;
