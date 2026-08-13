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

/** What every form gets back. `errors` and `values` are keyed by field name. */
export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string[] | undefined>;
  /**
   * What the visitor typed. React resets an uncontrolled form whenever its
   * action runs, so without echoing these back a failed validation would wipe
   * everything they had written. Passwords are deliberately never included.
   */
  values?: Record<string, string>;
};

const NEVER_ECHOED = ["password", "repeatPassword"];

function submittedValues(formData: FormData) {
  const values: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    // React posts its own bookkeeping fields alongside the real ones.
    if (key.startsWith("$ACTION") || NEVER_ECHOED.includes(key)) continue;
    if (typeof value === "string") values[key] = value;
  }

  return values;
}

type AuthResponse = {
  accessToken: string;
  user: { id: number; name: string; email: string };
};

function invalid(error: z.ZodError, formData: FormData): FormState {
  const { fieldErrors, formErrors } = z.flattenError(error);

  return {
    status: "error",
    errors: fieldErrors,
    // A schema-level issue has no field to attach to; without this it would
    // render nothing at all and the form would look like it did nothing.
    message: formErrors.length > 0 ? formErrors.join(" ") : undefined,
    values: submittedValues(formData),
  };
}

function failed(
  error: unknown,
  formData: FormData,
  message?: string,
): FormState {
  return {
    status: "error",
    message:
      message ??
      (error instanceof ApiError
        ? error.message
        : "Something went wrong. Please try again."),
    values: submittedValues(formData),
  };
}

export async function subscribeToNewsletter(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = newsletterSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) return invalid(parsed.error, formData);

  try {
    await apiPost("/newsletters", parsed.data);
  } catch (error) {
    return failed(error, formData);
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

  if (!parsed.success) return invalid(parsed.error, formData);

  try {
    await apiPost("/contact_messages", {
      ...parsed.data,
      date: new Date().toISOString(),
    });
  } catch (error) {
    return failed(error, formData);
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

  if (!parsed.success) return invalid(parsed.error, formData);

  try {
    const auth = await apiPost<AuthResponse>("/login", parsed.data);
    await createSession({
      token: auth.accessToken,
      userId: auth.user.id,
      name: auth.user.name,
      email: auth.user.email,
    });
  } catch (error) {
    // The API distinguishes "Cannot find user" from "Incorrect password";
    // repeating that would let anyone probe which emails are registered.
    return failed(error, formData, "Email or password is incorrect.");
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

  if (!parsed.success) return invalid(parsed.error, formData);

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
    return failed(error, formData);
  }

  redirect("/");
}

export async function logOut() {
  await destroySession();
  redirect("/");
}
