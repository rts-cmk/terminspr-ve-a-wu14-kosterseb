"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ApiError, apiDelete, apiPost } from "@/app/lib/api";
import {
  commentSchema,
  contactSchema,
  loginSchema,
  newsletterSchema,
  registerSchema,
} from "@/app/lib/schemas";
import { createSession, destroySession, getSession } from "@/app/lib/session";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string[] | undefined>;

  values?: Record<string, string>;
};

const NEVER_ECHOED = ["password", "repeatPassword"];

function submittedValues(formData: FormData) {
  const values: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
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

export async function addComment(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await getSession();

  if (!session) {
    return {
      status: "error",
      message: "You need to be logged in to comment.",
    };
  }

  const blogpostId = Number(formData.get("blogpostId"));
  const rawParent = formData.get("parentId");
  const parentId = rawParent ? Number(rawParent) : null;

  const parsed = commentSchema.safeParse({ content: formData.get("content") });
  if (!parsed.success) return invalid(parsed.error, formData);

  try {
    await apiPost(
      "/comments",
      {
        blogpostId,
        userId: session.userId,
        parentId,
        name: session.name,
        content: parsed.data.content,
        date: new Date().toISOString(),
      },
      session.token,
    );
  } catch (error) {
    return failed(error, formData);
  }

  revalidatePath(`/blog/${blogpostId}`);

  return { status: "success" };
}

export async function deleteComment(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await getSession();

  if (!session) {
    return { status: "error", message: "You need to be logged in to do that." };
  }

  const id = Number(formData.get("commentId"));

  try {
    await apiDelete(`/comments/${id}`, session.token);
  } catch (error) {
    return failed(error, formData);
  }

  revalidatePath("/my-comments");
  const blogpostId = formData.get("blogpostId");
  if (blogpostId) revalidatePath(`/blog/${blogpostId}`);

  return { status: "success", message: "Comment deleted." };
}
