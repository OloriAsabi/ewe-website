import {
  Container,
  Image,
  Flex,
  Text,
  Button,
  Box,
  Divider,
  Icon,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion"; 
import { post } from "../data/data";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { PostCardProps, Posts, RootState, User } from "../types/interface";
import { useEffect, useState } from "react";
import { GoVerified } from "react-icons/go";
import { selectCurrentUser } from "../api/userSlice";
import PostMenu from "./PostMenu";
import { Link } from "react-router-dom";
import PostButtons from "./PostButtons";

const itemsPerPage = 6; // Number of posts per page

const HomeCollections: React.FC<PostCardProps> = () => {
  const language = useSelector((state: RootState) => state.language.language) ; 
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] =useState<Posts[]>(post);
  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const currentUser = useSelector(selectCurrentUser) as unknown as User;
  const isAuthenticated = useSelector((state: RootState) => state.user.isLogin);

  const [showFullDescription, setShowFullDescription] = useState<{ [postId: number]: boolean }>({});
  const [showFullUses, setShowFullUses] =  useState<{ [postId: number]: boolean }>({});
  // const dispatch = useDispatch();
  const navigate = useNavigate();


  const handlePostCardClick = (post: Posts) => {
    // Check if the user is authenticated
    if (isAuthenticated) {
      // If authenticated, navigate to PostById
      navigate(`user/${currentUser.id}/posts/${post.id}`);
    } else {
      navigate("/login")
    }
  };

  const toggleUses = (postId: number) => {
    setShowFullUses((prevShowFullUses) => ({
      ...prevShowFullUses,
      [postId]: !prevShowFullUses[postId],
    }));
  };

  const getUsesText = (post: Posts) => {
    const fullUses = typeof post.uses === 'string' ? post.uses : post.uses[language] || '';
  
    if (fullUses.length > 250) {
      return showFullUses[post.id] ? fullUses : fullUses.substring(0, 250);
    } else {
      return fullUses;
    }
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
  

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const rows = [];
  for (let i = 0; i < posts.length; i += 3) {
    rows.push(posts.slice(i, i + 3));
  }

  const animationControls = useAnimation();

  useEffect(() => {
    animationControls.start({ x: 0, opacity: 1 });
  }, [animationControls]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
    >
      <motion.div
        style={{ backgroundColor: "#E0EAE0"}} 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
      >
        <Container>
          <Text
            fontSize={{ base: "20px", md: "30px", lg: "40px" }}
            fontWeight="600"
            fontFamily='Inter'
            letterSpacing={3}
            textAlign="center"
            color="#345430"
            paddingTop="40px"
            paddingBottom="20px"
          >
            Recent Posts
          </Text>
        </Container>
      </motion.div>
      <motion.div
        style={{ backgroundColor: "#E0EAE0" }} 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
      >
        <Container
          style={{ backgroundColor: "#E0EAE0" }} 
          >
        <Flex justifyContent="center" alignItems="start" flexDirection={'column'} paddingBottom="20px">
    {currentPosts.map((post) => (
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
          <Flex justify="space-between" alignItems="center">
                <Text
                  textAlign="start"
                  paddingBottom="20px"
                  fontFamily="Inter"
                  paddingTop="10px"
                  fontWeight={600}
                  fontSize={{ base: "20px", md: "20px", lg: "25px" }}
                >
                  {isAuthenticated ?  
                  <Link to={`/user/${currentUser.id}`}>{currentUser.username}</Link>
                  : <Link to={'/login'}/>}
                </Text>
                {isAuthenticated ?
                 <PostMenu postId={post.id} />
                 : <Link to={'/login'}/>}
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
          <Box 
          flex="1" 
          textAlign="start" 
          fontFamily="Inter"
          onClick={() => handlePostCardClick(post)} >
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
                  >
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

                  <Text>
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
                  <Text textAlign="start" fontFamily="Inter">
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
          <Box>
            <PostButtons post={post} />
          </Box>
          <Divider color="#345430" />
        </Box>
    ))}
  </Flex>
            <Box textAlign="center" mt="4">
            {Array.from({ length: totalPages }).map((_, index) => (
              <Button
                key={index}
                mx="1"
                variant="ghost"
                onClick={() => handlePageChange(index + 1)}
                colorScheme={currentPage === index + 1 ? "green" : undefined}
                backgroundColor={currentPage === index + 1 ? "white" : undefined}
                marginBottom={'20px'}
              >
                {index + 1}
              </Button>
            ))}
          </Box>
        </Container>
      </motion.div>
    </motion.div>
  );
}

export default HomeCollections;