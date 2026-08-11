import Image from "next/image";
import Section from "@/app/ui/section";
import SectionHeading from "@/app/ui/section-heading";

const OFFERS = [
  {
    title: "Night Club",
    image: "/content-img/thumb1.jpg",
    text: "Live DJs every weekend and a dance floor that does not close before sunrise.",
  },
  {
    title: "Restaurant",
    image: "/content-img/reastaurant_1.jpg",
    text: "A full kitchen serving late, from small plates to a proper dinner before the night starts.",
  },
  {
    title: "Bar",
    image: "/content-img/thumb2.jpg",
    text: "Cocktails mixed to order, a long draught list and bartenders worth watching.",
  },
];

const STAGE_2 = "opacity-0 transition duration-500 delay-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100";
const STAGE_3 = "opacity-0 transition-opacity duration-500 delay-1000 group-hover:opacity-100 group-focus-within:opacity-100";

export default function Welcome() {
  return (
    <Section id="welcome">
      <SectionHeading title="Welcome in Night Club" />

      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {OFFERS.map((offer) => (
          <li
            key={offer.title}
            tabIndex={0}
            className="group relative aspect-[370/474] overflow-hidden"
          >
            <Image
              src={offer.image}
              alt={offer.title}
              width={370}
              height={474}
              className="size-full object-cover"
            />

            {/* Stage 1 — the black box. */}
            <div className="absolute inset-0 bg-bg/0 transition-colors duration-500 group-hover:bg-bg/85 group-focus-within:bg-bg/85" />

            {/* Stage 2 — borders fly in from top and bottom. */}
            <div className="pointer-events-none absolute inset-6">
              <span className={`absolute inset-x-0 top-0 h-px -translate-y-10 bg-pink ${STAGE_2}`} />
              <span className={`absolute inset-x-0 bottom-0 h-px translate-y-10 bg-pink ${STAGE_2}`} />
            </div>

            {/* Stage 3 — the text. */}
            <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3 px-10 text-center ${STAGE_3}`}>
              <h3 className="text-lg font-medium tracking-widest">
                {offer.title}
              </h3>
              <p className="text-sm text-ink/70">{offer.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
