import type { ReactNode } from "react";
import Nav from "@/app/ui/nav";
import { getSession } from "@/app/lib/session";

export default async function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();

  return (
    <>
      <Nav loggedIn={Boolean(session)} />
      <main className="flex-1">{children}</main>
    </>
  );
}
