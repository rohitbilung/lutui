import React from "react";
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

const Login = () => {
  const { login, isAuthenticated } = useAuth()
  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    console.log(values);
  };

  return (
    <PageWrapper>
      <PageContent title="Login" contentClass="flex justify-center">
        <div className="flex flex-col items-center p-4 w-full md:w-[580px]">
          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter you email" {...field} />
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
                      <Input type="password" placeholder="Enter you password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center items-center">
                <Button type="submit" className="w-full">Sign In</Button>
              </div>
            </form>
          </Form>
        </div>
      </PageContent>
    </PageWrapper>
  );
};

export default Login;
