"use client";

import ErrorContent from "@/app/ui/error-content";

export default function SiteError(props: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return <ErrorContent {...props} />;
}
