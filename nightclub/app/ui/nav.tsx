"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "@/app/ui/container";
import Logo from "@/app/ui/logo";
import { CloseIcon, MenuIcon } from "@/app/ui/icons";
import { logOut } from "@/app/lib/actions";

const PUBLIC_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/book", label: "Book Table" },
  { href: "/contact", label: "Contact us" },
];

/** My Comments only appears for members, per the assignment. */
const MEMBER_LINKS = [{ href: "/my-comments", label: "My Comments" }];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Nav({ loggedIn = false }: { loggedIn?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = loggedIn
    ? [...PUBLIC_LINKS, ...MEMBER_LINKS]
    : [...PUBLIC_LINKS, { href: "/login", label: "Log in" }];

  return (
    <>
      <nav className="sticky top-0 z-50 border border-pink bg-bg/95 backdrop-blur">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 size-4 bg-pink [clip-path:polygon(0_0,100%_0,0_100%)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 size-4 bg-pink [clip-path:polygon(100%_0,100%_100%,0_100%)]"
        />

        <Container className="flex items-center justify-between py-4">
          <Logo />

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((link) => {
              const active = isActive(pathname, link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative block pb-3 text-xs uppercase tracking-widest transition-colors ${
                      active ? "text-pink" : "text-ink hover:text-pink"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <Image
                        src="/bottom_line2.png"
                        alt=""
                        width={300}
                        height={24}
                        className="absolute inset-x-0 bottom-0 mx-auto h-auto w-16"
                      />
                    )}
                  </Link>
                </li>
              );
            })}

            {loggedIn && (
              <li>
                <form action={logOut}>
                  <button
                    type="submit"
                    className="cursor-pointer pb-3 text-xs uppercase tracking-widest text-ink transition-colors hover:text-pink"
                  >
                    Log out
                  </button>
                </form>
              </li>
            )}
          </ul>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="cursor-pointer text-ink md:hidden"
          >
            <MenuIcon className="size-6" />
          </button>
        </Container>
      </nav>

      {open && (
        <div className="fixed inset-0 z-60 flex flex-col bg-black/80 md:hidden">
          <Container className="flex shrink-0 items-center justify-between py-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="cursor-pointer text-ink"
            >
              <CloseIcon className="size-7" />
            </button>
          </Container>

          <ul className="flex flex-1 flex-col items-center justify-center gap-10">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={
                    isActive(pathname, link.href) ? "page" : undefined
                  }
                  className={`text-2xl uppercase tracking-widest transition-colors ${
                    isActive(pathname, link.href)
                      ? "text-pink"
                      : "text-ink hover:text-pink"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {loggedIn && (
              <li>
                <form action={logOut}>
                  <button
                    type="submit"
                    className="cursor-pointer text-2xl uppercase tracking-widest text-ink transition-colors hover:text-pink"
                  >
                    Log out
                  </button>
                </form>
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
}
