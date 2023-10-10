import React from 'react';
import { VStack, Text, Divider } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Socials from './Socials';

const Footer = () => {
  const currentYear = new Date().getFullYear(); 
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }} // Animate from bottom to top
      transition={{ duration: 0.5 }}
    >
      <VStack spacing={6} py={10} bgColor="#fafafa">
      <Socials />
        <Divider />
        <Text fontSize="sm" color="#345430" fontFamily='Inter'>
           Copyright © {currentYear}. ewe.com
        </Text>
      </VStack>
    </motion.footer>
  );
};

export default Footer;
