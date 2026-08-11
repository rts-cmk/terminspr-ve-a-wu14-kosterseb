import Nav from "@/app/ui/nav";
import Hero from "@/app/ui/home/hero";
import Welcome from "@/app/ui/home/welcome";
import Events from "@/app/ui/home/events";
import Gallery from "@/app/ui/home/gallery";
import Testimonials from "@/app/ui/home/testimonials";
import Newsletter from "@/app/ui/home/newsletter";
import Section from "@/app/ui/section";
import SectionHeading from "@/app/ui/section-heading";

// The hero picks its background at random
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Nav />

      <main className="flex-1">
        <Welcome />
        <Events />
        <Gallery />

        <Section id="video">
          <SectionHeading title="Latest Video" />
          <p className="text-center text-sm text-ink/40">
            Video Player
          </p>
        </Section>

        <Testimonials />

        <Newsletter />
      </main>
    </>
  );
}
