import {
  Box,
  Button,
  Text,
  Container,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useParams } from "react-router-dom";
import { FormInput, FormInputConfirmPassword, FormInputPassword, FormPhoneInput, FormSelectOption } from '../components';
import { useUserProfileSettings } from '../components/UserProfileSettingsHook';
import FormTextarea from '../components/Form/FormTextarea';
import ToastNotification from '../components/ToastNotification';
import { Helmet } from 'react-helmet';

const UserProfileSettings = () => {
  const { userId } = useParams();
  const {
    handleSubmit,
    control,
    errors,
    isValid,
    isSubmitting,
    register,
    getValues,
    onSubmit,
    trigger,
    showToast,
    toastConfig,
    setShowToast
  } = useUserProfileSettings(userId || 'defaultUserId');

  return (
    <Container justifyContent="center" alignItems="center" paddingTop={20} paddingBottom={20}>
      <Box p="10" bg="#E0EAE0" borderRadius={'20px'} minH="auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeIn' }}
        >
        <Helmet>
        <meta charSet="utf-8" />
        <title>User Settings Page</title>
      </Helmet>
          <Text fontSize="xl" textAlign="center" fontWeight="bold" mb={4}>
            User Account Settings
          </Text>
          <form style={{ width: '100%', padding: '20px' }} onSubmit={handleSubmit(onSubmit)}>
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

                        <FormTextarea
                          name="about"
                          label="About"
                          control={control}
                          register={register}
                          rules={{
                              required: 'About is required',
                              maxLength: {
                                  value: 200,
                                  message: 'About must be less than 200 characters',
                              },
                          }}
                          errors={errors}
                          onKeyUp={() => {
                            trigger("about");
                         }}
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
                            <FormSelectOption
                            name="field"
                            label="Field"
                            control={control}
                            register={register}
                            rules={{ required: "Please select a field" }}
                            errors={errors}
                            options={[
                                { value: "herbalist", label: "Babalawo/Iyanifa" },
                                { value: "onisegun", label: "Onisegun/Herbalist" },
                                { value: "adahunse", label: "Adahunse/Researcher" },
                                { value: "dokita", label: "Dokita/Medical Doctor" },
                                { value: "nurse", label: "Nurse" },
                                { value: "pharmarcy", label: "Pharmacist" },
                                { value: "student", label: "Student" },
                                { value: "other", label: "Others..." },
                            ]}
                            onKeyUp={() => {
                              trigger("field");
                           }}
                            />
                                     {/* <FormSelectOption
                            name="role"
                            label="Role"
                            control={control}
                            register={register}
                            rules={{ required: "Please select a Role" }}
                            errors={errors}
                            options={[
                                { value: "user", label: "User" },
                                { value: "specialist", label: "Specialist" }
                            ]}
                            onKeyUp={() => {
                              trigger("role");
                           }}
                             /> */}

            <Button
              type="submit"
              mt={6}
              bg="#345430"
              color={'white'}
              isLoading={isSubmitting}
              loadingText="Saving..."
              size="lg"
              width={'full'}
              disabled={!isValid}
              marginTop={'10px'}
              className="button_hover"
            >
              Save Changes
            </Button>
            {showToast && (
            <ToastNotification
              description={toastConfig.description}
              status={toastConfig.status}
              onClose={() => setShowToast(false)}
            />
          )}
          </form>
        </motion.div>
      </Box>
    </Container>
  );
};

export default UserProfileSettings;
