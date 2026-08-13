import CommentForm from "@/app/ui/blog/comment-form";
import { formatPostDate, type Comment } from "@/app/lib/api";

function CommentBody({ comment }: { comment: Comment }) {
  return (
    <>
      <p className="text-xs uppercase tracking-widest text-ink/60">
        <span className="text-pink">{comment.name}</span>
        {" — Posted "}
        <time dateTime={comment.date}>{formatPostDate(comment.date)}</time>
      </p>
      <p className="mt-2 text-sm text-ink/80">{comment.content}</p>
    </>
  );
}

export default function CommentList({
  comments,
  blogpostId,
  canReply,
}: {
  comments: Comment[];
  blogpostId: number;
  canReply: boolean;
}) {
  const byOldest = [...comments].sort((a, b) => a.date.localeCompare(b.date));
  const topLevel = byOldest.filter((comment) => !comment.parentId);
  const repliesTo = (id: number) =>
    byOldest.filter((comment) => comment.parentId === id);

  if (comments.length === 0) {
    return (
      <p className="text-sm text-ink/40">
        No comments yet. Be the first to say something.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-8">
      {topLevel.map((comment) => (
        <li key={comment.id} className="border-l border-line pl-6">
          <CommentBody comment={comment} />

          {repliesTo(comment.id).length > 0 && (
            <ul className="mt-6 flex flex-col gap-6">
              {repliesTo(comment.id).map((reply) => (
                <li key={reply.id} className="border-l border-line pl-6">
                  <CommentBody comment={reply} />
                </li>
              ))}
            </ul>
          )}

          {canReply && (
            <details className="mt-4">
              <summary className="cursor-pointer text-xs uppercase tracking-widest text-ink/60 transition-colors hover:text-pink">
                Reply
              </summary>
              <div className="mt-4">
                <CommentForm
                  blogpostId={blogpostId}
                  parentId={comment.id}
                  label={`Reply to ${comment.name}`}
                  submitLabel="Reply"
                />
              </div>
            </details>
          )}
        </li>
      ))}
    </ul>
  );
}
