import { Box, Container, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import SearchInput from "../components/SearchInput";
import FilterComponent from "../components/FilterComponent";
import SortComponent from "../components/SortComponent";
import { useParams } from "react-router";
import { AllPosts } from "../components";

const Posts = () => {
    const { userId } = useParams();

    console.log("User Id: ", userId);
    
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  const handleFilterChange = (selectedFilter: string) => {
    // Handle filter change logic here
    console.log("Selected Filter:", selectedFilter);
  };

  const handleSortChange = (selectedSort: string) => {
    // Handle sort change logic here
    console.log("Selected Sort:", selectedSort);
  };

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
        <title>Post Page</title>
      </Helmet>
      <Container paddingTop={20} paddingBottom={20}>
      <Box
        backgroundColor="#E0EAE0"
        padding={4}
        display={'flex'}
        flexDirection={{ base: "column" }}
        justifyContent="space-between"
        alignItems="center"
        gap={10}
      >
       <SearchInput backgroundColor="#FFF" onSearch={handleSearch} />
        <Flex
         display={'flex'}
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ base: "column", md: "row" }}
          gap={"10"}
        >
          <FilterComponent onFilterChange={handleFilterChange} filterOptions={[]} />
          <SortComponent onSortChange={handleSortChange} />
        </Flex>
        {/* <Text>Post</Text> */}
        </Box>
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeIn' }}
        style={{ backgroundColor: "#E0EAE0"}} 
      >
        <div style={{ overflowY: 'auto' }}>
          <AllPosts posts={[]} />
        </div>
      </motion.div>
      </Container>
    </motion.div>
  );
};

export default Posts;
