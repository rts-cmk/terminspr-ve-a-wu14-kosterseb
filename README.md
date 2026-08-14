[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/BPx_cj6w)

# Night Club

Svendeprøve for Web-Udvikler WU14, Roskilde Tekniske Skole.
Built by Sebastian Køster.

A website for a nightclub in Copenhagen, built from a supplied Figma design and
a local REST API. Next.js 16 with the App Router, TypeScript, Tailwind 4 and
Zod.

<img src="dokumentation/images/nightclub_header.png" alt="Front page" width="480">

## What is in here

| Folder | |
| --- | --- |
| `nightclub/` | the site |
| `api/` | the local API, supplied by the school |
| `dokumentation/` | appendices to the report |
| `demoer/` | demo videos of the animations, supplied |
| `projektdokumentation.md` | the report |

## Running it

```bash
npm install
npm install --prefix nightclub
npm install --prefix api
npm run dev
```

Site on http://localhost:3000, API on http://localhost:4000. Both start
together.

Test user: `user@nightclub.dk` / `nightclub123!`

## What it does

The front page has the hero, the three offers, events, gallery, video,
testimonials, the newest blog posts and newsletter signup. Events, gallery,
testimonials and blog posts all come from the API.

<img src="dokumentation/images/gallery.png" alt="Gallery" width="480">

The two optional tasks are the **video player** and the **blog**. The blog has a
list with pagination, single posts, comments and replies for members, and a My
Comments page where you can delete your own.

<img src="dokumentation/images/blog.png" alt="Blog" width="480">

## Checks

Four run on every pull request: lint, formatting, build, and a contract check
that starts the API and verifies the fields the site reads.

<img src="dokumentation/images/github_CI.png" alt="CI" width="480">

## Documentation

- [`projektdokumentation.md`](projektdokumentation.md): the report
- [`dokumentation/technical-choices.md`](dokumentation/technical-choices.md): why things are built the way they are
- [`dokumentation/api-notes.md`](dokumentation/api-notes.md): the API's quirks
- [`dokumentation/not-built.md`](dokumentation/not-built.md): what is missing and why
