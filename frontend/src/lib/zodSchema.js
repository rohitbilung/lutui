import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(32, { message: "Password must be a maximum of 32 characters long." }),
});

export const registerSchema = z.object({
  first_name: z.string().min(1, { message: "Please enter your firs tname." }),
  last_name: z.string().min(1, { message: "Please enter your last name." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(32, { message: "Password must be a maximum of 32 characters long." }),
});
