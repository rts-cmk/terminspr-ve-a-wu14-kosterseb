import type { Metadata } from "next";
import { Button } from "@/app/ui/button";
import { Input, Textarea } from "@/app/ui/field";
import PendingForm from "@/app/ui/forms/pending-form";
import PageHeader from "@/app/ui/page-header";
import Section from "@/app/ui/section";

export const metadata: Metadata = { title: "Contact us" };

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact Us" />
      <Section>
        <PendingForm className="mx-auto flex max-w-xl flex-col gap-5">
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
          <Textarea
            name="content"
            label="Your Comment"
            required
            minLength={10}
            rows={6}
          />
          <Button type="submit" className="self-start">
            Send
          </Button>
        </PendingForm>
      </Section>
    </>
  );
}
