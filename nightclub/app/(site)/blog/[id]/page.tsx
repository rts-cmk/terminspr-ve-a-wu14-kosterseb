import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/app/ui/button";
import CommentForm from "@/app/ui/blog/comment-form";
import CommentList from "@/app/ui/blog/comment-list";
import PostMeta from "@/app/ui/blog/post-meta";
import PageHeader from "@/app/ui/page-header";
import Section from "@/app/ui/section";
import { getBlogPost, type BlogPostWithComments } from "@/app/lib/api";
import { getSession } from "@/app/lib/session";

export async function generateMetadata(
  props: PageProps<"/blog/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;

  try {
    const post = await getBlogPost(id);
    return { title: post.title };
  } catch {
    return { title: "Blog post" };
  }
}

export default async function BlogPostPage(props: PageProps<"/blog/[id]">) {
  const { id } = await props.params;

  let post: BlogPostWithComments | null = null;

  try {
    post = await getBlogPost(id);
  } catch {}

  if (!post) notFound();

  const session = await getSession();
  const comments = post.comments ?? [];

  return (
    <>
      <PageHeader title="Blog Post" />

      <Section>
        <article className="mx-auto max-w-3xl">
          <div className="relative aspect-[810/429] overflow-hidden">
            <Image
              src={post.asset.url}
              alt={post.title}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              priority
              className="object-cover"
            />
          </div>

          <h1 className="mt-8 text-2xl font-medium tracking-widest sm:text-3xl">
            {post.title}
          </h1>

          <PostMeta
            author={post.author}
            date={post.date}
            commentCount={comments.length}
            className="mt-4"
          />

          <p className="mt-8 whitespace-pre-line text-sm leading-relaxed text-ink/80">
            {post.content}
          </p>
        </article>

        <section
          aria-labelledby="comments-heading"
          className="mx-auto mt-16 max-w-3xl"
        >
          <h2
            id="comments-heading"
            className="mb-8 text-lg font-medium tracking-widest"
          >
            {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
          </h2>

          <CommentList
            comments={comments}
            blogpostId={post.id}
            canReply={Boolean(session)}
          />

          <div className="mt-12">
            {session ? (
              <>
                <h3 className="mb-6 text-lg font-medium tracking-widest">
                  Leave a comment
                </h3>
                <CommentForm blogpostId={post.id} />
              </>
            ) : (
              <div className="flex flex-col items-center gap-5 px-6 py-12 text-center">
                <h3 className="text-lg font-medium tracking-widest">
                  Night<span className="text-pink">club</span> is members only
                </h3>
                <p className="max-w-md text-sm text-ink/70">
                  You need to be a registered member to comment our blog.
                </p>
                <ButtonLink href="/login">Log in</ButtonLink>
              </div>
            )}
          </div>
        </section>
      </Section>
    </>
  );
}
