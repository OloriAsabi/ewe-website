import React, { useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import ToastNotification from "./ToastNotification";
import FormInput from "./Form/FormInput";

interface SubscribeFormData {
  email: string;
}

const SubscribeToNewsletter: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    trigger,
    register,
  } = useForm<SubscribeFormData>({
    defaultValues: {
      email: "",
    },
  });
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({ description: "", status: "" });

  const subscribeToNewsletter: SubmitHandler<SubscribeFormData> = (data) => {
    console.log("Subscribing to newsletter with: ", data);
    // TODO: Implement the subscription logic here

    setToastConfig({ description: "Subscribed to newsletter!", status: "success" });
    setShowToast(true);
  };

  return (
    <Box p={4} fontFamily={'Inter'}>
      <form onSubmit={handleSubmit(subscribeToNewsletter)}>
      <Flex direction="column" gap={'10px'} alignItems="center">
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
  <Button
    isLoading={isSubmitting} 
    type="submit"
    loadingText="Subscribing..."
    mt={0}
    backgroundColor={"#345430"}
    padding={'30px'}
    color={"#fff"}
    variant="solid"
    borderRadius={"10px"}
    size="md"
    fontFamily='Inter'
    disabled={!isValid}
  >
    Subscribe 
    <br/>
     Newsletter
  </Button>
</Flex>

      </form>
      {showToast && (
        <ToastNotification
          description={toastConfig.description}
          status={toastConfig.status}
          onClose={() => setShowToast(false)}
        />
      )}
    </Box>
  );
};

export default SubscribeToNewsletter;
