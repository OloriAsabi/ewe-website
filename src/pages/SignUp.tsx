import { useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Container,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ToastNotification from "../components/ToastNotification";
import { addUser, setLoginStatus, updateToken } from "../api/userSlice";
import ApiCall from "../api/api";
import FacebookLogin from "../components/FacebookLogin";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { IFormInputs } from "../types/interface";
import { FormInput, FormInputConfirmPassword, FormInputPassword, FormPhoneInput } from "../components";
import GoogleLogin from "../components/GoogleLogin";

const SignUp = () => {
  const { useSignUpMutation, } = ApiCall();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
    register,
    trigger,
    getValues
  } =  useForm<IFormInputs>({
    defaultValues: {
      email: "",
      username: "",
      name: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      role: "",
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({
    description: "",
    status: "",
  });
  const [signUpMutation] = useSignUpMutation();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    console.log("Data", data);
  
    const body = {
      name: data?.name,
      username: data?.username,
      email: data?.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      role: data.role,
    };
  
    try {  
      const response = await signUpMutation(body);
      console.log("response data: ", response);
  
      if ('data' in response) {
        // This is a success response
        const responseData = response.data.data; // Access the data property directly

        const { access_token } = responseData;

        if (access_token) {
          dispatch(updateToken(access_token));
        }
          
        const user = {
          name: responseData.name,
          username: responseData.username,
          email: responseData.email,
          password: responseData.password,
          phoneNumber: responseData.phoneNumber,
          role: responseData.role,
          id: responseData._id,
          about: "",
          field: "",
          confirmPassword: ""
        };

  
        setToastConfig({
          description: response.data.message || `${responseData.name} Signed In Successfully`,
          status: 'success',
        });
        setShowToast(true);       
        dispatch(setLoginStatus({ isLogin: true, user }));
        dispatch(addUser(user));
        navigate("/");
      } else if ('error' in response) {
        const responseData = response.error as { data?: { message?: string } }; // Type assertion to specify shape
        
        if (responseData.data && responseData.data.message) {
          // Check if 'responseData' has both 'data' and 'message' properties
          const errorMessage = responseData.data.message;
        
          setToastConfig({ description: errorMessage, status: 'error' });
          setShowToast(true);
        }
      }  
    } catch (error: any) {
      setToastConfig({ description: error.message, status: 'error' });
      setShowToast(true);
    }
  };

  return (
<Container
justifyContent="center"
alignItems="center"
paddingTop={20}
paddingBottom={20}
>
<motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
<Box p="4" bg="#E0EAE0" borderRadius={"20px"} minH="auto">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sign Up Page</title>
      </Helmet>
    <Text color="#345430" textAlign="center" fontSize="xl" fontWeight="bold">
        Sign Up
      </Text>
      <VStack spacing={4} paddingTop={10} align="center">
        <form style={{ width: "100%", padding: "20px"}}  onSubmit={handleSubmit(onSubmit)}>
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
                           <FormInput
                          name="name"
                          label="Name"
                          control={control}
                          register={register}
                          rules={{
                              required: 'Name is required',
                          }} 
                          errors={errors}
                          onKeyUp={() => {
                             trigger("name");
                          }}
                          />
               <FormInput
                          name="username"
                          label="Username"
                          control={control}
                          register={register}
                          rules={{
                              required: 'Username is required',
                              pattern: {
                                  value: /^[A-Za-z0-9_!@#$%^&*()-]+$/,
                                  message: 'Username must contain only letters, numbers, underscores, and symbols !@#$%^&*()-',
                              },
                              minLength: {
                                  value: 4,
                                  message: 'Username must be at least 4 characters',
                              },
                              maxLength: {
                                  value: 20,
                                  message: 'Username must be less than 20 characters',
                              },
                          }} 
                          onKeyUp={() => {
                            trigger("username");
                         }}
                          errors={errors}
                                    />
              <FormInputPassword
                          name="password"
                          label="Password"
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
                      <FormPhoneInput
                          name="phoneNumber"
                          label="Phone Number"
                          control={control}
                          register={register}
                          rules={{
                              pattern: {
                                  value: /^[0-9+\s()-]*$/,
                                  message: 'Invalid phone number',
                              },
                          }} 
                          errors={errors}       
                          onKeyUp={() => {
                            trigger("phoneNumber");
                         }}
                            />
            <Text>
            <a href="/forgot-password" 
            style={{ color: "#345430", 
            fontSize: "12px", 
            textDecoration:"underline",
             paddingTop: "10px",
             paddingBottom: "5px"  }}>Forgot Password?</a>
            </Text>
            <Text style={{ color: "#345430", 
            fontSize: "15px", 
           paddingTop: "5px",
           paddingBottom: "5px" }}>
            Already have an account <a href="/login" style={{ color: "#345430", fontSize: "12px", textDecoration:"underline" }}>Login</a>
            </Text>
            <Button
              isLoading={isSubmitting} 
              type='submit'
              loadingText="Signing up..."
              backgroundColor={'#345430'}
              color={'white'}
              size="lg"
              width={'full'}
              disabled={!isValid}
              marginTop={'10px'}  
              className="button_hover"
              >
              Sign Up
            </Button>
            <p style={{
            display: 'flex',
            flexDirection: "column",
            textAlign: "center",
            color: "#345430",
            marginTop:'10px'
          }}><span>Or</span> Continue with</p>
             <div 
              className="social-login-buttons"
              style={{
                marginTop:'10px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
              <GoogleLogin text={'Sign Up with Google'}/>
              <FacebookLogin text={'Sign Up with Facebook'}/>
              </div>
          {showToast && (
            <ToastNotification
              description={toastConfig.description}
              status={toastConfig.status}
              onClose={() => setShowToast(false)}
            />
          )}
        </form>
      </VStack>
    </Box>
    </motion.div>
    </Container>  
  )
}

export default SignUp