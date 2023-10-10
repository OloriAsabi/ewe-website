import { Box, Button, Container, Text } from "@chakra-ui/react";
import HeaderText from "./HeaderText";
import bg from "../assets/Background.jpg"
import SearchInput from "./SearchInput";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, User } from "../types/interface";
import { selectCurrentUser, selectIsAuthenticated } from "../api/userSlice";

const Header = () => {
  const currentUser = useSelector(selectCurrentUser) as unknown as User;
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate()
    const handleSearch = (query: string) => {
        console.log("Searching for:", query);
      };
      const language = useSelector((state: RootState) => state.language.language); 

  const redirectToCreatePost = () => {
    if (isAuthenticated) {
      const createPostUrl = `/user/${currentUser.id}/create-post`;
      navigate(createPostUrl);
    } else {
      navigate('/login'); 
    }
  };



const text = {
title: {
    yo: 'Ẹkáàbọ̀ si Ewé',
    en: 'Welcome to Ewé',
  },
  description: {
    yo: "Akó jọ́ pọ́ gbogbo imọ́ ijìnlé ní'pa ile aye, ẹyẹ́, ewé, ẹrankó, igi, ati bẹbẹ lọ́ ni'lé Yorùbá", // Yoruba description
    en: "Gathering Yorùbá ecological knowledge on plants, animals, insects, trees and herbs.", // English description
  },
}


  return (
    <Box
      bg="white"
      backgroundImage={bg}
      backgroundSize="cover"
      backgroundPosition="center"
      color="black"
      height="70vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container>
      <HeaderText text={text} />
      <SearchInput 
      onSearch={handleSearch}
      backgroundColor="#E0EAE0"
      />
        <Text
        fontFamily='Inter'
        textAlign={'center'}
        color="#345430"
        fontSize={18}
        paddingTop={5}
        paddingBottom={5}
      >
        {language === 'en' ? 'Join other users and add a new discovery' : 'Darapọ̀ mọ́ àwọn olùlò yókù láti fi ìwádí  mìíràn kún-un'}
      </Text>
      <Box
      textAlign={'center'}>
     <Button
        onClick={redirectToCreatePost}
        mt={0}
        backgroundColor={"#345430"}
        padding={'20px'}
        color={"#fff"}
        variant="solid"
        borderRadius={"10px"}
        _hover={{
          color: "#345430",
          backgroundColor: "#F7F7F9"
        }}
        size="md"
      >
        {language === 'en' ? 'Create Post' : 'Fún wa ní ìwádí kan'}
      </Button>

      </Box>
      </Container>
    </Box>
  );
};

export default Header;
