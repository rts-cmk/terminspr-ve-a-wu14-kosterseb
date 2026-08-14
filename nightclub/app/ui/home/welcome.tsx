import Image from "next/image";
import CornerMarks from "@/app/ui/corner-marks";
import Section from "@/app/ui/section";
import SectionHeading from "@/app/ui/section-heading";
import { CocktailIcon, DishIcon, MusicIcon } from "@/app/ui/icons";

const OFFERS = [
  {
    title: "Night Club",
    image: "/content-img/thumb1.jpg",
    Icon: MusicIcon,
    text: "Live DJs every weekend and a dance floor that does not close before sunrise.",
  },
  {
    title: "Restaurant",
    image: "/content-img/reastaurant_1.jpg",
    Icon: DishIcon,
    text: "A full kitchen serving late, from small plates to a proper dinner before the night starts.",
  },
  {
    title: "Bar",
    image: "/content-img/thumb2.jpg",
    Icon: CocktailIcon,
    text: "Cocktails mixed to order, a long draught list and bartenders worth watching.",
  },
];

const STAGE_2 =
  "opacity-0 transition duration-300 delay-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100";
const STAGE_3 =
  "opacity-0 transition-opacity duration-500 delay-500 group-hover:opacity-100 group-focus-within:opacity-100";

export default function Welcome() {
  return (
    <Section id="welcome">
      <SectionHeading
        title={
          <>
            Welcome in Night<span className="text-pink">club</span>
          </>
        }
      />

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

            <div className="absolute inset-0 bg-bg/0 transition-colors duration-300 group-hover:bg-bg/85 group-focus-within:bg-bg/85" />

            <div className="pointer-events-none absolute inset-0">
              <span
                className={`absolute inset-x-0 top-0 h-px -translate-y-10 bg-pink ${STAGE_2}`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 h-px translate-y-10 bg-pink ${STAGE_2}`}
              />
              <CornerMarks size="size-8" className={STAGE_2} />
            </div>

            <div
              className={`absolute inset-0 flex flex-col items-center justify-center gap-4 px-10 text-center ${STAGE_3}`}
            >
              <span className="flex size-14 items-center justify-center border border-pink text-pink">
                <offer.Icon className="size-6" />
              </span>
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
