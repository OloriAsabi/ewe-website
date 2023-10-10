import { VStack, HStack, Text, useMediaQuery } from '@chakra-ui/react';

const FooterBox = () => {
  const [isMobile] = useMediaQuery('(max-width: 600px)'); // Check if screen width is less than 600px

  if (isMobile) {
    // Render a single column layout on mobile
    return (
      <VStack
        spacing={4}
        backgroundColor="#E0EAE0"
        borderRadius="20px"
        padding="20px"
        fontFamily="Inter"
        alignItems=""
        width={'100%'}
      >
        <HStack spacing={2}>
          <VStack align="start" spacing={4} flex={1}>
            <Text fontWeight="bold" color="#345430">
              Latest Search
            </Text>
            <Text>Ewé Abamoda</Text>
            <Text>Ewé Rere</Text>
            <Text>Ewé Jiwinni</Text>
            <Text>Eso Baka</Text>
          </VStack>
          <VStack align="start" spacing={4} flex={1}>
            <Text fontWeight="bold" color="#345430">
              Latest Addition
            </Text>
            <Text>Ewé Abamoda</Text>
            <Text>Ewé Rere</Text>
            <Text>Ewé Jiwinni</Text>
            <Text>Eso Baka</Text>
          </VStack>
        </HStack>
        <HStack spacing={2}>
          <VStack align="start" spacing={4} flex={1}>
            <Text fontWeight="bold" color="#345430">
              Most Popular
            </Text>
            <Text>Ewé Jiwinni</Text>
            <Text>Eso Baka</Text>
            <Text>Ewé Jiwinni</Text>
            <Text>Eso Baka</Text>
          </VStack>
          <VStack align="start" spacing={4} flex={1}>
            <Text fontWeight="bold" color="#345430">
              Most Popular
            </Text>
            <Text>Ewé Abamoda</Text>
            <Text>Ewé Rere</Text>
            <Text>Ewé Jiwinni</Text>
            <Text>Eso Baka</Text>
          </VStack>
        </HStack>
      </VStack>
    );
  }

  // Render the original two-column layout for larger screens
  return (
    <HStack
      spacing={6}
      flexDirection="row"
      backgroundColor="#E0EAE0"
      borderRadius="20px"
      padding="20px"
      fontFamily="Inter"
      alignItems="center"
      width="100%"
    >
      {/* Left column */}
      <VStack align="start" spacing={6} flex={1}>
        <Text fontWeight="bold" color="#345430">
          Latest Search
        </Text>
        <Text>Ewé Abamoda</Text>
        <Text>Ewé Rere</Text>
        <Text>Ewé Jiwinni</Text>
        <Text>Eso Baka</Text>
      </VStack>

      {/* Right column */}
      <VStack align="start" spacing={6} flex={1}>
        <Text fontWeight="bold" color="#345430">
          Latest Addition
        </Text>
        <Text>Ewé Abamoda</Text>
        <Text>Ewé Rere</Text>
        <Text>Ewé Jiwinni</Text>
        <Text>Eso Baka</Text>
      </VStack>

      {/* Left column */}
      <VStack align="start" spacing={6} flex={1}>
        <Text fontWeight="bold" color="#345430">
          Most Popular
        </Text>
        <Text>Ewé Jiwinni</Text>
        <Text>Eso Baka</Text>
        <Text>Ewé Jiwinni</Text>
        <Text>Eso Baka</Text>
      </VStack>

      {/* Right column */}
      <VStack align="start" spacing={6} flex={1}>
        <Text fontWeight="bold" color="#345430">
          Most Popular
        </Text>
        <Text>Ewé Abamoda</Text>
        <Text>Ewé Rere</Text>
        <Text>Ewé Jiwinni</Text>
        <Text>Eso Baka</Text>
      </VStack>
    </HStack>
  );
};

export default FooterBox;
