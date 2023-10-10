import React from 'react';
import PhoneInput from "react-phone-number-input";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Controller, FieldValues, FieldPath, FieldErrors } from 'react-hook-form';

interface FormPhoneInputProps {
  name: FieldPath<FieldValues>;
  label: string;
  control: any;
  register: any;
  rules: any;
  errors: FieldErrors<FieldValues>;
  rest?: any;
  onKeyUp?: () => void; 
}

const FormPhoneInput: React.FC<FormPhoneInputProps> = ({
  name,
  label,
  control,
  register,
  rules,
  errors,
  onKeyUp,
  ...rest
}) => {

  const errorMessage = errors[name]?.message;

  return (
    <FormControl isInvalid={!!errors[name]}>
      <FormLabel paddingTop={'10px'} paddingBottom={'10px'}>
        {label}
      </FormLabel>
      <Controller
        name={name}
        control={control}
        rules={{
            pattern: {
           value: /^[0-9+\s()-]*$/,
           message: "Invalid phone number",
        },
       }}
        render={({ field, fieldState }) => (
          <PhoneInput
          defaultCountry="NG"
          {...register(name)} // Spread the register props directly
          name={name} // Pass the name prop
          autoComplete="true"
          style={{
            color: '#345430',
            fontSize: '15px',
            borderRadius: '10px',
            border: '2px solid',
            padding: '15px',
            borderColor: fieldState.invalid ? 'red' : '#345430',
            marginBottom: '20px',
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            flexDirection: "column"
          }}
            value={field.value}
            onChange={(value) => field.onChange(value)}
            onBlur={field.onBlur}
            {...rest}
            onKeyUp={onKeyUp}
          />
        )}
      />
      {typeof errorMessage === 'string' ? (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      ) : null} 
    </FormControl>
  );
};

export default FormPhoneInput;
