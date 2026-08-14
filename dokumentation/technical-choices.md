# Technical choices

Short notes on the decisions that were not obvious. The main report links here.

## Design tokens

The whole design is four colours. I read them out of the supplied assets rather
than picking them by eye: `#181818`, `#383838`, `#ff2a70` and white. They live
in `app/globals.css` as Tailwind theme tokens, so no component writes a hex
value. Greys are opacity on white, which keeps it at four.

## Nav placement and the (site) route group

The nav sits at the top of every page except the front page, where it sits at
the bottom of the hero and sticks on scroll.

`app/(site)/layout.tsx` renders the nav for all the inner pages. The front page
is outside that group and renders its own after the hero. `sticky top-0` then
handles both cases with no JavaScript, and nothing is duplicated.

## Server and client

Data is fetched in server components. Only what reacts to a click is a client
component. The carousel and the gallery get their content as props, so no API
code is shipped to the browser.

## noValidate

The forms turn off the browser's own validation. If it ran, it would block the
submit before Zod saw anything and show browser-styled messages in the
browser's language. One authority is easier to keep consistent with the design.

## Session

The cookie is `httpOnly` and its shape is checked with a Zod schema, so a
tampered cookie logs you out instead of half-rendering a page. It is not signed,
so it is not security on its own.

The real enforcement is the API: 401 without a token, 403 on someone else's
comment. I tested the second one by forging a delete for another member's
comment, it was refused and the comment survived.

## No loading.tsx on the pages

I tried a route-level `loading.tsx` under `(site)`. It broke the status codes:
`/blog?page=2` returned 200 instead of 404, and the `/my-comments` guard
returned 200 instead of 307. A `loading.tsx` starts streaming, and the status is
already sent before `notFound()` or `redirect()` runs.

Every page under `(site)` either redirects or 404s, so it was not worth it.

The front page keeps its `<Suspense>` boundaries because it has no guards and is
always 200. With a 1.5s delay on the API, the hero and the spinners show in
0.2s instead of the whole page waiting 1.7s.

## Lightbox on <dialog>

`app/ui/lightbox.tsx` uses the native `<dialog>`. `showModal()` gives focus
trapping, Escape to close, an inert background and scroll locking for free.
Only the arrow keys are wired by hand.

## IntersectionObserver, not CSS scroll animation

The gallery images fly in from the left when scrolled to. CSS
`animation-timeline: view()` would have been less code, but it is still missing
from Safari and Firefox. Reduced motion is handled with Tailwind's
`motion-safe:` so it needs no JavaScript at all.

## The reply form is a `<details>`

Revealing the reply box needs no state and no client component, and it works
with JavaScript off. The whole comment flow is progressive: the forms are
server actions, so they submit without JavaScript too.

## Pagination is links

The pager is `<Link>`, not a click handler. Every page has its own url, and the
back button behaves. It also renders when there is only one page, so the
feature is visible rather than looking missing.

## Reading the demo videos

A single poster frame is not enough to judge an animation. The four clips were
sampled into frames, and section 1's timing was measured by tracking how dark
the middle card gets frame by frame: it drops sharply between 2.5s and 2.8s,
which is the black box, then the text fades in until about 3.6s.

That is where the 0.3s cover and the roughly 1.0s total come from, rather than
the round 1.5s in the brief. Where the demo and the brief disagree the brief
wins on content, the demo wins on timing and layout: the event card keeps its
name, description and Book Now because the brief requires them, but they appear
on hover the way the video shows.

## CI

Four checks: Lint, Format, Build, API contract.

Build also type-checks, so a separate `tsc` job would add nothing. I left out
`npm audit`: `api/` has 35 known vulnerabilities from the supplied json-server
that I cannot fix without replacing the API I was told to use, and a check that
can never pass gets ignored and then all the checks get ignored.

The API contract check is the one that earns its place. Lint and build pass on a
broken `db.json`; it does not. I verified it can fail by pointing it at a
deliberately broken stub.
