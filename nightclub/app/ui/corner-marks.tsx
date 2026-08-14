export default function CornerMarks({
  size = "size-4",
  className = "",
}: {
  size?: string;
  className?: string;
}) {
  return (
    <>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute left-0 top-0 ${size} bg-pink [clip-path:polygon(0_0,100%_0,0_100%)] ${className}`}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-0 right-0 ${size} bg-pink [clip-path:polygon(100%_0,100%_100%,0_100%)] ${className}`}
      />
    </>
  );
}
