import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { SignUpType } from "../types/AuthTypes";
import { SignUpSchema } from "../validators/AuthValidators";
import FormProvider from "../components/form/FormProvider";
import { FormPasswordInput } from "../components/form/FormPasswordInput";
import { FormTextInput } from "../components/form/FormTextInput";
import { FormSelect } from "../components/form/FormSelect";
import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const navigate = useNavigate();

  const signUpMutation = useSignUp();

  const formMethods = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
  });

  const { handleSubmit } = formMethods;

  const onSubmit: SubmitHandler<SignUpType> = (data) => {
    signUpMutation.mutate(data, {
      onSuccess: () => navigate("/login"),
    });
  };

  return (
    <FormProvider onSubmit={handleSubmit(onSubmit)} methods={formMethods}>
      <div className="w-full md:w-sm p-8 shadow-md rounded-xl">
        <Text size="xl" className="text-center">
          Sign up
        </Text>
        <div className="flex flex-col gap-4 mt-4">
          <div>
            <FormTextInput<SignUpType>
              controlKey="firstName"
              placeholder="First name"
            />
          </div>
          <div>
            <FormTextInput<SignUpType>
              controlKey="lastName"
              placeholder="Last name"
            />
          </div>
          <div>
            <FormTextInput<SignUpType> controlKey="email" placeholder="Email" />
          </div>
          <div>
            <FormPasswordInput<SignUpType>
              controlKey="password"
              placeholder="Password"
            />
          </div>
          <div>
            <FormSelect<SignUpType>
              controlKey="role"
              data={[
                { label: "Client", value: "CLIENT" },
                { label: "Freelancer", value: "FREELANCER" },
              ]}
              placeholder="Role"
              clearable
            />
          </div>
          <div className="w-full">
            <Button
              variant="filled"
              type="submit"
              fullWidth
              className="py-4 text-lg"
              loading={signUpMutation.isPending}
            >
              Sign up
            </Button>
            <Text size="sm">
              <Link to="/login">Back to login</Link>
            </Text>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default SignUpPage;
