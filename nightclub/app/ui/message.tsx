import type { ReactNode } from "react";

type Tone = "info" | "success" | "error";

const tones: Record<Tone, string> = {
  info: "border-line text-ink/80",
  success: "border-pink text-ink",
  error: "border-pink text-pink",
};

/** feedback for: form success and API errors */
export default function Message({
  tone = "info",
  title,
  children,
  className = "",
}: {
  tone?: Tone;
  title?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={`border px-6 py-5 text-sm ${tones[tone]} ${className}`}
    >
      {title && (
        <p className="mb-1 font-medium uppercase tracking-widest">{title}</p>
      )}
      {children}
    </div>
  );
}
