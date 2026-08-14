import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/app/ui/button";
import PostMeta from "@/app/ui/blog/post-meta";
import type { BlogPost } from "@/app/lib/api";

export default function BlogCard({
  post,
  commentCount,
  variant = "compact",
  flipped = false,
}: {
  post: BlogPost;
  commentCount: number;
  variant?: "compact" | "wide";
  flipped?: boolean;
}) {
  const href = `/blog/${post.id}`;

  if (variant === "compact") {
    return (
      <article className="group flex flex-col">
        <Link
          href={href}
          className="relative block aspect-[810/429] overflow-hidden"
        >
          <Image
            src={post.asset.url}
            alt={post.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <div className="flex flex-col gap-3 pt-5">
          <h3 className="text-lg font-medium tracking-widest">
            <Link href={href} className="transition-colors hover:text-pink">
              {post.title}
            </Link>
          </h3>
          <PostMeta
            author={post.author}
            date={post.date}
            commentCount={commentCount}
          />
          <p className="line-clamp-3 text-sm text-ink/70">{post.content}</p>
        </div>
      </article>
    );
  }

  return (
    <article className="grid items-center gap-8 md:grid-cols-2">
      <Link
        href={href}
        className={`group relative block aspect-[810/429] overflow-hidden ${
          flipped ? "md:order-2" : ""
        }`}
      >
        <Image
          src={post.asset.url}
          alt={post.title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-medium tracking-widest sm:text-2xl">
          <Link href={href} className="transition-colors hover:text-pink">
            {post.title}
          </Link>
        </h2>
        <PostMeta
          author={post.author}
          date={post.date}
          commentCount={commentCount}
        />
        <p className="line-clamp-6 text-sm text-ink/70">{post.content}</p>
        <ButtonLink href={href} className="mt-2 self-start">
          Read More
        </ButtonLink>
      </div>
    </article>
  );
}
