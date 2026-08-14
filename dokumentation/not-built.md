# What is not built

Honest list. Split into what I chose not to do, and what I ran out of time for.

---

## Chosen, not missing

**Table booking and the music player.** Two optional tasks had to be picked, one
from each pair. I picked the video player and the blog. Booking and the music
player were the alternatives, so they were never in scope.

`/book` still exists. The design's navigation has a Book Table item, and a link
that gives 404 reads as broken, so the route shows a short notice pointing at
the contact form.

**No live version.** The assignment says the API runs locally. A hosted frontend
could not reach `localhost:4000`, so every section that reads the API would fail
on a public url. Running locally is the intended setup, not a shortcut.

---

## Ran out of time

**Polish against the Figma, screen by screen.** The front page and the footer
have been checked against the demos and the mobile design. The rest of the
pages, blog, contact, log in, register, have not been put side by side with
their mobile frames.

**Mobile screenshots.** The documentation has no screenshots at phone width,
so the responsive work is described but not shown.

---

## Known rough edges

**Footer "Recent Posts" is static.** It should read the newest posts from the
API. It was left static early on because fetching in the root layout would make
every page dynamic, and by the time that stopped mattering I had moved on.

**Footer "Recent Tweets" is static and will stay that way.** There is no tweet
source in the API and the brief does not ask for one. It exists so the footer
matches the design.

**Events are dated 2022.** That is the supplied seed data. It reads oddly in a
demo but it is the data as handed out.

**No `loading.tsx` on the pages.** Deliberate, and explained in
`technical-choices.md`: it broke the 404 and redirect status codes. The front
page still streams its sections.

**Branch protection is not switched on.** The four CI checks run on every pull
request but they do not block a merge. I should have turned the rule on after
the first green run.

---

## If I had more time

1. Take the remaining pages through their mobile frames the way the footer was.
2. Wire the footer's Recent Posts to the API.
3. Add screenshots at phone width to the documentation.
4. Turn on branch protection.
