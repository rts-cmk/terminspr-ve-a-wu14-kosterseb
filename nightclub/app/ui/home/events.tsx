import Image from "next/image";
import { ButtonLink } from "@/app/ui/button";
import Carousel from "@/app/ui/carousel";
import Message from "@/app/ui/message";
import Section from "@/app/ui/section";
import SectionHeading from "@/app/ui/section-heading";
import { apiGet, formatDate, formatTime, type Event } from "@/app/lib/api";

/** The design puts two events on every slide. */
const PER_SLIDE = 2;

function EventCard({ event }: { event: Event }) {
  return (
    <article className="group h-full border border-line">
      <div className="relative aspect-[570/403] overflow-hidden">
        <Image
          src={event.asset.url}
          alt={event.title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-pink/0 transition-colors duration-500 group-hover:bg-pink/20" />
      </div>

      <div className="flex flex-col gap-3 p-6">
        <h3 className="text-lg font-medium tracking-widest">{event.title}</h3>

        <p className="flex flex-wrap gap-x-4 gap-y-1 text-xs uppercase tracking-widest text-pink">
          <time dateTime={event.date}>{formatDate(event.date)}</time>
          <span>{formatTime(event.date)}</span>
          <span className="text-ink/60">{event.location}</span>
        </p>

        <p className="line-clamp-3 text-sm text-ink/70">{event.description}</p>

        <ButtonLink href="/book" className="mt-2 self-start">
          Book Now
        </ButtonLink>
      </div>
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
          No events are announced yet — check back soon.
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
