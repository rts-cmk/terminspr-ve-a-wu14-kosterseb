import Section from "@/app/ui/section";
import SectionHeading from "@/app/ui/section-heading";

export default function PageHeader({ title }: { title: string }) {
  return (
    <Section background="/bg/footerbg.jpg">
      <SectionHeading title={title} className="mb-0" />
    </Section>
  );
}
