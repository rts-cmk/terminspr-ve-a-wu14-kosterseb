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

**The demo videos.** Four demo clips came with the assignment showing the
animations: the hero logo, section 1, section 2 and section 3. I built all four
animations from the written brief and the Figma file, but I never sat down and
compared them frame by frame with the demos.

They work, the logo folds in, the tagline drops, section 1 reveals over 1.5
seconds in three steps, the events rotate, the gallery flies in from the left,
but the timing and easing are my reading of the text, not a match against the
video. This is the clearest example of planning I should have done earlier:
the demos were in the repo from day one and I only registered them late.

**Polish.** Spacing and type sizes are consistent because they come from shared
tokens, but I have not gone through the site next to the Figma file screen by
screen.

---

## Known rough edges

**Gallery alt text.** All 14 gallery rows in the API share one description,
`"A photo"`. The code uses the field correctly, so the markup is right, but a
screen reader hears the same thing 14 times. Fixing it means writing real
descriptions into `db.json`, which I chose to leave as supplied.

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

1. Compare the four animations against the demo videos and correct the timing.
2. Wire the footer's Recent Posts to the API.
3. Write real gallery descriptions in `db.json`.
4. Turn on branch protection.
