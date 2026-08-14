"use client";

import Image from "next/image";
import { useState } from "react";
import CornerMarks from "@/app/ui/corner-marks";
import Lightbox, { type LightboxImage } from "@/app/ui/lightbox";
import { useInView } from "@/app/ui/use-in-view";

const TALL_TILE = 2;

const STAGGER = 90;

export default function GalleryGrid({
  images,
  shown,
}: {
  images: LightboxImage[];
  shown: number;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, inView } = useInView<HTMLUListElement>();

  return (
    <>
      <ul
        ref={ref}
        className="grid auto-rows-[29vw] grid-cols-2 gap-2 overflow-hidden md:auto-rows-[14vw] md:grid-cols-4"
      >
        {images.slice(0, shown).map((image, index) => (
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
                className="object-cover"
              />
              <span className="absolute inset-0 bg-bg/0 transition-colors duration-500 group-hover:bg-bg/60" />
              <span className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <CornerMarks size="size-10" />
              </span>
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
