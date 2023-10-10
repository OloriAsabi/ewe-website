import Marquee from "react-fast-marquee";
import companyLogos from "../data/companyLogos";
import { Text } from "@chakra-ui/react";

const Sponsors = () => {
  return (
    <div>
    <Text
     fontSize="25px"
    fontWeight="500"
    color="#345430"
    fontFamily='Inter'
    textAlign="center"
    padding='10px'>Sponsored By</Text>
      <Marquee direction="left" speed={50}>
      {companyLogos.map((logo) => (
          <img
            key={logo.index}
            src={logo.path}
            alt={`Sponsor ${logo.index}`}
            style={{ 
            margin: "20px",
            width: "100px", 
            height: "100px", 
            objectFit:"cover", 
            backgroundSize: "cover",
            borderRadius: '10px' }}
          />
        ))}
      </Marquee>
      </div>
  );
};

export default Sponsors;
