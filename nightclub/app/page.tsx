import { Suspense } from "react";
import Nav from "@/app/ui/nav";
import { getSession } from "@/app/lib/session";
import Hero from "@/app/ui/home/hero";
import Welcome from "@/app/ui/home/welcome";
import Events from "@/app/ui/home/events";
import Gallery from "@/app/ui/home/gallery";
import Video from "@/app/ui/home/video";
import Testimonials from "@/app/ui/home/testimonials";
import RecentBlog from "@/app/ui/home/recent-blog";
import Newsletter from "@/app/ui/home/newsletter";
import { SectionLoading } from "@/app/ui/loading";

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
        <Suspense fallback={<SectionLoading title="Events of the Month" />}>
          <Events />
        </Suspense>
        <Suspense fallback={<SectionLoading title="Night Club Gallery" />}>
          <Gallery />
        </Suspense>

        <Video />

        <Suspense fallback={<SectionLoading title="Testimonials" />}>
          <Testimonials />
        </Suspense>

        <Suspense fallback={<SectionLoading title="Recent Blog" />}>
          <RecentBlog />
        </Suspense>

        <Newsletter />
      </main>
    </>
  );
}
