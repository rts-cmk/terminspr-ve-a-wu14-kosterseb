"use client";

import ErrorContent from "@/app/ui/error-content";

export default function RootError(props: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <main className="flex-1">
      <ErrorContent {...props} />
    </main>
  );
}
