import { Link, VStack } from '@chakra-ui/react';
import {
  FiMail,
  FiTwitter,
  FiLinkedin,
  FiFacebook
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon

const Socials = () => {
  return (
    <VStack spacing={10} alignItems="center" mt={4} flexDirection={'row'}>
      <Link
        href="mailto:eweapplication@gmail.com"
        target="_blank"
        _hover={{ textDecoration: 'none', color: "#345430" }}
      >
        <FiMail size={24} style={{ cursor: 'pointer' }} 
        />
      </Link>
      <Link
        target="_blank"
        rel="noreferrer"
        href="https://www.facebook.com/profile.php?id=61550896310085"
        _hover={{ textDecoration: 'none', color: "#345430" }} 
      >
        <FiFacebook size={24} style={{ cursor: 'pointer' }} />
      </Link>
      <Link
        target="_blank"
        rel="noreferrer"
        href="https://twitter.com/eweapplication?s=21&t=Lmk7vy6yzcKN9knaF3h1Eg"
        _hover={{ textDecoration: 'none', color: "#345430" }}
      >
        <FiTwitter size={24} style={{ cursor: 'pointer' }} />
      </Link>
      <Link
        target="_blank"
        rel="noreferrer"
        href="https://www.linkedin.com/in/ashabilateefatoduntan/"
        _hover={{ color: "#345430" }}
      >
        <FiLinkedin size={24} style={{ cursor: 'pointer' }} />
      </Link>
      <Link
        href="https://api.whatsapp.com/send?phone=YOUR_PHONE_NUMBER"
        target="_blank"
        rel="noreferrer"
        _hover={{ textDecoration: 'none', color: "#345430" }}
      >
        <FaWhatsapp size={24} style={{ cursor: 'pointer' }} />
      </Link>
    </VStack>
  );
};

export default Socials;
