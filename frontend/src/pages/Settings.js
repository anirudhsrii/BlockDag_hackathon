import React, { useState } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  Button,
  Text,
  Divider,
  Flex,
  useColorModeValue,
  Alert,
  AlertIcon,
  VStack,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast
} from '@chakra-ui/react';

const Settings = () => {
  const [rpcUrl, setRpcUrl] = useState('https://mainnet.infura.io/v3/your-api-key');
  const [apiKey, setApiKey] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [emailAddress, setEmailAddress] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [networkType, setNetworkType] = useState('mainnet');
  const [gasPriceThreshold, setGasPriceThreshold] = useState(500);
  const [valueThreshold, setValueThreshold] = useState(10);
  
  const toast = useToast();
  const cardBg = useColorModeValue('white', 'gray.800');
  
  const saveSettings = () => {
    toast({
      title: 'Settings saved',
      description: 'Your settings have been updated successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };
  
  const testConnection = () => {
    toast({
      title: 'Connection successful',
      description: 'Successfully connected to Ethereum network',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };
  
  const sendTestAlert = () => {
    toast({
      title: 'Test alert sent',
      description: 'Check your configured notification methods to verify receipt',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };
  
  return (
    <Box>
      <Heading size="lg" mb={6}>Settings</Heading>
      
      <Tabs variant="enclosed" mb={6}>
        <TabList>
          <Tab>General</Tab>
          <Tab>Notifications</Tab>
          <Tab>Monitoring</Tab>
          <Tab>API Access</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <Card bg={cardBg} shadow="md">
              <CardHeader>
                <Heading size="md">Network Settings</Heading>
              </CardHeader>
              <CardBody pt={0}>
                <FormControl mb={4}>
                  <FormLabel>Ethereum Network</FormLabel>
                  <Select 
                    value={networkType}
                    onChange={(e) => setNetworkType(e.target.value)}
                  >
                    <option value="mainnet">Ethereum Mainnet</option>
                    <option value="sepolia">Sepolia Testnet</option>
                    <option value="goerli">Goerli Testnet</option>
                    <option value="polygon">Polygon</option>
                    <option value="arbitrum">Arbitrum</option>
                    <option value="optimism">Optimism</option>
                  </Select>
                </FormControl>
                
                <FormControl mb={4}>
                  <FormLabel>RPC URL</FormLabel>
                  <Input 
                    value={rpcUrl}
                    onChange={(e) => setRpcUrl(e.target.value)}
                    placeholder="https://mainnet.infura.io/v3/your-api-key"
                  />
                </FormControl>
                
                <Flex justify="flex-end">
                  <Button onClick={testConnection} mr={2}>Test Connection</Button>
                  <Button onClick={saveSettings} colorScheme="brand">Save Settings</Button>
                </Flex>
              </CardBody>
            </Card>
            
            <Card bg={cardBg} shadow="md" mt={6}>
              <CardHeader>
                <Heading size="md">Application Settings</Heading>
              </CardHeader>
              <CardBody pt={0}>
                <FormControl display="flex" alignItems="center" mb={4}>
                  <FormLabel htmlFor="dark-mode" mb="0">
                    Dark Mode
                  </FormLabel>
                  <Switch id="dark-mode" colorScheme="brand" />
                </FormControl>
                
                <FormControl display="flex" alignItems="center" mb={4}>
                  <FormLabel htmlFor="auto-refresh" mb="0">
                    Auto Refresh (30s)
                  </FormLabel>
                  <Switch id="auto-refresh" colorScheme="brand" defaultChecked />
                </FormControl>
                
                <Divider my={4} />
                
                <FormControl mb={4}>
                  <FormLabel>Language</FormLabel>
                  <Select defaultValue="en">
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="zh">中文</option>
                  </Select>
                </FormControl>
                
                <FormControl mb={4}>
                  <FormLabel>Time Format</FormLabel>
                  <Select defaultValue="24h">
                    <option value="12h">12-hour (AM/PM)</option>
                    <option value="24h">24-hour</option>
                  </Select>
                </FormControl>
                
                <Flex justify="flex-end">
                  <Button onClick={saveSettings} colorScheme="brand">Save Settings</Button>
                </Flex>
              </CardBody>
            </Card>
          </TabPanel>
          
          <TabPanel px={0}>
            <Card bg={cardBg} shadow="md">
              <CardHeader>
                <Heading size="md">Notification Settings</Heading>
              </CardHeader>
              <CardBody pt={0}>
                <Alert status="info" mb={4} borderRadius="md">
                  <AlertIcon />
                  Configure how you want to receive alerts from SentinelAI
                </Alert>
                
                <Heading size="sm" mb={4}>Email Notifications</Heading>
                <FormControl display="flex" alignItems="center" mb={4}>
                  <FormLabel htmlFor="email-alerts" mb="0">
                    Enable Email Notifications
                  </FormLabel>
                  <Switch 
                    id="email-alerts" 
                    colorScheme="brand" 
                    isChecked={emailNotifications} 
                    onChange={() => setEmailNotifications(!emailNotifications)} 
                  />
                </FormControl>
                
                {emailNotifications && (
                  <FormControl mb={4}>
                    <FormLabel>Email Address</FormLabel>
                    <Input 
                      type="email" 
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      placeholder="your-email@example.com"
                    />
                  </FormControl>
                )}
                
                <Divider my={4} />
                
                <Heading size="sm" mb={4}>Webhook Notifications</Heading>
                <FormControl display="flex" alignItems="center" mb={4}>
                  <FormLabel htmlFor="webhook-alerts" mb="0">
                    Enable Webhook Notifications
                  </FormLabel>
                  <Switch id="webhook-alerts" colorScheme="brand" />
                </FormControl>
                
                <FormControl mb={4}>
                  <FormLabel>Webhook URL</FormLabel>
                  <Input 
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://your-server.com/webhook"
                  />
                </FormControl>
                
                <Divider my={4} />
                
                <Heading size="sm" mb={4}>Notification Types</Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="notify-high" mb="0">
                      High Risk Alerts
                    </FormLabel>
                    <Switch id="notify-high" colorScheme="red" defaultChecked />
                  </FormControl>
                  
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="notify-medium" mb="0">
                      Medium Risk Alerts
                    </FormLabel>
                    <Switch id="notify-medium" colorScheme="orange" defaultChecked />
                  </FormControl>
                  
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="notify-low" mb="0">
                      Low Risk Alerts
                    </FormLabel>
                    <Switch id="notify-low" colorScheme="green" defaultChecked />
                  </FormControl>
                  
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="notify-info" mb="0">
                      Informational Alerts
                    </FormLabel>
                    <Switch id="notify-info" colorScheme="blue" />
                  </FormControl>
                </SimpleGrid>
                
                <Flex justify="space-between">
                  <Button onClick={sendTestAlert}>Send Test Alert</Button>
                  <Button onClick={saveSettings} colorScheme="brand">Save Settings</Button>
                </Flex>
              </CardBody>
            </Card>
          </TabPanel>
          
          <TabPanel px={0}>
            <Card bg={cardBg} shadow="md">
              <CardHeader>
                <Heading size="md">Monitoring Thresholds</Heading>
              </CardHeader>
              <CardBody pt={0}>
                <Alert status="info" mb={4} borderRadius="md">
                  <AlertIcon />
                  Configure thresholds for different alert types
                </Alert>
                
                <Heading size="sm" mb={4}>Transaction Monitoring</Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={6}>
                  <FormControl>
                    <FormLabel>High Value Threshold (ETH)</FormLabel>
                    <Input 
                      type="number" 
                      value={valueThreshold}
                      onChange={(e) => setValueThreshold(e.target.value)}
                    />
                    <Text fontSize="sm" color="gray.500" mt={1}>
                      Transactions above this value will trigger an alert
                    </Text>
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel>Gas Price Threshold (Gwei)</FormLabel>
                    <Input 
                      type="number" 
                      value={gasPriceThreshold}
                      onChange={(e) => setGasPriceThreshold(e.target.value)}
                    />
                    <Text fontSize="sm" color="gray.500" mt={1}>
                      Gas prices above this threshold will trigger an alert
                    </Text>
                  </FormControl>
                </SimpleGrid>
                
                <Divider my={4} />
                
                <Heading size="sm" mb={4}>Monitoring Frequency</Heading>
                <FormControl mb={4}>
                  <FormLabel>Block Scan Interval (seconds)</FormLabel>
                  <Select defaultValue="15">
                    <option value="5">5 seconds</option>
                    <option value="15">15 seconds</option>
                    <option value="30">30 seconds</option>
                    <option value="60">60 seconds</option>
                  </Select>
                </FormControl>
                
                <FormControl mb={6}>
                  <FormLabel>Maximum Contracts to Monitor</FormLabel>
                  <Select defaultValue="10">
                    <option value="5">5 contracts</option>
                    <option value="10">10 contracts</option>
                    <option value="20">20 contracts</option>
                    <option value="50">50 contracts</option>
                    <option value="100">100 contracts</option>
                  </Select>
                </FormControl>
                
                <Flex justify="flex-end">
                  <Button onClick={saveSettings} colorScheme="brand">Save Settings</Button>
                </Flex>
              </CardBody>
            </Card>
          </TabPanel>
          
          <TabPanel px={0}>
            <Card bg={cardBg} shadow="md">
              <CardHeader>
                <Heading size="md">API Access</Heading>
              </CardHeader>
              <CardBody pt={0}>
                <Alert status="warning" mb={4} borderRadius="md">
                  <AlertIcon />
                  API keys grant access to your SentinelAI instance. Keep them secure.
                </Alert>
                
                <FormControl mb={4}>
                  <FormLabel>API Key</FormLabel>
                  <Input 
                    value={apiKey || '••••••••••••••••••••••••••••••••'}
                    type="password"
                    isReadOnly={!!apiKey}
                    placeholder="Generate an API key"
                  />
                </FormControl>
                
                <HStack spacing={4} mb={6}>
                  <Button colorScheme="brand" onClick={() => setApiKey('sk_test_' + Math.random().toString(36).substring(2, 15))}>
                    {apiKey ? 'Regenerate API Key' : 'Generate API Key'}
                  </Button>
                  
                  {apiKey && (
                    <Button variant="outline" onClick={() => setApiKey('')}>
                      Revoke API Key
                    </Button>
                  )}
                </HStack>
                
                <Divider my={4} />
                
                <Heading size="sm" mb={4}>API Rate Limits</Heading>
                <VStack align="stretch" spacing={2} mb={6}>
                  <Flex justify="space-between">
                    <Text>Analyze API calls</Text>
                    <Text>100 calls/day</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text>Monitor API calls</Text>
                    <Text>500 calls/day</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text>Alerts API calls</Text>
                    <Text>1000 calls/day</Text>
                  </Flex>
                </VStack>
                
                <Text fontSize="sm" color="gray.500" mb={4}>
                  For higher limits, please contact support@sentinelai.com
                </Text>
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Settings;
