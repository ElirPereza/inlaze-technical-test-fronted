import { z } from "zod";

export const LoginZodSchema = z.object({
  email: z.string().email(), 
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const RegisterZodSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"), 
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginDto = z.infer<typeof LoginZodSchema>;
export type RegisterDto = z.infer<typeof RegisterZodSchema>;

