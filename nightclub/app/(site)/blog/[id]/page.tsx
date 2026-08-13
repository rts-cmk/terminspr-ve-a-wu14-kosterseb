import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CommentForm from "@/app/ui/blog/comment-form";
import CommentList from "@/app/ui/blog/comment-list";
import PostMeta from "@/app/ui/blog/post-meta";
import Message from "@/app/ui/message";
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
  } catch {
  }

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
              <Message tone="info" title="Night Club is members only">
                You need to be a registered member to comment on our blog.{" "}
                <Link href="/login" className="text-pink hover:underline">
                  Log in
                </Link>{" "}
                to join the conversation.
              </Message>
            )}
          </div>
        </section>
      </Section>
    </>
  );
}
