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
  content: string;
  asset: Asset;
};

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
