import Image from "next/image";
import Link from "next/link";

export default function Logo({
  variant = "small",
  href = "/",
  className = "",
}: {
  variant?: "main" | "small";
  href?: string | null;
  className?: string;
}) {
  const image =
    variant === "main" ? (
      <Image
        src="/icon/Logo.svg"
        alt="Night Club"
        width={770}
        height={116}
        priority
        className={`h-auto w-full ${className}`}
      />
    ) : (
      <Image
        src="/icon/Logo_main.svg"
        alt="Night Club"
        width={183}
        height={43}
        className={`h-auto w-[140px] sm:w-[183px] ${className}`}
      />
    );

  return href ? <Link href={href}>{image}</Link> : image;
}
