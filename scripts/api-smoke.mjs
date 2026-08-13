/* Checks that the local API still answers with the shapes the app reads. */

const BASE = process.env.API_URL ?? "http://localhost:4000";

let failures = 0;

function check(label, condition, detail = "") {
  if (condition) {
    console.log(`  ok    ${label}`);
  } else {
    console.log(`  FAIL  ${label}${detail ? ` — ${detail}` : ""}`);
    failures += 1;
  }
}

async function get(path) {
  const response = await fetch(`${BASE}${path}`);
  if (!response.ok) throw new Error(`GET ${path} responded ${response.status}`);
  return response.json();
}

const COLLECTIONS = [
  { path: "/events", fields: ["id", "title", "description", "date", "location"] },
  { path: "/gallery", fields: ["id", "description"] },
  { path: "/testimonials", fields: ["id", "name", "content"] },
  { path: "/blogposts", fields: ["id", "title", "author", "content", "date"] },
];

console.log(`Checking API at ${BASE}`);

for (const { path, fields } of COLLECTIONS) {
  const rows = await get(path);

  check(`${path} returns a non-empty array`, Array.isArray(rows) && rows.length > 0);
  if (!Array.isArray(rows) || rows.length === 0) continue;

  const [row] = rows;
  const missing = fields.filter((field) => row[field] === undefined);
  check(`${path} rows have ${fields.join(", ")}`, missing.length === 0, `missing ${missing.join(", ")}`);

  check(
    `${path} rows expose asset.url`,
    typeof row.asset?.url === "string" && row.asset.url.startsWith("http"),
    `got ${JSON.stringify(row.asset)}`,
  );
}

const paged = await fetch(`${BASE}/blogposts?page=1&limit=1&sort=date&order=desc`);
const pagedRows = await paged.json();

check("blogposts honours page/limit", Array.isArray(pagedRows) && pagedRows.length === 1, `got ${pagedRows.length} rows`);
check(
  "blogposts reports X-Total-Count",
  Number(paged.headers.get("x-total-count")) > 0,
  `header was ${paged.headers.get("x-total-count")}`,
);

const sorted = await get("/blogposts?sort=date&order=desc");
check(
  "blogposts sorts newest first",
  sorted.length > 1 && sorted[0].date >= sorted[sorted.length - 1].date,
  `first ${sorted[0]?.date}, last ${sorted[sorted.length - 1]?.date}`,
);

const embedded = await get("/blogposts/3?embed=comments");
check("blogposts/:id?embed=comments attaches comments", Array.isArray(embedded.comments));
check("comments can be filtered by blogpostId", Array.isArray(await get("/comments?blogpostId=3")));

const login = await fetch(`${BASE}/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "downey@mail.dk", password: "theIronMan" }),
});

check("POST /login accepts the seeded user", login.ok, `responded ${login.status}`);

if (login.ok) {
  const auth = await login.json();
  check("login returns an accessToken", typeof auth.accessToken === "string" && auth.accessToken.length > 0);
  check(
    "login returns user id, name and email",
    typeof auth.user?.id === "number" &&
      typeof auth.user?.name === "string" &&
      typeof auth.user?.email === "string",
    `got ${JSON.stringify(auth.user)}`,
  );
}

const rejected = await fetch(`${BASE}/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "downey@mail.dk", password: "definitely-wrong" }),
});
check("POST /login rejects a wrong password", rejected.status === 400, `responded ${rejected.status}`);

const unauth = await fetch(`${BASE}/comments`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ blogpostId: 1, userId: 1, name: "x", content: "x", date: "2026-01-01T00:00:00.000Z" }),
});
check("POST /comments is rejected without a token", unauth.status === 401, `responded ${unauth.status}`);

console.log(failures === 0 ? "\nAll API checks passed." : `\n${failures} API check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
