"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/app/ui/icons";

export default function Carousel({
  slides,
  label,
  interval = 6000,
}: {
  slides: ReactNode[];
  label: string;
  interval?: number;
}) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    if (count < 2 || hovered || stopped) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(
      () => setIndex((current) => (current + 1) % count),
      interval,
    );
    return () => clearInterval(timer);
  }, [count, hovered, stopped, interval]);

  function goTo(next: number) {
    setStopped(true);
    setIndex(((next % count) + count) % count);
  }

  if (count === 0) return null;

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="relative"
    >
      <div className="overflow-hidden">
        <ul
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, position) => (
            <li
              key={position}
              aria-roledescription="slide"
              aria-label={`${position + 1} of ${count}`}
              aria-hidden={position !== index}
              // Keeps links inside off-screen slides out of the tab order.
              inert={position !== index}
              className="w-full shrink-0"
            >
              {slide}
            </li>
          ))}
        </ul>
      </div>

      {count > 1 && (
        <div className="mt-8 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous slide"
            className="flex size-9 cursor-pointer items-center justify-center border border-line text-ink transition-colors hover:border-pink hover:text-pink"
          >
            <ChevronLeftIcon />
          </button>

          <ul className="flex gap-3">
            {slides.map((_, position) => (
              <li key={position}>
                <button
                  type="button"
                  onClick={() => goTo(position)}
                  aria-label={`Go to slide ${position + 1}`}
                  aria-current={position === index}
                  className={`size-2.5 cursor-pointer rounded-full transition-colors ${
                    position === index ? "bg-pink" : "bg-line hover:bg-ink/50"
                  }`}
                />
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next slide"
            className="flex size-9 cursor-pointer items-center justify-center border border-line text-ink transition-colors hover:border-pink hover:text-pink"
          >
            <ChevronRightIcon />
          </button>
        </div>
      )}
    </div>
  );
}
