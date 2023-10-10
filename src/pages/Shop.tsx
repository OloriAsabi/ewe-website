import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Image, Text, Button, Heading, Grid, Center } from '@chakra-ui/react'; // Import Chakra UI components
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux'; // Import useSelector from Redux
import segunsete from '../assets/Ewe Segun sete/IMG_0770.jpeg';
import segunsete1 from '../assets/Ewe Segun sete/IMG_0771.jpeg';
import ewuro from '../assets/ewuro.jpeg';
import { RootState } from '../types/interface';
import { Cart } from '../components';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const productsData: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    price: 20.99,
    imageUrl: segunsete,
  },
  {
    id: 2,
    name: 'Product 2',
    price: 15.49,
    imageUrl: segunsete1,
  },
  {
    id: 3,
    name: 'Product 3',
    price: 12.99,
    imageUrl: ewuro,
  },
  // Add more products as needed
];

const Shop: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false); 

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen); // Toggle the cart modal
  };
  // Access the language state from Redux
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
        <title>Ewe Shop - Authentic Isese Products</title> {/* Updated title */}
      </Helmet>
      <Container paddingTop={20} paddingBottom={20}>
        {/* Introduction */}
        <Box mb={6}>
          <Heading
            fontFamily="Inter"
            as="h4"
            size="xl"
            color="#345430"
            textAlign="justify"
            fontWeight={600}
          >
            {language === 'en' ? 'Welcome to Ewe Shop!' : 'Káabó si Ewe Shop!'}
          </Heading>
          <Text
            letterSpacing="2px" 
            lineHeight="2"
            fontSize="lg"
            fontFamily="Inter"
            mb={4}
          >
            {language === 'en'
              ? 'Discover the richness of Ewe culture through our authentic Isese products, traditional oils, black soap, and more. Explore our collection below and embrace the healing power of nature.'
              : 'Joko lọ si iṣẹsẹ kanalẹ Ewe lati ṣẹdarẹ Isese wa, awọn ọlụṣọ osan ati ọyọ ọlọgbo, ọṣụpọ dudu, ati ọpọlọpọ miiran. Kọ awọn awọn ibi wa to joko lọ si wọ̣n ki o gba iwẹlú agbara ìlù ti ọna miiran.'}
          </Text>
        </Box>
        <Grid
          templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']}
          gap={6}
        >
          {productsData.map((product) => (
            <Box
              key={product.id}
              p={4}
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                maxH="300px"
                width={['100%', '300px']}
                borderRadius="20px"
                objectFit="cover"
              />
              <Text mt={2} fontWeight="bold">
                {product.name}
              </Text>
              <Text fontSize="lg" color="#345430">
                ${product.price.toFixed(2)}
              </Text>
              <Button
                mt={2}
                bg="#345430"
                color="#fff"
                onClick={() => addToCart(product)}
                size="sm"
              >
                {language === 'en' ? 'Add to Cart' : 'Fọwọ́sọ'}
              </Button>
            </Box>
          ))}
        </Grid>
        <Center>
        <Button onClick={toggleCart} color="#fff" bg="#345430" size="lg">
        {language === 'en' ? 'Open Cart' : 'Fọwọ́sọ ọkọ̣'}
      </Button>
      </Center>
        {isCartOpen && (
        <Cart cart={cart} isOpen={isCartOpen} toggleCart={toggleCart} language={language} />
      )}
      </Container>
    </motion.div>
  );
};

export default Shop;
