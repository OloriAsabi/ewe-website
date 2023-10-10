import React, { useState } from "react";
import {
  Box,
  Button,
  Image,
} from "@chakra-ui/react";
import ToastNotification from "../components/ToastNotification";
import goggle from '../assets/google.png'
import { useGetGoogleSignInQuery } from "../api/apiGet";

interface GoogleLoginProps {
  text: string;
}

const GoogleLogin: React.FC<GoogleLoginProps> = ({ text }) => {
  const { data, isSuccess } = useGetGoogleSignInQuery({}, { skip: true });

  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({
    description: '',
    status: '',
  });

  const handleGoogleLoginClick = async () => {
    try {
      if (isSuccess && data) {
        const loginUrl = await data.data;
        const isError = data.isError;
        console.log("Is Error: ", isError);

        if (loginUrl) {
          console.log("Google Sign In:", loginUrl);
          setToastConfig({
            description: "Login Successfully",
            status: "success"
          });
          setShowToast(true);
        } else {
          // Handle the case where the login URL is not available
          console.error("Login URL not found in response");
        }
      }
    } catch (error) {
      console.error("Error fetching Google login URL:", error);
    }
  };

  return (
    <Box>
      <Button
        onClick={handleGoogleLoginClick}
        color="#345430"
        size="lg"
        leftIcon={<Image
          style={{
            width: "20px",
            height: "20px"
          }}
          src={goggle} 
        alt="Google Icon" />} 
        width={'full'} 
      >
        {text}
      </Button>
      {showToast && (
        <ToastNotification
          description={toastConfig.description}
          status={toastConfig.status}
          onClose={() => setShowToast(false)}
        />
      )}
    </Box>
  );
};

export default GoogleLogin;
