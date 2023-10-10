import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Header } from '../components';
import {
  VStack,
  Heading,
  Text,
  Container,
  Button,
  Flex,
  Image,
  Wrap,
  WrapItem,
  useMediaQuery,
} from '@chakra-ui/react';
import { RootState } from '../types/interface';
import { projects } from '../data/data';

interface HeaderTextProps {
    title: string | { [key: string]: string };
    content: string | { [key: string]: string };
    image: string; 
}


const Project:React.FC<HeaderTextProps>  = () => {
  const language = useSelector((state: RootState) => state.language.language);
  const projectData: HeaderTextProps [] = projects;
  const [isLargerScreen] = useMediaQuery('(min-width: 900px)');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeIn' }}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>Project Page</title>
      </Helmet>
      <Header />

      <Container maxW="container.md" textAlign="justify" mt={8}>
        <VStack spacing={8} fontFamily="Inter" align="center" mt={20} mb={20}>
          <Text
            fontSize="lg"
            letterSpacing="2px" lineHeight="2"
          >
            {language === 'en'
              ? 'Our vision is to make a positive impact on society by launching innovative projects that address pressing challenges and contribute to a better future.'
              : 'Iyanu wa ni lati ṣe iṣẹdẹdẹ ti o ṣe ohun ti o dara lati gbe asa orile-ede wa de abala kan pọsẹ, ti a tọ lati pe ogbọn idaniloju ati maṣa ipinle-ọna ti o dara diẹ. '}
          </Text>
          <Text
            fontSize="lg"
            letterSpacing="2px" lineHeight="2"
          >
            {language === 'en'
              ? 'These projects play a crucial role in advancing our society and shaping the future. We believe in the power of collective effort, and your support can make a significant difference.'
              : 'Awọn iṣẹdẹ yii nikan ti o gba ohun kan ni lati ṣe ilera ipinle-ọna wa ati ṣe ifọwọlọya nla. Awa fi inu itan igbeyawo ya jẹ, ati ọrọ rẹ le gba ipinlẹ-ọna to dara. '}
          </Text>

          <Heading 
          as="h4" 
          fontFamily="Inter"
                      size="xl"
                      color="#345430"
                      textAlign="justify"
                      fontWeight={600}
                      >
            {language === 'en' ? 'Upcoming Projects' : 'Awọn Iṣẹ ti O Bọ Lọ'}
          </Heading>
          <Wrap
            spacing={6}
            justify="center"
            alignItems="center"
            flexDirection={['column', 'row']} // Column on small screens, row on large screens
          >
            {projectData.map((project, index) => (
              <WrapItem key={index}>
                <Flex
                flexDirection={isLargerScreen ? 'row' : 'column'}
                  justifyContent="space-between"
                  alignItems="center"
                  w="100%"
                  p={4}
                  borderWidth={1}
                  borderColor="gray.200"
                  borderRadius="lg"
                  textAlign="center"
                  gap={10}
                >
                  <Image
                    src={project.image}
                    alt="Ewe"
                    boxSize="250px"
                    objectFit="cover"
                    borderRadius={"20px"}
                  />
                  <VStack spacing={2} align="start" gap={"15px"} display={'flex'} flexDirection={'column'}>
                    <Heading as="h2" fontWeight={400} size="md">
                    {typeof project.title === "string"
                  ? project.title
                  : project.title[language]}
                    </Heading>
                    <Text
                      fontSize="sm"
                      letterSpacing="2px" lineHeight="2"
                      textAlign="justify"
                    >
                    {typeof project.content === "string"
                  ? project.content
                  : project.content[language]}
                    </Text>    
                    <Button
                      as="a"
                      href="/donate"
                      mt={0}
                      backgroundColor={'#345430'}
                      padding={'20px'}
                      color={'#fff'}
                      variant="solid"
                      borderRadius={'10px'}
                      _hover={{
                        color: '#345430',
                        backgroundColor: '#F7F7F9',
                      }}
                      size="md"
                    >
                      {language === 'en' ? 'Donate' : 'Rànwálọ́wọ́'}
                    </Button>
                    </VStack>
                </Flex>
              </WrapItem>
            ))}
          </Wrap>
        </VStack>
      </Container>
    </motion.div>
  );
};

export default Project;
