"use client";

import "./globals.css";

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-8 bg-bg px-6 text-center text-ink">
        <h1 className="text-2xl font-medium uppercase tracking-widest">
          Something went wrong
        </h1>
        <p className="max-w-md text-sm text-ink/70">
          Night Club could not be loaded. Please try again.
        </p>
        {error.digest && (
          <p className="text-xs uppercase tracking-widest text-ink/40">
            Reference: {error.digest}
          </p>
        )}
        <button
          type="button"
          onClick={retry}
          className="cursor-pointer border-y border-ink px-9 py-3.5 text-xs font-medium uppercase tracking-[0.2em] transition-colors hover:border-pink hover:bg-pink"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
