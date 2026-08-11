export default function Spinner({ label = "Loading" }: { label?: string }) {
  return (
    <span role="status" aria-label={label} className="inline-flex">
      <span className="size-5 animate-spin rounded-full border-2 border-line border-t-pink" />
    </span>
  );
}
