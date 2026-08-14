import { Input } from "@/app/ui/field";
import Form, { SubmitButton } from "@/app/ui/forms/form";
import Section from "@/app/ui/section";
import SectionHeading from "@/app/ui/section-heading";
import { subscribeToNewsletter } from "@/app/lib/actions";

export default function Newsletter() {
  return (
    <Section id="newsletter">
      <SectionHeading title="Want the Latest Night Club News" />

      <p className="mx-auto mb-8 max-w-xl text-center text-sm text-ink/70">
        Subscribe to our newsletter and never miss an Event.
      </p>

      <div className="mx-auto max-w-xl">
        <Form
          action={subscribeToNewsletter}
          className="flex flex-col gap-4 sm:flex-row sm:items-start"
        >
          <div className="flex-1">
            <Input
              name="email"
              label="Enter Your Email"
              type="email"
              autoComplete="email"
            />
          </div>
          <SubmitButton>Subscribe</SubmitButton>
        </Form>
      </div>
    </Section>
  );
}
