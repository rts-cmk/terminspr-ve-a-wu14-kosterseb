import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Input } from "@/app/ui/field";
import Form, { SubmitButton } from "@/app/ui/forms/form";
import PageHeader from "@/app/ui/page-header";
import Section from "@/app/ui/section";
import { registerMember } from "@/app/lib/actions";
import { getSession } from "@/app/lib/session";

export const metadata: Metadata = { title: "Register" };

export default async function RegisterPage() {
  if (await getSession()) redirect("/");

  return (
    <>
      <PageHeader title="Register" />
      <Section>
        <div className="mx-auto max-w-md">
          <p className="mb-8 text-center text-sm text-ink/70">
            Fill out the form below to register a membership.
          </p>

          <Form action={registerMember} className="flex flex-col gap-5">
            <Input name="name" label="Your Name" autoComplete="name" />
            <Input
              name="email"
              label="Your Email"
              type="email"
              autoComplete="email"
            />
            <Input
              name="password"
              label="Your Password"
              type="password"
              autoComplete="new-password"
            />
            <Input
              name="repeatPassword"
              label="Repeat Your Password"
              type="password"
              autoComplete="new-password"
            />
            <SubmitButton>Register</SubmitButton>
          </Form>

          <p className="mt-8 text-center text-sm text-ink/70">
            Already a member?{" "}
            <Link href="/login" className="text-pink hover:underline">
              Log in here
            </Link>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
