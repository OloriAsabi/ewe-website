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
import { User, UserData } from "../types/interface";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { FormInput, FormInputPassword } from "../components";
import GoogleLogin from "../components/GoogleLogin";

const Login = () => {
  const { useSignInMutation } = ApiCall();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
    register,
    trigger,
  } =  useForm<UserData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({
    description: "",
    status: "",
  });
  const [signInMutation] = useSignInMutation();


  const loginUser: SubmitHandler<UserData> = async (data) => {
    console.log("Data: ", data)
    const body = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await signInMutation(body);
      console.log("response data: ", response);
  
      if ("data" in response) {
        const responseData = response.data.data; // Access the data property directly
        const responseMessage = response.data.message; 

        const { access_token } = responseData;

        if (access_token) {
          dispatch(updateToken(access_token));
        }
          
        const user: User = {
          email: responseData.user.email,
          password: responseData.user.password,
          name: responseData.user.name,
          username: "",
          phoneNumber: "",
          role: "",
          id: responseData.user.id,
          field: "",
          about: "",
          confirmPassword: ""
        };
        console.log("login User: ", user);
      
        setToastConfig({
          description: responseMessage || `${responseData.user.name} Logged In Successfully`,
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
    }  catch (error: any) {
      // setToastConfig({
      //   description: 'An unexpected error occurred or no error message is available.',
      //   status: 'error',
      // });
      // setShowToast(true);
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
  <Box p="4" bg="#E0EAE0" borderRadius={"20px"} minH="auto" width={'100%'}>
  <Helmet>
        <meta charSet="utf-8" />
        <title>Login Page</title>
      </Helmet>
      <Text color="#345430" textAlign="center" fontSize="xl" fontWeight="bold">
        Login
      </Text>
        <VStack spacing={4} paddingTop={10} align="center">
          <form style={{ width: "100%", padding: "20px"}} onSubmit={handleSubmit(loginUser)}>
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

              <Text>
              <a href="/forgot-password" 
              style={{ color: "#345430", 
              fontSize: "12px", 
              textDecoration:"underline",
              paddingTop: "20px",
              paddingBottom: "10px"  }}>Forgot Password?</a>
              </Text>
              <Text style={{ color: "#345430", 
              fontSize: "15px", 
            paddingTop: "10px",
            paddingBottom: "10px" }}>
              Don’t have an account? <a href="/signup" style={{ color: "#345430", fontSize: "12px", textDecoration:"underline" }}>Sign up</a>
              </Text>
              <Button
                isLoading={isSubmitting} 
                type='submit'
                loadingText="Logging in..."
                backgroundColor={'#345430'}
                color={'white'}
                size="lg"
                width={'full'}
                disabled={!isValid}
                marginTop={'10px'}
              >
                Login
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
                gap: '20px',
                justifyContent:'center',
                alignItems: "center"
              }}>
              <GoogleLogin text={'Login with Google'}/> 
              <FacebookLogin  text={'Login with Facebook'}/>
              </div>
             {/* {loading && <Loader />}  */}
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
  );
};

export default Login;
