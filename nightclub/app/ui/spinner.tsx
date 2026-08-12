import Image from "next/image";

export default function Spinner({ label = "Loading" }: { label?: string }) {
  return (
    <span role="status" aria-label={label} className="inline-flex">
      <Image
        src="/loader/madbars.gif"
        alt=""
        width={29}
        height={24}
        unoptimized
      />
    </span>
  );
}
