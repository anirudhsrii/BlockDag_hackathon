import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Card,
  CardBody,
  Text,
  Flex,
  Icon,
  Progress,
  Badge,
  useColorModeValue
} from '@chakra-ui/react';
import { FiShield, FiAlertCircle, FiCheckCircle, FiActivity } from 'react-icons/fi';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  // Mock data
  const [stats, setStats] = useState({
    analyzed_contracts_count: 42,
    vulnerabilities_detected: {
      "Reentrancy": 8,
      "Access Control": 12,
      "Arithmetic Issues": 6,
      "Unchecked Return Values": 15,
      "Other Vulnerabilities": 4
    },
    monitored_contracts: 16,
    alerts_generated: 7
  });
  
  const [recentAlerts, setRecentAlerts] = useState([
    {
      id: 1,
      contract_address: '0x7F268357A8c2552623316e2562D90e642bB538E5',
      alert_type: 'high_value',
      severity: 'High',
      timestamp: Date.now() - 120000,
      human_time: '2023-04-22 14:32:45'
    },
    {
      id: 2,
      contract_address: '0x2F832D630cCBF8A35AECDE0E3a9DA5cC80035CC0',
      alert_type: 'gas_price_anomaly',
      severity: 'Medium',
      timestamp: Date.now() - 240000,
      human_time: '2023-04-22 14:28:12'
    },
    {
      id: 3,
      contract_address: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
      alert_type: 'contract_creation',
      severity: 'Medium',
      timestamp: Date.now() - 360000,
      human_time: '2023-04-22 14:22:45'
    },
  ]);

  // Chart data
  const barChartData = {
    labels: Object.keys(stats.vulnerabilities_detected),
    datasets: [
      {
        label: 'Vulnerabilities Detected',
        data: Object.values(stats.vulnerabilities_detected),
        backgroundColor: 'rgba(0, 136, 255, 0.7)',
        borderColor: 'rgba(0, 136, 255, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  const doughnutChartData = {
    labels: ['Reentrancy', 'Access Control', 'Arithmetic Issues', 'Unchecked Returns', 'Others'],
    datasets: [
      {
        label: 'Vulnerability Types',
        data: Object.values(stats.vulnerabilities_detected),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Vulnerability Distribution',
      },
    },
  };
  
  const cardBg = useColorModeValue('white', 'gray.800');
  
  return (
    <Box>
      <Heading size="lg" mb={6}>Dashboard</Heading>
      
      {/* Stats Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={6}>
        <Card bg={cardBg} shadow="md">
          <CardBody>
            <Flex align="center">
              <Box
                p={2}
                borderRadius="md"
                bg="brand.50"
                color="brand.500"
                mr={4}
              >
                <Icon as={FiShield} boxSize={6} />
              </Box>
              <Box>
                <Stat>
                  <StatLabel>Contracts Analyzed</StatLabel>
                  <StatNumber>{stats.analyzed_contracts_count}</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    23% this month
                  </StatHelpText>
                </Stat>
              </Box>
            </Flex>
          </CardBody>
        </Card>
        
        <Card bg={cardBg} shadow="md">
          <CardBody>
            <Flex align="center">
              <Box
                p={2}
                borderRadius="md"
                bg="red.50"
                color="red.500"
                mr={4}
              >
                <Icon as={FiAlertCircle} boxSize={6} />
              </Box>
              <Box>
                <Stat>
                  <StatLabel>Vulnerabilities Found</StatLabel>
                  <StatNumber>{Object.values(stats.vulnerabilities_detected).reduce((a, b) => a + b, 0)}</StatNumber>
                  <StatHelpText>
                    <StatArrow type="decrease" />
                    12% this month
                  </StatHelpText>
                </Stat>
              </Box>
            </Flex>
          </CardBody>
        </Card>
        
        <Card bg={cardBg} shadow="md">
          <CardBody>
            <Flex align="center">
              <Box
                p={2}
                borderRadius="md"
                bg="green.50"
                color="green.500"
                mr={4}
              >
                <Icon as={FiCheckCircle} boxSize={6} />
              </Box>
              <Box>
                <Stat>
                  <StatLabel>Contracts Monitored</StatLabel>
                  <StatNumber>{stats.monitored_contracts}</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    18% this month
                  </StatHelpText>
                </Stat>
              </Box>
            </Flex>
          </CardBody>
        </Card>
        
        <Card bg={cardBg} shadow="md">
          <CardBody>
            <Flex align="center">
              <Box
                p={2}
                borderRadius="md"
                bg="orange.50"
                color="orange.500"
                mr={4}
              >
                <Icon as={FiActivity} boxSize={6} />
              </Box>
              <Box>
                <Stat>
                  <StatLabel>Alerts Generated</StatLabel>
                  <StatNumber>{stats.alerts_generated}</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    5% this month
                  </StatHelpText>
                </Stat>
              </Box>
            </Flex>
          </CardBody>
        </Card>
      </SimpleGrid>
      
      {/* Charts */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
        <Card bg={cardBg} shadow="md">
          <CardBody>
            <Heading size="sm" mb={4}>Vulnerability Distribution</Heading>
            <Box height="300px">
              <Bar data={barChartData} options={barOptions} />
            </Box>
          </CardBody>
        </Card>
        
        <Card bg={cardBg} shadow="md">
          <CardBody>
            <Heading size="sm" mb={4}>Vulnerability Types</Heading>
            <Box height="300px" display="flex" justifyContent="center">
              <Box width="80%" height="100%">
                <Doughnut 
                  data={doughnutChartData} 
                  options={{ 
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                      }
                    }
                  }} 
                />
              </Box>
            </Box>
          </CardBody>
        </Card>
      </SimpleGrid>
      
      {/* Recent Alerts */}
      <Card bg={cardBg} shadow="md">
        <CardBody>
          <Heading size="sm" mb={4}>Recent Alerts</Heading>
          
          {recentAlerts.map(alert => (
            <Box key={alert.id} p={3} mb={3} borderWidth="1px" borderRadius="md">
              <Flex justifyContent="space-between" align="center">
                <Box>
                  <Flex align="center" mb={1}>
                    <Badge 
                      colorScheme={alert.severity === 'High' ? 'red' : alert.severity === 'Medium' ? 'orange' : 'yellow'} 
                      mr={2}
                    >
                      {alert.severity}
                    </Badge>
                    <Text fontWeight="bold">{alert.alert_type.replace('_', ' ').toUpperCase()}</Text>
                  </Flex>
                  <Text fontSize="sm" color="gray.500">Contract: {alert.contract_address}</Text>
                </Box>
                <Text fontSize="sm" color="gray.500">{alert.human_time}</Text>
              </Flex>
            </Box>
          ))}
        </CardBody>
      </Card>
    </Box>
  );
};

export default Dashboard;
