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
  { path: "/blogposts", fields: ["id", "title", "author", "content"] },
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

console.log(failures === 0 ? "\nAll API checks passed." : `\n${failures} API check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
