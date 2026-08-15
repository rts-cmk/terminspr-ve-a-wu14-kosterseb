# What is not built

Honest list. Split into what I chose not to do, and what I ran out of time for.

This file is the written version. The board is the live one:
[GitHub Projects](https://github.com/orgs/rts-cmk/projects/8/views/1) — issues and pull requests are linked to it, so it
shows what was finished, in what order, and what is still open.

---

## Chosen, not missing

**Table booking and the music player.** Two optional tasks had to be picked, one
from each pair. I picked the video player and the blog. Booking and the music
player were the alternatives, so they were never in scope.

`/book` still exists. The design's navigation has a Book Table item, and a link
that gives 404 reads as broken, so the route shows a short notice pointing at
the contact form.

**No live version.** The assignment says the API runs locally. A hosted frontend
could not reach `localhost:4000`, if i had more time i would do a proper setup
via. Renderer and Github Pages.

---

## Ran out of time

**Polish against the Figma, screen by screen.** The front page and the footer
have been checked against the demos and the mobile design. The rest of the
pages, blog, contact, log in, register, have not been put side by side with
their mobile frames.

**Recent Post in Footer** I started making the footer component and forgot to 
return to it after i made the Blog module and functionality. Could be a short
fix in a new PR.

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

## Not checked

Things that exist in some form but were never verified properly.

**Screen reader.** The site has never been run through VoiceOver or any other
screen reader. Landmarks, headings and labels are written with it in mind, but
written with it in mind is not the same as tested.

**ARIA labels.** Nine distinct `aria-label`s cover the icon-only buttons: the
menu, the carousel arrows, the lightbox, the video arrows and the social links.
Nobody has gone through the site systematically to find what else needs one, or
whether the ones that exist read well out loud.

**Metadata.** Every page sets a title and the layout sets a description, and a
blog post takes its title from the post. There is no Open Graph or Twitter card
data, no per-page descriptions and no social preview image, so a shared link
will look plain.

**Screaming Frog SEO.** A scan with the tool was previously scheduled for optimization
of SEO, but was in the end not gotten to, it would be ideal before this site goes 
live that you would make a full run and fix whatever Screaming Frog (a modern and 
typical tool for webdevelopers) would have flagged.

---

## Not done at all

**Unit tests.** There are none. The API contract check in CI is the closest
thing: it starts the API and asserts the shapes the site reads. Everything else
was verified by hand.

**Peer review.** Nobody else has read the code. Pull requests were opened for
every piece of work, but they were all reviewed and merged by me.

**Live deployment and a hosted database.** Covered above: the assignment says
the API runs locally, and json-server writes to a file rather than a real
database. Putting it online would mean hosting the API somewhere and swapping
`db.json` for something that survives a restart. Neither was in scope.

**Admin panel.** There is no way to add an event, a gallery photo or a blog
post through the site. Content is edited in `db.json` by hand. The assignment
does not ask for one.

---

## If I had more time

1. Take the remaining pages through their mobile frames the way the footer was.
2. Wire the footer's Recent Posts to the API.
3. Add screenshots at phone width to the documentation.
4. Turn on branch protection.

Anything still open is on the board: https://github.com/orgs/rts-cmk/projects/8/views/1
