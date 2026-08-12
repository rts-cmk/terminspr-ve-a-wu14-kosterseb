import Section from "@/app/ui/section";
import SectionHeading from "@/app/ui/section-heading";
import VideoPlayer, { type Video } from "@/app/ui/home/video-player";

const VIDEOS: Video[] = [
  {
    src: "/media/video-dj-crowd1.mp4",
    title: "Saturday Night Main Room",
    date: "Latest",
  },
  {
    src: "/media/video-dj-crowd-2.mp4",
    title: "Friday Warm-Up Set",
    date: "Previous",
  },
];

export default function Video() {
  return (
    <Section id="video">
      <SectionHeading title="Latest Video" />
      <div className="mx-auto max-w-4xl">
        <VideoPlayer videos={VIDEOS} />
      </div>
    </Section>
  );
}
