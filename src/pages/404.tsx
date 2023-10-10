import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import bg from "../assets/Background.jpg"

const ErrorPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>404 Page</title>
      </Helmet>
      <Box
          bg="white"
          backgroundImage={bg}
          backgroundSize="cover"
          backgroundPosition="center"
          color="#345430"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection={'column'}
          height={'100vh'}
      >
        <h1
          style={{
            fontSize: "4rem", // Adjust font size
            marginBottom: "20px",
          }}
        >
          Oops! Page not found
        </h1>
        <p
          style={{
            fontSize: "1.5rem", // Adjust font size
          }}
        >
          The page you are looking for might be under construction or does not
          exist.
        </p>
        <Link
          to="/"
          style={{
            marginTop: "20px",
            textDecoration: "none",
            padding: "10px 20px",
            backgroundColor: "#345430", // Button background color
            color: "#fff", // Button text color
            borderRadius: "5px",
            fontSize: "1.2rem", // Button font size
            fontWeight: "bold",
            transition: "background-color 0.3s ease",
          }}
        >
          Go back to home
        </Link>
      </Box>
    </motion.div>
  );
};

export default ErrorPage;
