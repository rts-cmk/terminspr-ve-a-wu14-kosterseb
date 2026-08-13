import { formatPostDate } from "@/app/lib/api";

export default function PostMeta({
  author,
  date,
  commentCount,
  className = "",
}: {
  author: string;
  date: string;
  commentCount: number;
  className?: string;
}) {
  return (
    <p
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-widest text-ink/60 ${className}`}
    >
      <span>
        By: <span className="text-pink">{author}</span>
      </span>
      <span aria-hidden="true">/</span>
      <span>
        {commentCount} {commentCount === 1 ? "Comment" : "Comments"}
      </span>
      <span aria-hidden="true">/</span>
      <time dateTime={date}>{formatPostDate(date)}</time>
    </p>
  );
}
