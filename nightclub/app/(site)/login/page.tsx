import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Input } from "@/app/ui/field";
import Form, { SubmitButton } from "@/app/ui/forms/form";
import PageHeader from "@/app/ui/page-header";
import Section from "@/app/ui/section";
import { logIn } from "@/app/lib/actions";
import { getSession } from "@/app/lib/session";

export const metadata: Metadata = { title: "Log in" };

export default async function LoginPage() {
  // Nothing to do here if they are already a member.
  if (await getSession()) redirect("/");

  return (
    <>
      <PageHeader title="Log In" />
      <Section>
        <div className="mx-auto max-w-md">
          <p className="mb-8 text-center text-sm text-ink/70">
            Please provide email and password to log in.
          </p>

          <Form action={logIn} className="flex flex-col gap-5">
            <Input
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
            />
            <Input
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <SubmitButton>Log In</SubmitButton>
          </Form>

          <p className="mt-8 text-center text-sm text-ink/70">
            Are you not yet a member? Do you want to be a part of our exclusive
            club?{" "}
            <Link href="/register" className="text-pink hover:underline">
              Sign up here
            </Link>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
