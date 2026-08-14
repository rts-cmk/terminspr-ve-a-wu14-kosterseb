import Image from "next/image";
import Link from "next/link";

export default function Pagination({
  page,
  totalPages,
  basePath = "/blog",
}: {
  page: number;
  totalPages: number;
  basePath?: string;
}) {
  if (totalPages < 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav aria-label="Blog pages" className="mt-16 flex justify-center">
      <ul className="flex items-center gap-4">
        {pages.map((number, index) => (
          <li key={number} className="flex items-center gap-4">
            {index > 0 && (
              <Image
                src="/icon/pager_divider.png"
                alt=""
                width={9}
                height={13}
                className="opacity-40"
              />
            )}
            <Link
              href={number === 1 ? basePath : `${basePath}?page=${number}`}
              aria-current={number === page ? "page" : undefined}
              aria-label={`Page ${number}`}
              className={`text-sm tracking-widest transition-colors ${
                number === page ? "text-pink" : "text-ink hover:text-pink"
              }`}
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
