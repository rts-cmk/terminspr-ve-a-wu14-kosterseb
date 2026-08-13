"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { ApiError, apiPost } from "@/app/lib/api";
import {
  contactSchema,
  loginSchema,
  newsletterSchema,
  registerSchema,
} from "@/app/lib/schemas";
import { createSession, destroySession } from "@/app/lib/session";

/** What every form gets back. `errors` is keyed by field name. */
export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string[] | undefined>;
};

type AuthResponse = {
  accessToken: string;
  user: { id: number; name: string; email: string };
};

function invalid(error: z.ZodError): FormState {
  return {
    status: "error",
    errors: z.flattenError(error).fieldErrors,
  };
}

function failed(error: unknown): FormState {
  return {
    status: "error",
    message:
      error instanceof ApiError
        ? error.message
        : "Something went wrong. Please try again.",
  };
}

export async function subscribeToNewsletter(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = newsletterSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) return invalid(parsed.error);

  try {
    await apiPost("/newsletters", parsed.data);
  } catch (error) {
    return failed(error);
  }

  return {
    status: "success",
    message: "Thanks — you are on the list. See you on the dance floor.",
  };
}

export async function sendContactMessage(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    content: formData.get("content"),
  });

  if (!parsed.success) return invalid(parsed.error);

  try {
    await apiPost("/contact_messages", {
      ...parsed.data,
      date: new Date().toISOString(),
    });
  } catch (error) {
    return failed(error);
  }

  return {
    status: "success",
    message: "Thanks for your message. We will get back to you shortly.",
  };
}

export async function logIn(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) return invalid(parsed.error);

  try {
    const auth = await apiPost<AuthResponse>("/login", parsed.data);
    await createSession({
      token: auth.accessToken,
      userId: auth.user.id,
      name: auth.user.name,
      email: auth.user.email,
    });
  } catch (error) {
    return failed(error);
  }

  redirect("/");
}

export async function registerMember(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    repeatPassword: formData.get("repeatPassword"),
  });

  if (!parsed.success) return invalid(parsed.error);

  const { name, email, password } = parsed.data;

  try {
    const auth = await apiPost<AuthResponse>("/register", {
      name,
      email,
      password,
    });
    await createSession({
      token: auth.accessToken,
      userId: auth.user.id,
      name: auth.user.name,
      email: auth.user.email,
    });
  } catch (error) {
    return failed(error);
  }

  redirect("/");
}

export async function logOut() {
  await destroySession();
  redirect("/");
}
