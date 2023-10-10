import { Container } from "@chakra-ui/react";
import { Box, Flex, Text, VStack, Heading, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Header } from "../components";
import { about, craft, curator } from "../data/data";
import { useSelector } from "react-redux";
import { RootState } from "../types/interface";
import { Helmet } from "react-helmet";

type AboutData = {
  title: string | { [key: string]: string };
  description: string | { [key: string]: string };
};

const About: React.FC = () => {
  const language = useSelector((state: RootState) => state.language.language);

  const aboutData: AboutData = about;
  const curatorData: AboutData = curator;
  const craftData: AboutData = craft;

  const articleVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.2, duration: 0.5 } },
  };

  const teamVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.2, duration: 0.5 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
    >
    <Helmet>
        <meta charSet="utf-8" />
        <title>About Us Page</title>
      </Helmet>
      <Header />
      <Container paddingTop={20}>
        <Box p={5}>
          <VStack spacing={8} fontFamily="Inter" align="center">
          <HStack
              spacing={8}
              align="flex-start" // Adjust alignment as needed
              justify="center"
              flexDirection={{ base: "column" }} // Adjust direction based on screen size
            >
              <div>
            <motion.section
              variants={articleVariants}
              initial="hidden"
              animate="visible"
            >
              <Heading
                fontFamily="Inter"
                as="h4"
                color="#345430"
                textAlign="justify"
                fontWeight={600}
              >
                {typeof aboutData.title === "string"
                  ? aboutData.title
                  : aboutData.title[language]}
              </Heading>
              <Text 
              letterSpacing="0.2rem" 
              lineHeight="2"
              fontSize="lg"
              fontFamily="Inter"
              mb={4}>
                {typeof aboutData.description === "string"
                  ? aboutData.description
                  : aboutData.description[language]}
              </Text>
            </motion.section>

            <motion.section
              variants={articleVariants}
              initial="hidden"
              animate="visible"
            >
              <Heading
                fontFamily="Inter"
                as="h4"
                size="xl"
                color="#345430"
                textAlign="justify"
                fontWeight={600}
              >
                {typeof curatorData.title === "string"
                  ? curatorData.title
                  : curatorData.title[language]}
              </Heading>
              <Text 
          letterSpacing="2px" 
          lineHeight="2"
              fontSize="lg"
              fontFamily="Inter"
              mb={4}>
                {typeof curatorData.description === "string"
                  ? curatorData.description
                  : curatorData.description[language]}
              </Text>
            </motion.section>

            <motion.section
              variants={articleVariants}
              initial="hidden"
              animate="visible"
            >
              <Heading
                fontFamily="Inter"
                as="h4"
                size="xl"
                color="#345430"
                textAlign="justify"
                fontWeight={600}
              >
                {typeof craftData.title === "string"
                  ? craftData.title
                  : craftData.title[language]}
              </Heading>
              <Text 
                    letterSpacing="2px" 
                    lineHeight="2"
              fontSize="lg"
              fontFamily="Inter"
              mb={4}>
                {typeof craftData.description === "string"
                  ? craftData.description
                  : craftData.description[language]}
              </Text>
            </motion.section>
            </div>
            <motion.section
              variants={teamVariants}
              initial="hidden"
              animate="visible"
            >
              <Heading 
                  fontFamily="Inter"
                  as="h4"
                  color="#345430"
                  fontWeight={600}
                  textAlign="justify"
                  paddingBottom={10}
                  >
                Our Team
              </Heading>
              <Flex
                flexWrap="wrap"
                justify="center"
                flexDirection={{ base: "row" }}
              >
              <Box
                  bg="#E0EAE0"
                  p={4}
                  m={2}
                  borderRadius="md"
                  boxShadow="md"
                  minWidth="200px"
                  textAlign="center"
                >
                  <Text fontWeight="bold">Ashabi Oduntan</Text>
                  <Text>
                  Administration 
                  </Text>
                </Box>
                <Box
                  bg="#E0EAE0"
                  p={4}
                  m={2}
                  borderRadius="md"
                  boxShadow="md"
                  minWidth="200px"
                  textAlign="center"
                >
                  <Text fontWeight="bold">Ashabi Oduntan</Text>
                  <Text>Frontend Developer</Text>
                </Box>
                <Box
                  bg="#E0EAE0"
                  p={4}
                  m={2}
                  borderRadius="md"
                  boxShadow="md"
                  minWidth="200px"
                  textAlign="center"
                >
                  <Text fontWeight="bold">John Adeniran</Text>
                  <Text>
                  Backend Developer 
                  </Text>
                </Box>
                <Box
                  bg="#E0EAE0"
                  p={4}
                  m={2}
                  borderRadius="md"
                  boxShadow="md"
                  minWidth="200px"
                  textAlign="center"
                >
                  <Text fontWeight="bold">Ashabi Oduntan</Text>
                  <Text>
                  Research
                  </Text>
                </Box>
                <Box
                  bg="#E0EAE0"
                  p={4}
                  m={2}
                  borderRadius="md"
                  boxShadow="md"
                  minWidth="200px"
                  textAlign="center"
                >
                  <Text fontWeight="bold">Ashabi Oduntan</Text>
                  <Text>
                  Design and UX
                  </Text>
                </Box>
              </Flex>
            </motion.section>
            </HStack>
          </VStack>
        </Box>
      </Container>
    </motion.div>
  );
};

export default About;
