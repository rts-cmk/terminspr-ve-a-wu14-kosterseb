"use client";

import type { ReactNode } from "react";

/**
 * Temporary scaffolding: runs the browser's own validation but stops the
 * submit, so no form navigates away before the API calls are wired up.
 * Replaced per form when submission lands.
 */
export default function PendingForm({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <form onSubmit={(event) => event.preventDefault()} className={className}>
      {children}
    </form>
  );
}
