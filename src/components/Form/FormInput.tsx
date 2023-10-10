import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Controller, FieldValues, FieldPath, FieldErrors } from 'react-hook-form';

interface FormInputProps {
  name: FieldPath<FieldValues>;
  label: string;
  control: any;
  register: any;
  rules: any;
  type?: string;
  errors: FieldErrors<FieldValues>; // Update the prop type here
  rest?: any;
  onKeyUp?: () => void; // Add the onKeyUp prop here

}

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  control,
  register,
  rules,
  type = 'text',
  errors,
  onKeyUp, 
  ...rest
}) => {
  const errorMessage = errors[name]?.message;

  return (
    <FormControl isInvalid={!!errorMessage}>
      <FormLabel paddingTop={'10px'} paddingBottom={'10px'}>
        {label}
      </FormLabel>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <Input
            {...register(name)}
            type={type}
            placeholder={`Enter ${label}`}
            style={{
              color: '#345430',
              fontSize: '15px',
              borderRadius: '10px',
              border: '2px solid',
              borderColor: fieldState.invalid ? 'red' : '#345430',
            }}
            {...field}
            onKeyUp={onKeyUp} 
            autoComplete="true"
            {...rest}
          />
        )}
      />
      {typeof errorMessage === 'string' ? (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};

export default FormInput;
