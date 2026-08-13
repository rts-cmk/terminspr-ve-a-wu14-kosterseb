import { cookies } from "next/headers";

const COOKIE_NAME = "nightclub_session";

/** The API signs its JWT with a one hour expiry, so the cookie matches it. */
const MAX_AGE_SECONDS = 60 * 60;

export type Session = {
  token: string;
  userId: number;
  name: string;
  email: string;
};

export async function getSession(): Promise<Session | null> {
  const raw = (await cookies()).get(COOKIE_NAME)?.value;
  if (!raw) return null;

  try {
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

/** Only callable from a Server Action or Route Handler. */
export async function createSession(session: Session) {
  (await cookies()).set(COOKIE_NAME, JSON.stringify(session), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function destroySession() {
  (await cookies()).delete(COOKIE_NAME);
}
