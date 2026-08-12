import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "lines" | "outline" | "solid";

const base =
  "inline-flex items-center justify-center gap-2 px-9 py-3.5 text-xs font-medium uppercase tracking-[0.2em] transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  lines:
    "border-y border-ink bg-transparent text-ink hover:border-pink hover:bg-pink",
  outline:
    "border border-ink bg-transparent text-ink hover:border-pink hover:bg-pink",
  solid: "border border-pink bg-pink text-ink hover:bg-transparent",
};

function classes(variant: Variant, className: string) {
  return `${base} ${variants[variant]} ${className}`;
}

export function Button({
  variant = "lines",
  className = "",
  type = "button",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button {...props} type={type} className={classes(variant, className)} />
  );
}

/** Same look but renders a real link so navigation still works. */
export function ButtonLink({
  variant = "lines",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link {...props} className={classes(variant, className)} />;
}
