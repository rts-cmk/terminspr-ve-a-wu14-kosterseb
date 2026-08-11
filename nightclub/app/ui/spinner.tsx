export default function Spinner({ label = "Loading" }: { label?: string }) {
  return (
    <span role="status" aria-label={label} className="inline-flex">
      <img src="/Users/sebastiankoster/terminspr-ve-a-wu14-kosterseb/nightclub/public/loader/madbars.gif" alt="" />
    </span>
  );
}
