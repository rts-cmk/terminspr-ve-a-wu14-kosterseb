"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/app/ui/icons";

export type Video = { src: string; title: string; date: string };

export default function VideoPlayer({ videos }: { videos: Video[] }) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const current = videos[index];

  function step(delta: number) {
    setFailed(false);
    setIndex((index + delta + videos.length) % videos.length);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="relative aspect-video w-full overflow-hidden border border-line">
        {failed ? (
          <>
            <Image
              src="/bg/no_video.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-40"
            />
            <p
              role="alert"
              className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-pink"
            >
              This video could not be played. Please try another one.
            </p>
          </>
        ) : (
          <video
            key={current.src}
            controls
            preload="metadata"
            poster="/content-img/video_poster.jpg"
            aria-label={current.title}
            onError={() => setFailed(true)}
            className="size-full bg-bg object-cover"
          >
            <source src={current.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      <div className="flex items-center justify-between gap-6">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous video"
          className="flex size-10 shrink-0 cursor-pointer items-center justify-center border border-line text-ink transition-colors hover:border-pink hover:text-pink"
        >
          <ChevronLeftIcon className="size-5" />
        </button>

        <p className="flex flex-col items-center gap-1 text-center">
          <span className="text-xs uppercase tracking-widest">
            {current.title}
          </span>
          <span className="text-xs text-ink/50">
            {current.date} — {index + 1} / {videos.length}
          </span>
        </p>

        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next video"
          className="flex size-10 shrink-0 cursor-pointer items-center justify-center border border-line text-ink transition-colors hover:border-pink hover:text-pink"
        >
          <ChevronRightIcon className="size-5" />
        </button>
      </div>
    </div>
  );
}
