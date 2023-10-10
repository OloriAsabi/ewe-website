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
import { FormInputConfirmPassword, FormInputPassword } from "../components";

const ResetPassword: React.FC = () => {
  const { control, handleSubmit,  formState: { errors, isValid, isSubmitting }, register, getValues, trigger } =
  useForm<UserData>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({ description: "", status: "" });

  const resetPassword: SubmitHandler<UserData> = (data) => {
    console.log("Resetting password with: ", data);

    // Simulate successful password reset
    setToastConfig({ description: "Password reset successfully!", status: "success" });
    setShowToast(true);
  };
  
  return (
    <Container
    display={'flex'}
    justifyContent="center" 
    height={'100vh'} 
    alignItems="center" 
    paddingBottom={20}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
    <Box p="14" bg="#E0EAE0"  width={'50vw'} borderRadius={"20px"} minH="auto">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Reset Password Page</title>
      </Helmet>
      <Text color="#345430" textAlign="center" fontSize="xl" fontWeight="bold">
        Reset Password
      </Text>
      <form onSubmit={handleSubmit(resetPassword)}>
      <FormInputPassword
                          name="password"
                          label="New Password"
                          control={control}
                          register={register}
                          rules={{
                              required: 'Password is required',
                              pattern: {
                                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.!@#$%^&*])[A-Za-z\d.!@#$%^&*]{8,20}$/,
                                  message: 'Password must have a capital letter, a small letter, a number, and a symbol (e.g., .!@#$%^&*)',
                              },
                              minLength: {
                                  value: 8,
                                  message: 'Password must be at least 8 characters',
                              },
                              maxLength: {
                                  value: 20,
                                  message: 'Password must be less than 20 characters',
                              },
                          }}
                          errors={errors}
                                onKeyUp={() => {
                             trigger("password");
                          }}
                          />

                        <FormInputConfirmPassword
                          name="confirmPassword"
                          label="Confirm Password"
                          control={control}
                          register={register}
                          rules={{
                              required: 'Please confirm your password',
                              validate: (value: any) => value === getValues('password') || 'Passwords do not match',
                          }}
                          errors={errors}
                          onKeyUp={() => {
                            trigger("confirmPassword");
                         }}
                         />
            <Button
              isLoading={isSubmitting} 
              type='submit'
              loadingText="Creating a new password..."
              backgroundColor={'#345430'}
              color={'white'}
              size="lg"
              disabled={!isValid}
              marginTop={'10px'}
            >
              Reset Password
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

export default ResetPassword;
