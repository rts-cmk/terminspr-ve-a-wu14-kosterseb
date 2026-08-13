import Section from "@/app/ui/section";
import SectionHeading from "@/app/ui/section-heading";
import Spinner from "@/app/ui/spinner";

/** for a single front-page section while its data arrives. */
export function SectionLoading({ title }: { title: string }) {
  return (
    <Section>
      <SectionHeading title={title} />
      <div className="flex min-h-40 items-center justify-center">
        <Spinner label={`Loading ${title.toLowerCase()}`} />
      </div>
    </Section>
  );
}

/** for a whole route while it loads. */
export function PageLoading({ label = "Loading" }: { label?: string }) {
  return (
    <Section>
      <div className="flex min-h-64 items-center justify-center">
        <Spinner label={label} />
      </div>
    </Section>
  );
}
