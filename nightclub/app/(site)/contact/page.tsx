import type { Metadata } from "next";
import { Input, Textarea } from "@/app/ui/field";
import Form, { SubmitButton } from "@/app/ui/forms/form";
import PageHeader from "@/app/ui/page-header";
import Section from "@/app/ui/section";
import { sendContactMessage } from "@/app/lib/actions";

export const metadata: Metadata = { title: "Contact us" };

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact Us" />
      <Section>
        <div className="mx-auto max-w-xl">
          <Form action={sendContactMessage} className="flex flex-col gap-5">
            <Input name="name" label="Your Name" autoComplete="name" />
            <Input
              name="email"
              label="Your Email"
              type="email"
              autoComplete="email"
            />
            <Textarea name="content" label="Your Comment" rows={6} />
            <SubmitButton className="self-end">Send</SubmitButton>
          </Form>
        </div>
      </Section>
    </>
  );
}
