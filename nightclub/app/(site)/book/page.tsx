import type { Metadata } from "next";
import Message from "@/app/ui/message";
import PageHeader from "@/app/ui/page-header";
import Section from "@/app/ui/section";

export const metadata: Metadata = { title: "Book table" };

export default function BookPage() {
  return (
    <>
      <PageHeader title="Book a Table" />
      <Section>
        <Message tone="info" className="mx-auto max-w-xl text-center">
          Online table booking is not available yet. Call us or send a message
          on the contact page and we will reserve your table.
        </Message>
      </Section>
    </>
  );
}
