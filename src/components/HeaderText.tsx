import { Box, Text } from "@chakra-ui/react";
import { useSelector } from 'react-redux';
import { RootState } from "../types/interface";

interface HeaderTextProps {
    text: {
      title: string | { [key: string]: string };
      description: string | { [key: string]: string };
    };
  }
  
const HeaderText: React.FC<HeaderTextProps> = ({ text }) => {
const language = useSelector((state: RootState) => state.language.language) ; 
    
  return (
    <Box textAlign="center"  marginBottom="10px">
      <Text
        fontSize={{ base: "20px", md: "30px", lg: "30px" }} // Responsive font size
        fontWeight="600"
        fontFamily='Inter'
        textAlign={'center'}
        color="#345430"
      >
        {typeof text.title === "string" ? text.title : text.title[language]}
      </Text>
      <Text
    fontSize={{ base: "20px", md: "30px", lg: "30px" }} // Responsive font size
    fontWeight="600"
    fontFamily='Inter'
    textAlign={'center'}
    color="#345430"
        mt="4">
    {typeof text.description === "string"
    ? text.description
    : text.description[language]}
      </Text>
    </Box>
  );
};

export default HeaderText;
