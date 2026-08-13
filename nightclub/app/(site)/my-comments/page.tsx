import type { Metadata } from "next";
import { redirect } from "next/navigation";
import PageHeader from "@/app/ui/page-header";
import Section from "@/app/ui/section";
import { getSession } from "@/app/lib/session";

export const metadata: Metadata = { title: "My comments" };

export default async function MyCommentsPage() {
  // Members only: the assignment says this page must not be reachable logged out.
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <>
      <PageHeader title="My Comments" />
      <Section>
        <p className="text-center text-sm text-ink/40">
          Signed in as {session.name}. Your comments and the option to delete
          them arrive with the blog pull request.
        </p>
      </Section>
    </>
  );
}
