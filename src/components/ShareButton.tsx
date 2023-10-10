import { Button, Box, Flex, Icon, Text } from '@chakra-ui/react';
import { FaTwitter, FaFacebook, FaWhatsapp } from 'react-icons/fa';

const ShareButton = () => {

  const sharePost = (platform: any) => {
    // Implement the logic to share the post on the selected platform here
    console.log(`Sharing on ${platform}`);
  };

  return (
        <Box
          position="absolute"
          top="100%"
          right="0"
          zIndex="999"
          backgroundColor="white"
          border="1px solid #ccc"
          borderRadius="4px"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
        >
          <Flex flexDirection="column" p="2">
            <Text fontWeight="bold" mb="2">
              Share on:
            </Text>
            <Button
              variant="ghost"
              color="#345430"
              leftIcon={<Icon as={FaTwitter} />}
              onClick={() => sharePost('Twitter')}
            >
              Twitter
            </Button>
            <Button
              variant="ghost"
              color="#345430"
              leftIcon={<Icon as={FaFacebook} />}
              onClick={() => sharePost('Facebook')}
            >
              Facebook
            </Button>
            <Button
              variant="ghost"
              color="#345430"
              leftIcon={<Icon as={FaWhatsapp} />}
              onClick={() => sharePost('WhatsApp')}
            >
              WhatsApp
            </Button>
            {/* Add more social media platforms as needed */}
          </Flex>
        </Box>
  );
};

export default ShareButton;