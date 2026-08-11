import Image from "next/image";

const BACKGROUNDS = ["/bg/header_bg_1.jpg", "/bg/header_bg_2.jpg"];

/**
 * Picked outside the component body: render must stay pure, and this needs to
 * produce a new value per request rather than per re-render.
 */
async function pickBackground() {
  return BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
}

/**
 * Full-screen hero. One of the two backgrounds is chosen at random on every
 * page load (the page is dynamic, so this re-runs per request). The logo folds
 * in first, then the tagline drops in underneath it.
 */
export default async function Hero() {
  const background = await pickBackground();

  return (
    <header className="relative isolate flex min-h-screen flex-col justify-center overflow-hidden">
      <Image
        src={background}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-bg/60" />

      <div className="flex flex-col items-center gap-6 px-gutter text-center">
        <Image
          src="/icon/Logo.svg"
          alt="Night Club"
          width={770}
          height={116}
          priority
          className="h-auto w-full max-w-[min(90vw,770px)] animate-fold-in"
        />
        <p className="animate-drop-in text-sm uppercase tracking-[0.4em] text-ink/80 sm:text-base">
          Have a good time
        </p>
      </div>

      <Image
        src="/bottom_line.png"
        alt=""
        width={1364}
        height={109}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-auto w-full select-none"
      />
    </header>
  );
}
