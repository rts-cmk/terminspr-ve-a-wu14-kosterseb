export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export type Asset = { url: string };

export type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  asset: Asset;
};

export type GalleryPhoto = {
  id: number;
  description: string;
  asset: Asset;
};

export type Testimonial = {
  id: number;
  name: string;
  content: string;
  asset: Asset;
  facebook?: string;
  twitter?: string;
};

export type BlogPost = {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
  asset: Asset;
};

export type Comment = {
  id: number;
  blogpostId: number;
  userId: number;
  name: string;
  content: string;
  date: string;
  /**
   * The API has no concept of replies, but json-server stores whatever it is
   * given, so a reply is a comment carrying the id of the one it answers.
   * Top-level comments leave it null.
   */
  parentId?: number | null;
};

/** A post with its comments attached, via the API's `embed` parameter. */
export type BlogPostWithComments = BlogPost & { comments: Comment[] };

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${path}`);
  }

  return response.json() as Promise<T>;
}
export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function readErrorMessage(response: Response) {
  try {
    const body = await response.json();
    if (typeof body === "string") return body;
    if (body && typeof body.message === "string") return body.message;
  } catch {}
  return `Request failed (${response.status})`;
}

export async function apiPost<T>(
  path: string,
  body: unknown,
  token?: string,
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new ApiError(await readErrorMessage(response), response.status);
  }

  return response.json() as Promise<T>;
}

/** Formats an API date */
export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(iso));
}

/** Formats an API time */
export function formatTime(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export async function apiDelete(path: string, token: string) {
  const response = await fetch(`${API_URL}${path}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new ApiError(await readErrorMessage(response), response.status);
  }
}

/*
  json-server-relationship drops the underscore json-server uses: it is
  `page`, `limit`, `sort`, `order` and `embed`, not `_page`, `_limit` and so on.
  Getting this wrong is silent — `_page=1&_limit=3` returns every row with no
  error, so pagination looks broken rather than misconfigured.
*/

/** The blog list: newest first, one page at a time. */
export async function getBlogPosts({
  page = 1,
  limit = 3,
}: { page?: number; limit?: number } = {}): Promise<{
  posts: BlogPost[];
  total: number;
}> {
  const response = await fetch(
    `${API_URL}/blogposts?page=${page}&limit=${limit}&sort=date&order=desc`,
  );

  if (!response.ok) {
    throw new ApiError(await readErrorMessage(response), response.status);
  }

  const posts = (await response.json()) as BlogPost[];

  return {
    posts,
    // The header is how the API reports the unpaginated size; without it we
    // could not know how many pages there are.
    total: Number(response.headers.get("X-Total-Count") ?? posts.length),
  };
}

/** The newest posts, for the front page section and the footer. */
export async function getRecentBlogPosts(limit = 3) {
  const { posts } = await getBlogPosts({ page: 1, limit });
  return posts;
}

/** A single post with its comments already attached. */
export async function getBlogPost(id: string | number) {
  return apiGet<BlogPostWithComments>(`/blogposts/${id}?embed=comments`);
}

/** Every comment a member has written, newest first. */
export async function getCommentsByUser(userId: number) {
  return apiGet<Comment[]>(`/comments?userId=${userId}&sort=date&order=desc`);
}
