import { Textarea } from "@/app/ui/field";
import Form, { SubmitButton } from "@/app/ui/forms/form";
import { addComment } from "@/app/lib/actions";

export default function CommentForm({
  blogpostId,
  parentId,
  label = "Your Comment",
  submitLabel = "Submit",
}: {
  blogpostId: number;
  parentId?: number;
  label?: string;
  submitLabel?: string;
}) {
  return (
    <Form action={addComment} className="flex flex-col gap-4">
      <input type="hidden" name="blogpostId" value={blogpostId} />
      {parentId !== undefined && (
        <input type="hidden" name="parentId" value={parentId} />
      )}
      <Textarea name="content" label={label} rows={4} />
      <SubmitButton className="self-start">{submitLabel}</SubmitButton>
    </Form>
  );
}
