import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Text,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { motion } from 'framer-motion';
import logo from '../assets/logo/EwÉ.png';
import './index.css'
import LanguageButton from './LanguageButton';
import UserMenu from './UserMenu';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
  navigationItems: string[];
  activePage: string; 
  links: string[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ navigationItems, activePage, links}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding={4}
        height={200}
      >
       <Link to='/'>
          <img
            src={logo}
            alt="Ewé Logo"
           className='logo'
          />
           </Link>
        <IconButton
          aria-label="menu"
          icon={<FiMenu 
          fontSize={35}
          color='#345430'
          />}
          fontSize={35}
          backgroundColor="transperant"
          onClick={toggleDrawer}
        />
      </Box>
      <Drawer
        placement="left"
        isOpen={isOpen}
        onClose={toggleDrawer}
        size="full" 
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader paddingTop={16}>
            <UserMenu closeMenu={closeDrawer} />
            </DrawerHeader>
            <Box
              textAlign="right"
              padding={4}
            >
              <DrawerCloseButton
                color="red"
                fontSize="25px"
              />
            </Box>
            <DrawerBody>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                style={{ display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center',
                gap: "20px",
                height: '100%' }}
              >
                <VStack spacing={8} align="stretch" flexDirection={'column'}>
                {navigationItems.map((item, index) => ( // Added "index" here
               <Link to={`${links[index]}`} key={item}> 
                    <Text
                      key={item}
                      fontSize="25px"
                      fontWeight="600"
                      color="#345430"
                      cursor="pointer"
                      fontFamily='Inter'
                      style={{
                        borderBottom: activePage ===  `/${links[index]}`
                        ? '2px solid #345430' 
                        : 'transparent',
                      }}
                      onClick={closeDrawer} 
                    >
                      {item}
                    </Text>
                    </Link>
                  ))}
                </VStack>
                <LanguageButton closeMenu={closeDrawer}/>
              </motion.div>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default MobileMenu;