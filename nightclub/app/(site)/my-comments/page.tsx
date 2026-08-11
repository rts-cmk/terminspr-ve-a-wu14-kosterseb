import type { Metadata } from "next";
import PageHeader from "@/app/ui/page-header";
import Section from "@/app/ui/section";

export const metadata: Metadata = { title: "My comments" };

export default function MyCommentsPage() {
  return (
    <>
      <PageHeader title="My Comments" />
      <Section>
        <p className="text-center text-sm text-ink/40">
          Logged-in users only — view and delete your own comments (API).
        </p>
      </Section>
    </>
  );
}
