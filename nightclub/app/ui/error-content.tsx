"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/app/ui/button";
import Message from "@/app/ui/message";
import Section from "@/app/ui/section";

export default function ErrorContent({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section>
      <div className="mx-auto flex max-w-xl flex-col items-center gap-8 text-center">
        <h1 className="text-2xl font-medium tracking-widest sm:text-3xl">
          Something went wrong
        </h1>

        <Message tone="error">
          We could not load this page. The club&apos;s data service may be
          unavailable — please try again in a moment.
        </Message>

        {error.digest && (
          <p className="text-xs uppercase tracking-widest text-ink/40">
            Reference: {error.digest}
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-4">
          <Button onClick={retry}>Try again</Button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border-y border-ink px-9 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:border-pink hover:bg-pink"
          >
            Back to home
          </Link>
        </div>
      </div>
    </Section>
  );
}
