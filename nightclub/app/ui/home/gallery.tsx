import Image from "next/image";
import Container from "@/app/ui/container";
import Message from "@/app/ui/message";
import Section from "@/app/ui/section";
import SectionHeading from "@/app/ui/section-heading";
import { apiGet, type GalleryPhoto } from "@/app/lib/api";

/** The design shows a small selection, not the whole gallery. */
const SHOWN = 7;

/*
  The design lays the seven tiles out edge to edge in four columns over two
  rows, with the third tile twice as tall (it is the only source image that is
  970x674 rather than 970x560). Grid auto-placement produces exactly that from
  natural order, so the tiles stay in the order the API returns them:

    col1   col2   col3    col4
    1      2      3       4
    5      6      (tall)  7
*/
const TALL_TILE = 2;

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

  const selection = photos.slice(0, SHOWN);

  if (selection.length === 0) {
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

      <ul className="grid auto-rows-[29vw] grid-cols-2 gap-2 md:auto-rows-[14vw] md:grid-cols-4">
        {selection.map((photo, index) => {
          const isTall = index === TALL_TILE;

          return (
            <li
              key={photo.id}
              className={`group relative overflow-hidden ${
                isTall ? "row-span-2" : ""
              }`}
            >
              <Image
                src={photo.asset.url}
                alt={photo.description}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-pink/0 transition-colors duration-500 group-hover:bg-pink/20" />
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
