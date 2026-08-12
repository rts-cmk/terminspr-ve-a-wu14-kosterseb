import Nav from "@/app/ui/nav";
import Hero from "@/app/ui/home/hero";
import Welcome from "@/app/ui/home/welcome";
import Events from "@/app/ui/home/events";
import Gallery from "@/app/ui/home/gallery";
import Video from "@/app/ui/home/video";
import Testimonials from "@/app/ui/home/testimonials";
import Newsletter from "@/app/ui/home/newsletter";

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

        <Video />

        <Testimonials />

        <Newsletter />
      </main>
    </>
  );
}
