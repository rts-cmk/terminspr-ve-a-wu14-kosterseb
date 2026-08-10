[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/BPx_cj6w)
# Project Documentation: NightClub Website

**Project Name:** NightClub Web Application  
**Developer Name:** Sebastian Køster  
**Class/Team:** Web-Udvikler [WU14][cite: 1]  
**School:** Roskilde Tekniske Skole  
**GitHub Repository:** [https://github.com/rts-cmk/terminspr-ve-a-wu14-kosterseb]
**Agile Project Board:** [[Link to GitHub Projects](https://github.com/orgs/rts-cmk/projects/8/views/1)]

---

## Access & Evaluation Credentials

* **Live Deployment URL:** [Insert Live URL / http://localhost:3000]
* **API Base URL:** `http://localhost:4000` (Cloned from `https://github.com/rts-cmk/night-club-api`)
* **Test User Account:**
  * **Email:** `user@nightclub.dk`
  * **Password:** `nightclub123!`

---

## Technology Stack

* **Frontend:** Next.js 16 | Tailwind
* **Build Tool:** [Vite / Webpack / None]
* **API Integration:** REST API running locally via Node.js/Express (`https://github.com/rts-cmk/night-club-api`)

---

## Architecture & Technical Choices

* **Responsive Design:** Mobile-first layout built to specification based on the Figma design file.
* **Sticky Navigation:** Main navbar snaps to the top of the viewport upon scrolling past the hero section.
* **API Integration:** Centralized fetch service layer handling requests, dynamic authentication, and input error messages.

---

## Scope & Completed Requirements

### 1. Mandatory Core Features
* **Header & Sticky Navigation:** Dynamic navigation with active link highlighting and sticky positioning on scroll.
* **Footer:** Displays operating hours, contact info, social links, and copyright info.
* **Homepage / Landing Page:**
  * **Hero:** Fullscreen view with random background selection and logo/tagline CSS entry animations.
  * **Section 1 (Welcome):** Interactive hover/touch animation (1.5-second border/text reveal).
  * **Section 2 (Events of the Month):** Auto-rotating event carousel connected to the API.
  * **Section 3 (Gallery):** Scroll-triggered entrance animations with full Lightbox modal view.
  * **Section 6 (Testimonials):** Dynamic guest testimonials fetched via API.
  * **Section 8 (Mailing List):** Email-validated newsletter form integrated with the API.
* **Contact Us:** Validated inquiry form sending data to the API.
* **Authentication:** Login and Register forms with validation and session handling.

### 2. [Video Player]
* **[Selected Option]:** Integrated media player controls, list handling, duration display, and media playback.

### 3. [Blog Module]
* **[Selected Option]:** API-driven listing, detailed view, interactive user feedback 

### 4. [Table Booking Module]
* **[Selected Option]:** API-driven listing, detailed view, interactive user feedback (comments/bookings), and management views ("My Comments" / "My Bookings")[cite: 1].

---