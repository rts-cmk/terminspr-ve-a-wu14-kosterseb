"use client";

import Image from "next/image";
import { useState } from "react";

export type Video = { src: string; title: string; date: string };

export default function VideoPlayer({ videos }: { videos: Video[] }) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const current = videos[index];

  function select(next: number) {
    setFailed(false);
    setIndex(next);
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

      <ul className="grid gap-4 sm:grid-cols-2">
        {videos.map((video, position) => {
          const active = position === index;

          return (
            <li key={video.src}>
              <button
                type="button"
                onClick={() => select(position)}
                aria-current={active}
                className={`flex w-full cursor-pointer flex-col items-start gap-1 border p-4 text-left transition-colors ${
                  active
                    ? "border-pink text-ink"
                    : "border-line text-ink/70 hover:border-ink/40 hover:text-ink"
                }`}
              >
                <span className="text-xs uppercase tracking-widest">
                  {video.title}
                </span>
                <span className="text-xs text-ink/50">{video.date}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
