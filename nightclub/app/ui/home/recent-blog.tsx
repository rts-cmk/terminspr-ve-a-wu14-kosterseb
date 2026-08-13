import BlogCard from "@/app/ui/blog/blog-card";
import Message from "@/app/ui/message";
import Section from "@/app/ui/section";
import SectionHeading from "@/app/ui/section-heading";
import { getRecentBlogPosts, type BlogPostWithComments } from "@/app/lib/api";

export default async function RecentBlog() {
  let posts: BlogPostWithComments[];

  try {
    posts = await getRecentBlogPosts(3);
  } catch {
    return (
      <Section id="blog">
        <SectionHeading title="Recent Blog" />
        <Message tone="error" className="mx-auto max-w-xl text-center">
          The latest posts could not be loaded right now. Please try again
          later.
        </Message>
      </Section>
    );
  }

  if (posts.length === 0) {
    return (
      <Section id="blog">
        <SectionHeading title="Recent Blog" />
        <Message className="mx-auto max-w-xl text-center">
          Nothing has been posted yet — check back soon.
        </Message>
      </Section>
    );
  }

  return (
    <Section id="blog">
      <SectionHeading title="Recent Blog" />

      <ul className="grid gap-10 md:grid-cols-3">
        {posts.map((post) => (
          <li key={post.id}>
            <BlogCard post={post} commentCount={post.comments.length} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
