import { z } from "zod";

/* Every form's rules live here so the messages the visitor sees are written in one place. */

export const newsletterSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.email("Please enter a valid email address"),
  content: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters so we can help you"),
});

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Please enter your password"),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your name"),
    email: z.email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    repeatPassword: z.string().min(1, "Please repeat your password"),
  })
  .refine((values) => values.password === values.repeatPassword, {
    message: "The two passwords do not match",
    path: ["repeatPassword"],
  });

export const commentSchema = z.object({
  content: z.string().trim().min(2, "Please write a comment"),
});

export const sessionSchema = z.object({
  token: z.string().min(1),
  userId: z.number().int().positive(),
  name: z.string().min(1),
  email: z.email(),
});
