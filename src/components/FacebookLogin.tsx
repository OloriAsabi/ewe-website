import { Box, Button, Image } from '@chakra-ui/react';
import facebook from '../assets/facebook.png';
import { useState } from 'react';
import ToastNotification from './ToastNotification';
import { useGetFaceBookSignInQuery } from '../api/apiGet';

interface FacebookLoginButtonProps {
  text: string;
}

const FacebookLogin: React.FC<FacebookLoginButtonProps> = ({ text }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({
    description: '',
    status: '',
  });

  // Call the hook directly within the component
  const { data, isSuccess } = useGetFaceBookSignInQuery({}, { skip: true });

  const handleFacebookLoginClick = async () => {
    try {
      if (isSuccess && data) {
        const loginUrl = data.data; // Use the data from the hook

        console.log("Facebook Sign In:", loginUrl);
        setToastConfig({
          description: "Login Successfully",
          status: "success"
        });
        setShowToast(true);
      }
    } catch (error) {
      console.error("Error fetching Facebook login URL:", error);
    }
  };

  return (
    <Box>
      <Button
        onClick={handleFacebookLoginClick}
        color="#345430"
        size="lg"
        leftIcon={<Image
          style={{
            width: "30px",
            height: "30px"
          }}
          src={facebook}
          alt="Facebook Icon"
        />}
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

export default FacebookLogin;
