import React from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import VerificationInput from "react-verification-input";

interface IFormInputs {
  verificationCode: string;
}

const Verification: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
  } = useForm<IFormInputs>();

  const onSubmit = (data: IFormInputs) => {
    // Implement your verification logic here
    console.log("Verification data:", data);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Ewe Verification Page</title>
        </Helmet>
        <Box p="4" bg="#E0EAE0" borderRadius="20px" minH="100vh">
          <Box className="container">
            <Box as="h2" fontSize="2xl" fontWeight="bold">
              Enter Verification Code
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <FormControl
                  className={`verification-container ${
                    errors.verificationCode ? "error" : ""
                  }`}
                  isInvalid={!!errors.verificationCode}
                >
                  <FormLabel>Verification Code</FormLabel>
                  <Controller
                    name="verificationCode"
                    control={control}
                    rules={{
                      required: "Verification code is required",
                    }}
                    render={({ field }) => (
                      <VerificationInput
                        length={4}
                        validChars="0-9"
                        placeholder=""
                        autoFocus
                        inputProps={{
                          className: "verification-input",
                          ...field,
                        }}
                        containerProps={{
                          className: "verification-container",
                        }}
                        classNames={{
                          character: "verification-character",
                          characterInactive:
                            "verification-character--inactive",
                          characterSelected:
                            "verification-character--selected",
                        }}
                        onChange={(value) => {
                          // Set the verification code value in the form state
                          setValue("verificationCode", value);
                        }}
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.verificationCode && errors.verificationCode.message}
                  </FormErrorMessage>
                </FormControl>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button
                  isLoading={isSubmitting}
                  type="submit"
                  loadingText="Submitting..."
                  backgroundColor={"#345430"}
                  color={"white"}
                  size="lg"
                  disabled={!isValid}
                  marginTop={"10px"}
                >
                  Submit
                </Button>
              </motion.div>
            </form>
          </Box>
        </Box>
      </Container>
    </motion.div>
  );
};

export default Verification;
