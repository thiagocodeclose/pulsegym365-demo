# PulseGym V3 - Copilot Instructions

## Project Mission
PulseGym is a realistic, premium gym marketing website demo used in sales conversations.
The website must first feel like a true gym website, and only then show the value of Pulse integrations.

## Core Storytelling Rule
1. Sell the gym first (experience, classes, community, trial, structure).
2. Reveal Pulse as an upgrade layer in specific blocks.
3. Never make the hero feel like SaaS product marketing.

## Website Modes
Maintain two public-facing modes with shared layout and components:
- `standard`: classic gym website experience.
- `pulse`: same website with connected business blocks.

Use `useSiteMode()` from `components/SiteModeProvider.tsx`.
Do not duplicate entire pages for each mode.

## Current Mode Architecture
- Provider: `components/SiteModeProvider.tsx`
- Toggle: `components/SiteModeToggle.tsx`
- Persistence: `localStorage` key `pulsegym_site_mode`
- URL sync: `?mode=standard` or `?mode=pulse`

## Required UX Direction
- Visual style: dark premium accessible, athletic, commercial.
- Brand colors:
  - Orange: `#F57C00`
  - Orange hover: `#FF8F1F`
  - Black: `#050505`
  - Graphite: `#121212`
  - Surface dark: `#1B1B1B`
  - Soft gray: `#B8B8B8`
  - White: `#FFFFFF`
- Keep pages in English.
- Avoid technical language in top sections.

## Data and Content Source
Use mock content from `lib/site-data.ts`.
Keep data structured and future-integration ready.

Important groups in data:
- `trainingStyles`
- `featuredClasses`
- `plans`
- `trainers`
- `facilities`
- `comparisonRows`
- `pulseEnhancements`
- `trialInterestOptions`

## Reusable V3 Components
Prefer these components when implementing features:
- `ModeAwareSection`
- `ModeBadge`
- `ComparisonTable`
- `FeatureStateCard`
- `DynamicPricingPreview`
- `DynamicClassesPreview`

## Page Expectations
### Home
Order and intent:
1. Hero focused on gym value.
2. Metrics trust bar.
3. Training styles.
4. Featured classes.
5. Membership preview.
6. Trainers.
7. Facilities.
8. Standard vs Pulse comparison.
9. Final CTA.

### Classes
- Strong visual class catalog.
- Filters UI.
- Standard = static cards.
- Pulse = live-style metadata and badges.

### Pricing
- Commercial plan names and positioning.
- 3-4 plans with one highlighted.
- Comparison table + short FAQ.
- Pulse mode adds live pricing cues without technical jargon.

### Free Trial
- Standard form vs smart lead capture contrast.
- Keep customer-facing language.
- No dashboard/admin style.

### Member Portal
- Public entry point feel.
- Standard: simple login-focused access.
- Pulse: connected quick actions (bookings, membership, billing, progress).

## Visual Media Rule
If local images are unavailable, keep elegant gradient-based fallbacks.
Never leave empty media blocks.

## Technical Constraints
- Keep Next.js app stable and build-safe.
- Avoid heavy dependencies.
- Maintain current navigation.
- Keep component architecture clean and extensible.
- Do not introduce inline styles; use CSS classes in `app/globals.css`.

## Deployment
- Site is deployed on **Vercel** via Git integration (repo: `thiagocodeclose/pulsegym365-demo`, branch: `main`).
- Every change **must be committed and pushed** to trigger a Vercel deploy. Never leave changes uncommitted.
- Use clear, descriptive commit messages in English.
- Env vars `NEXT_PUBLIC_CODEGYM_URL` and `NEXT_PUBLIC_GYM_SLUG` must be set in Vercel project settings (not committed).

## Language Rules
- **All site content** (copy, labels, CTAs, form fields, alt text, metadata) must be in **English** — target audience is US-based gym-goers.
- **Communication with the user (Thiago)** must be in **Portuguese (PT-BR)**.
- Never mix languages in the same content block.

## Definition of Done for New Changes
- Website still feels like a real gym website first.
- Mode switch remains functional and persistent.
- Standard vs Pulse value is clear in classes, pricing, trial, and portal.
- Build passes with `npm run build`.
- Changes are committed and pushed to `main`.
