import { Button } from "@/app/ui/button";
import { Input } from "@/app/ui/field";
import PendingForm from "@/app/ui/forms/pending-form";
import Section from "@/app/ui/section";
import SectionHeading from "@/app/ui/section-heading";

export default function Newsletter() {
  return (
    <Section id="newsletter">
      <SectionHeading title="Want the Latest Night Club News" />

      <p className="mx-auto mb-8 max-w-xl text-center text-sm text-ink/70">
        Subscribe to our newsletter and never miss an Event.
      </p>

      <PendingForm className="mx-auto flex max-w-xl flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex-1">
          <Input
            name="email"
            label="Enter Your Email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
        <Button type="submit">Subscribe</Button>
      </PendingForm>
    </Section>
  );
}
