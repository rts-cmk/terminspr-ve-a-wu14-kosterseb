"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox, { type LightboxImage } from "@/app/ui/lightbox";
import { useInView } from "@/app/ui/use-in-view";

const TALL_TILE = 2;

const STAGGER = 90;

export default function GalleryGrid({ images }: { images: LightboxImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, inView } = useInView<HTMLUListElement>();

  return (
    <>
      <ul
        ref={ref}
        className="grid auto-rows-[29vw] grid-cols-2 gap-2 overflow-hidden md:auto-rows-[14vw] md:grid-cols-4"
      >
        {images.map((image, index) => (
          <li
            key={image.url}
            style={{ transitionDelay: `${index * STAGGER}ms` }}
            className={`group relative overflow-hidden motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out ${
              index === TALL_TILE ? "row-span-2" : ""
            } ${
              inView
                ? "translate-x-0 opacity-100"
                : "motion-safe:-translate-x-24 motion-safe:opacity-0"
            }`}
          >
            {/* A button, not a div, so the lightbox opens from the keyboard too. */}
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Open image ${index + 1} of ${images.length}`}
              className="relative size-full cursor-pointer"
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-pink/0 transition-colors duration-500 group-hover:bg-pink/20" />
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        images={images}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
        label="Night Club gallery"
      />
    </>
  );
}
