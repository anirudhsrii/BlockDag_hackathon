import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({
  colors: {
    brand: {
      50: '#E6F6FF',
      100: '#B3E0FF',
      200: '#80CBFF',
      300: '#4DB5FF',
      400: '#1A9FFF',
      500: '#0088FF', // Primary brand color
      600: '#0070CC',
      700: '#005299',
      800: '#003566',
      900: '#001933',
    },
    warning: {
      50: '#FFF5E6',
      100: '#FFEACC',
      200: '#FFD699',
      300: '#FFC266',
      400: '#FFAD33',
      500: '#FF9900', // Warning color
      600: '#CC7A00',
      700: '#995C00',
      800: '#663D00',
      900: '#331F00',
    },
    danger: {
      50: '#FFE6E6',
      100: '#FFCCCC',
      200: '#FF9999',
      300: '#FF6666',
      400: '#FF3333',
      500: '#FF0000', // Danger color
      600: '#CC0000',
      700: '#990000',
      800: '#660000',
      900: '#330000',
    },
    success: {
      50: '#E6FAE6',
      100: '#CCF5CC',
      200: '#99EB99',
      300: '#66E066',
      400: '#33D633',
      500: '#00CC00', // Success color
      600: '#00A300',
      700: '#007A00',
      800: '#005200',
      900: '#002900',
    }
  },
  fonts: {
    heading: '"Inter", sans-serif',
    body: '"Inter", sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'md',
      }
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
