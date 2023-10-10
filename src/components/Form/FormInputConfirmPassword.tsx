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

interface FormConfirmPasswordProps {
  name: FieldPath<FieldValues>;
  label: string;
  control: any;
  register: any;
  rules: any;
  errors: FieldErrors<FieldValues>;
  rest?: any;
  onKeyUp?: () => void; 
}

const FormInputConfirmPassword: React.FC<FormConfirmPasswordProps> = ({
  name,
  label,
  control,
  register,
  rules,
  errors,
  onKeyUp,
  ...rest
}) => {
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState<'text' | 'password'>(
    'password'
  );

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility((prevVisibility) =>
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
          rules={rules}
          render={({ field, fieldState }) => (
            <Input
              {...register(name)}
              type={confirmPasswordVisibility}
              placeholder={`Confirm ${label}`}
              style={{
                color: '#345430',
                fontSize: '15px',
                borderRadius: '10px',
                border: '2px solid',
                borderColor: fieldState.invalid ? 'red' : '#345430',
              }}
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              {...field}
              autoComplete="true"
              {...rest}
              aria-label="Confirm Password"
              onKeyUp={onKeyUp} 
            />
          )}
        />
        <InputRightElement>
          <IconButton
            icon={confirmPasswordVisibility === 'password' ? <FaEyeSlash /> : <FaEye />}
            onClick={toggleConfirmPasswordVisibility}
            variant="ghost"
            aria-label={
              confirmPasswordVisibility === 'password' ? 'Hide password' : 'Show password'
            }
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

export default FormInputConfirmPassword;
