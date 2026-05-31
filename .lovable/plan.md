This is a large multi-area request. I'll group the work into phases and ship them in order. Confirm or trim before I start.

## 1. Copy rewrite (action-oriented, user-focused)
Rewrite headings, subheadings, hero copy, and section text across all public pages (except auth, dashboards, and shop). Shift from "what the site does" to "what you can do / become / achieve" and "the impact you'll make with us."
- `index.tsx` — hero, What We Do cards, featured infrastructure, CEO welcome, metric banner
- `about.tsx`, `services.tsx`, `services.$slug.tsx`
- `academy.tsx` — frame as personal growth & skill-building
- `news.tsx`, `gallery.tsx`, `collections.tsx`
- `ip-publications.tsx`, `rd-portfolio.tsx`, `careers.tsx`, `rent-a-lab.tsx`
- `covid-19.tsx`, `contact.tsx`
- Footer + Navbar labels where needed

## 2. Landing page restructure
- **Hero**: text on the LEFT, animated image stage on the RIGHT (mobile stacks). Image + headline cycle through 3 slides every ~5s with Framer Motion scale-in/cross-fade:
  - "Powering biotech innovation" → virus morphology
  - "Building the next generation of scientists" → gloved hand pipetting into a microfuge tube
  - "Leading the bioeconomy revolution" → abstract biotech/futuristic
- Generate the two missing hero images (gloved-hand pipetting, abstract biotech). Reuse existing `hero-virus.jpg`.
- **Featured infrastructure** becomes a single rotating panel: bold header + image + body side by side, cycling AquaPure → Mobile Lab → (one more). Each slide has its own CTA.
- **What We Do** redone vertically Ginkgo-style: futuristic background, floating card on top, writeup below — stacked vertically with scroll-reveal.
- **Top nav simplification**: keep Home, Services, About, R&D Portfolio + the Shop and Academy accent buttons. Move IP & Publications, News, Careers, Contact, Gallery, Collections, Covid-19 into a "Menu" dropdown/sheet.
- **Petal flower navigator**: SVG/Framer-motion flower with colored petals (Shop, Academy, Services, R&D, News, Contact). Click a petal → navigates. Hover scales the petal.

## 3. Animations pass (Framer Motion)
- Install `framer-motion`.
- Hero stage cross-fade + scale.
- Section reveals on scroll (replace some `useReveal` with motion variants).
- Petal hover/tap, dashboard card hover micro-interactions on landing.
- Featured rotator with `AnimatePresence`.

## 4. News detail page
- Already have `news.$slug.tsx`. Rebuild as a polished reading layout: large cover, byline, share row, prose body with `whitespace-pre-line`, related-news rail.

## 5. Academy (public) — Reader + Auth-gated purchase
- Add a **"My Library / Read"** section at the bottom of `/academy`. If signed in via academy account → list owned courses with progress %, details, and "Open reader" button.
- Course **reading view** (`/academy/read/$courseId`): image + page text + Back/Next buttons, page counter, progress saved to localStorage (server hookups left to your backend).
- **Buy flow**: clicking a course card opens a modal: if not signed into academy → tabbed Login / Sign Up form (email, full name, password, confirm). Once signed in, modal shows book name, details, price, "Buy now" button. Persist a lightweight academy session in `localStorage` (`ab.academy.user`) so I don't touch your existing `auth` for the main site.
- Owned-course detail page: progress %, last-read page, practical dates chosen, "Continue reading" CTA.

## 6. Shop — Track order page
- New route `/shop/track`: input for tracking code → shows mocked status timeline (Ordered → Packed → Shipped → Out for delivery → Delivered).
- Add "Track Order" link to the shop sub-navbar in `shop.tsx`.

## 7. Dashboards (admin + editor) — Academy upgrades
- Add **PDF upload** field to the course modal in `admin.academy.tsx` and `editor.academy.tsx` (sends `pdf` in the same FormData).
- Make course rows clickable → new route `/admin/academy/$id` and `/editor/academy/$id` showing:
  - Total enrolled students
  - Student table: full name, email, progress %, chosen practical dates
  - Course meta (title, level, price, PDF link)
- **Website settings → practical dates manager**: in `admin.settings.tsx`, add an "Add date" button that opens a calendar (shadcn `Calendar` in a popover). Stores an array of ISO dates in site content. Show as removable chips. Surface those dates inside the academy purchase modal so students pick one.

## 8. Plumbing
- Extend `site-content.tsx` with `practicalDates: string[]`, `academyUsers`, and `academyEnrollments` (localStorage only, no backend writes).
- Generate missing hero images.

---

### What I will NOT touch
- `src/hooks/useFetch.ts`, `src/lib/auth.tsx`, backend wiring, existing `/api/v1/*` calls in admin/editor academy and messages.
- Auth pages, existing shop business logic, existing dashboard data fetching.

### Tech notes
- Add `framer-motion` via `bun add framer-motion`.
- Use shadcn `Calendar` + `Popover` (already installed) for date picker.
- Academy account is a separate localStorage namespace (`ab.academy.*`) so it does not collide with the main `ab.auth.*` admin/editor auth.
- All new copy stays in JSX — no token changes.

This is roughly 25–30 file edits + ~6 new files + 2 generated images. Want me to proceed with the whole plan, or trim a phase?