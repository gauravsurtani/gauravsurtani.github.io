# gauravsurtani.github.io

Gaurav Surtani's portfolio, live at https://gauravsurtani.github.io/.

It is a Next.js 15 static export (App Router, React 19, Tailwind CSS 4). There is no server: every page is a file in `out/`. The only runtime call is the optional [visitor tracker](#visitor-tracking), which is off by default.

The design concept is "Eval trace": claim, evidence, verdict. The hero summary is the claim, the career timeline is the evidence, and each claim is underlined when the timeline reaches the date that proves it. Amber always marks evidence.

## Run locally

Use Node 20. The deploy workflow uses Node 20.

```sh
npm install
npm run dev                  # http://localhost:3000
```

Static build, the same build that deploys:

```sh
npm run build                # writes out/
npx serve@14 out -l 4173     # http://localhost:4173
```

- `out/` holds `about.html`, not `about/index.html`. Use a server that maps `/about` to `about.html`. `serve` does. `python3 -m http.server` does not: `/about` returns 404.
- `npm run start` does not work with `output: 'export'`. Next exits with an error.
- In a git worktree, do not symlink `node_modules` from another checkout. `npm run dev` (Turbopack) then fails with "Next.js package not found". `npm run build` still works. Run `npm install` in the worktree instead.

## Deploy

A push to `master` runs `.github/workflows/deploy.yml`. The workflow runs `npm install` and `npm run build` on Node 20, uploads `out/`, and publishes it to GitHub Pages. You can also start it by hand (`workflow_dispatch`).

A merge to `master` goes live. The workflow has no staging step.

The workflow does not run `npm run check:facts`. `next build` runs ESLint and the TypeScript check, so lint errors and type errors stop the deploy. Run the [checks](#checks-before-publishing) before you merge.

## Visitor tracking

`src/components/site/Tracker.tsx` sends visit events to a separate Cloudflare Worker (local repo `~/projects/portfolio-tracker`: the event endpoint, the dashboard and the notifications).

- Off by default. With `NEXT_PUBLIC_TRACKER_URL` unset or empty at build time, the tracker adds no listeners and sends no requests, and the footer line does not show.
- To turn it on, set the repo variable `NEXT_PUBLIC_TRACKER_URL` (GitHub > Settings > Secrets and variables > Actions > Variables) to the Worker URL, for example `https://portfolio-tracker.<account>.workers.dev`. The deploy workflow passes it to `npm run build`. Locally: `NEXT_PUBLIC_TRACKER_URL=http://127.0.0.1:8787 npm run build`.
- Events: `view` (each page, also on client-side navigation), `section` (each home section seen, once per session), `click` (resume, copy email, mailto, LinkedIn, GitHub, project links, other outbound links), `heartbeat` (every 30 s while the tab is visible and in use, at most 20 per page) and `leave` (engaged time and max scroll depth). Each is one `POST <url>/e` with a `text/plain` JSON body (`sendBeacon`), so there is no CORS preflight.
- Owner mode: open any page with `?me=1` once per browser. Your events then carry `owner: true`: they are stored but never notified, and the dashboard hides them by default. `?me=0` turns it off. The flag is `localStorage["trk-me"]`.
- Personal links: create a code in the dashboard and send `https://gauravsurtani.github.io/?r=<code>`. The code is kept for the tab session (`sessionStorage["trk-r"]`), so later pages and clicks carry it. The tracker removes `?r=` and `?me=` from the address bar.
- Privacy: no cookies and no persistent visitor id. The session id is 16 random characters in `sessionStorage` (one tab). The Worker is built to count unique visitors with a daily-rotating hash and to never store the IP. Browsers that send Global Privacy Control or Do Not Track get no tracking at all. The footer says: "This site counts visits (page, referrer, approximate location). No cookies."

## Content

| Content | File | Notes |
|---|---|---|
| Resume data: hero, resume roles and their bullets, skills, contact | `src/content/resume.json` (types in `resume.ts`) | Must match `resume.md` and `public/resume.pdf`. |
| Experience records and timeline rows: every role's projects and stack, and the roles `resume.md` lists only as "Earlier" | `src/content/experience.json` (merged with `resume.json` in `resume.ts`) | Every role, project, link, stack item and number must be in `resume.md` or `content/experience-v1.txt` (the old portfolio's experience data). |
| Resume text | `resume.md` | The source of truth. `check:facts` compares `resume.json` with it. |
| Resume PDF | `public/resume.pdf` | Served at `/resume.pdf`. |
| Repositories | `src/lib/constants.ts` (`ALL_REPOSITORIES`) | Used by home Projects and `/projects`. The 4 home cards (which repos, tags, links) are in `src/components/home/Projects.tsx`. |
| Project write-ups | `src/app/projects/[slug]/page.tsx` (`projectsData`) | Keep `DETAILS` in `src/app/projects/ProjectsBrowser.tsx` in step. |
| Posts | `content/blog/*.md` | The file name is the slug. Frontmatter: `title`, `date`, `description`, `tags`, `author`. Write `description` in double quotes on one line (check 5 depends on it). |
| "Building now" (home and /about) | `content/building.json` + `src/components/home/about/rows.json` | Public rows only: names, plain labels (Building, In use, Built, Running) and proof lines from resume.md. The private gaurav-os status export is not published. |
| Things to build | `src/app/things-to-build/**/page.tsx` | Written in the page files. |
| `/about` story | `src/app/about/page.tsx` | Written in the page file. |

`npm run check:facts` (`scripts/check-facts.mjs`) prints `facts ok`, or fails when:

1. The hero summary is not in `resume.md` word for word.
2. A resume role bullet, company, title, place or date string is not in `resume.md`.
3. A role does not have exactly one `[[marked phrase]]`.
4. A skill item is not in `resume.md` (case-insensitive).
5. A built page in `out/` contains a forbidden AI-tone word. Posts under `out/blog/` are skipped. This check runs only if `out/` exists and reads whatever is there, so build first.
6. A file in `src/` contains `api.github.com`.
7. An Experience record (`experience.json`) has a role, project, link, stack item, date or number that is in neither `resume.md` nor `content/experience-v1.txt`; overrides a resume role's header or bullets; has a different title or years than `resume.md`'s Earlier line; has `s` or `e` that do not match its months; is out of date order; or uses "in production", "staging", "landed" or "since 2024".

It does not read `public/resume.pdf`, the resume roles' timeline months (`s`, `e`), `notes`, `aboutLede`, `education`, the `/about` story, or `DESCRIPTION` in `src/app/layout.tsx`. Check those by hand.

Update the resume in 3 steps:

1. Edit `resume.md`. Run `node scripts/resume/build.mjs` to rebuild `public/resume.pdf` from it (needs python3 with Playwright, and pdftotext for its check that the PDF text matches `resume.md`).
2. Copy the changed strings into `src/content/resume.json` word for word. Mark one phrase per role with `[[...]]`. For a new start or end month, set `s` or `e` to a decimal year (month m is `year + (m - 1) / 12`), or `"now"` for a current role. If the summary changed, also update `DESCRIPTION` in `src/app/layout.tsx` and the `/about` story.
3. Run `npm run build`, then `npm run check:facts`. Fix every line it prints.

## Structure

```
src/app/
  layout.tsx          fonts, metadata, pre-paint head script, nav, <main>, footer, MotionRoot
  template.tsx        adds .page-enter on client-side navigations only
  globals.css         tokens, base styles, shared classes, motion states
  page.tsx            /  report grid (hero, timeline card, about, experience), then projects, skills, contact
  about/              /about
  projects/           /projects (search and filters) and /projects/[slug] (5 write-ups)
  blog/               /blog and /blog/[slug] (posts from content/blog)
  things-to-build/    /things-to-build and its two spec pages
  not-found.tsx       404 page (out/404.html)
src/components/
  site/               the shell on every page: Navigation (+ nav.css), ThemeToggle, SiteFooter, PageHeader
  home/               home sections, the opening (Entrance, entrance.css) and the timeline (Trace, trace-api, TraceFollow, EvidenceStrip)
  motion/             shared motion: MotionRoot, reveal, scroll, land, split, Mark, MaskHeading
  ui/                 ProjectCard (+ the Ext arrow), CopyEmail, TileTitle
src/content/          resume.json, experience.json and their types (resume.ts)
src/lib/              constants.ts (repositories), posts.ts, state.ts
scripts/              check-facts.mjs
```

## Motion system

Every animated thing maps to one of these primitives. Code comments use the same numbers. Each file in `src/components/motion/` starts with a usage comment.

| # | Primitive | Trigger | What moves | Where |
|---|---|---|---|---|
| P1 | Stream | home opening | hero name, role and summary tokens fade in (3px blur on fine pointers) | `Hero.tsx`, `entrance.css` |
| P2 | Sweep | home opening | amber cursor runs 2018 to today; each bar grows from its start month | `Trace.tsx`, `Entrance.tsx` |
| P3 | Rise, Mask | block top crosses 85% of the viewport, once; page `h1` on mount | `[data-ri]` items fade and rise 6px; heading words rise out of a line mask | every route (`reveal.ts`, `MaskHeading.tsx`) |
| P4 | Span | same as Rise | `.rule` tick and hairline, contact email line, strip span draw from the left | records, tiles, Contact |
| P5 | Mark | hero: when the sweep reaches the evidence; roles: 420ms after the reveal | 2px amber underline, one word at a time | hero claims, one phrase per role (`Mark.tsx`) |
| P6 | Cite | reading line at 42% of the viewport; claim hover or focus; row hover | row indicator, cited span on the axis; other rows dim | home timeline (`TraceFollow.tsx`, `Entrance.tsx`) |
| P7 | Slide | active section or page changes | amber bar under the active nav link; phone section label rolls | `Navigation.tsx`, `EvidenceStrip.tsx` |
| P8 | Flash | claim click or row click | tint behind the landed record; focus moves to it | `land.ts` |
| P9 | Ping | a row's first cite, end of the sweep, contact dot | dot pops, ring grows and fades, once | `trace-api.ts`, `Contact.module.css` |
| P10 | Morph | theme, menu, copy, `<details>` | sun and moon, bars to X, Copy to check, plus to minus | `ThemeToggle.tsx`, `Navigation.tsx`, `CopyEmail.tsx`, `/state` |
| P11 | Press and hover | pointer | button fill wipe, link underline draw, 2px arrow nudge, press scale, tile tint | `globals.css`, every page |

The opening and the scroll scenes:

- The opening plays on a fresh load of `/` at the top with motion allowed (no `#hash`, no scroll restore). CSS keyframes on `html.intro` start at first paint. `Entrance.tsx` runs the JS half.
- Times from the opening's start (about 3.2s after load, under the intro): 0 to 1.6s the name, role and summary stream in. 1.1 to 2.5s the sweep runs and underlines each claim when it reaches its evidence: "building LLM applications", then the DeepLearning.AI claims, then "eight years" last. The page is idle at 3.2s.
- Any wheel, touch, click, key or 40px scroll finishes it in 180ms. The replay button in the card header plays it again.
- The intro, "Transcript to verdict", plays over the page first. Resume lines scroll past, amber marks lift the evidence phrases out, and they collapse into one amber line under the name and title. At about 3.2s the record splits along that line, the name flies onto the hero's name, and the opening above plays as it opens.
- Any wheel, touch, click or key jumps to a 0.4s reveal, and the opening still plays. Until the reveal, the page under the intro does not scroll.
- The intro plays only where the opening plays: a fresh top-of-page load of `/` with motion allowed. It never plays with a `#hash`, on a scrolled or restored load, under reduced motion, on other routes, or on a client-side navigation to `/`.
- Code: `public/intro/intro.js` and `intro.css`, loaded in `layout.tsx`. The head script adds `html.gi` and `brief`: the opening runs short under the intro, and the intro's reveal clicks `#replay` to play it in full.
- Scroll, 1024px and up: the sticky timeline card cites the record under a reading line at 42% of the viewport (row indicator, lit row, cited span). Under 1024px a 36px evidence strip under the nav does the same.
- The nav bar slides to the active link: on home by section, on subpages by route.

Rules:

- No JS shows everything. Hide-before-reveal styles apply only under `html.mo`, which the head script adds. JS-only controls are absent without JS: the theme toggle, copy button and project filters hide under `html:not(.js)`, replay hides under `html:not(.mo)`, and the evidence strip mounts only with JS. If `MotionRoot` has not mounted after 5s, the head script removes `mo`.
- `prefers-reduced-motion: reduce` shows everything with no movement. The head script does not add `mo`, and one global rule sets `animation: none` and `transition: none`. The theme swap is instant.
- One shared observer. `MotionRoot`, mounted once in the layout, owns every reveal. Components only render `data-rv` and `data-ri` markup with `rv()` and `ri()` from `reveal.ts`. A MutationObserver picks up nodes added later, such as filter results.
- One scroll driver. `scroll.ts` holds the only window scroll listener (passive) and runs at most one rAF per frame. Subscribers use cached geometry; frames do no layout reads. The only other rAF loops are the opening sweep and the intro, which stop when they end.
- Only `transform`, `opacity` and `clip-path` animate, plus the 3px blur on hero tokens. Hover changes colors only.
- Reveals stay revealed: `data-in` is never removed. Blocks above the viewport after a jump or deep link reveal at once.
- No scroll hijacking: no smooth scroll, no wheel capture (except the intro, until its reveal), no snap. Jumps are instant.
- These `<html>` classes are reserved: `js mo intro brief keepnav skip dark scrolling menu-open strip-on gi gi-up gi-sh`. No component class may use them.

Add a reveal block:

```tsx
import { ri, rv } from '@/components/motion/reveal'

<section {...rv()}>
  <div className="rule" />
  <p {...ri(0)}>First item</p>
  <p {...ri(1)}>Second item</p>
</section>
```

Do not nest one `data-rv` block inside another. Do not put `transform`, `opacity` or `transition` on a `[data-ri]` element in a CSS module; wrap it instead.

## Theme

- The theme follows the OS until the visitor picks one. The pick is saved in `localStorage` under the key `"theme"` (`"light"` or `"dark"`).
- The head script in `src/app/layout.tsx` applies it before first paint. Dark mode is the `dark` class on `<html>`. The script also sets `meta[name=theme-color]`.
- `ThemeToggle` saves the pick. While no pick is saved, the site keeps following OS changes. The swap is a View Transition circle wipe from the button, and it is instant without View Transitions or under reduced motion.
- Tailwind 4: `globals.css` declares `@custom-variant dark (&:where(.dark, .dark *));`, so `dark:` utilities follow the class, not the OS. There is no `tailwind.config.js`. Colors are CSS variables that switch under `html.dark` and reach Tailwind through `@theme inline` (`bg-bg`, `text-ink`, `border-line`), so `dark:` is rarely needed.
- No JS: the tokens follow the OS (`html:not(.js)` under `prefers-color-scheme: dark`) and the toggle is hidden.
- To go back to the OS setting, run `localStorage.removeItem('theme')` in the console and reload.

## Checks before publishing

```sh
npm run build
npm run lint
npm run check:facts
```

Then serve `out/` (`npx serve@14 out -l 4173`). Look at every page you changed at 320, 390 and 1440 px wide, in light and dark, and once with reduced motion on. In Chrome, DevTools > Rendering emulates `prefers-color-scheme` and `prefers-reduced-motion`. A saved theme pick wins over the emulated OS setting, so clear `localStorage.theme` first.
