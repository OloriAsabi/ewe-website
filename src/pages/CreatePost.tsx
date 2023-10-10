import React, { useState } from "react";
import {
  Container,
  Text,
  Select,
  Button,
  Textarea,
  Input,
  Box,
  Flex,
  Image,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../types/interface";
import { filterOptions } from "../data/filterType";
import { AiOutlineCloudUpload } from "react-icons/ai"; // Import the Cloud Upload icon
import { MdDelete } from "react-icons/md"; // Import the Delete icon
import Loader from "../components/Loader";

const CreatePost = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.language);

  // State for form inputs
  const [postContent, setPostContent] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [postName, setPostName] = useState<string>("");
  const [otherNames, setOtherNames] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [imageAsset, setImageAsset] = useState<string | null>(null);
  const [wrongImageType, setWrongImageType] = useState<boolean>(false);

  const handlePostSubmit = () => {
    // Handle post submission logic here
    // ...

    // Clear form fields after submission
    setPostContent("");
    setSelectedLanguage("");
    setDescription("");
    setPostName("");
    setOtherNames("");
  };
  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
  
    if (
      selectedFile &&
      (selectedFile.type === "image/png" ||
        selectedFile.type === "image/svg" ||
        selectedFile.type === "image/jpeg" ||
        selectedFile.type === "image/gif" ||
        selectedFile.type === "image/tiff")
    ) {
      // For example, if you want to preview the image:
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const imageUrl = event.target.result as string; // Type assertion
          console.log("Image URL:", imageUrl);
          // Set the imageUrl as the imageAsset state variable
          setImageAsset(imageUrl);
        }
      };
      reader.readAsDataURL(selectedFile);
    } else {
      // Handle the case where the selected file is not an allowed image type
      setLoading(false);
      setWrongImageType(true);
    }
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
        <title>Create Post Page</title>
      </Helmet>
      <Container fontFamily="Inter" paddingTop={20} pb={20}>
        <Heading
               fontFamily="Inter"
               as="h4"
               color="#345430"
               textAlign="justify">
                Create Post</Heading>
      <VStack spacing={10} align="center" mt={5} mb={5}>
      <Flex
          justify="center"
          align="center"
          flexDirection="column"
          borderWidth="2px"
          borderStyle="dotted"
          borderColor="gray.300"
          p={5}
          w="full"
          h="500px"
        >
          {loading && <Loader />}
          {wrongImageType && <Text>It's the wrong file type.</Text>}
          {!imageAsset ? (
            <label>
              <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Box>
                  <AiOutlineCloudUpload size="48px"  color="#345430"/>
                </Box>
                <Text fontSize="lg">Click to upload</Text>
              </Flex>
              <Text mt="32px" color="gray.300">
                Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF, or TIFF less than 20MB
              </Text>
              <Input
                type="file"
                name="upload-image"
                onChange={uploadImage}
                accept="image/png, image/svg, image/jpeg, image/gif, image/tiff"
                display="none"
              />
            </label>
          ) : (
            <Box position="relative" h="full">
              <Image
                src={imageAsset}
                alt="uploaded-pic"
                h="full"
                w="full"
              />
              <Button
                type="button"
                position="absolute"
                bottom="3"
                right="3"
                p="3"
                rounded="full"
                bg="white"
                fontSize="xl"
                cursor="pointer"
                outline="none"
                _hover={{ boxShadow: "md" }}
                onClick={() => setImageAsset(null)}
              >
                <MdDelete color={'red'}/>
              </Button>
            </Box>
          )}
        </Flex>
        <Select
          placeholder={
            language === "en"
              ? "Select Category..."
              : 'Iru Nkan Ti E Fe...'
          }
          value={otherNames}
          onChange={(e) => setOtherNames(e.target.value)}
          backgroundColor="#fff"
          borderColor={"#345430"}
          fontFamily="Inter"
          fontSize="20px" 
          _focus={{ borderColor: "#345430" }}
          width={"100%"}
          height={"60px"}
        >
          {filterOptions.map((option) => (
            <option key={option.id} value={typeof option.type === "string" ? option.type :  option.type['en'] ||  option.type['yo'] }>
              <Flex align="center" textTransform={'capitalize'} justifyContent={'space-between'}>
                <Image
                  src={option.icon}
                  boxSize="100px"
                  p={10}
                />
                {typeof option.type === "string" ? option.type : option.type['en'] ||  option.type['yo']  }
              </Flex>
            </option>
          ))}
        </Select>
        <Input
      placeholder={
        language === "en"
          ? "Name..."
          : 'Oruko...'
      }
          value={postName}
          onChange={(e) => setPostName(e.target.value)}
          backgroundColor="#fff"
          borderColor={"#345430"}
          fontFamily="Inter"
          fontSize="20px"
          _focus={{ borderColor: "#345430" }}
          width={"100%"}
          height={"60px"}
        />
        <Input
          placeholder={
            language === "en"
              ? "Other Names..."
              : 'Oruko Miran...'
          }
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          borderColor={"#345430"}
          fontFamily="Inter"
          fontSize="20px"
          _focus={{ borderColor: "#345430" }}
          width={"100%"}
          height={"60px"}
        />
        <Textarea
          placeholder={
            language === "en"
              ? "Description..."
              : 'Apejuwe re...'
          }
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          backgroundColor="#fff"
          borderColor={"#345430"}
          fontFamily="Inter"
          fontSize="20px"
          _focus={{ borderColor: "#345430" }}
          width={"100%"}
          height={"200px"}
        />
        <Textarea
         placeholder={
          language === "en"
            ? "Uses..."
            : 'Iwulo re...'
        }
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          backgroundColor="#fff"
          borderColor={"#345430"}
          fontFamily="Inter"
          fontSize="20px"
          _focus={{ borderColor: "#345430" }}
          width={"100%"}
          height={"200px"}
        />
        </VStack>
        <Button
                  // isLoading={isSubmitting} 
                  type='submit'
                  loadingText="Posting..."
                  backgroundColor={'#345430'}
                  color={'white'}
                  size="lg"
                  width={'full'}
                  // disabled={!isValid}
                  marginTop={'10px'}
                   onClick={handlePostSubmit}>
                    Submit</Button>
      </Container>
    </motion.div>
  );
};

export default CreatePost;
