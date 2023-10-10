import { useSelector } from 'react-redux'; // Import the useSelector hook from Redux
import { VStack, Heading, Box, Text, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import Header from "../components/Header"; // Import your Header component here
import Socials from "../components/Socials";
import { RootState } from "../types/interface";

const Contact = () => {
  // Assuming you have a Redux store set up with the 'language' state
  const language = useSelector((state: RootState) => state.language.language) 

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>Contact Us Page</title>
      </Helmet>
      <Header />
      <Container maxW="container.md" textAlign="justify">
        <VStack spacing={8} fontFamily="Inter" align="center" mt={8} paddingTop={20} paddingBottom={20}>
          <Heading
            fontFamily="Inter"
            as="h4"
            size="xl"
            color="#345430"
            textAlign="justify"
            fontWeight={600}
          >
            {language === 'en' ? 'Contact Us' : 'Kàn Sí Wa'}
          </Heading>
          <Text
            fontSize="lg"
            letterSpacing="2px" // Add letter spacing
            lineHeight="2" // Adjust line height
          >
            {language === 'en' ? 'Welcome to Ewe, your gateway to the rich world of Isese and Yoruba culture! We are on a mission to contribute to the Isese and Yoruba community by building an app that focuses on plants, herbs, flowers, seeds, trees, animals, birds, and all herbal services in the community.' 
            : 'Bẹẹ ni ọ̀rọ̀ ẹ̀yin ti ò tọdọdun gbogbo ẹsẹ pataki ti Isese ati Yoruba! Awa ni on a ṣe alabapin si iṣẹ ti Isese ati awọn ọmọ Isese nibi ti a ṣe iwadii ti a kọ si awọn ọ̀tẹlẹ, erun, olobirin, ewe, ewo, ẹran, ẹjọ ati awọn iṣẹ ti odu ifa nipa agbekọ ayika kookan ti awọn kọmmunịtị.'}
          </Text>
          <Text
            fontSize="lg"
            letterSpacing="2px" // Add letter spacing
            lineHeight="2" // Adjust line height
          >
            {language === 'en' ? 'At Ewe, we believe in the power of knowledge sharing. Our platform brings together herbal specialists and enthusiasts from the Yoruba community and beyond to share their extensive knowledge of plant culture, herbal remedies, and much more.' 
            : 'Ni Ewe, a fi inú erọ aṣayẹ iranlọwọ. Awa ṣe ọfẹrọ inu rere lori ilọsiwaju agba gbigbona ati awọn eniyan ti awọn ọmọ Yoruba ati ibugbe to dara lati pa ilọsiwaju awo agba nipa iṣẹ ti awọn ọdun ege ati awọn iṣẹ ti aye pe lu.'}
          </Text>
          <Text
            fontSize="lg"
            letterSpacing="2px" // Add letter spacing
            lineHeight="2" // Adjust line height
          >
            {language === 'en' ? 'Whether you are passionate about traditional healing methods or simply curious about the rich herbal traditions of the Yoruba culture, Ewe is the place for you. Contact us today to join our community, learn from experts, and contribute your knowledge to this vibrant ecosystem.' 
            : 'Sibẹ̀ ọ wá lọ lati pa iṣẹ ayika gbigbona tabi o ti rorun ni ilọsiwaju awọn alabapin ti awọn ọmọ Isese ti awọn ọmọ Yoruba ni eyikeyi, Ewe ni ibeere fun o. Tọ usi lẹhin ti kọmmunịtị wa, fẹ̣to lọ lati awọn alabapin, ati pa alaye rẹ ki awọn ọmọ Isese lọ lati odo yii ti o kọjọjọ.'}
          </Text>
          <Box>
            <Socials />
          </Box>
        </VStack>
      </Container>
    </motion.div>
  );
};

export default Contact;
