import React, { useState } from 'react';
import { Box, Flex, VStack, Text, IconButton, Icon, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, useDisclosure, useColorModeValue, HStack, Image, Button } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiSearch, FiActivity, FiBell, FiSettings, FiMenu } from 'react-icons/fi';

// Logo placeholder
import logo from '../assets/logo.svg';

const SidebarContent = ({ onClose, ...rest }) => {
  const location = useLocation();
  
  const NavItem = ({ icon, children, path, ...props }) => {
    const isActive = location.pathname === path;
    const activeBg = useColorModeValue('brand.500', 'brand.300');
    const activeColor = useColorModeValue('white', 'gray.800');
    const inactiveColor = useColorModeValue('gray.600', 'gray.400');
    
    return (
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'brand.50',
          color: 'brand.500',
        }}
        bg={isActive ? activeBg : 'transparent'}
        color={isActive ? activeColor : inactiveColor}
        fontWeight={isActive ? 'bold' : 'normal'}
        as={Link}
        to={path}
        onClick={onClose}
        {...props}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };
  
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <HStack spacing={2}>
          <Box w={10} h={10} bg="brand.500" borderRadius="full" display="flex" alignItems="center" justifyContent="center">
            <Text color="white" fontWeight="bold" fontSize="xl">S</Text>
          </Box>
          <Text fontSize="2xl" fontWeight="bold" color="brand.500">
            SentinelAI
          </Text>
        </HStack>
        <DrawerCloseButton display={{ base: 'flex', md: 'none' }} />
      </Flex>
      
      <VStack spacing={0} align="stretch" mt={6}>
        <NavItem icon={FiHome} path="/">
          Dashboard
        </NavItem>
        <NavItem icon={FiSearch} path="/analyzer">
          Contract Analyzer
        </NavItem>
        <NavItem icon={FiActivity} path="/monitor">
          Transaction Monitor
        </NavItem>
        <NavItem icon={FiBell} path="/alerts">
          Alerts
        </NavItem>
        <NavItem icon={FiSettings} path="/settings">
          Settings
        </NavItem>
      </VStack>
      
      <Box position="absolute" bottom="6" width="full">
        <Button 
          mx="8" 
          colorScheme="brand"
          size="sm"
          as="a"
          href="https://github.com/anirudhsrii/BlockDag_hackathon"
          target="_blank"
        >
          GitHub Repository
        </Button>
      </Box>
    </Box>
  );
};

const Header = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="space-between"
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        fontSize="lg"
        fontWeight="bold"
        display={{ base: 'flex', md: 'none' }}
      >
        SentinelAI
      </Text>
      
      <HStack spacing={3}>
        <Button size="sm" colorScheme="brand">Connect Wallet</Button>
      </HStack>
    </Flex>
  );
};

const Layout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <SidebarContent onClose={onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      
      {/* Header */}
      <Header onOpen={onOpen} />
      
      {/* Main Content */}
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
