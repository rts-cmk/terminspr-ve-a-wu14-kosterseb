import Container from "@/app/ui/container";
import GalleryGrid from "@/app/ui/home/gallery-grid";
import Message from "@/app/ui/message";
import Section from "@/app/ui/section";
import SectionHeading from "@/app/ui/section-heading";
import { apiGet, type GalleryPhoto } from "@/app/lib/api";

const SHOWN = 7;
export default async function Gallery() {
  let photos: GalleryPhoto[];

  try {
    photos = await apiGet<GalleryPhoto[]>("/gallery");
  } catch {
    return (
      <Section id="gallery">
        <SectionHeading title="Night Club Gallery" />
        <Message tone="error" className="mx-auto max-w-xl text-center">
          The gallery could not be loaded right now. Please try again later.
        </Message>
      </Section>
    );
  }

  if (photos.length === 0) {
    return (
      <Section id="gallery">
        <SectionHeading title="Night Club Gallery" />
        <Message className="mx-auto max-w-xl text-center">
          There are no photos in the gallery yet.
        </Message>
      </Section>
    );
  }

  return (
    <Section id="gallery" fullWidth>
      <Container>
        <SectionHeading title="Night Club Gallery" />
      </Container>

      <GalleryGrid
        shown={SHOWN}
        images={photos.map((photo) => ({
          url: photo.asset.url,
          alt: photo.description,
          title: photo.title,
          text: photo.description,
        }))}
      />
    </Section>
  );
}
