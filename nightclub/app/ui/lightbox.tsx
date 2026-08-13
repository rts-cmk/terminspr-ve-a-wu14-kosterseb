"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@/app/ui/icons";

export type LightboxImage = { url: string; alt: string };

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
      aria-modal="true"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      className="m-auto max-h-none max-w-none bg-transparent p-0 text-ink backdrop:bg-black/90"
    >
      {index !== null && (
        <div className="flex flex-col items-center gap-4 p-4">
          <div className="flex w-full items-center justify-between gap-4">
            <p className="text-xs uppercase tracking-widest text-ink/60">
              {index + 1} / {images.length}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex size-9 cursor-pointer items-center justify-center border border-line text-ink transition-colors hover:border-pink hover:text-pink"
            >
              <CloseIcon className="size-5" />
            </button>
          </div>

          <Image
            src={images[index].url}
            alt={images[index].alt}
            width={970}
            height={674}
            sizes="90vw"
            priority
            className="max-h-[70vh] w-auto object-contain"
          />

          <div className="flex w-full items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous image"
              className="flex size-10 cursor-pointer items-center justify-center border border-line text-ink transition-colors hover:border-pink hover:text-pink"
            >
              <ChevronLeftIcon className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next image"
              className="flex size-10 cursor-pointer items-center justify-center border border-line text-ink transition-colors hover:border-pink hover:text-pink"
            >
              <ChevronRightIcon className="size-5" />
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
