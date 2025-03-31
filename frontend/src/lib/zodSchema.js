import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(32, { message: "Password must be a maximum of 32 characters long." }),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, { message: "Please enter your name." }),
    // mobile: z
    //   .string()
    //   .length(10, { message: "Mobile number must be exactly 10 digits." })
    //   .regex(/^[0-9]{10}$/, { message: "Invalid mobile number format." }),
    mobile: z
      .string()
      .min(10, { message: "Please enter a valid mobile number." })
      .max(15, { message: "Mobile number is too long." })
      .regex(/^\+?[0-9]+$/, { message: "Invalid phone number format." }),
    email: z.string().email({ message: "Please enter a valid email." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." })
      .max(32, {
        message: "Password must be a maximum of 32 characters long.",
      }),
    repeat_password: z
      .string()
      .min(1, { message: "Please repeat the password" }),
  })
  .refine((data) => data.password === data.repeat_password, {
    message: "Passwords do not match.",
    path: ["repeat_password"],
  });
