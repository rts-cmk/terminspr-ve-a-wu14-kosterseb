import Nav from "@/app/ui/nav";
import { getSession } from "@/app/lib/session";
import Hero from "@/app/ui/home/hero";
import Welcome from "@/app/ui/home/welcome";
import Events from "@/app/ui/home/events";
import Gallery from "@/app/ui/home/gallery";
import Video from "@/app/ui/home/video";
import Testimonials from "@/app/ui/home/testimonials";
import Newsletter from "@/app/ui/home/newsletter";

// The hero picks its background at random
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await getSession();

  return (
    <>
      <Hero />
      <Nav loggedIn={Boolean(session)} />

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
