import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ButtonLink } from "@/app/ui/button";
import Form, { SubmitButton } from "@/app/ui/forms/form";
import PageHeader from "@/app/ui/page-header";
import Message from "@/app/ui/message";
import Section from "@/app/ui/section";
import {
  formatPostDate,
  getCommentsByUser,
  type CommentWithPost,
} from "@/app/lib/api";
import { deleteComment } from "@/app/lib/actions";
import { getSession } from "@/app/lib/session";

export const metadata: Metadata = { title: "My comments" };

export default async function MyCommentsPage() {

  const session = await getSession();
  if (!session) redirect("/login");

  let comments: CommentWithPost[];

  try {
    comments = await getCommentsByUser(session.userId);
  } catch {
    return (
      <>
        <PageHeader title="My Comments" />
        <Section>
          <Message tone="error" className="mx-auto max-w-2xl text-center">
            Your comments could not be loaded right now. Please try again later.
          </Message>
        </Section>
      </>
    );
  }

  return (
    <>
      <PageHeader title="My Comments" />

      <Section>
        <div className="mx-auto max-w-2xl">
          <p className="mb-8 text-sm text-ink/70">
            Signed in as <span className="text-pink">{session.name}</span>.
            Everything you have written on the blog is here.
          </p>

          {comments.length === 0 ? (
            <div className="flex flex-col items-center gap-5 border border-line px-6 py-12 text-center">
              <p className="text-sm text-ink/70">
                You have not commented on anything yet.
              </p>
              <ButtonLink href="/blog">Read the blog</ButtonLink>
            </div>
          ) : (
            <ul className="flex flex-col gap-6">
              {comments.map((comment) => (
                <li
                  key={comment.id}
                  className="flex flex-col gap-4 border border-line p-6"
                >
                  <p className="text-xs uppercase tracking-widest text-ink/60">
                    On{" "}
                    <Link
                      href={`/blog/${comment.blogpostId}`}
                      className="text-pink hover:underline"
                    >
                      {comment.blogpost?.title ?? "a post"}
                    </Link>
                    {" — "}
                    <time dateTime={comment.date}>
                      {formatPostDate(comment.date)}
                    </time>
                    {comment.parentId ? " — reply" : ""}
                  </p>

                  <p className="text-sm text-ink/80">{comment.content}</p>

                  <Form action={deleteComment}>
                    <input type="hidden" name="commentId" value={comment.id} />
                    <input
                      type="hidden"
                      name="blogpostId"
                      value={comment.blogpostId}
                    />
                    <SubmitButton className="self-start">Delete</SubmitButton>
                  </Form>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>
    </>
  );
}
