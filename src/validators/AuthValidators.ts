import { z } from "zod";

export const SignUpSchema = z.object({
  firstName: z.string({ message: "First name is required" }),
  lastName: z.string({ message: "Last name is required" }),
  email: z.string({ message: "Email is required" }).email(),
  password: z.string({ message: "Password is required" }),
  role: z.string({ message: "Role is required" }),
});

export const LoginSchema = z.object({
  email: z.string({ message: "Email is required" }).email(),
  password: z.string({ message: "Password is required" }),
});
