import Image from "next/image";
import type { ReactNode } from "react";
import Container from "@/app/ui/container";

export default function Section({
  id,
  background,
  fullWidth = false,
  children,
  className = "",
}: {
  id?: string;
  background?: string;
  /** Skips the container so content can run edge to edge, as the gallery does. */
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative isolate py-section ${className}`}
    >
      {background && (
        <Image
          src={background}
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover opacity-15"
        />
      )}
      {fullWidth ? children : <Container>{children}</Container>}
    </section>
  );
}
