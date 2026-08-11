import type { ReactNode } from "react";
import Nav from "@/app/ui/nav";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main className="flex-1">{children}</main>
    </>
  );
}
