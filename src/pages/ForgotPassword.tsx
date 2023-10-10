import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Container,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserData } from "../types/interface";
import { Helmet } from "react-helmet";
import ToastNotification from "../components/ToastNotification";
import { motion } from "framer-motion";
import { FormInput } from "../components";
import ApiCall from "../api/api";
import { useNavigate } from "react-router";

const ForgotPassword: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    register,
    trigger,
  } = useForm<UserData>({
    defaultValues: {
      email: "",
    },
  });

  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({ description: '', status: '' });
  const { useResetPasswordMutation } = ApiCall();
  const navigate = useNavigate();

  const [resetPasswordMutation] = useResetPasswordMutation();

  const forgotPassword: SubmitHandler<UserData> = async (data) => {
    console.log('Resetting password with: ', data);
     const body = {
      email: data.email,
    };

    try {

      const response = await resetPasswordMutation(body)
      console.log('Reset Password: ',response);
      if ("data" in response) {
        const responseData = response.data.data.message;
        
        setToastConfig({
          description: responseData || 'Check your email for instructions to reset the password',
          status: 'success',
        });
        setShowToast(true);        
        navigate("/reset-password");
      } else if ('error' in response) {
        const responseData = response.error as { data?: { message?: string } };
        
        if (responseData.data && responseData.data.message) {
          const errorMessage = responseData.data.message;
        
          setToastConfig({ description: errorMessage, status: 'error' });
          setShowToast(true);
        }
      }    
    } catch (error) {
      console.error("Error resetting password:", error);
      setToastConfig({ description: "Error resetting password:", status: 'error' });
      setShowToast(true);
    }
  };

  return (
    <Container
      display="flex"
      flexDirection={'column'}
      justifyContent="center"
      height={'100vh'}
      alignItems="center"
      paddingBottom={20}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Box p="14" bg="#E0EAE0" width={'50vw'} borderRadius="20px" minH="auto">
          <Helmet>
            <meta charSet="utf-8" />
            <title>Forgot Password Page</title>
          </Helmet>
          <Text color="#345430" textAlign="center" fontSize="xl" fontWeight="bold">
            Forgot Password
          </Text>
          <form onSubmit={handleSubmit(forgotPassword)}>
            <FormInput
              name="email"
              label="Email"
              control={control}
              register={register}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              errors={errors}
              onKeyUp={() => {
                trigger("email");
              }}
              aria-label="Email"
            />
            <Button
              type="submit"
              isLoading={isSubmitting}
              loadingText="Sending email..."
              backgroundColor="#345430"
              color="white"
              size="lg"
              width={'full'}
              disabled={!isValid}
              marginTop="10px"
            >
              Forgot Password
            </Button>
          </form>
          {showToast && (
            <ToastNotification
              description={toastConfig.description}
              status={toastConfig.status as any}
              onClose={() => setShowToast(false)}
            />
          )}
        </Box>
      </motion.div>
    </Container>
  );
};

export default ForgotPassword;
