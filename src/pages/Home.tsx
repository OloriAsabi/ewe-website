import { Container } from "@chakra-ui/react";
import { motion } from "framer-motion"; // Import motion

import { FooterBox, Header, HomeCollections, Sponsors, SubscribeToNewsletter, UserLocation } from "../components";
import { Helmet } from "react-helmet";
import { selectIsAuthenticated } from "../api/userSlice";
import { useSelector } from "react-redux";

function Home() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const renderUserLocation = isAuthenticated && <UserLocation />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
    >
        <Helmet>
        <meta charSet="utf-8" />
        <title>Home Page</title>
      </Helmet>
      <Header />
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
    >
    <HomeCollections posts={[]}/>
    </motion.div>
      <motion.div
        style={{ backgroundColor: "#fafafa" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
      >
        <Container>
          <div style={{ marginBottom: "20px", paddingTop: "20px" }}>
            <FooterBox />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <Sponsors />
          </div>
          <div style={{ paddingTop: "20px" }}>
            <SubscribeToNewsletter />
          </div>
          {renderUserLocation}
        </Container>
      </motion.div>
    </motion.div>
  );
}

export default Home;
