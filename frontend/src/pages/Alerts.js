import React, { useState } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
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
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Alert,
  AlertIcon,
  Select,
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { FiAlertTriangle, FiMoreVertical, FiSearch, FiFilter, FiFlag, FiShield, FiChevronDown } from 'react-icons/fi';

const Alerts = () => {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      timestamp: '2023-04-22 14:32:45',
      contract: '0x7F268357A8c2552623316e2562D90e642bB538E5',
      contract_name: 'FlashLoan Contract',
      alert_type: 'high_value',
      description: 'High value transaction detected',
      severity: 'High',
      status: 'New',
      tx_hash: '0x8a39e5df7d963a781f2a90817c690b53c0c29118c2393128cb7787b908292515',
      details: {
        from: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
        to: '0x7F268357A8c2552623316e2562D90e642bB538E5',
        value: '10.5 ETH',
        gas: '210000',
        gasPrice: '50 gwei'
      }
    },
    {
      id: 2,
      timestamp: '2023-04-22 13:15:20',
      contract: '0x2F832D630cCBF8A35AECDE0E3a9DA5cC80035CC0',
      contract_name: 'Token Swap',
      alert_type: 'gas_price_anomaly',
      description: 'Unusually high gas price detected',
      severity: 'Medium',
      status: 'Investigating',
      tx_hash: '0xc9b0db4549211b27be7948e92ac7a952e09d7ceb2e43894e493a86fc9c651171',
      details: {
        from: '0x1aD91ee08f21bE3dE0BA2ba6918E714dA6B45836',
        to: '0x2F832D630cCBF8A35AECDE0E3a9DA5cC80035CC0',
        value: '0.2 ETH',
        gas: '180000',
        gasPrice: '500 gwei'
      }
    },
    {
      id: 3,
      timestamp: '2023-04-22 12:05:31',
      contract: '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3',
      contract_name: 'DEX Contract',
      alert_type: 'self_destruct',
      description: 'Self-destruct opcode detected',
      severity: 'High',
      status: 'Resolved',
      tx_hash: '0x3a4e3b52c8c7a12a12e4ef47d72d446e4b3848c5d2689a0b2ae77c3995f6f7c1',
      details: {
        from: '0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c',
        to: '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3',
        value: '0.0 ETH',
        gas: '350000',
        gasPrice: '30 gwei'
      }
    }
  ]);
  
  const cardBg = useColorModeValue('white', 'gray.800');
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return 'red';
      case 'Investigating':
        return 'orange';
      case 'Resolved':
        return 'green';
      default:
        return 'gray';
    }
  };
  
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High':
        return 'red';
      case 'Medium':
        return 'orange';
      case 'Low':
        return 'green';
      default:
        return 'gray';
    }
  };
  
  const markAsResolved = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, status: 'Resolved' } : alert
    ));
    
    if (selectedAlert && selectedAlert.id === id) {
      setSelectedAlert({ ...selectedAlert, status: 'Resolved' });
    }
  };
  
  const markAsInvestigating = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, status: 'Investigating' } : alert
    ));
    
    if (selectedAlert && selectedAlert.id === id) {
      setSelectedAlert({ ...selectedAlert, status: 'Investigating' });
    }
  };
  
  const filteredAlerts = filterStatus === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.status === filterStatus);
  
  return (
    <Box>
      <Heading size="lg" mb={6}>Security Alerts</Heading>
      
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        {/* Alerts List */}
        <Card bg={cardBg} shadow="md">
          <CardHeader pb={0}>
            <Flex justify="space-between" align="center" mb={4}>
              <Heading size="md">Alerts</Heading>
              
              <HStack spacing={2}>
                <Select 
                  size="sm" 
                  w="160px" 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Alerts</option>
                  <option value="New">New</option>
                  <option value="Investigating">Investigating</option>
                  <option value="Resolved">Resolved</option>
                </Select>
                
                <Button leftIcon={<FiFilter />} size="sm" variant="ghost">
                  Filter
                </Button>
              </HStack>
            </Flex>
            
            <InputGroup size="sm" mb={4}>
              <InputLeftElement pointerEvents="none">
                <FiSearch color="gray.300" />
              </InputLeftElement>
              <Input placeholder="Search alerts..." />
            </InputGroup>
          </CardHeader>
          <CardBody pt={2}>
            <TableContainer>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Status</Th>
                    <Th>Time</Th>
                    <Th>Contract</Th>
                    <Th>Type</Th>
                    <Th>Severity</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredAlerts.map(alert => (
                    <Tr 
                      key={alert.id} 
                      cursor="pointer" 
                      onClick={() => setSelectedAlert(alert)}
                      bg={selectedAlert && selectedAlert.id === alert.id ? 'gray.50' : undefined}
                      _hover={{ bg: 'gray.50' }}
                      _dark={{
                        bg: selectedAlert && selectedAlert.id === alert.id ? 'gray.700' : undefined,
                        _hover: { bg: 'gray.700' }
                      }}
                    >
                      <Td>
                        <Badge colorScheme={getStatusColor(alert.status)}>
                          {alert.status}
                        </Badge>
                      </Td>
                      <Td whiteSpace="nowrap">{alert.timestamp}</Td>
                      <Td>{`${alert.contract.substring(0, 6)}...`}</Td>
                      <Td>{alert.alert_type.replace('_', ' ')}</Td>
                      <Td>
                        <Badge colorScheme={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                      </Td>
                      <Td>
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            icon={<FiMoreVertical />}
                            variant="ghost"
                            size="sm"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <MenuList>
                            <MenuItem 
                              icon={<FiFlag />}
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsInvestigating(alert.id);
                              }}
                            >
                              Mark as Investigating
                            </MenuItem>
                            <MenuItem 
                              icon={<FiShield />}
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsResolved(alert.id);
                              }}
                            >
                              Mark as Resolved
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            
            {filteredAlerts.length === 0 && (
              <Alert status="info" mt={4}>
                <AlertIcon />
                No alerts found matching your criteria.
              </Alert>
            )}
          </CardBody>
        </Card>
        
        {/* Alert Details */}
        <Card bg={cardBg} shadow="md">
          <CardHeader>
            <Heading size="md">Alert Details</Heading>
          </CardHeader>
          <CardBody>
            {selectedAlert ? (
              <Tabs variant="enclosed" isFitted>
                <TabList>
                  <Tab>Summary</Tab>
                  <Tab>Transaction</Tab>
                  <Tab>Actions</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel px={0}>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
                      <Box>
                        <Text color="gray.500" fontSize="sm">Alert ID</Text>
                        <Text fontWeight="medium">{selectedAlert.id}</Text>
                      </Box>
                      <Box>
                        <Text color="gray.500" fontSize="sm">Status</Text>
                        <Badge colorScheme={getStatusColor(selectedAlert.status)}>
                          {selectedAlert.status}
                        </Badge>
                      </Box>
                      <Box>
                        <Text color="gray.500" fontSize="sm">Timestamp</Text>
                        <Text fontWeight="medium">{selectedAlert.timestamp}</Text>
                      </Box>
                      <Box>
                        <Text color="gray.500" fontSize="sm">Severity</Text>
                        <Badge colorScheme={getSeverityColor(selectedAlert.severity)}>
                          {selectedAlert.severity}
                        </Badge>
                      </Box>
                      <Box>
                        <Text color="gray.500" fontSize="sm">Contract Address</Text>
                        <Text fontWeight="medium">{selectedAlert.contract}</Text>
                      </Box>
                      <Box>
                        <Text color="gray.500" fontSize="sm">Contract Name</Text>
                        <Text fontWeight="medium">{selectedAlert.contract_name}</Text>
                      </Box>
                    </SimpleGrid>
                    
                    <Box mb={4}>
                      <Text color="gray.500" fontSize="sm">Alert Type</Text>
                      <Text fontWeight="medium" textTransform="capitalize">
                        {selectedAlert.alert_type.replace(/_/g, ' ')}
                      </Text>
                    </Box>
                    
                    <Box>
                      <Text color="gray.500" fontSize="sm">Description</Text>
                      <Alert 
                        status={
                          selectedAlert.severity === 'High' ? 'error' : 
                          selectedAlert.severity === 'Medium' ? 'warning' : 'info'
                        }
                        variant="left-accent"
                        mt={2}
                      >
                        <Box>
                          <Flex align="center" mb={1}>
                            <Icon as={FiAlertTriangle} mr={2} />
                            <Text fontWeight="bold">{selectedAlert.description}</Text>
                          </Flex>
                          <Text fontSize="sm">
                            This transaction exhibits patterns consistent with a potential security risk.
                            {selectedAlert.alert_type === 'high_value' && ' The transaction involves a large amount of ETH which is unusual for this contract.'}
                            {selectedAlert.alert_type === 'gas_price_anomaly' && ' The gas price used is significantly higher than the network average, possibly indicating an attempt to front-run other transactions.'}
                            {selectedAlert.alert_type === 'self_destruct' && ' The self-destruct opcode was called, which will remove the contract from the blockchain and send all funds to a target address.'}
                          </Text>
                        </Box>
                      </Alert>
                    </Box>
                  </TabPanel>
                  
                  <TabPanel px={0}>
                    <Box mb={4}>
                      <Text color="gray.500" fontSize="sm">Transaction Hash</Text>
                      <Text fontWeight="medium" fontSize="sm" fontFamily="monospace">
                        {selectedAlert.tx_hash}
                      </Text>
                    </Box>
                    
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
                      <Box>
                        <Text color="gray.500" fontSize="sm">From</Text>
                        <Text fontWeight="medium" fontSize="sm" fontFamily="monospace">
                          {selectedAlert.details.from}
                        </Text>
                      </Box>
                      <Box>
                        <Text color="gray.500" fontSize="sm">To</Text>
                        <Text fontWeight="medium" fontSize="sm" fontFamily="monospace">
                          {selectedAlert.details.to}
                        </Text>
                      </Box>
                      <Box>
                        <Text color="gray.500" fontSize="sm">Value</Text>
                        <Text fontWeight="medium">{selectedAlert.details.value}</Text>
                      </Box>
                      <Box>
                        <Text color="gray.500" fontSize="sm">Gas</Text>
                        <Text fontWeight="medium">{selectedAlert.details.gas}</Text>
                      </Box>
                      <Box>
                        <Text color="gray.500" fontSize="sm">Gas Price</Text>
                        <Text fontWeight="medium">{selectedAlert.details.gasPrice}</Text>
                      </Box>
                    </SimpleGrid>
                    
                    <Box mt={6}>
                      <Button 
                        colorScheme="brand"
                        variant="outline"
                        size="sm"
                        as="a"
                        href={`https://etherscan.io/tx/${selectedAlert.tx_hash}`}
                        target="_blank"
                        leftIcon={<FiSearch />}
                      >
                        View on Etherscan
                      </Button>
                    </Box>
                  </TabPanel>
                  
                  <TabPanel px={0}>
                    <Text mb={4}>Take action on this alert:</Text>
                    
                    <SimpleGrid columns={2} spacing={4}>
                      <Button 
                        colorScheme="orange" 
                        leftIcon={<FiFlag />}
                        onClick={() => markAsInvestigating(selectedAlert.id)}
                        isDisabled={selectedAlert.status === 'Investigating'}
                      >
                        Mark as Investigating
                      </Button>
                      <Button 
                        colorScheme="green" 
                        leftIcon={<FiShield />}
                        onClick={() => markAsResolved(selectedAlert.id)}
                        isDisabled={selectedAlert.status === 'Resolved'}
                      >
                        Mark as Resolved
                      </Button>
                    </SimpleGrid>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            ) : (
              <Flex direction="column" align="center" justify="center" h="300px" textAlign="center">
                <Icon as={FiAlertTriangle} boxSize={12} color="gray.400" mb={4} />
                <Text color="gray.500">
                  Select an alert from the list to view its details.
                </Text>
              </Flex>
            )}
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

// Define the HStack component since it was used but not imported
const HStack = ({ children, ...props }) => (
  <Flex direction="row" {...props}>
    {children}
  </Flex>
);

export default Alerts;
