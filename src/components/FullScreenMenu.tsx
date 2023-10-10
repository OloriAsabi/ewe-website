import React from 'react';
import {
  Box,
  VStack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import logo from '../assets/logo/EwÉ.png';
import LanguageButton from './LanguageButton';
import UserMenu from './UserMenu';
import './index.css'
import { Link } from 'react-router-dom';

interface FullScreenMenuProps {
  navigationItems: string[];
    activePage: string; 
    links: string[];
}

const FullScreenMenu: React.FC<FullScreenMenuProps> = ({ navigationItems, activePage, links }) => {
  const { onClose } = useDisclosure();

  // Define closeMenu function
  const closeMenu = () => {
    onClose();
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box 
      bg="white"
      boxShadow="none" 
      paddingRight={20} 
      paddingBottom={10} 
      paddingTop={10} 
      paddingLeft={20} 
      display="flex" 
      justifyContent="space-between" 
      alignItems="center"
      // className="sticky-navbar"
      height={200}
      >
        <Box textAlign="start">
        <Link to='/'>
          <img
            src={logo}
            alt="Ewé Logo"
           className='logo'
          />
           </Link>
        </Box>
        <Box p={4} paddingLeft="20px" paddingRight="20px" textAlign="center">
        <VStack spacing={4} align="stretch" flexDirection={'row'}>
        {navigationItems.map((item, index) => ( // Added "index" here
          <Link to={`/${links[index]}`} key={item}> 
            <Text
              key={item}
              fontSize="20px"
              fontWeight="600"
              color="#345430"
              cursor="pointer"
              fontFamily='Inter'
              style={{
                borderBottom: activePage ===  `/${links[index]}`
                ? '2px solid #345430' 
                : 'transparent',
              }}
              onClick={onClose}
            >
              {item}
            </Text>
            </Link>
          ))}
        </VStack>
      </Box>
        <UserMenu closeMenu={closeMenu} />
        <LanguageButton closeMenu={closeMenu} />
      </Box>
    </motion.div>
  );
};

export default FullScreenMenu;
