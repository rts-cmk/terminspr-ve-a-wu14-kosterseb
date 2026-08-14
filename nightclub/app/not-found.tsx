import Nav from "@/app/ui/nav";
import PageHeader from "@/app/ui/page-header";
import Section from "@/app/ui/section";
import { ButtonLink } from "@/app/ui/button";
import Message from "@/app/ui/message";
import { getSession } from "@/app/lib/session";

export default async function NotFound() {
  const session = await getSession();

  return (
    <>
      <Nav loggedIn={Boolean(session)} />
      <main className="flex-1">
        <PageHeader title="Page Not Found" />
        <Section>
          <div className="mx-auto flex max-w-xl flex-col items-center gap-8 text-center">
            <Message tone="info">
              We could not find that page. It may have been moved, or the link
              may be wrong.
            </Message>

            <div className="flex flex-wrap justify-center gap-4">
              <ButtonLink href="/">Back to home</ButtonLink>
              <ButtonLink href="/blog">Read the blog</ButtonLink>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}
