import React from 'react';
import { Box, Button } from '@chakra-ui/react';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartProps {
  cart: Product[];
  isOpen: boolean;
  toggleCart: () => void;
  language: string;
}

const Cart: React.FC<CartProps> = ({ cart, isOpen, toggleCart, language }) => {
  return (
    <Box className={`cart ${isOpen ? 'open' : ''}`} mt={6}>
      <h2>Your Cart</h2>
      <ul>
        {cart.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <p>Total: ${cart.reduce((total, product) => total + product.price, 0).toFixed(2)}</p>
      <Button onClick={toggleCart} color="#fff" bg="#345430" size="sm">
        {language === 'en' ? 'Close Cart' : 'Tó ò ti fẹ́ràn ọkọ̣' }
      </Button>
    </Box>
  );
};

export default Cart;
