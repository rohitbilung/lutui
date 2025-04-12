import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../lib/zodSchema";
import PageWrapper from "../../components/shared/common/layouts/PageWrapper";
import PageContent from "../../components/shared/common/layouts/PageContent";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { useAuth } from "../../context/AuthContext";
import { useLoginUser } from "../../lib/queries/Mutations";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/shared/common/Loader/Spinner";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { mutateAsync: loginUser, isPending: isLoggingIn } = useLoginUser();
  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    if (isLoading || isLoggingIn) return;
    setIsLoading(true);
    const response = await loginUser(values);
    if (response.success) {
      const { token, data: userData } = response;
      toast.success(response.message);
      loginForm.reset();
      await login({ token, userData });
      // Delay navigation by 2 seconds (2000ms)
      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 2000);
    } else {
      setIsLoading(false);
      toast.error(response?.message || "Something went wrong!!!");
    }
  };

  return (
    <PageWrapper>
      <PageContent title="Login" contentClass="flex justify-center">
        <div className="flex flex-col items-center p-4 w-full md:w-[580px]">
          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(onSubmit)}
              className="space-y-4 mb-4 w-full"
            >
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter you email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter you password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full flex justify-center items-center cursor-pointer"
                disabled={isLoading || isLoggingIn}
              >
                {isLoading || isLoggingIn ? (
                  <>
                    <Spinner text="" wrapperClassName="max-w-full" />
                    <span>Loading...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>

          <div className="flex justify-center text-sm text-gray-600">
            <span>Don’t have an account?</span>
            <Link to="/register" className="ml-1 text-blue-600 hover:underline">
              Create one
            </Link>
          </div>
        </div>
      </PageContent>
    </PageWrapper>
  );
};

export default Login;
