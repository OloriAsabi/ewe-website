import { Heading, Text, VStack } from '@chakra-ui/react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { useSelector } from 'react-redux';
import { RootState } from '../types/interface';

const FlutterTransfer = () => {
    const language = useSelector((state: RootState) => state.language.language);


    const config = {
        public_key: 'FLWPUBK-**************************-X',
        tx_ref: Date.now().toString(),
        amount: 100,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
          email: 'user@gmail.com',
          phone_number: '070********',
          name: 'john doe',
        },
        customizations: {
          title: 'My store',
          description: 'Payment for items in cart',
          logo:
            'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
      };
    
      const fwConfig = {
        ...config,
        text: language === 'en' ? 'Pay with Flutterwave!' : 'Debiti pẹlu Flutterwave!',
        callback: (response: any) => {
          console.log(response);
          closePaymentModal();
        },
        onClose: () => {},
      };
    
    
    
  return (
    <VStack spacing={4} align="start" mt={4}>
    <Heading
      fontFamily="Inter"
      as="h4"
      size="xl"
      color="#345430"
      textAlign="start"
      fontWeight={600}
    >
        {language === 'en' ? 'Online Payment via FlutterWave' : 'Debiti Nipasẹ Ẹkọ FlutterWave'}
    </Heading>
      <Text fontSize="lg"  letterSpacing="2px" lineHeight="2">
        {language === 'en' ? 'Online Payment via FlutterWave' : 'Debiti Nipasẹ Ẹkọ FlutterWave'}
      </Text>
      <Text fontSize="lg" letterSpacing="2px" lineHeight="2">
        {language === 'en'
          ? 'Make a secure online payment using various payment methods, including credit/debit cards, mobile money, and USSD.'
          : 'Dabi pe ti o ba wẹ ọkan nipa ẹkọ online ti o ni awọn ọrọ iwọṣọna, ti o ni awọn owo iṣọna, owo alatunṣe, ati USSD.'}
      </Text>
      <Text fontSize="lg" letterSpacing="2px" lineHeight="2">
        {language === 'en'
          ? 'Your contribution will be processed instantly, and you\'ll receive a payment confirmation.'
          : 'Awọn iṣẹ rẹ yoo pese titun, ati o yoo gba akoonu iṣẹdẹ.'}
      </Text>
      <FlutterWaveButton {...fwConfig} className="flutter" />
    </VStack>
  );
};

export default FlutterTransfer;
