import React from 'react';
import {
  FormControl,
  FormLabel,
  Select,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Controller, FieldValues, FieldPath, FieldErrors } from 'react-hook-form';

interface FormSelectOptionProps {
  name: FieldPath<FieldValues>;
  label: string;
  control: any;
  register: any;
  rules: any;
  errors: FieldErrors<FieldValues>;
  options: { value: string; label: string }[];
  rest?: any;
  onKeyUp?: () => void; // Add the onKeyUp prop here
}

const FormSelectOption: React.FC<FormSelectOptionProps> = ({
  name,
  label,
  control,
  register,
  rules,
  errors,
  options,
  onKeyUp, // Include onKeyUp in the destructuring
  ...rest
}) => {
  const errorMessage = errors[name]?.message;

  return (
    <FormControl isInvalid={!!errors[name]} marginTop="20px">
      <FormLabel paddingTop={'10px'} paddingBottom={'10px'}>
        {label}
      </FormLabel>
      <Controller
        name={name}
        control={control}
        rules={{ required: 'Please select a field' }}
        render={({ field, fieldState }) => (
          <>
            <Select
              placeholder={`Select ${label}`}
              {...field}
              onChange={(value) => field.onChange(value)}
              onBlur={field.onBlur}
              size="lg"
              style={{
                color: '#345430',
                fontSize: '15px',
                borderRadius: '10px',
                borderColor: fieldState.invalid ? 'red' : '#345430',
              }}
              {...rest}
              onKeyUp={onKeyUp} // Pass the onKeyUp handler to the Select element
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            {field.value === 'other' && (
              <div>
                <FormLabel paddingTop={'10px'} paddingBottom={'10px'}>
                  Other Field
                </FormLabel>
                <Controller
                  name="otherField"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="Please specify"
                      style={{
                        color: '#345430',
                        fontSize: '15px',
                        borderRadius: '10px',
                        borderColor: fieldState.invalid ? 'red' : '#345430',
                        marginBottom: '10px',
                      }}
                    />
                  )}
                />
              </div>
            )}
          </>
        )}
      />
      {typeof errorMessage === 'string' ? (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};

export default FormSelectOption;
