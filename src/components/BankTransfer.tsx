import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Heading,
  Text,
  Collapse,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../types/interface';

const BankTransfer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const language = useSelector((state: RootState) => state.language.language);

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
        {language === 'en' ? 'Bank Transfer' : 'Ọna Iparun Iwekọ'}
      </Heading>
      <Text fontSize="lg" letterSpacing="2px" lineHeight="2">
              {language === 'en'
                ? 'Choose the bank transfer option to make a donation via a bank transfer.'
                : 'Yọ ìparún ọna iparun iwekọ lati ṣe iṣẹdẹ ayika nipasẹ ọna iparun iwekọ.'}
            </Text>
            <Text fontSize="lg" letterSpacing="2px" lineHeight="2">
              {language === 'en'
                ? 'Follow the instructions below to complete the transfer manually.'
                : 'Fọwọsìn awọn iṣẹ lati pari iwekọ nipasẹ ọna iparun iwekọ.'}
            </Text>
            <Text fontSize="lg" letterSpacing="2px" lineHeight="2">
              {language === 'en'
                ? 'Your donation will support our cause, and we appreciate your contribution.'
                : 'Iṣẹdẹ rẹ yoo sọna iṣẹ wa, ati a ni yoo fẹ̣ràn rẹ pélú iṣẹdẹ rẹ.'}
     </Text>
      <Button
        onClick={handleToggle}
        color="#fff"
        bg="#345430"
        size="sm"
      >
        {isOpen ? (language === 'en' ? 'Hide Details' : 'Ṣe Iwọsọdọ Ẹka') : (language === 'en' ? 'Show Details' : 'Fa Wọle Ẹka')}
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
            {language === 'en' ? 'Amount: Your preferred amount' : 'Owo:ọmọ rẹ ti pọn'},
          </Text>
          <Text fontSize="lg" mb={5}>
            {language === 'en' ? 'Account Number: ******' : 'Nọmba aṣọ: ********'}
          </Text>
          <Text fontSize="lg" mb={5}>
            {language === 'en' ? 'Bank Name: Guranty Trust Bank' : 'Orilẹ-ede Banki: Guranty Trust Bank'}
          </Text>
          <Text fontSize="lg" mb={5}>
            {language === 'en' ? 'Beneficiary: Ewe' : 'Alaisan: Ewe'}
          </Text>
          <Text fontSize="lg" mt={4}>
            {language === 'en' ? 'Description: [Your Donation Description]' : 'Apejuwe: [Ìwọsọdọ Iye rẹ]'}
          </Text>
          <Text fontSize="lg" mt={4}>
            {language === 'en'
              ? 'Proceed to your bank app to complete this transfer.'
              : 'Lọ sile si ọna agbaniro fun rẹ lati ṣe ọna iparun iwekọ yi.'}
          </Text>
        </Box>
      </Collapse>
    </VStack>
  );
};

export default BankTransfer;
