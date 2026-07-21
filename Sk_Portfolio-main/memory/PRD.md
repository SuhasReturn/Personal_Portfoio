# Suhas SK — Immersive Portfolio (Noomo Labs-inspired)

## Original Problem Statement
Build a highly immersive personal portfolio web application using React, Tailwind CSS, Framer Motion, and React Three Fiber — inspired by labs.noomoagency.com. Palette: pitch-black (#0d0d11), deep purple (#7B2CBF) accents, neon green (#39FF14) + hot pink (#FF00FF) highlights. Full-screen viewport, glassmorphism panels, dynamic canvas background, cursor-tracking 3D avatar, horizontal-scroll projects, contact form with validation.

## User Choices (2026-07-11)
- Bio: crafted placeholder professional content in Suhas' name (user will customize later).
- Avatar: animated 3D icosahedron/torus (not a photo) — cursor-tracking via R3F.
- Contact form: Resend email + MongoDB fallback (RESEND_API_KEY not yet provided).
- Audio: skipped — decorative visual-only toggle.
- Socials: github.com/SuhasReturn, linkedin.com/in/suhas-sk, x.com/SuhasSk256993, suhaskattimanisk@gmail.com

## Architecture
- **Backend**: FastAPI + Motor (MongoDB). Routes prefixed `/api`.
  - `GET /api/` — health check
  - `GET /api/projects` — 7 curated projects (based on GitHub SuhasReturn)
  - `POST /api/contact` — validates via Pydantic + EmailStr, stores in MongoDB, dispatches via Resend when key present
  - `GET /api/contact/messages` — list submissions
- **Frontend**: React 19 + Tailwind + Framer Motion + React Three Fiber + Lenis + sonner + react-hook-form + zod.
  - Components: Nav, Hero (R3F icosahedron), About (glassmorphism bento), Projects (sticky horizontal scroll via useScroll/useTransform), Contact (zod-validated form), AudioToggle, Footer, SmoothScroll (Lenis).

## Implemented (2026-07-11)
- ✅ Immersive hero with cursor-tracking 3D icosahedron (R3F, ambient lights, particle field)
- ✅ Animated status pill, name typography, tagline, social pills, scroll indicator
- ✅ About section — 4 glassmorphism cards + 4 stat blocks
- ✅ Horizontal-scroll Projects section with 7 project cards (data-driven from /api/projects), neon hover bloom
- ✅ Contact form (react-hook-form + zod), sonner success/error toasts, MongoDB persistence
- ✅ Resend integration wired (activates when RESEND_API_KEY is set in backend/.env)
- ✅ Sticky Nav with mobile menu, marquee footer
- ✅ Global Lenis smooth scroll, grain overlay, custom scrollbar
- ✅ Full data-testid coverage on interactive/informational elements
- ✅ 100% pass on testing_agent_v3 iteration_1 (7/7 backend pytest, all frontend UI checks)

## Backlog / Next Actions
- P0: User to provide Resend API key (add to `backend/.env` as RESEND_API_KEY, restart backend). Test end-to-end delivery.
- P1: Replace placeholder bio copy with real background from LinkedIn.
- P1: Add real photo/GLTF avatar if user wants to swap the icosahedron.
- P2: Add case-study modal for each project (deep-dive content).
- P2: Add resume PDF download link in Nav.
- P2: Add blog / writings section.

## Test Credentials
No auth. See `/app/memory/test_credentials.md`.
