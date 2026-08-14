# API notes

Things about the supplied API that cost me time. Written down so they are not
rediscovered.

## Query parameters have no underscore

`json-server` documents `_page`, `_limit`, `_sort`, `_embed`. The fork used
here, `json-server-relationship`, drops the underscore.

```
/blogposts?page=1&limit=3&sort=date&order=desc     works
/blogposts?_page=1&_limit=3                        returns every row, no error
```

This fails silently. The underscore version does not error, it just ignores the
paging,  so pagination looks broken rather than misconfigured. The API contract
check in CI now asserts `page`/`limit` and the `X-Total-Count` header so nobody
"corrects" it back.

## embed and expand

| | |
| --- | --- |
| `/blogposts/3?embed=comments` | a post with its comments |
| `/blogposts?page=1&limit=3&embed=comments` | works on a collection too, so comment counts cost no extra requests |
| `/comments?userId=2&expand=blogpost` | a comment with the post it belongs to |

`expand` is what lets My Comments link back to each post without a request per
row.

## Gallery rows had no title and one shared description

Every row came with `description: "A photo"` and nothing else, so the lightbox
had nothing to put under the image and all 14 images announced the same alt
text. Each row was given a `title` and a real `description` in `db.json` and
`db_backup.json`. The contract check asserts the title so it cannot quietly go
missing.

## Blog posts have no date

The supplied `blogposts` rows are `id, title, author, content, asset`. The
design's byline is "BY: Admin / 3 Comments / 16 Nov 2018", so a `date` field was
added to `db.json` and `db_backup.json`. Dates ascend with `id`, so newest-first
is the same order either way.

## There are only three blog posts

The brief says at most 3 posts per page with pagination at the bottom. With
three rows that is exactly one page. The pager still renders so the feature is
visible.

## Permissions

From `api/server.js`: `users: 600`, `comments: 644`, `reservations: 600`.

| | |
| --- | --- |
| `GET /comments` | public |
| `POST /comments` | 401 without a token |
| `DELETE /comments/:id` | 200 as the owner, 403 as anyone else |

Everything else like blogposts, events, gallery, testimonials, newsletters,
contact_messages is open.

## Auth responses

`POST /login` and `POST /register` both return:

```json
{ "accessToken": "...", "user": { "id": 2, "name": "Test User", "email": "user@nightclub.dk" } }
```

Failures come back as a bare JSON string, not an object: `"Incorrect password"`,
`"Cannot find user"`, `"Email already exists"`. `readErrorMessage` in
`app/lib/api.ts` handles both shapes.

The token expires after one hour, which is what the session cookie's `maxAge`
is set to.

## Replies

There is no reply field. json-server stores what it is given, so a reply is a
comment with `parentId`. It round-trips fine and is read back in
`app/ui/blog/comment-list.tsx`.

## db.json gets rewritten

Posting through the site rewrites `api/db.json`, and it comes back **without a
trailing newline**, which shows up as a diff. Worth checking after testing.

`cp api/db_backup.json api/db.json` resets it, but the test user has to be
registered again because passwords are bcrypt-hashed.
