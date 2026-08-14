import Image from "next/image";
import { ButtonLink } from "@/app/ui/button";
import CornerMarks from "@/app/ui/corner-marks";
import Carousel from "@/app/ui/carousel";
import Message from "@/app/ui/message";
import Section from "@/app/ui/section";
import SectionHeading from "@/app/ui/section-heading";
import { apiGet, formatDate, formatTime, type Event } from "@/app/lib/api";

/** The design puts two events on every slide. */
const PER_SLIDE = 2;

function EventCard({ event }: { event: Event }) {
  return (
    <article className="group relative aspect-[570/403] overflow-hidden">
      <Image
        src={event.asset.url}
        alt={event.title}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-bg/0 transition-colors duration-500 group-hover:bg-bg/75 group-focus-within:bg-bg/75" />

      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
        <CornerMarks size="size-10" />
      </div>

      <div className="absolute inset-x-0 top-[22%] flex justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
        <ButtonLink href="/book" variant="solid">
          Book Now
        </ButtonLink>
      </div>

      <div className="absolute inset-x-0 bottom-11 flex flex-col gap-2 px-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
        <h3 className="text-base font-medium tracking-widest">{event.title}</h3>
        <p className="line-clamp-3 text-xs leading-relaxed text-ink/70">
          {event.description}
        </p>
      </div>

      <p className="absolute inset-x-0 bottom-0 flex flex-wrap items-center gap-x-4 gap-y-1 bg-pink px-4 py-3 text-xs uppercase tracking-widest text-ink">
        <time dateTime={event.date}>{formatDate(event.date)}</time>
        <span>{formatTime(event.date)}</span>
        <span>{event.location}</span>
      </p>
    </article>
  );
}

function chunk(events: Event[], size: number) {
  const slides: Event[][] = [];
  for (let start = 0; start < events.length; start += size) {
    slides.push(events.slice(start, start + size));
  }
  return slides;
}

export default async function Events() {
  let events: Event[];

  try {
    events = await apiGet<Event[]>("/events");
  } catch {
    return (
      <Section id="events" background="/bg/slider_bg_overlay.png">
        <SectionHeading title="Events of the Month" />
        <Message tone="error" className="mx-auto max-w-xl text-center">
          We could not load this month&apos;s events right now. Please try again
          later.
        </Message>
      </Section>
    );
  }

  if (events.length === 0) {
    return (
      <Section id="events" background="/bg/slider_bg_overlay.png">
        <SectionHeading title="Events of the Month" />
        <Message className="mx-auto max-w-xl text-center">
          No events are announced yet check back soon.
        </Message>
      </Section>
    );
  }

  const slides = chunk(events, PER_SLIDE).map((group) => (
    <div key={group[0].id} className="grid gap-8 md:grid-cols-2">
      {group.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  ));

  return (
    <Section id="events" background="/bg/slider_bg_overlay.png">
      <SectionHeading title="Events of the Month" />
      <Carousel slides={slides} label="Events of the month" />
    </Section>
  );
}
