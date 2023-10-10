import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { BankTransfer, BitCoinTransfer, FlutterTransfer, Header, PayPalPayment } from '../components';
import { Helmet } from 'react-helmet';
import { Container, VStack, Heading, Text } from '@chakra-ui/react';
import { RootState } from '../types/interface';

const Donate = () => {
  const language = useSelector((state: RootState) => state.language.language);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeIn' }}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>Donate To Us Page</title>
      </Helmet>
      <Header />
      <Container maxW="container.md">
        <VStack spacing={8} align="center" mt={8} paddingTop={20} paddingBottom={20}>
          <Heading
            fontFamily="Inter"
            as="h4"
            size="xl"
            color="#345430"
            textAlign="center"
            fontWeight={600}
          >
            {language === 'en' ? 'Support Our Cause' : 'Rànwálọ́wọ́'}
          </Heading>
          <Text fontSize="lg" 
            letterSpacing="2px" // Add letter spacing
            lineHeight="2" // Adjust line height
            >
            {language === 'en'
              ? 'Your contribution can make a difference! We appreciate your support in helping us achieve our mission.'
              : 'Ẹ ṣeun fun awọn iṣẹ rẹ le gbọdọ! Awa yọ e sọna rẹ ni lati sọna awọn iṣẹ wa.'}
          </Text>
          <Text fontSize="lg"
          letterSpacing="2px" lineHeight="2">
            {language === 'en'
              ? 'To make a donation, please visit our donation page or contact us for more information.'
              : 'Lati ṣe iṣẹdẹ ayika, jọwọ wọle si wa ni ọja iṣẹdẹ ayika wa tabi pe pe wa fun ọtunla daramọja.'}
          </Text>

          <VStack spacing={10} align="start">
            <FlutterTransfer/> 
            <PayPalPayment/>
            <BankTransfer />
            <BitCoinTransfer/>
          </VStack>
        </VStack>
      </Container>
    </motion.div>
  );
}
  export default Donate;