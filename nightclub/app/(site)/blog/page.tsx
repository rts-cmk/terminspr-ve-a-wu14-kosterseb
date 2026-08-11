import type { Metadata } from "next";
import PageHeader from "@/app/ui/page-header";
import Section from "@/app/ui/section";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <>
      <PageHeader title="Blog" />
      <Section>
        <p className="text-center text-sm text-ink/40">
          Blogs goes here
        </p>
      </Section>
    </>
  );
}
