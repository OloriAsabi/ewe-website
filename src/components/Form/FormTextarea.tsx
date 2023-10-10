import React from 'react';
import {
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Controller, FieldValues, FieldPath, FieldErrors } from 'react-hook-form';

interface FormTextareaProps {
  name: FieldPath<FieldValues>;
  label: string;
  control: any;
  register: any;
  rules: any;
  errors: FieldErrors<FieldValues>;
  rest?: any;
  onKeyUp?: () => void; // Add the onKeyUp prop here
}

const FormTextarea: React.FC<FormTextareaProps> = ({
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
    <FormControl isInvalid={!!errors[name]} marginTop="20px">
      <FormLabel>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        rules={{
            required: "About is required",
            maxLength: {
              value: 200,
              message: "About must be less than 200 characters",
            },
          }}
        render={({ field, fieldState }) => (
          <Textarea
            {...register(name)}
            placeholder={`Tell us about yourself`}
            aria-label={label}
            onChange={(e) => field.onChange(e.target.value)}
            onBlur={field.onBlur}
            style={{
              color: '#345430',
              fontSize: '15px',
              borderRadius: '10px',
              border: '2px solid',
              borderColor: fieldState.invalid ? 'red' : '#345430',
              minHeight: '100px', // Customize the height here
            }}
            autoComplete="true"
            onKeyUp={onKeyUp} 
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

export default FormTextarea;