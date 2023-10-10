// FormInputPassword.tsx
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { Controller, FieldValues, FieldPath, FieldErrors } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface FormInputProps {
  name: FieldPath<FieldValues>;
  label: string;
  control: any;
  register: any;
  rules: any;
  errors: FieldErrors<FieldValues>;
  rest?: any;
  onKeyUp?: () => void; // Add the onKeyUp prop here
}

const FormInputPassword: React.FC<FormInputProps> = ({
  name,
  label,
  control,
  register,
  rules,
  errors,
  onKeyUp, // Include onKeyUp in the destructuring
  ...rest
}) => {
  const [passwordVisibility, setPasswordVisibility] = useState<'text' | 'password'>('password');

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevVisibility) =>
      prevVisibility === 'password' ? 'text' : 'password'
    );
  };

  const errorMessage = errors[name]?.message;

  return (
    <FormControl isInvalid={!!errorMessage}>
      <FormLabel paddingTop={'10px'} paddingBottom={'10px'}>
        {label}
      </FormLabel>
      <InputGroup>
        <Controller
          name={name}
          control={control}
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
          render={({ field, fieldState }) => (
            <Input
              {...register(name)}
              type={passwordVisibility}
              placeholder={`Enter ${label}`}
              style={{
                color: '#345430',
                fontSize: '15px',
                borderRadius: '10px',
                border: '2px solid',
                borderColor: fieldState.invalid ? 'red' : '#345430',
              }}
              {...field}
              autoComplete="true"
              {...rest}
              aria-label="Password"
              onKeyUp={onKeyUp} // Pass the onKeyUp handler to the Input element
            />
          )}
        />
        <InputRightElement>
          <IconButton
            icon={passwordVisibility === 'password' ? <FaEyeSlash /> : <FaEye />}
            onClick={togglePasswordVisibility}
            variant="ghost"
            aria-label={passwordVisibility === 'password' ? 'Hide password' : 'Show password'}
            style={{ color: '#345430', backgroundColor: 'transparent' }}
          />
        </InputRightElement>
      </InputGroup>
      {typeof errorMessage === 'string' ? (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};

export default FormInputPassword;
