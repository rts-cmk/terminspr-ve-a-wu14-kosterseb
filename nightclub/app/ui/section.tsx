import Image from "next/image";
import type { ReactNode } from "react";
import Container from "@/app/ui/container";

/**
 * A full-width band of the page with the shared vertical rhythm.
 * `background` fills the band with one of the images in /public/bg, dimmed so
 * text stays readable. `isolate` keeps the image's negative z-index inside this
 * section instead of slipping behind the page background.
 */
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
