import {
    Container,
    Image,
    Flex,
    Text,
    Box,
    Divider,
    Icon,
  } from "@chakra-ui/react";
  import { motion } from "framer-motion"; 
  import { PostCardProps, Posts, RootState, User } from "../types/interface";
  import { useState } from "react";
  import { GoVerified } from "react-icons/go";
  import { post } from "../data/data";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../api/userSlice";
import PostButtons from "./PostButtons";
import { useSelector } from "react-redux";
import PostMenu from "./PostMenu";
  
  const AllPosts: React.FC<PostCardProps> = () => {
    const language = useSelector((state: RootState) => state.language.language);
    const currentUser = useSelector(selectCurrentUser) as unknown as User;
    const isAuthenticated = useSelector((state: RootState) => state.user.isLogin);
  
    const [showFullDescription, setShowFullDescription] = useState<{ [postId: number]: boolean }>({});
    const [showFullUses, setShowFullUses] =  useState<{ [postId: number]: boolean }>({});
  
  const getUsesText = (post: Posts) => {
    const fullUses = typeof post.uses === 'string' ? post.uses : post.uses[language] || '';
  
    if (fullUses.length > 250) {
      return showFullUses[post.id] ? fullUses : fullUses.substring(0, 250);
    } else {
      return fullUses;
    }
  };
  
    const toggleUses = (postId: number) => {
      setShowFullUses((prevShowFullUses) => ({
        ...prevShowFullUses,
        [postId]: !prevShowFullUses[postId],
      }));
    };
  
 const toggleDescription = (postId: number) => {
    setShowFullDescription((prevShowFullDescription) => ({
      ...prevShowFullDescription,
      [postId]: !prevShowFullDescription[postId],
    }));
  };

    const getDescription = (post: Posts) => {
        const fullDescription =
          typeof post.description === 'string'
            ? post.description
            : post.description[language];
      
        if (fullDescription.length > 250) {
          return showFullDescription[post.id]
            ? fullDescription
            : fullDescription.substring(0, 250);
        } else {
          return fullDescription;
        }
      };
    // Define getUsesText and toggleDescription functions as in your previous code
  
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
      >
        <Container>
          <Flex justifyContent="center" alignItems="start" flexDirection={'column'} paddingBottom="20px">
            {post.map((post: any) => (
              <Box
                key={post.id}
                width={{ base: "100%" }}
                mx="auto"
                mb="4"
                p="5"
                borderRadius="0"
                bg="transparent"
                border="none"
                flexDirection={{ base: "column", md: "row" }}
              >
          <Flex justify="space-between" alignItems="center" mb={5}>
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
                  borderRadius={'10px'}
                  src={post.image}
                  alt={post.username}
                />
              </Box>
              <Link to={`${post.id}`}>
                <Box flex="1" textAlign="start" fontFamily="Inter">
                      <Text
                          textAlign="start"
                          paddingBottom="10px"
                          fontFamily="Inter"
                          paddingTop="10px"
                          fontSize={{ base: "20px", md: "20px", lg: "25px" }}
                          textTransform="capitalize"
                          display={'flex'}
                          justifyContent={'start'}
                          alignItems={'center'}
                          gap={'20px'}
                          mb={4}
                        >
                          {typeof post.name === "string" ? post.name :  post.name[language] }
                          <span>
                          <Image
                          objectFit="cover"
                          width="30px"
                          height="30px"
                          src={post.icon}
                          alt={'Catergory'}
                        />
                          </span>  
                          <span>
                            <Icon color={'#fff'} backgroundColor={'#345430'} borderRadius={'10px'} >{post.verify ? <GoVerified  style={{ color: "#fff", backgroundColor: "#345430"}}fontSize={25} /> : ""}</Icon>
                            </span>          
                        </Text>
                        <Text 
                        textAlign="start" 
                        fontFamily="Inter"
                        textTransform="capitalize"
                        fontSize="lg" mb={4}>
                            <i> {language === 'en' ? "Other Names:  " : "Oruko omiran: "}</i>
                            <span>
                            {typeof post.otherNames === "string" ? post.otherNames :  post.otherNames[language] }
                            </span>
                          </Text>

                        <Text
                          color="#345430"
                          fontSize={'20px'}
                          fontFamily="Inter"
                          fontWeight={800}
                          paddingBottom="10px"
                          >
                        {language === 'en' ? "Description" : "Apejuwe re:"}
                        </Text>

                        <Text 
                    letterSpacing="0.05rem" 
                    lineHeight="2"
                    textAlign="start" 
                    fontSize="lg"
                    fontFamily="Inter"
                    mb={4}>
                          {getDescription(post)}
                          {typeof post.description === 'string' || post.description[language]?.length > 250 ? (
                            <span>
                              ...{' '}
                              <Text
                                  color="#345430"
                                  onClick={() => toggleDescription(post.id)}
                                  fontSize={'15px'}
                                  fontFamily="Inter"
                                  fontWeight={800}
                                  >
                                {showFullDescription[post.id] ? 'Read less' : 'Read more'}
                              </Text>
                            </span>
                          ) : null}
                        </Text>
                        <Text
                          color="#345430"
                          fontSize={'20px'}
                          fontFamily="Inter"
                          fontWeight={800}
                          paddingBottom="10px"
                          paddingTop={'10px'}
                          >
                          {language === 'en' ? "Uses:" : "Iwulo re: "}
                        </Text>
                        <Text 
                    letterSpacing="0.05rem" 
                    lineHeight="2"
                    textAlign="start" 
                    fontSize="lg"
                    fontFamily="Inter"
                    mb={4}>
                          {getUsesText(post)}
                          {typeof post.uses === 'string' || post.uses[language]?.length > 250 ? (
                            <span>
                              ...{' '}
                              <Text 
                                    fontSize={'15px'}
                                    fontFamily="Inter"
                                    fontWeight={800}
                                    color="#345430"
                                    onClick={() => toggleUses(post.id)}>
                                {showFullUses[post.id] ? 'Read less' : 'Read more'}
                              </Text>
                            </span>
                          ) : null}
                        </Text>
                </Box>
                </Link>
          <Box>
            <PostButtons post={post} />
          </Box>
          <Divider color="#345430" />
          </Box>
            ))}
          </Flex>
        </Container>
      </motion.div>
    );
  }
  
  export default AllPosts;
  