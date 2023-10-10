// api.tsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectAccessToken } from './userSlice';
import { RootState } from '../types/interface';

const BASE_URL = 'https://ewe-api.herokuapp.com/api/auth/';

const ApiCall = () => {
  const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
      baseUrl: BASE_URL,
      mode: 'no-cors', 
      prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState | undefined;
        const accessToken = state ? selectAccessToken(state) : '';
        if (accessToken) {
          headers.set('Authorization', `Bearer ${accessToken}`);
        }
        headers.set('Content-Type', 'application/json');
        headers.set('Access-Control-Allow-Origin', '*');
      },
    }),
    tagTypes: ['SignIn', 
    'SignUp', 
    'ForgotPassword', 
    'Update', 
    'UserProfile', 
    'AccessToken', 
    'ResetPassword', 
    "ChangePassword", 
    "Google", 
    "Facebook",
    "Logout"],
    endpoints: (builder) => ({
      signIn: builder.mutation({
        query: (credentials) => ({
          url: 'signin',
          method: 'POST',
          body: credentials,
          providesTags: ['SignIn'],
          defer: true, 
        }),
        onQueryStarted: (body) => {
          console.log('Sign In Request Body:', body);
        },
      }),
      signUp: builder.mutation({
        query: (userInfo) => ({
          url: 'signup',
          method: 'POST',
          body: userInfo,
          providesTags: ['SignUp'],
          defer: true, 
        }),
        onQueryStarted: (body) => {
          console.log('Sign Up Request Body:', body);
        },
      }),

      resetPassword: builder.mutation({
        query: (resetInfo) => ({
          url: 'resetpassword',
          method: 'POST',
          body: resetInfo,
          providesTags: ['ResetPassword'],
          defer: true, 
        }),
        onQueryStarted: (body) => {
          console.log('Reset Password :', body);
        },
      }),    
      changePassword: builder.mutation({
        query: (password) => ({
          url: 'changepassword', // Replace 'forgot-password' with the actual API endpoint for forgot password
          method: 'POST',
          body: { password },
          providesTags: ['ChangePassword'],
          defer: true, 
        })
      }),
       subscribeToNewsletter: builder.mutation({
        query: (email) => ({
          url: 'subscribe-to-newsletter', // Replace 'subscribe-to-newsletter' with the actual API endpoint for subscribing to the newsletter
          method: 'POST',
          body: { email },
          providesTags: ['SubscribeToNewsletter'],
          defer: true,
        }),
      }),
    }),
  });

  // Export the created hooks/selectors from the apiSlice
  const { 
    useSignInMutation, 
    useSignUpMutation, 
    useSubscribeToNewsletterMutation,
    useChangePasswordMutation,
    useResetPasswordMutation } = apiSlice;


  const selectSignInResult = apiSlice.endpoints.signIn.select('');
  const selectSignUpResult = apiSlice.endpoints.signUp.select('');

  // Export the selector for signed-in user
  const selectSignedInUser = (state: any) => {
    const signInData = selectSignInResult(state).data;
    const signUpData = selectSignUpResult(state).data;
    return signInData || signUpData;
  };

  // Return the created hooks/selectors as an object
  return {
    useSignInMutation,
    useSignUpMutation,
    useSubscribeToNewsletterMutation,
    selectSignedInUser,
    apiSlice,
    useChangePasswordMutation,
    useResetPasswordMutation,
  };
};
export default ApiCall;