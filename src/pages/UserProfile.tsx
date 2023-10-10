import {
  Box,
  Text,
  VStack,
  Container,
  Button,
  Flex,
} from '@chakra-ui/react';
import { FaCog, FaMapMarkerAlt } from 'react-icons/fa';
import Loader from '../components/Loader';
import { selectCurrentUser } from '../api/userSlice';
import { useSelector } from 'react-redux';
import { RootState, User } from '../types/interface';
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { UserPosts } from '../components';
import { useGetUserProfileQuery } from '../api/userApi';
import { Helmet } from 'react-helmet';

const UserProfile = () => {
  const { userId } = useParams();
  const currentUser = useSelector(selectCurrentUser) as unknown as User;
  const navigate = useNavigate();

  const validUserId = userId || 'defaultUserId';
  const { data: userData, isLoading, isError } = useGetUserProfileQuery(validUserId);

  console.log("User Data: ", userData);

  const locationName = useSelector((state: RootState) => state.reverseGeocode.locationName);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeIn' }}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>User Profile Page</title>
      </Helmet>
      <Container
        justifyContent="center"
        alignItems="center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeIn' }}
        >
          <Box  
            p={10}
          >
            {isError ? (
              <div>Failed to Get User Profile</div>
            ) : (
              <div>
                {isLoading && <Loader />}
                {!isLoading && (
                  <Flex
                    direction={{ base: 'column', md: "row" }}
                    align={{ base: 'start', md: 'center' }}
                    justify="space-between"
                    gap={10}
                    fontFamily="Inter"
                  >
                    <VStack 
                      align="start" 
                      spacing={4}
                    >
                      <Text fontSize="xl" fontWeight="bold">
                        {userData?.data?.profile?.name || currentUser.name}
                      </Text>
                      {userData?.data?.profile?.username ? (
                        <Text>{userData?.data?.profile?.username}</Text>
                      ) : (
                        <Text
                        fontWeight={600}
                        fontSize={{ base: "15px", md: "20px", lg: "20px" }}
                        >{currentUser.username}</Text>
                      )}
                      <Text

                                 fontSize={{ base: "15px", md: "20px", lg: "20px" }}
                      >{currentUser.email}</Text>
                      {userData?.data?.profile?.field ? (
                        <Text style={{ textTransform: 'capitalize' }}>
                          {userData?.data?.profile?.field}
                        </Text>
                      ) : (
                        <Text style={{ textTransform: 'capitalize' }}
                        fontSize={{ base: "15px", md: "20px", lg: "20px" }}>
                          {currentUser.field}</Text>
                      )}
                      <div style={{ display: "flex", 
                        flexDirection: "row", 
                        justifyContent: "center", 
                        alignItems: "center" }}
                      >
                        <FaMapMarkerAlt color={'#345430'} size={20} />
                        <Text
                          color={"black"}
                          textAlign={'start'}
                          p={2}
                        >
                          {locationName}
                        </Text>
                      </div>
                      {userData?.data?.profile?.about ? (
                        <Text style={{ textTransform: 'capitalize', textAlign: 'justify' }}>
                          {userData?.data?.profile?.about}
                        </Text>
                      ) : (
                        <Text style={{ textTransform: 'capitalize',  
                        textAlign: 'justify' }}>{currentUser.about}</Text>
                      )}
                    </VStack>
                    <VStack 
                      alignItems="start" 
                      spacing={4}
                    >
                      <Button
                        onClick={() => {
                          navigate(`/user/${userId}/settings`)
                        }}
                        cursor={"pointer"}
                      >
                        <FaCog  
                          color={'#345430'}  
                          size={20}
                        />
                      </Button>
                    </VStack>
                  </Flex>
                )}
              </div>
            )}
          </Box>
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeIn' }}
        style={{ backgroundColor: "#E0EAE0"}} 
      >
        <div style={{ overflowY: 'auto' }}>
          <UserPosts posts={[]} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserProfile;
