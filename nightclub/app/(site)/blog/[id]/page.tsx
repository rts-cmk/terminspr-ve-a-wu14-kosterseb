import type { Metadata } from "next";
import PageHeader from "@/app/ui/page-header";
import Section from "@/app/ui/section";

export const metadata: Metadata = { title: "Blog post" };

export default async function BlogPostPage(props: PageProps<"/blog/[id]">) {
  const { id } = await props.params;

  return (
    <>
      <PageHeader title="Blog Post" />
      <Section>
        <p className="text-center text-sm text-ink/40">Post #{id}</p>
      </Section>
    </>
  );
}
