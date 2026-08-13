"use client";

import type { ComponentProps, ReactNode } from "react";
import { useFieldError, useFieldValue } from "@/app/ui/forms/form";

const control =
  "w-full border border-line bg-transparent px-5 py-3.5 text-sm text-ink transition-colors placeholder:text-ink/60 hover:border-ink/40 focus:border-pink";

function Wrapper({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-pink">
          {error}
        </p>
      )}
    </div>
  );
}

type Shared = { name: string; label: string; error?: string };

export function Input({
  name,
  label,
  error,
  className = "",
  ...props
}: ComponentProps<"input"> & Shared) {
  // Called unconditionally (hook rules); the explicit prop still wins.
  const fromAction = useFieldError(name);
  const message = error ?? fromAction;
  const lastValue = useFieldValue(name);

  return (
    <Wrapper id={name} label={label} error={message}>
      <input
        {...props}
        // `key` forces a fresh input when the echoed value changes, so the
        // re-seeded defaultValue actually takes effect after a reset.
        key={lastValue}
        defaultValue={props.defaultValue ?? lastValue}
        id={name}
        name={name}
        placeholder={props.placeholder ?? label}
        aria-invalid={message ? true : undefined}
        aria-describedby={message ? `${name}-error` : undefined}
        className={`${control} ${message ? "border-pink" : ""} ${className}`}
      />
    </Wrapper>
  );
}

export function Textarea({
  name,
  label,
  error,
  className = "",
  ...props
}: ComponentProps<"textarea"> & Shared) {
  const fromAction = useFieldError(name);
  const message = error ?? fromAction;
  const lastValue = useFieldValue(name);

  return (
    <Wrapper id={name} label={label} error={message}>
      <textarea
        {...props}
        key={lastValue}
        defaultValue={props.defaultValue ?? lastValue}
        id={name}
        name={name}
        rows={props.rows ?? 5}
        placeholder={props.placeholder ?? label}
        aria-invalid={message ? true : undefined}
        aria-describedby={message ? `${name}-error` : undefined}
        className={`${control} resize-y ${message ? "border-pink" : ""} ${className}`}
      />
    </Wrapper>
  );
}
