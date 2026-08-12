import Image from "next/image";
import Carousel from "@/app/ui/carousel";
import Message from "@/app/ui/message";
import Section from "@/app/ui/section";
import SectionHeading from "@/app/ui/section-heading";
import { FacebookIcon, TwitterIcon } from "@/app/ui/icons";
import { apiGet, type Testimonial } from "@/app/lib/api";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const socials = [
    {
      href: testimonial.facebook,
      label: `${testimonial.name} on Facebook`,
      Icon: FacebookIcon,
    },
    {
      href: testimonial.twitter,
      label: `${testimonial.name} on Twitter`,
      Icon: TwitterIcon,
    },
  ].filter((social) => Boolean(social.href));

  return (
    <figure className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
      <Image
        src={testimonial.asset.url}
        alt={testimonial.name}
        width={170}
        height={170}
        className="size-24 rounded-full object-cover"
      />

      <blockquote className="text-sm text-ink/70 sm:text-base">
        {testimonial.content}
      </blockquote>

      <figcaption className="text-xs uppercase tracking-widest text-pink">
        {testimonial.name}
      </figcaption>

      {socials.length > 0 && (
        <ul className="flex gap-3">
          {socials.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex size-9 items-center justify-center border border-line text-ink/60 transition-colors hover:border-pink hover:text-pink"
              >
                <Icon />
              </a>
            </li>
          ))}
        </ul>
      )}
    </figure>
  );
}

export default async function Testimonials() {
  let testimonials: Testimonial[];

  try {
    testimonials = await apiGet<Testimonial[]>("/testimonials");
  } catch {
    return (
      <Section id="testimonials" background="/bg/footerbg.jpg">
        <SectionHeading title="Testimonials" />
        <Message tone="error" className="mx-auto max-w-xl text-center">
          We could not load our guests&apos; reviews right now. Please try again
          later.
        </Message>
      </Section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <Section id="testimonials" background="/bg/footerbg.jpg">
        <SectionHeading title="Testimonials" />
        <Message className="mx-auto max-w-xl text-center">
          No reviews have been posted yet.
        </Message>
      </Section>
    );
  }

  const slides = testimonials.map((testimonial) => (
    <TestimonialCard key={testimonial.id} testimonial={testimonial} />
  ));

  return (
    <Section id="testimonials" background="/bg/footerbg.jpg">
      <SectionHeading title="Testimonials" />
      <Carousel slides={slides} label="Guest testimonials" interval={8000} />
    </Section>
  );
}
