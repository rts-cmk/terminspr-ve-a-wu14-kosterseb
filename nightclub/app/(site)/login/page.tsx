import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { Input } from "@/app/ui/field";
import PendingForm from "@/app/ui/forms/pending-form";
import PageHeader from "@/app/ui/page-header";
import Section from "@/app/ui/section";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <>
      <PageHeader title="Log In" />
      <Section>
        <div className="mx-auto max-w-md">
          <p className="mb-8 text-center text-sm text-ink/70">
            Please provide email and password to log in.
          </p>

          <PendingForm className="flex flex-col gap-5">
            <Input
              name="email"
              label="Email"
              type="email"
              required
              autoComplete="email"
            />
            <Input
              name="password"
              label="Password"
              type="password"
              required
              minLength={6}
              autoComplete="current-password"
            />
            <Button type="submit">
              Log In
            </Button>
          </PendingForm>

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
