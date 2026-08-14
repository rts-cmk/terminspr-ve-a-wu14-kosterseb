"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { ButtonLink } from "@/app/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@/app/ui/icons";

export type LightboxImage = {
  url: string;
  alt: string;
  title?: string;
  text?: string;
};

export default function Lightbox({
  images,
  index,
  onIndexChange,
  onClose,
  label = "Gallery image",
}: {
  images: LightboxImage[];
  index: number | null;
  onIndexChange: (next: number) => void;
  onClose: () => void;
  label?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = index !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndexChange((index + delta + images.length) % images.length);
    },
    [index, images.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, step]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={label}
      // onClose also fires for Escape, so state stays in sync either way.
      onClose={onClose}
      // A click that lands on the dialog itself is a click on the backdrop.
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      className="m-auto w-full max-w-[96vw] bg-transparent p-0 text-ink backdrop:bg-black/90"
    >
      {index !== null && (
        <div className="flex items-center gap-3 sm:gap-8">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous image"
            className="flex size-9 shrink-0 cursor-pointer items-center justify-center border border-line text-ink transition-colors hover:border-pink hover:text-pink"
          >
            <ChevronLeftIcon className="size-5" />
          </button>

          <figure className="min-w-0 flex-1">
            <div className="relative">
              <Image
                src={images[index].url}
                alt={images[index].alt}
                width={970}
                height={674}
                sizes="90vw"
                priority
                className="max-h-[70vh] w-full object-contain"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 right-0 size-10 bg-pink [clip-path:polygon(100%_0,100%_100%,0_100%)]"
              />
            </div>

            <figcaption className="flex flex-col gap-4 bg-bg px-6 py-6 sm:px-8">
              <h2 className="text-lg font-medium tracking-widest">
                {images[index].title ?? images[index].alt}
              </h2>
              <p className="text-sm leading-relaxed text-ink/70">
                {images[index].text ?? images[index].alt}
              </p>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs uppercase tracking-widest text-ink/40">
                  {index + 1} / {images.length}
                </span>
                <ButtonLink href="/blog">Read More</ButtonLink>
              </div>
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next image"
            className="flex size-9 shrink-0 cursor-pointer items-center justify-center border border-line text-ink transition-colors hover:border-pink hover:text-pink"
          >
            <ChevronRightIcon className="size-5" />
          </button>
        </div>
      )}
    </dialog>
  );
}
