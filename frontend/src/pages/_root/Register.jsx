import React from "react";
import { registerSchema } from "../../lib/zodSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

const Register = () => {
  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <PageWrapper>
      <PageContent title="Create an account" contentClass="flex justify-center">
        <div className="flex flex-col items-center p-4 w-full md:w-[580px]">
          <Form {...registerForm}>
            <form
              onSubmit={registerForm.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              <FormField
                control={registerForm.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input  placeholder="Enter your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input  placeholder="Enter your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
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
                control={registerForm.control}
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
                <Button type="submit" className="w-full">Create</Button>
              </div>
            </form>
          </Form>
        </div>
      </PageContent>
    </PageWrapper>
  );
};

export default Register;
