import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogCard from "@/app/ui/blog/blog-card";
import Message from "@/app/ui/message";
import PageHeader from "@/app/ui/page-header";
import Pagination from "@/app/ui/pagination";
import Section from "@/app/ui/section";
import { getBlogPosts, type BlogPostWithComments } from "@/app/lib/api";

export const metadata: Metadata = { title: "Blog" };

const PER_PAGE = 3;

function readPage(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value;
  const page = Number(raw);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

export default async function BlogPage(props: PageProps<"/blog">) {
  const page = readPage((await props.searchParams).page);

  let posts: BlogPostWithComments[];
  let total: number;

  try {
    ({ posts, total } = await getBlogPosts({ page, limit: PER_PAGE }));
  } catch {
    return (
      <>
        <PageHeader title="Blog" />
        <Section>
          <Message tone="error" className="mx-auto max-w-xl text-center">
            The blog could not be loaded right now. Please try again later.
          </Message>
        </Section>
      </>
    );
  }

  if (total === 0) {
    return (
      <>
        <PageHeader title="Blog" />
        <Section>
          <Message className="mx-auto max-w-xl text-center">
            Nothing has been posted yet — check back soon.
          </Message>
        </Section>
      </>
    );
  }

  if (posts.length === 0) notFound();

  return (
    <>
      <PageHeader title="Blog" />
      <Section>
        <ul className="flex flex-col gap-16">
          {posts.map((post, index) => (
            <li key={post.id}>
              <BlogCard
                post={post}
                commentCount={post.comments.length}
                variant="wide"
                flipped={index % 2 === 1}
              />
            </li>
          ))}
        </ul>

        <Pagination page={page} totalPages={Math.ceil(total / PER_PAGE)} />
      </Section>
    </>
  );
}
