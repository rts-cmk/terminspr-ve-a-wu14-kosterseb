import Section from "@/app/ui/section";
import SectionHeading from "@/app/ui/section-heading";

/**
 * The design's "Headline w background" component: the title band that sits at
 * the top of every view except the front page, with the footer background
 * behind it. The front page uses the full-screen hero instead.
 */
export default function PageHeader({ title }: { title: string }) {
  return (
    <Section background="/bg/footerbg.jpg">
      <SectionHeading title={title} className="mb-0" />
    </Section>
  );
}
