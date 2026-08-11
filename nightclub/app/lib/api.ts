export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

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
