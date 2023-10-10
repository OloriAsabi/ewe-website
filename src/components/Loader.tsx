import React from 'react';
import { Spinner } from '@chakra-ui/react';
import { Center } from '@chakra-ui/react'; 

const Loader: React.FC = () => {

  return (
    <Center h="100vh" bg="#fff" color="#345430">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="#345430" />
  </Center>
  );
};

export default Loader;
