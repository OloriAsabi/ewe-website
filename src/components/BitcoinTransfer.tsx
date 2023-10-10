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

const BitcoinTransfer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const language = useSelector((state: RootState) => state.language.language);

  const { hasCopied, onCopy } = useClipboard('1DMTEcbSzteRpUSUDyxwqAYEqURQNsvhu2'); // Initialize clipboard functionality

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
      >
        {language === 'en' ? 'Bitcoin Transfer' : 'Ọna Iparun Bitcoin'}
      </Heading>
      <Text fontSize="lg" letterSpacing="0.05rem" lineHeight="1.5">
        {language === 'en'
          ? 'Choose the Bitcoin transfer option to make a donation via Bitcoin.'
          : 'Yọ ìparún ọna iparun Bitcoin lati ṣe iṣẹdẹ ayika nipasẹ Bitcoin.'}
      </Text>
      <Text fontSize="lg" letterSpacing="0.05rem" lineHeight="1.5">
        {language === 'en'
          ? 'Follow the instructions below to complete the Bitcoin transfer manually.'
          : 'Fọwọsìn awọn iṣẹ lati pari iwekọ nipasẹ Bitcoin.'}
      </Text>
      <Text fontSize="lg" letterSpacing="0.05rem" lineHeight="1.5">
        {language === 'en'
          ? 'Your donation will support our cause, and we appreciate your contribution.'
          : 'Iṣẹdẹ rẹ yoo sọna iṣẹ wa, ati a ni yoo fẹ̣ràn rẹ pélú iṣẹdẹ rẹ.'}
      </Text>
      <Box display="flex" alignItems="center">
        <Input
          value="1DMTEcbSzteRpUSUDyxwqAYEqURQNsvhu2"
          isReadOnly
          size="sm"
          pr="3rem"
          roundedLeft="md"
        />
        <IconButton
          aria-label="Copy Bitcoin address"
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
            letterSpacing="0.05rem"
            lineHeight="2"
            fontSize="lg"
            mb={5}
          >
            {language === 'en'
              ? 'Amount: Your preferred amount in Bitcoin'
              : 'Owo: ọmọ rẹ ti pọn ni Bitcoin'}
          </Text>
          <Text fontSize="lg" mt={4}>
            {language === 'en'
              ? 'Proceed to your Bitcoin wallet to complete this transfer.'
              : 'Lọ sile si ọna ayika Bitcoin rẹ lati ṣe ọna iparun yi.'}
          </Text>
        </Box>
      </Collapse>
    </VStack>
  );
};

export default BitcoinTransfer;
