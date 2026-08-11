"use client";

import type { ReactNode } from "react";

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
