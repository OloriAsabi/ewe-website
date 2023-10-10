import React, { useState } from "react";
import {
  Container,
  Image,
  Flex,
  Text,
  Box,
  Icon
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { GoVerified } from "react-icons/go";
import { PostMenu, ShareButton } from "../components";
import { PostCardProps, Posts, RootState, User } from "../types/interface";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { post } from "../data/data";
import { selectCurrentUser } from "../api/userSlice";
import { Link } from "react-router-dom";
import { FaComment } from "react-icons/fa";
import PostButtons from "../components/PostButtons";
import { Helmet } from "react-helmet";


const PostById: React.FC<PostCardProps> = () => {
    const language = useSelector((state: RootState) => state.language.language);
    const isAuthenticated = useSelector((state: RootState) => state.user.isLogin);
    const currentUser = useSelector(selectCurrentUser) as unknown as User;

    const { postId } = useParams<{ postId?: string }>(); // postId is now optional
  
    // Check if postId is defined and not an empty string
    if (postId === undefined || postId === '') {
      // Handle the case where postId is not provided or is an empty string
      return <div>No postId provided</div>;
    }
  
    // Convert postId to a number for comparison
    const postIdAsNumber = parseInt(postId, 10);
  
    // Find the post with the matching postId
    const posts = post.find((p) => p.id === postIdAsNumber);
  


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
      style={{ backgroundColor: "#E0EAE0" }}
    >
                  <Helmet>
            <meta charSet="utf-8" />
            <title>Post By Id Page</title>
          </Helmet>
      <Container>
        <Flex justifyContent="center" alignItems="start" flexDirection={"column"} paddingBottom="20px">
          <Box
            key={posts.id}
            width={{ base: "100%" }}
            mx="auto"
            mb="4"
            p="5"
            borderRadius="0"
            bg="transparent"
            border="none"
            flexDirection={{ base: "column", md: "row" }}
          >
            <Flex justify="space-between" alignItems="center">
                <Text
                  textAlign="start"
                  paddingBottom="20px"
                  fontFamily="Inter"
                  paddingTop="10px"
                  fontWeight={600}
                  fontSize={{ base: "20px", md: "20px", lg: "25px" }}
                >
                  <Link to={`/user/${currentUser.id}`}>{currentUser.username}</Link>
                </Text>
                {isAuthenticated && <PostMenu postId={post.id} />}
              </Flex>

            <Box
              flex={{ base: "0 0 100%", md: "0 0 40%" }}
              maxWidth={{ base: "100vw", md: "100vw" }}
              height={"500px"}
            >
              <Image
                objectFit="cover"
                width="100%"
                height="100%"
                borderRadius={"10px"}
                src={posts.image}
                alt={posts.username}
              />
            </Box>
            <Box flex="1" textAlign="start" fontFamily="Inter">
              <Text
                textAlign="start"
                paddingBottom="10px"
                fontFamily="Inter"
                paddingTop="10px"
                fontSize={{ base: "20px", md: "20px", lg: "25px" }}
                textTransform="capitalize"
                display={"flex"}
                justifyContent={"start"}
                alignItems={"center"}
                gap={"20px"}
                mb={4}
              >
                {typeof posts.name === "string" ? posts.name : posts.name[language]}
                <span>
                  <Image
                    objectFit="cover"
                    width="30px"
                    height="30px"
                    src={posts.icon}
                    alt={"Category"}
                  />
                </span>
                <span>
                  <Icon color={"#fff"} backgroundColor={"#345430"} borderRadius={"10px"}>
                    {posts.verify ? <GoVerified style={{ color: "#fff", backgroundColor: "#345430" }} fontSize={25} /> : ""}
                  </Icon>
                </span>
              </Text>
              <Text textAlign="start" fontFamily="Inter" textTransform="capitalize" fontSize="lg" mb={4}>
                <i>{language === "en" ? "Other Names:  " : "Oruko omiran: "}</i>
                <span>{typeof posts.otherNames === "string" ? posts.otherNames : posts.otherNames[language]}</span>
              </Text>
              <Text color="#345430" fontSize={"20px"} fontFamily="Inter" fontWeight={800} paddingBottom="10px">
                {language === "en" ? "Description" : "Apejuwe re:"}
              </Text>
                <Text 
         letterSpacing="2px" // Add letter spacing
         lineHeight="2" // Adjust line height
              textAlign="start" 
              fontSize="lg"
              fontFamily="Inter"
              mb={4}>
                {typeof posts.description === "string" ? posts.description : posts.description[language]}
              </Text>

              <Text color="#345430" fontSize={"20px"} fontFamily="Inter" fontWeight={800} paddingBottom="10px" paddingTop={"10px"}>
                {language === "en" ? "Uses:" : "Iwulo re: "}
              </Text>
               <Text 
            letterSpacing="2px" // Add letter spacing
            lineHeight="2" // Adjust line height
              textAlign="start" 
              fontSize="lg"
              fontFamily="Inter"
              mb={4}>
                {typeof posts.uses === "string" ? posts.uses : posts?.uses[language]}
              </Text>
              <Box>
                <PostButtons post={post} />
            </Box>
            </Box>
          </Box>
        </Flex>
      </Container>
    </motion.div>
  );
};

export default PostById;