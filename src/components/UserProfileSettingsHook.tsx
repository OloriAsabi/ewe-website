// UserProfileSettingsHook.ts
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from '../api/userApi';
import { useNavigate } from "react-router-dom";
import { updateUser } from '../api/userSlice';
import { useDispatch } from 'react-redux';
import { User } from '../types/interface';
import { Update } from '@reduxjs/toolkit';

export const useUserProfileSettings = (userId: string) => {
  const { data, isLoading, isError } = useGetUserProfileQuery(userId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({
    description: "",
    status: "",
  });
  
  const [updateUserProfile] = useUpdateUserProfileMutation();

  const { handleSubmit, control, formState: { errors, isValid, isSubmitting }, register, trigger, getValues, setValue } = useForm<User>({
    defaultValues: { // Provide default values for your form fields here
      name: '',
      username: '',
      about: '',
      phoneNumber: '',
      field: '',
    },
  });

  useEffect(() => {
    if (data) {
      setValue('name', data.name);
      setValue('username', data.username);
      setValue('about', data.about || '');
      setValue('phoneNumber', data.phoneNumber || '');
      setValue('field', data.field || '');
    }
  }, [data, setValue]);

  const onSubmit: SubmitHandler<User> = async (formData) => {
    console.log("Form Data: ", formData)

    const body= {
        name: formData.name,
        username: formData.username,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        role: formData.field,
        about: formData.about,
      }
    
    try {
      const updatedProfile = await updateUserProfile({
        userId,
        profileData: body,
      });
      console.log("Profile Update: ", updatedProfile);
      
      if ('data' in updatedProfile) {
        const responseData = updatedProfile.data.data; 

        const user:  Update<User> = {
            id: responseData.profile?.user, // Include the user ID to identify which user to update
            changes: {
                about: responseData?.profile?.about,
                field: responseData.profile?.field || formData.field,
                username: formData.username,
                phoneNumber: formData.phoneNumber,
                name: formData.name
            },
        };
        setToastConfig({
            description: responseData.message,
            status: 'success',
          });
          setShowToast(true);       
         dispatch(updateUser(user));          
        navigate(`/user/${userId}`);
        
      }
      else if ('error' in updatedProfile) {
        const responseData = updatedProfile.error as { data?: { message?: string } }; // Type assertion to specify shape
        
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

  return {
    data,
    isLoading,
    isError,
    handleSubmit,
    control,
    errors,
    isValid,
    isSubmitting,
    register,
    trigger,
    getValues,
    onSubmit,
    showToast,
    toastConfig,
    setToastConfig,
    setShowToast
  };
};
