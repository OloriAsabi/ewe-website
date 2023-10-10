import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Heading,
  Text,
  Collapse,
  Input,
  IconButton,
  useClipboard,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../types/interface';
import { FaCopy } from 'react-icons/fa'; // Import the copy icon

const PayPalPayment = () => {
  const [isOpen, setIsOpen] = useState(false);
  const language = useSelector((state: RootState) => state.language.language);

  const { hasCopied, onCopy } = useClipboard('latyphab@gmail.com'); // Initialize clipboard functionality

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <VStack spacing={4} align="start" mt={4}>
      <Heading
        fontFamily="Inter"
        as="h4"
        size="xl"
        color="#345430"
        textAlign="center"
        fontWeight={600}
      >
        {language === 'en' ? 'PayPal Payment' : 'Iyipada PayPal'}
      </Heading>
      <Text fontSize="lg" letterSpacing="2px" lineHeight="2">
        {language === 'en'
          ? 'Choose the PayPal payment option to make a donation via PayPal.'
          : 'Yọ iwọn ọna PayPal lati ṣe iṣẹdẹ ayika nipasẹ PayPal.'}
      </Text>
      <Text fontSize="lg" letterSpacing="2px" lineHeight="2">
        {language === 'en'
          ? 'Copy the PayPal email address below and proceed to complete the payment.'
          : 'Pọ sọrọ emaili PayPal rẹ lọni si kara ọna iṣẹdẹ.'}
      </Text>
      <Box display="flex" alignItems="center">
        <Input
          value="latyphab@gmail.com"
          isReadOnly
          size="sm"
          pr="3rem"
          roundedLeft="md"
        />
        <IconButton
          aria-label="Copy PayPal email"
          icon={<FaCopy />}
          onClick={onCopy}
          roundedRight="md"
          colorScheme={hasCopied ? 'green' : 'gray'}
        />
      </Box>
      <Button onClick={handleToggle} color="#fff" bg="#345430" size="sm">
        {isOpen
          ? language === 'en'
            ? 'Hide Details'
            : 'Ṣe Iwọsọdọ Ẹka'
          : language === 'en'
          ? 'Show Details'
          : 'Fa Wọle Ẹka'}
      </Button>
      <Collapse in={isOpen}>
        <Box
          p={4}
          border="1px solid #345430"
          borderRadius="md"
          mt={4}
          width="100%"
          gap={10}
          fontFamily="Inter"
        >
          <Text
            letterSpacing="2px" 
            lineHeight="2"
            fontSize="lg"
            mb={5}
          >
            {language === 'en'
              ? 'Amount: Your preferred amount'
              : 'Owo: ọmọ rẹ ti pọn'}
          </Text>
          <Text fontSize="lg"
          letterSpacing="2px" 
          lineHeight="2"
           mt={4}>
            {language === 'en'
              ? 'Proceed to PayPal to complete this payment.'
              : 'Lọ sile si PayPal fun ọna iṣẹdẹ yi.'}
          </Text>
        </Box>
      </Collapse>
    </VStack>
  );
};

export default PayPalPayment;