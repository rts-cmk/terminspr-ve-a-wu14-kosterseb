import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { Input } from "@/app/ui/field";
import PendingForm from "@/app/ui/forms/pending-form";
import PageHeader from "@/app/ui/page-header";
import Section from "@/app/ui/section";

export const metadata: Metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <>
      <PageHeader title="Register" />
      <Section>
        <div className="mx-auto max-w-md">
          <p className="mb-8 text-center text-sm text-ink/70">
            Fill out the form below to register a membership.
          </p>

          <PendingForm className="flex flex-col gap-5">
            <Input
              name="name"
              label="Your Name"
              required
              minLength={2}
              autoComplete="name"
            />
            <Input
              name="email"
              label="Your Email"
              type="email"
              required
              autoComplete="email"
            />
            <Input
              name="password"
              label="Your Password"
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
            />
            <Input
              name="repeatPassword"
              label="Repeat Your Password"
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
            />
            <Button type="submit">
              Register
            </Button>
          </PendingForm>

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
