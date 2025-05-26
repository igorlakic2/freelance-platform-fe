import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text } from "@mantine/core";
import { useAuth } from "../auth/useAuth";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { LoginType } from "../types/AuthTypes";
import { LoginSchema } from "../validators/AuthValidators";
import FormProvider from "../components/form/FormProvider";
import { FormPasswordInput } from "../components/form/FormPasswordInput";
import { FormTextInput } from "../components/form/FormTextInput";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const loginMutation = useLogin();

  const formMethods = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  const { handleSubmit } = formMethods;

  const onSubmit: SubmitHandler<LoginType> = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (res) => {
        navigate("/");
        login(res.data.data.token);
      },
    });
  };

  return (
    <FormProvider onSubmit={handleSubmit(onSubmit)} methods={formMethods}>
      <div className="w-full md:w-sm p-8 shadow-md rounded-xl">
        <Text size="xl" className="text-center">
          Login
        </Text>
        <div className="flex flex-col gap-4 mt-4">
          <div>
            <FormTextInput<LoginType>
              controlKey="email"
              placeholder="Email"
              withAsterisk
            />
          </div>
          <div>
            <FormPasswordInput<LoginType>
              controlKey="password"
              placeholder="Password"
            />
          </div>
          <div className="w-full">
            <Button
              variant="filled"
              type="submit"
              fullWidth
              className="py-4 text-lg"
            >
              Login
            </Button>
          </div>
        </div>
        <div>
          <Text size="sm">
            Don't have an account? <Link to="/sign-up">Sign up now.</Link>
          </Text>
        </div>
      </div>
    </FormProvider>
  );
};

export default LoginPage;
