import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

// Import components and pages
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ContractAnalyzer from './pages/ContractAnalyzer';
import TransactionMonitor from './pages/TransactionMonitor';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';

function App() {
  return (
    <Box minH="100vh">
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analyzer" element={<ContractAnalyzer />} />
          <Route path="/monitor" element={<TransactionMonitor />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Box>
  );
}

export default App;
