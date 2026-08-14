import Image from "next/image";
import type { ReactNode } from "react";

export default function SectionHeading({
  title,
  className = "mb-12",
}: {
  title: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative text-center ${className}`}>
      <h2 className="relative text-2xl font-medium tracking-widest sm:text-3xl">
        {title}
      </h2>
      <Image
        src="/bottom_line2.png"
        alt=""
        width={300}
        height={24}
        className="relative mx-auto mt-4 h-auto w-75 max-w-full"
      />
    </div>
  );
}
