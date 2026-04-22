# Website Widget Integration System — Technical Documentation

**Date:** April 22, 2026  
**Status:** ✅ Complete — BFF Architecture (v3.0) + Sales Demo Layer  
**Platform:** CodeGym — AI-Powered Gym Management SaaS

---

## ⚠️ BREAKING CHANGE — Architecture Update (April 22, 2026)

The widget system was **migrated from direct Supabase RPCs to a BFF (Backend for Frontend) gateway pattern**. Any agent or developer working on this project must use the new architecture described below.

### What changed
| Before (v2) | After (v3 — current) |
|---|---|
| Iframes called Supabase RPCs directly with anon key | All data flows through `/api/widgets/*` gateway routes on `app.codegyms.com` |
| `data-supabase-url` / `data-supabase-key` meta tags | **Removed** — never acceptable to expose credentials on gym sites |
| `codegym-bolt.vercel.app` as base URL | **`app.codegyms.com`** is the production domain |
| Write operations: no auth required | Write operations require `widget_public_key` UUID |
| `hours` widget type | **Renamed to `info`** — includes hours, address, contact details |

---

## 1. Overview

The Website Widget Integration System enables gym owners to embed interactive widgets on their websites via iframes. The system uses a **BFF gateway** so that **zero Supabase credentials are ever exposed on external gym websites**.

**Key architectural decisions:**
- **iframe isolation** — CSS sandboxing, security, reuses Next.js pages at `/widgets/[type]/[slug]`
- **BFF gateway** — all widget data flows server-side through `/api/widgets/config`, never directly to Supabase
- **Slug-based URLs** — `https://app.codegyms.com/widgets/[type]/[slug]`
- **widget_public_key** — UUID required for all write operations (leads, bookings, AI)
- **4 integration modes** — Universal script, Individual widgets, Direct links, Native Form Bridge

### Security model

| Operation | Auth required | How |
|---|---|---|
| READ (schedule, pricing, info, etc.) | slug only | Data is public, no key needed |
| WRITE (leads, bookings, AI agent) | slug + `widget_public_key` UUID | Key in `data-key` attribute |
| EMBED (iframes) | — | `frame-ancestors` CSP per allowed domain |

### 1.1 Sales Demo Controller Layer (Before/After Showcase)

The `pulsegym365-demo` website demonstrates the before/after integration toggle.

#### Components

| Component | File | Responsibility |
|---|---|---|
| `SiteModeProvider` | `components/SiteModeProvider.tsx` | Global mode state (`standard` vs `pulse`) |
| `SiteModeToggle` | `components/SiteModeToggle.tsx` | UI toggle button |
| `WidgetZone` | `components/WidgetZone.tsx` | Conditional: static content (standard) vs iframe (pulse) |
| `DynamicClassesPreview` | `components/DynamicClassesPreview.tsx` | `/classes` page dynamic widget |
| `DynamicPricingPreview` | `components/DynamicPricingPreview.tsx` | `/pricing` page dynamic widget |
| `GlobalWidgets` | `components/GlobalWidgets.tsx` | Site-wide widgets (AI Chat, lead capture) |

#### Per-route widget mapping

| Route | Widget type | iframe URL |
|---|---|---|
| `/` footer Hours section | `info` | `https://app.codegyms.com/widgets/info/pulsegym?embed=1` |
| `/classes` | `schedule` | `https://app.codegyms.com/widgets/schedule/pulsegym?embed=1` |
| `/pricing` | `pricing` | `https://app.codegyms.com/widgets/pricing/pulsegym?embed=1` |
| `/trainers` | `instructors` | `https://app.codegyms.com/widgets/instructors/pulsegym?embed=1` |
| `/contact` | `info` | `https://app.codegyms.com/widgets/info/pulsegym?embed=1` |

#### Runtime configuration (environment variables)

```env
NEXT_PUBLIC_CODEGYM_URL=https://app.codegyms.com    # Production domain — NOT codegym-bolt.vercel.app
NEXT_PUBLIC_GYM_SLUG=pulsegym
NEXT_PUBLIC_WIDGET_KEY=ef968315-2b18-41fb-b23b-94348e0eb875   # Required for write ops
```

---

## 2. Architecture Diagram (v3 — BFF)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     GYM OWNER'S WEBSITE (e.g. pulsegym365-demo)        │
│                                                                         │
│  Option 1 (Universal):                                                  │
│    <script src="https://app.codegyms.com/widgets/loader.js"            │
│      data-gym="pulsegym" data-key="UUID"></script>                     │
│                                                                         │
│  Option 2 (Individual):                                                 │
│    <div data-codegym="schedule" data-gym="pulsegym"></div>             │
│                                                                         │
│  Option 3 (Direct iframe / WidgetZone component):                      │
│    <iframe src="https://app.codegyms.com/widgets/info/pulsegym         │
│      ?embed=1" .../>                                                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                      │ iframe request
                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│               app.codegyms.com  (Next.js — codegym_bolt)               │
│                                                                         │
│  Widget Pages:  /widgets/[type]/[slug]                                 │
│  ├── /widgets/info/pulsegym        ← hours, address, contact           │
│  ├── /widgets/schedule/pulsegym   ← class schedule                    │
│  ├── /widgets/pricing/pulsegym    ← membership plans                  │
│  ├── /widgets/instructors/pulsegym ← trainer bios                     │
│  ├── /widgets/lead_capture/pulsegym ← lead form (requires key)        │
│  ├── /widgets/chat/pulsegym        ← AI chat (requires key)           │
│  └── ... (20 total widget types)                                       │
│                                                                         │
│  BFF API Gateway:                                                       │
│  ├── GET /api/widgets/config?slug=pulsegym  → widget config (service role) │
│  ├── GET /api/widgets/seo-bundle?slug=...   → SEO data                │
│  ├── POST /api/widgets/telemetry            → track events             │
│  └── POST /api/public/form-bridge           → leads/bookings (+ key)  │
│                                                                         │
│  Loader:  /widgets/loader.js  (v3.0 — BFF pattern)                    │
└─────────────────────────────────────────────────────────────────────────┘
                      │ server-side only (SUPABASE_SERVICE_ROLE_KEY)
                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        Supabase (never exposed to browser)              │
│  widget_public_key in website_widget_config — validate_widget_key()   │
│  capture_widget_lead(), form_bridge_submit(), ping_widget_install()    │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Database Schema

### Table: `website_widget_config`

Per-gym global widget configuration.

| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `id` | UUID | `gen_random_uuid()` | Primary key |
| `gym_id` | UUID | NOT NULL | FK → `studio_settings(gym_id)` UNIQUE |
| `is_enabled` | BOOLEAN | `false` | Master switch for all widgets |
| `conversion_mode` | TEXT | `'lead_only'` | `lead_only` / `trial_enabled` / `full_signup` |
| `theme_config` | JSONB | `{}` | Global theme settings (see Theme Config below) |
| `installation_detected` | BOOLEAN | `false` | Whether loader.js has pinged from external site |
| `installation_url` | TEXT | NULL | URL where loader was detected |
| `last_ping_at` | TIMESTAMPTZ | NULL | Last installation ping timestamp |
| `created_at` | TIMESTAMPTZ | `NOW()` | Record creation |
| `updated_at` | TIMESTAMPTZ | `NOW()` | Last modification |

**Constraint:** `UNIQUE (gym_id)`  
**RLS:** Staff via `user_gym_access`, anon SELECT when `is_enabled = true`

### `theme_config` JSONB Structure

```typescript
interface ThemeConfig {
  primary: string;       // e.g. "#7C3AED"
  secondary: string;     // e.g. "#1E293B"
  accent: string;        // e.g. "#F59E0B"
  background: string;    // e.g. "#FFFFFF"
  text: string;          // e.g. "#1E293B"
  cta_color: string;     // e.g. "#7C3AED"
  font_family: string;   // e.g. "Inter"
  font_scale: string;    // "compact" | "standard" | "spacious"
  border_radius: string; // "sharp" | "soft" | "rounded" | "pill"
  theme_mode: string;    // "light" | "dark" | "auto"
  widget_style: string;  // "floating" | "inline" | "minimal" | "card"
  bg_opacity: number;    // 0.0 - 1.0
  animations_enabled: boolean;
  preset: string;        // "light_clean" | "dark_premium" | "vibrant_bold" | "soft_pastel" | "match_website" | "custom"
}
```

### Table: `website_widget_settings`

Per-gym per-widget settings.

| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `id` | UUID | `gen_random_uuid()` | Primary key |
| `gym_id` | UUID | NOT NULL | FK → `studio_settings(gym_id)` |
| `widget_type` | TEXT | NOT NULL | Widget identifier (see Widget Types) |
| `is_enabled` | BOOLEAN | `true` | Whether this widget is active |
| `display_order` | INTEGER | `0` | Sort order for auto-inject mode |
| `overrides` | JSONB | `{}` | Per-widget behavior overrides |
| `theme_overrides` | JSONB | `{}` | Per-widget theme overrides (Layer 4) |
| `created_at` | TIMESTAMPTZ | `NOW()` | Record creation |
| `updated_at` | TIMESTAMPTZ | `NOW()` | Last modification |

**Constraint:** `UNIQUE (gym_id, widget_type)`  
**RLS:** Staff via `user_gym_access`, anon SELECT when `is_enabled = true`

### Widget Types Enum

```sql
CHECK (widget_type IN (
  'schedule',    -- Interactive class calendar
  'pricing',     -- Membership plan cards
  'info',        -- Studio info (hours, address, contact)
  'chat',        -- AI chat assistant
  'lead_capture',-- Progressive lead form
  'instructors', -- Instructor profiles
  'reviews',     -- Member ratings/testimonials
  'guest_pass',  -- Free trial CTA
  'events',      -- Workshops/special events
  'spot_map',    -- Visual spot selection
  'social_proof',-- Real-time activity banner
  'live_feed',   -- Current/next class feed
  'community',   -- Leaderboards/achievements
  'wod',         -- Workout of the day
  'appointment', -- Personal training / 1:1 booking
  'gift_card',   -- Gift card purchase with Stripe (Sprint 4)
  'waitlist'     -- Smart waitlist for full classes (Sprint 4)
))
```

### Analytics Tables (Sprint 1 Architecture)

Sprint 1 replaced the simple analytics table with a 3-table architecture for better performance and richer tracking:

#### Table: `widget_analytics_events`

Raw event log — every widget interaction is recorded here.

| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `id` | UUID | `gen_random_uuid()` | Primary key |
| `gym_id` | UUID | NOT NULL | FK → `studio_settings(gym_id)` |
| `widget_type` | TEXT | NOT NULL | Which widget (schedule, pricing, etc.) |
| `event_type` | TEXT | NOT NULL | `impression` / `click` / `cta_click` / `lead_captured` / `form_start` / `checkout_start` / `checkout_complete` |
| `visitor_id` | TEXT | NULL | Anonymous visitor ID (from loader.js or localStorage) |
| `session_id` | TEXT | NULL | Session-scoped ID |
| `page_url` | TEXT | NULL | URL where widget was embedded |
| `referrer` | TEXT | NULL | HTTP referrer of the embedding page |
| `metadata` | JSONB | `{}` | Extra event data (plan_id, class_name, etc.) |
| `created_at` | TIMESTAMPTZ | `NOW()` | Event timestamp |

#### Table: `widget_analytics_sessions`

Aggregated per-session data for visitor journey tracking.

| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `id` | UUID | `gen_random_uuid()` | Primary key |
| `gym_id` | UUID | NOT NULL | FK → `studio_settings(gym_id)` |
| `session_id` | TEXT | NOT NULL | Session identifier |
| `visitor_id` | TEXT | NULL | Visitor identifier |
| `first_seen_at` | TIMESTAMPTZ | NOT NULL | First event in session |
| `last_seen_at` | TIMESTAMPTZ | NOT NULL | Last event in session |
| `page_url` | TEXT | NULL | Landing page |
| `referrer` | TEXT | NULL | Traffic source |
| `widgets_viewed` | TEXT[] | `{}` | Array of widget types viewed |
| `events_count` | INT | 0 | Total events in session |
| `converted` | BOOLEAN | FALSE | Whether lead was captured |

#### Table: `widget_analytics_daily`

Pre-aggregated daily rollups for fast dashboard queries.

| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `id` | UUID | `gen_random_uuid()` | Primary key |
| `gym_id` | UUID | NOT NULL | FK → `studio_settings(gym_id)` |
| `event_date` | DATE | NOT NULL | Aggregation date |
| `widget_type` | TEXT | NOT NULL | Widget type |
| `impressions` | INT | 0 | Daily impression count |
| `clicks` | INT | 0 | Daily click count |
| `cta_clicks` | INT | 0 | Daily CTA click count |
| `leads_captured` | INT | 0 | Daily leads captured |
| `unique_visitors` | INT | 0 | Distinct visitor count |
| `UNIQUE(gym_id, event_date, widget_type)` | | | Composite unique constraint |

#### Analytics RPCs

| RPC | Parameters | Returns | Description |
|-----|------------|---------|-------------|
| `track_widget_event` | `p_slug, p_widget_type, p_event_type, p_visitor_id, p_session_id, p_page_url, p_referrer, p_metadata` | void | Inserts event + upserts session + increments daily rollup |
| `get_widget_analytics_summary` | `p_gym_id, p_days` | JSON | Returns totals, previous-period comparison, daily_trend, by_widget breakdown, top_pages, conversion rates |
| `get_widget_funnel_data` | `p_gym_id, p_days` | JSON | Returns funnel: impressions → clicks → CTA → leads with drop-off rates |

**RLS:** Anon can call `track_widget_event` (write-only via RPC). Authenticated staff can SELECT own gym's data. Daily rollups are populated automatically by the tracking RPC.

**Client-side hook:** `use-widget-analytics.ts` — auto-tracks impression on mount, provides `trackEvent()` for manual events, communicates with parent loader.js for cross-widget analytics context.

### ER Diagram

```
┌──────────────────────────┐     ┌──────────────────────────────┐
│    studio_settings       │     │     website_widget_config     │
│──────────────────────────│     │──────────────────────────────│
│ gym_id (PK)              │◄────│ gym_id (FK, UNIQUE)          │
│ studio_name              │     │ is_enabled                   │
│ slug (UNIQUE)            │     │ conversion_mode              │
│ primary_color            │     │ theme_config (JSONB)         │
│ ...                      │     │ installation_detected        │
│                          │     │ installation_url             │
│                          │     │ last_ping_at                 │
└──────────────────────────┘     └──────────────────────────────┘
         │
         │                       ┌──────────────────────────────┐
         │                       │   website_widget_settings     │
         ├──────────────────────►│──────────────────────────────│
         │                       │ gym_id (FK)                  │
         │                       │ widget_type                  │
         │                       │ is_enabled                   │
         │                       │ display_order                │
         │                       │ overrides (JSONB)            │
         │                       │ theme_overrides (JSONB)      │
         │                       │ UNIQUE(gym_id, widget_type)  │
         │                       └──────────────────────────────┘
         │
         │                       ┌──────────────────────────────┐
         │                       │  widget_analytics_events      │
         ├──────────────────────►│──────────────────────────────│
         │                       │ gym_id (FK)                  │
         │                       │ widget_type, event_type      │
         │                       │ visitor_id, session_id       │
         │                       │ page_url, referrer           │
         │                       │ metadata (JSONB)             │
         │                       └──────────────────────────────┘
         │
         │                       ┌──────────────────────────────┐
         │                       │  widget_analytics_sessions    │
         ├──────────────────────►│──────────────────────────────│
         │                       │ gym_id (FK)                  │
         │                       │ session_id, visitor_id       │
         │                       │ widgets_viewed[], converted  │
         │                       │ events_count                 │
         │                       └──────────────────────────────┘
         │
         │                       ┌──────────────────────────────┐
         │                       │  widget_analytics_daily       │
         └──────────────────────►│──────────────────────────────│
                                 │ gym_id (FK)                  │
                                 │ event_date, widget_type      │
                                 │ impressions, clicks          │
                                 │ cta_clicks, leads_captured   │
                                 │ unique_visitors              │
                                 └──────────────────────────────┘

### Public Storefront Layer (Data Separation)

Added in the Storefront Layer migration. Separates internal admin data from public website display.

**Problem:** Original RPCs exposed ALL `is_active = true` records, including internal drafts, test data, and legacy items the gym owner doesn't want on their website.

**Solution:** Each data table that feeds public widgets now has storefront-aware columns.

#### Storefront Columns on `plans`

| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `show_on_website` | BOOLEAN | `true` | Whether plan appears in public widgets |
| `website_display_order` | INTEGER | `0` | Sort order in pricing widget |
| `website_name` | TEXT | NULL | Override name for public display (falls back to `name`) |
| `website_description` | TEXT | NULL | Override description for public display |
| `is_featured` | BOOLEAN | `false` | Highlighted plan in pricing widget |
| `featured_label` | TEXT | `'Most Popular'` | Badge text for featured plans |

#### Storefront Columns on `classes`

| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `show_on_website` | BOOLEAN | `true` | Whether class type appears in schedule widget |
| `website_display_order` | INTEGER | `0` | Sort priority in schedule widget |
| `website_name` | TEXT | NULL | Override name for public display (falls back to `name`) |
| `website_description` | TEXT | NULL | Override description for public display |

> **Note:** `class_schedules` is a date-based occurrence table (individual scheduled dates/times), NOT a class definition table. Storefront filtering operates on the `classes` table (class definitions), and the schedule RPC JOINs through `class_id` to apply the filter. This means the gym owner controls which **class types** appear publicly, not individual schedule entries.

#### Storefront Columns on `instructors`

| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `show_on_website` | BOOLEAN | `true` | Whether instructor appears in public widgets |
| `website_display_order` | INTEGER | `0` | Sort order in instructors widget |
| `website_bio` | TEXT | NULL | Override bio for public display (falls back to `bio`) |
| `website_title` | TEXT | NULL | Override title for public display (falls back to `instructor_type`) |

#### Storefront Backward Compatibility

All storefront RPCs implement a **zero-config fallback**:

```
IF gym has ANY record with show_on_website = true
  → show ONLY records where show_on_website = true
ELSE
  → show ALL active records (original behavior, backward compatible)
```

This ensures existing gyms that haven't configured storefront continue working exactly as before.

#### Storefront ER Additions

```
┌──────────────────────────┐     ┌──────────────────────────────┐
│    plans                 │     │     classes                   │
│──────────────────────────│     │──────────────────────────────│
│ ... (existing columns)   │     │ ... (existing columns)       │
│ show_on_website ✨       │     │ show_on_website ✨            │
│ website_display_order ✨ │     │ website_display_order ✨      │
│ website_name ✨          │     │ website_name ✨               │
│ website_description ✨   │     │ website_description ✨        │
│ is_featured ✨           │     └──────────────────────────────┘
│ featured_label ✨        │              │
└──────────────────────────┘              │ class_id (FK)
                                          ▼
┌──────────────────────────┐     ┌──────────────────────────────┐
│    instructors           │     │     class_schedules           │
│──────────────────────────│     │──────────────────────────────│
│ ... (existing columns)   │     │ status (text)                │
│ show_on_website ✨       │     │ class_id → classes.id         │
│ website_display_order ✨ │     │ instructor_id → instructors.id│
│ website_bio ✨           │     │ scheduled_date, start_time    │
│ website_title ✨         │     │ (NO is_active — uses status)  │
└──────────────────────────┘     └──────────────────────────────┘
```

#### Performance Indexes

```sql
CREATE INDEX idx_plans_storefront ON plans(gym_id, is_active, show_on_website);
CREATE INDEX idx_classes_storefront ON classes(gym_id, is_active, show_on_website);
CREATE INDEX idx_instructors_storefront ON instructors(gym_id, is_active, show_on_website);
CREATE INDEX idx_class_schedules_date ON class_schedules(gym_id, status, scheduled_date);
```

---

## 4. JS Loader Specification

### File: `public/widgets/loader.js`

The universal loader is the entry point for all widget integrations. It must be:
- **< 5KB gzipped**
- **Zero dependencies**
- **Works on any website** (WordPress, Wix, Squarespace, Webflow, Shopify, plain HTML)

### Loader Behavior

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Script loads on gym's website                            │
│    ├── Option A: /w/my-gym.js → slug embedded in URL        │
│    └── Option B: /w/loader.js → reads data-gym from divs    │
├─────────────────────────────────────────────────────────────┤
│ 2. Fetch widget config                                      │
│    └── GET Supabase RPC: get_public_widget_config(slug)     │
│        Returns: enabled widgets, theme, conversion_mode     │
├─────────────────────────────────────────────────────────────┤
│ 3. For each enabled widget:                                 │
│    ├── Create <iframe> with sandbox attributes              │
│    ├── Set src: codegym.com/[widget]/[slug]?embed=1&theme=  │
│    ├── Apply theme params as URL search params              │
│    └── Auto-inject (Option 1) or replace div (Option 2)    │
├─────────────────────────────────────────────────────────────┤
│ 4. Initialize cross-widget message bus                      │
│    ├── Listen for postMessage from iframes                  │
│    ├── Route messages between widgets                       │
│    └── Track visitor context (pages viewed, widgets used)   │
├─────────────────────────────────────────────────────────────┤
│ 5. Ping installation status                                 │
│    └── POST: ping_widget_install(slug, document.location)   │
└─────────────────────────────────────────────────────────────┘
```

### Loader API

```typescript
// TypeScript interface (loader is vanilla JS for compatibility)

interface CodeGymLoader {
  // Auto-detected from script src or data-gym attributes
  slug: string;
  
  // Config fetched from Supabase
  config: {
    conversion_mode: 'lead_only' | 'trial_enabled' | 'full_signup';
    theme: ThemeConfig;
    widgets: Array<{
      type: string;
      enabled: boolean;
      order: number;
      overrides: Record<string, unknown>;
      theme_overrides: Record<string, unknown>;
    }>;
  };
  
  // Cross-widget message bus
  bus: {
    emit(event: string, data: unknown): void;
    on(event: string, callback: (data: unknown) => void): void;
  };
  
  // Visitor context (shared across widgets)
  context: {
    visitor_id: string;     // Anonymous fingerprint (localStorage)
    pages_viewed: string[]; // Widget types the visitor has interacted with
    last_class_viewed: string | null;  // Class ID if schedule was browsed
    last_plan_viewed: string | null;   // Plan ID if pricing was browsed
  };
}
```

### iframe Sandbox Attributes

```html
<iframe
  src="https://app.codegym.com/schedule/my-gym?embed=1&theme=..."
  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
  allow="clipboard-write"
  loading="lazy"
  style="border: none; width: 100%; min-height: 400px;"
  title="CodeGym Schedule Widget"
></iframe>
```

### Theme URL Parameters

Theme values are encoded as URL search params for the iframe:

```
?embed=1
&cg_primary=%237C3AED
&cg_secondary=%231E293B
&cg_accent=%23F59E0B
&cg_bg=%23FFFFFF
&cg_text=%231E293B
&cg_radius=soft
&cg_font=Inter
&cg_mode=light
&cg_style=card
```

Widget pages read these and apply as CSS custom properties:

```css
:root {
  --cg-primary: var(--param-primary, #7C3AED);
  --cg-secondary: var(--param-secondary, #1E293B);
  --cg-accent: var(--param-accent, #F59E0B);
  --cg-bg: var(--param-bg, #FFFFFF);
  --cg-text: var(--param-text, #1E293B);
  --cg-radius: var(--param-radius, 8px);
  --cg-font: var(--param-font, 'Inter', sans-serif);
}
```

---

## 5. Cross-Widget Communication

### postMessage Protocol

All widget-to-loader communication uses `window.parent.postMessage()` with a structured protocol:

```typescript
interface WidgetMessage {
  source: 'codegym-widget';  // Always this value (for origin validation)
  type: string;              // Message type
  widget: string;            // Sender widget type
  payload: unknown;          // Message-specific data
}

// Message Types:
// 'widget:ready'          → Widget iframe loaded and rendered
// 'widget:resize'         → Widget requests container resize { height: number }
// 'widget:navigate'       → User clicked a CTA { target: widget_type, context: {} }
// 'context:class_viewed'  → User viewed a class { class_id, class_name, time }
// 'context:plan_viewed'   → User viewed a plan { plan_id, plan_name, price }
// 'context:lead_captured' → Lead form submitted { email, name }
// 'analytics:event'       → Track an interaction { event_type, metadata }
```

### Sequence: Cross-Widget Intelligence

```
 Visitor             Schedule Widget        Loader (bus)         AI Chat Widget
    │                      │                     │                     │
    │  Clicks "Yoga 7am"   │                     │                     │
    │─────────────────────►│                     │                     │
    │                      │ context:class_viewed │                     │
    │                      │ {class_id, name,     │                     │
    │                      │  time, instructor}   │                     │
    │                      │────────────────────►│                     │
    │                      │                     │ Broadcast to all    │
    │                      │                     │────────────────────►│
    │                      │                     │                     │ Stores in context
    │                      │                     │                     │
    │  Opens chat bubble   │                     │                     │
    │────────────────────────────────────────────────────────────────►│
    │                      │                     │                     │
    │                      │                     │                     │ "I see you were
    │                      │                     │                     │  looking at Yoga
    │                      │                     │                     │  at 7am with
    │◄────────────────────────────────────────────────────────────────│  Coach Maria..."
```

---

## 6. Public RPCs

### `get_public_widget_config(p_slug TEXT)`

Returns full widget configuration for a gym.

```sql
CREATE OR REPLACE FUNCTION get_public_widget_config(p_slug TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_gym_id UUID;
  v_config JSONB;
BEGIN
  -- Resolve slug → gym_id
  SELECT gym_id INTO v_gym_id
  FROM studio_settings WHERE slug = p_slug;
  
  IF v_gym_id IS NULL THEN
    RETURN jsonb_build_object('error', 'gym_not_found');
  END IF;
  
  -- Build response
  SELECT jsonb_build_object(
    'gym_id', wc.gym_id,
    'gym_name', ss.studio_name,
    'conversion_mode', wc.conversion_mode,
    'theme', wc.theme_config,
    'widgets', (
      SELECT COALESCE(jsonb_agg(
        jsonb_build_object(
          'type', ws.widget_type,
          'order', ws.display_order,
          'overrides', ws.overrides,
          'theme_overrides', ws.theme_overrides
        ) ORDER BY ws.display_order
      ), '[]'::jsonb)
      FROM website_widget_settings ws
      WHERE ws.gym_id = wc.gym_id AND ws.is_enabled = true
    )
  ) INTO v_config
  FROM website_widget_config wc
  JOIN studio_settings ss ON ss.gym_id = wc.gym_id
  WHERE wc.gym_id = v_gym_id AND wc.is_enabled = true;
  
  RETURN COALESCE(v_config, jsonb_build_object('error', 'widgets_disabled'));
END;
$$;
```

### `get_public_schedule(p_slug TEXT)`

Returns upcoming classes for future dates. **Storefront-aware:** JOINs `classes` table for name/description/visibility. Uses `class_schedules.status = 'scheduled'` + `classes.is_active = true` + `classes.show_on_website` filter. Falls back to all active classes if storefront not configured.

**Returns:** `{ classes: [{ id, name, start_time, end_time, day_of_week, scheduled_date, spots_total, spots_taken, spots_available, instructor_name, instructor_photo, program_name, description, difficulty_level, duration_minutes, status }] }`

> **Schema note:** `class_schedules` has NO `is_active` column — it uses `status` (text: 'scheduled', 'cancelled'). Class metadata (name, description, difficulty) comes from the `classes` table via `class_id` FK. Instructor photo uses `instructors.photo_url` (not `avatar_url`).

### `get_public_instructors(p_slug TEXT)`

Returns active instructor profiles. **Storefront-aware:** uses `website_bio` → `bio` fallback, `website_title` → `instructor_type` fallback, respects `show_on_website` toggle. Includes `upcoming_class_count` from future scheduled classes.

**Returns:** `{ instructors: [{ id, name, bio, photo_url, specialties, certifications, title, upcoming_class_count }] }`

### `get_public_pricing(p_slug TEXT)`

Returns visible membership plans. **Storefront-aware:** uses `website_name` → `name` fallback, `website_description` → `description` fallback, respects `show_on_website` toggle. Includes `is_featured` + `featured_label` for plan highlights. Sorted by `website_display_order`.

**Returns:** `{ plans: [{ id, name, description, price, duration_months, billing_interval, trial_days, setup_fee, features, is_active, is_featured, featured_label }] }`

### `get_public_reviews(p_slug TEXT)`

Returns approved member reviews/testimonials.

**Returns:** `{ average_rating, total_reviews, reviews: [{ member_first_name, rating, text, date, verified }] }`

### `get_public_studio_info(p_slug TEXT)`

Returns studio information for the info widget.

**Returns:** `{ name, address, phone, email, hours, social_links, amenities, photos, map_coordinates }`

### `get_public_events(p_slug TEXT)`

Returns upcoming events/workshops.

**Returns:** `{ events: [{ id, name, description, date, time, instructor, spots_available, price }] }`

### `capture_widget_lead(p_slug, p_name, p_email, p_phone, p_source_widget, p_source_url, p_context)`

Creates a lead with full attribution. Rate-limited: 5 per IP per hour.

### `ping_widget_install(p_slug, p_url)`

Records that the loader.js was detected on a live website. Rate-limited: 1 per slug per hour.

### `get_public_community_stats(p_slug TEXT)` *(Sprint 3)*

Returns real community data: member achievements, active challenges with leaderboards, community stats.

**Returns:** `{ stats: { total_members, active_this_week, total_classes_weekly, badges_earned, total_instructors }, achievements: [{ id, member_name, member_photo, badge_name, badge_emoji, tier, earned_at }], challenges: [{ id, name, emoji, participants, end_date, goal_type, top_performers: [{ rank, member_name, score, metric }] }] }`

**Data sources:** `member_achievements` JOIN `achievement_definitions`, `member_challenges` JOIN `member_challenge_progress`, `clients WHERE status = 'active'`

### `get_public_social_proof(p_slug TEXT)` *(Sprint 3)*

Returns real membership and activity data for social proof notifications.

**Returns:** `{ gym_name, active_members, new_members_month, checkins_this_week, popular_classes: [{ name, instructor, fill_pct, spots_left }], low_spots_classes: [{ name, spots_left, day_of_week, start_time }], instructor_count, recent_achievements: [{ member_name, badge_name, badge_emoji }] }`

### `get_public_appointments(p_slug TEXT)` *(Sprint 3)*

Returns PT/1:1 instructor profiles with ratings and available small-group/PT slots.

**Returns:** `{ instructors: [{ id, name, photo, bio, specialties, certifications, rating, review_count, session_types }], available_slots: [{ class_id, class_name, instructor_name, day_of_week, start_time, end_time, duration_minutes, spots_available }] }`

**Data sources:** `instructors` JOIN `pt_sessions`/`pt_ratings`, `class_schedules WHERE max_capacity <= 5`

### `get_public_gift_cards(p_slug TEXT)` *(Sprint 4)*

Returns available gift card products for purchase via website widget. Includes active card designs, denominations, and Stripe price IDs.

**Returns:** `{ gym_name, cards: [{ id, name, description, amount, stripe_price_id, design_image_url, is_custom_amount }] }`

**Data sources:** `gift_card_products WHERE is_active = true`, `studio_settings` for gym branding

### `get_public_waitlist_info(p_slug TEXT)` *(Sprint 4)*

Returns classes that are full and eligible for waitlist signup, with current waitlist position info.

**Returns:** `{ classes: [{ class_id, class_name, scheduled_date, start_time, instructor_name, spots_total, waitlist_count, waitlist_open }] }`

**Data sources:** `class_schedules WHERE spots_taken >= max_capacity`, `class_waitlist` for current waitlist counts

### AI Chat Widget — `/api/ai/public-chat` *(Sprint 4 — widget page)*

The AI Chat widget (`app/widgets/chat/[slug]/page.tsx`) calls the `/api/ai/public-chat` API route (not a Supabase RPC). This is an exception to the "no API routes" rule because:
- OpenAI API key cannot be exposed to the browser
- Rate limiting requires server-side IP checking
- Gym context assembly is complex (classes + schedule + plans + instructors + FAQs)

**Features:**
- Cross-widget context reception: knows what the visitor viewed (class, plan, instructor) via postMessage bus
- Proactive trigger messages: auto-opens with contextual message from loader.js (exit intent, time on page, return visitor, scroll depth, inactivity)
- Quick action buttons: contextual shortcuts based on visitor navigation
- Inline lead capture: collects name/email after 3+ message exchanges
- Escalation flag: when AI can't answer, marks `[ESCALATE]` for staff handoff
- Typing indicator, conversation history (last 8 messages)

**API Request:** `POST /api/ai/public-chat` → `{ gym_id, message, conversation_history, visitor_name?, visitor_email? }`
**API Response:** `{ content, needs_escalation, gym_name }`

### Table: `widget_proactive_triggers` *(Sprint 3)*

Per-gym configuration for AI proactive trigger behavior.

| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `id` | UUID | `gen_random_uuid()` | Primary key |
| `gym_id` | UUID | NOT NULL | FK → `studio_settings(gym_id)` UNIQUE |
| `exit_intent_enabled` | BOOLEAN | `true` | Detect mouse leaving viewport |
| `exit_intent_message` | TEXT | — | Message shown on exit intent |
| `time_on_page_enabled` | BOOLEAN | `true` | Trigger after N seconds |
| `time_on_page_seconds` | INTEGER | `30` | Delay before triggering |
| `time_on_page_message` | TEXT | — | Message shown on time trigger |
| `return_visitor_enabled` | BOOLEAN | `true` | Detect returning visitors |
| `return_visitor_message` | TEXT | — | Message shown to return visitors |
| `scroll_depth_enabled` | BOOLEAN | `false` | Trigger on scroll % |
| `scroll_depth_percent` | INTEGER | `50` | Scroll threshold |
| `inactivity_enabled` | BOOLEAN | `false` | Trigger on inactivity |
| `inactivity_seconds` | INTEGER | `60` | Inactivity timeout |
| `max_triggers_per_session` | INTEGER | `2` | Cap per session |
| `cooldown_between_triggers_ms` | INTEGER | `30000` | Min time between triggers |
| `target_widget` | TEXT | `'chat'` | Which widget to open |

**RLS:** Staff ALL via `staff_gym_ids()`, anon SELECT (to load config in loader.js)

### Proactive Trigger Flow

```
┌─ LOADER.JS (gym owner's website) ──────────────────────────────────┐
│                                                                     │
│  1. Fetches trigger config from widget_proactive_triggers           │
│  2. Registers event listeners:                                      │
│     ├── mouseleave (exit intent - desktop)                         │
│     ├── rapid scroll up (exit intent - mobile)                     │
│     ├── setTimeout (time on page)                                  │
│     ├── localStorage check (return visitor)                        │
│     ├── scroll % threshold (scroll depth)                          │
│     └── mouse/key/scroll activity (inactivity)                     │
│                                                                     │
│  3. On trigger fire:                                                │
│     ├── Check max_triggers_per_session cap                         │
│     ├── Check cooldown_between_triggers_ms                         │
│     └── postMessage → chat iframe: { type: 'proactive:trigger' }   │
│                                                                     │
│  4. Chat widget receives message:                                   │
│     ├── Auto-opens chat bubble                                     │
│     ├── Shows proactive message                                    │
│     └── Tracks trigger_type in cross-widget context                │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 7. Security Architecture

### Threat Model

| Threat | Vector | Mitigation |
|--------|--------|------------|
| **CSS injection** | Malicious parent CSS affecting widgets | iframe isolation — widget CSS is sandboxed |
| **XSS via widget** | Script injection through widget parameters | URL params are sanitized, no `eval()`, CSP headers |
| **Data exfiltration** | Attacker reads sensitive gym data via RPCs | RPCs return ONLY public data, no PII, no financial data |
| **API abuse** | Automated scraping or spam leads | Rate limiting per IP (10 req/min RPCs, 5 leads/hour) |
| **postMessage spoofing** | Malicious site sends fake widget messages | Origin validation + `source: 'codegym-widget'` check |
| **Clickjacking** | Embedding CodeGym admin in attacker iframe | `X-Frame-Options: DENY` on admin routes (widgets exempt) |
| **Lead spam** | Bot submits fake leads through widget | Honeypot fields + rate limiting + optional reCAPTCHA |
| **CORS bypass** | Unauthorized origin calling Supabase RPCs | Supabase anon key is public by design; RPCs are read-only |

### iframe Security

```html
<!-- Widget iframes are sandboxed -->
<iframe
  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
  referrerpolicy="strict-origin-when-cross-origin"
  loading="lazy"
>
```

- `allow-scripts`: Required for widget interactivity
- `allow-same-origin`: Required for Supabase client to work
- `allow-forms`: Required for lead capture forms
- `allow-popups`: Required for "Sign Up" CTA opening in new tab
- **NOT included:** `allow-top-navigation` (prevents widget from redirecting parent)

### postMessage Origin Validation

```javascript
// In loader.js — only accept messages from CodeGym origin
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://app.codegym.com') return;
  if (event.data?.source !== 'codegym-widget') return;
  // Process message...
});

// In widget pages — only post to parent if embedded
if (window.self !== window.top) {
  window.parent.postMessage({
    source: 'codegym-widget',
    type: 'widget:ready',
    widget: 'schedule'
  }, '*'); // '*' is safe because we validate on the receiving end
}
```

### Content Security Policy

Widget pages include CSP headers:

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://*.supabase.co;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src https://fonts.gstatic.com;
  img-src 'self' https://*.supabase.co data:;
  connect-src 'self' https://*.supabase.co;
  frame-ancestors *;
```

Note: `frame-ancestors *` allows any site to embed the widget iframes. Admin pages use `frame-ancestors 'none'`.

### Rate Limiting

| Endpoint | Limit | Window |
|----------|-------|--------|
| `get_public_*` RPCs | 60 requests | per minute per IP |
| `capture_widget_lead` | 5 requests | per hour per IP |
| `ping_widget_install` | 1 request | per hour per slug |
| AI Chat `/api/ai/public-chat` | 10 requests | per minute per IP |

Rate limiting is enforced at the RPC level using IP tracking in a `rate_limit_log` table, consistent with the existing pattern in `/api/ai/public-chat/route.ts`.

---

## 8. Widget Page Architecture

### File Structure

```
app/
├── widgets/
│   ├── [slug]/
│   │   └── page.tsx          # Widget hub (standalone mode, links to all)
│   ├── schedule/
│   │   └── [slug]/
│   │       └── page.tsx      # Schedule widget
│   ├── pricing/
│   │   └── [slug]/
│   │       └── page.tsx      # Pricing widget
│   ├── info/
│   │   └── [slug]/
│   │       └── page.tsx      # Studio info widget
│   ├── instructors/
│   │   └── [slug]/
│   │       └── page.tsx      # Instructor profiles widget
│   ├── reviews/
│   │   └── [slug]/
│   │       └── page.tsx      # Reviews widget
│   ├── guest-pass/
│   │   └── [slug]/
│   │       └── page.tsx      # Guest pass CTA widget
│   ├── events/
│   │   └── [slug]/
│   │       └── page.tsx      # Events widget
│   └── _components/
│       ├── widget-shell.tsx  # Shared iframe/standalone detection
│       ├── widget-theme.tsx  # Theme CSS variable provider
│       └── widget-bus.tsx    # postMessage communication hook
├── chat/[gymId]/page.tsx     # Existing AI chat (enhanced)
public/
├── widgets/
│   ├── loader.js             # Universal widget loader
│   └── loader.min.js         # Minified production version
```

### Widget Shell Component

Every widget page wraps content in a shell that handles:

1. **Mode detection:** `?embed=1` → iframe mode (minimal chrome), else → standalone mode (full branding)
2. **Theme application:** Read URL params → apply CSS custom properties
3. **Message bus:** Initialize postMessage listener for cross-widget events
4. **Analytics:** Auto-track impressions on mount
5. **Responsive sizing:** Communicate height changes to parent via postMessage

```typescript
// Simplified widget shell pattern
interface WidgetShellProps {
  widgetType: string;
  slug: string;
  children: React.ReactNode;
}

function WidgetShell({ widgetType, slug, children }: WidgetShellProps) {
  const searchParams = useSearchParams();
  const isEmbed = searchParams.get('embed') === '1';
  
  // Apply theme from URL params
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--cg-primary', searchParams.get('cg_primary') || '#7C3AED');
    root.style.setProperty('--cg-bg', searchParams.get('cg_bg') || '#FFFFFF');
    // ... other theme variables
  }, [searchParams]);
  
  // Communicate height to parent
  useEffect(() => {
    if (!isEmbed) return;
    const observer = new ResizeObserver(([entry]) => {
      window.parent.postMessage({
        source: 'codegym-widget',
        type: 'widget:resize',
        widget: widgetType,
        payload: { height: entry.contentRect.height }
      }, '*');
    });
    observer.observe(document.body);
    return () => observer.disconnect();
  }, [isEmbed, widgetType]);
  
  if (isEmbed) {
    return <div className="cg-widget-embed">{children}</div>;
  }
  
  // Standalone mode: full page with gym branding
  return (
    <div className="cg-widget-standalone">
      <header>/* Gym branding header */</header>
      {children}
      <nav>/* Links to other widgets */</nav>
    </div>
  );
}
```

---

## 9. Admin Dashboard

### Route: Gym Settings Section

The widget dashboard is accessible within each gym's settings area (not platform admin). It is a per-gym configuration page.

### Dashboard Sections

```
┌─────────────────────────────────────────────────────────┐
│ 1. STATUS BAR                                           │
│    [🟢 LIVE — Detected on www.mygym.com]               │
│    or [🟡 Not Installed — Copy code below]             │
├─────────────────────────────────────────────────────────┤
│ 2. CONVERSION MODE SELECTOR                             │
│    ○ Lead Only  ● Trial Enabled  ○ Full Signup          │
├─────────────────────────────────────────────────────────┤
│ 3. WIDGET TOGGLES                                       │
│    Grid of widget cards with ON/OFF + ⚙️ configure      │
├─────────────────────────────────────────────────────────┤
│ 4. THEME CUSTOMIZATION                                  │
│    Preset selector + custom editor + live preview       │
├─────────────────────────────────────────────────────────┤
│ 5. INSTALLATION CODE                                    │
│    Tabs: Universal Script | Individual | Direct Links   │
│    Copy buttons + platform-specific guides              │
└─────────────────────────────────────────────────────────┘
```

### Theme Preset Definitions

```typescript
const THEME_PRESETS: Record<string, Partial<ThemeConfig>> = {
  light_clean: {
    primary: '#6366F1', secondary: '#1E293B', accent: '#F59E0B',
    background: '#FFFFFF', text: '#1E293B', border_radius: 'soft',
    theme_mode: 'light', widget_style: 'card'
  },
  dark_premium: {
    primary: '#A78BFA', secondary: '#F8FAFC', accent: '#FBBF24',
    background: '#0F172A', text: '#F8FAFC', border_radius: 'rounded',
    theme_mode: 'dark', widget_style: 'card'
  },
  vibrant_bold: {
    primary: '#EF4444', secondary: '#1E293B', accent: '#10B981',
    background: '#FFFFFF', text: '#1E293B', border_radius: 'pill',
    theme_mode: 'light', widget_style: 'floating'
  },
  soft_pastel: {
    primary: '#8B5CF6', secondary: '#6B7280', accent: '#EC4899',
    background: '#FFF7ED', text: '#374151', border_radius: 'rounded',
    theme_mode: 'light', widget_style: 'minimal'
  },
  match_website: {
    // Auto-extracted from studio_settings brand colors
    preset: 'match_website'
  },
  custom: {
    // User-defined
    preset: 'custom'
  }
};
```

---

## 10. Widget Overrides Reference

### Schedule Widget Overrides

```typescript
interface ScheduleOverrides {
  show_spots: boolean;           // Show spots remaining count
  show_instructor_photo: boolean;// Show instructor photo
  visible_programs: string[];    // Filter to specific program IDs (empty = all)
  layout: 'compact' | 'expanded';
  days_ahead: number;            // How many days to show (default 7)
  cta_label_override: string;    // Override CTA button text
}
```

### Pricing Widget Overrides

```typescript
interface PricingOverrides {
  show_prices: boolean;         // Show/hide actual prices
  visible_plans: string[];      // Filter to specific plan IDs (empty = all)
  layout: 'horizontal' | 'vertical';
  highlight_plan_id: string;    // Which plan to highlight as "popular"
  cta_label_override: string;
}
```

### AI Chat Widget Overrides

```typescript
interface ChatOverrides {
  can_suggest_trial: boolean;    // Allow trial booking suggestions
  collect_email_required: boolean;
  bubble_color: string;          // Override chat bubble color
  position: 'bottom-right' | 'bottom-left';
  proactive_delay_seconds: number; // Seconds before proactive message (0 = disabled)
  welcome_message_override: string;
}
```

### Lead Capture Widget Overrides

```typescript
interface LeadCaptureOverrides {
  required_fields: string[];     // ['name', 'email', 'phone', 'interest']
  trigger_type: 'time' | 'scroll' | 'exit_intent' | 'widget_count';
  trigger_value: number;         // Seconds, %, or widget count
  style: 'popup' | 'inline' | 'slide_in';
  show_interest_selector: boolean;
}
```

---

## 11. Data Flow: Lead Capture Attribution

```
 Visitor clicks CTA in Schedule Widget
    │
    ▼
 Loader captures context:
   - source_widget: 'schedule'
   - source_url: 'https://mygym.com/classes'
   - context: { class_viewed: 'Yoga 7am', instructor: 'Maria' }
    │
    ▼
 Lead Capture form opens (popup or inline)
   - Pre-filled interest: "Yoga"
   - Shows: "Get started with Yoga at My Gym"
    │
    ▼
 capture_widget_lead RPC
   - Creates lead in `leads` table
   - Sets source = 'website_widget'
   - Sets source_detail = 'schedule'
   - Stores full context in ai_summary JSONB
    │
    ▼
 Existing AI Onboarding Pipeline
   - Scoring, temperature, welcome email
   - Full visibility in admin CRM
```

---

## 12. Embed Security Governance

### 12.1 Current State (v2.0)

O sistema atualmente opera em modo **permissivo aberto** para facilitar onboarding de gyms em qualquer plataforma (WordPress, Wix, Squarespace, Webflow, custom):

```
X-Frame-Options: SAMEORIGIN  (off for widget routes)
Content-Security-Policy: frame-ancestors *
```

**Rationale:** Gyms small-business owners usam dezenas de builders diferentes. Exigir domain allowlist no Day 1 criaria friction proibitiva no onboarding.

### 12.2 Security Layers Ativas

Mesmo com `frame-ancestors *`, o sistema tem 4 camadas de proteção:

| Layer | Proteção | Status |
|---|---|---|
| **iframe sandbox** | `allow-scripts allow-same-origin allow-forms allow-popups` — sem `allow-top-navigation` | ✅ Ativo |
| **postMessage origin check** | Loader.js valida `event.origin === CG_ORIGIN` | ✅ Ativo |
| **Data exposure** | RPCs são read-only, sem PII, sem financial data | ✅ Ativo |
| **Rate limiting** | 60 req/min (read), 5 req/hr (write), per IP | ✅ Ativo |
| **Domain allowlist** | Optional per-gym domain restriction | 🔜 Planejado |

### 12.3 Planned: Domain Allowlist (v2.1)

```sql
ALTER TABLE website_widget_config
  ADD COLUMN allowed_domains TEXT[] DEFAULT '{}';
-- Empty array = allow all (backward compatible)
```

**Loader.js enhancement (v2.1):**
```javascript
// In fetchConfig callback:
if (config.allowed_domains && config.allowed_domains.length > 0) {
  var currentDomain = window.location.hostname;
  var allowed = config.allowed_domains.some(function(d) {
    return currentDomain === d || currentDomain.endsWith('.' + d);
  });
  if (!allowed) {
    console.warn('[CodeGym] Domain not authorized for this gym widget.');
    return; // Don't render widgets
  }
}
```

**Admin UI:** Lista de domínios autorizados no Widget Dashboard, com "Allow All" toggle.

### 12.4 Planned: Signed Embed Token (v3.0 — Premium)

Para planos premium, embed URL incluirá token HMAC que previne uso não-autorizado:

```
/widgets/schedule/[slug]?embed=1&token=hmac_sha256(slug+domain+timestamp, secret)
```

O widget shell validará o token server-side. Tokens expiram em 24h e são auto-refreshed pelo loader.

---

## 13. Health & Diagnostics

### 13.1 Current Health Check Architecture (v2.1)

```
Loader.js init
    │
    ├── pingInstall(slug) → POST /api/widgets/ping
    │   Body: {
    │     slug, url, widget_count, ready_count,
    │     errors: telemetry.getErrors().length,
    │     user_agent
    │   }
    │
    ├── Per-widget: createWidgetIframe()
    │   ├── iframe.onerror → telemetry.logError() + fallback UI
    │   └── 15s timeout for widget:ready → telemetry.logError()
    │
    └── Runtime error tracking:
        ├── fetchConfig failure → telemetry.logError('loader', err)
        ├── Iframe load error → telemetry.logError(type, err)
        └── widget:ready timeout → telemetry.logError(type, err)
```

### 13.2 Telemetry API

```javascript
// Exposed via window.CodeGym.telemetry
CodeGym.telemetry.getErrors()         // [{widget, error, context, timestamp}]
CodeGym.telemetry.getWidgetCount()    // Total containers rendered
CodeGym.telemetry.getLoadedWidgets()  // ['schedule', 'pricing', ...]
CodeGym.telemetry.isCacheHit('slug')  // Config cache status
```

### 13.3 Error Reporting Flow

```
Widget error occurs
    │
    ├── telemetry.logError(type, error, context)
    │   ├── Stores in _errors array (in-memory)
    │   ├── console.warn (dev visibility)
    │   └── Best-effort POST → track_widget_event RPC
    │       event_type: 'widget_error'
    │       metadata: { error, context }
    │
    └── Admin Dashboard
        └── widget_analytics_events WHERE event_type = 'widget_error'
            → Error rate charts, top errors, affected domains
```

### 13.4 Health Signals Tracked

| Signal | How Detected | Storage |
|---|---|---|
| Widget rendered | iframe `load` event | Implicit (no error = success) |
| Widget ready | `widget:ready` postMessage within 15s | Error if timeout |
| Config fetch failure | fetch catch | `widget_error` event |
| Iframe load failure | iframe `error` event | `widget_error` event |
| CSP/adblock blocking | Missing `widget:ready` after load | Detectable via timeout |
| Domain not authorized | `allowed_domains` check | Logged but widget not rendered |

### 13.5 Planned: Admin Health Dashboard (v2.2)

```
╔══════════════════════════════════════════╗
║  Widget Health — Last 24h                ║
╠══════════════════════════════════════════╣
║  ✅ Total Loads: 1,247                   ║
║  ❌ Errors: 3 (0.24%)                   ║
║  ⏱  Avg Ready Time: 1.2s                ║
║                                          ║
║  Error Breakdown:                        ║
║  • widget:ready timeout (2) — schedule   ║
║  • iframe load failed (1) — chat         ║
║                                          ║
║  Top Domains:                            ║
║  • mygym.com — 823 loads, 0 errors       ║
║  • mygym.wixsite.com — 424 loads, 3 err  ║
╚══════════════════════════════════════════╝
```

---

## 14. Transactional State Machines

### 14.1 Stripe Checkout Flow (Pricing Widget)

```
[idle] ──── CTA click ──── [plan_selected]
                               │
                      Collect contact info
                               │
                          [form_filled]
                               │
                   POST /api/stripe/widget-checkout
                               │
              ┌── success ─── [checkout_started]
              │                    │
              │          Stripe EmbeddedCheckout renders
              │                    │
              │           ┌── complete ──── [payment_success]
              │           │                      │
              │           │                 Show success UI
              │           │                 trackEvent('checkout_complete')
              │           │
              │           └── cancel/close ── [checkout_abandoned]
              │                                  │
              │                         trackEvent('checkout_abandoned')
              │                         Return to plan list
              │
              └── error ─── [checkout_error]
                                │
                    Show error message
                    telemetry.logError('pricing', err)
                    Allow retry
```

**Analytics Events por Estado:**

| State | Event Fired | Metadata |
|---|---|---|
| `plan_selected` | `cta_click` | `{ plan_id, plan_name, price }` |
| `form_filled` | `form_start` | `{ plan_id }` |
| `checkout_started` | `checkout_started` | `{ plan_id, client_secret_prefix }` |
| `payment_success` | `checkout_complete` | `{ plan_id }` |
| `checkout_abandoned` | `checkout_abandoned` | `{ plan_id, duration_seconds }` |
| `checkout_error` | `widget_error` | `{ plan_id, error }` |

### 14.2 Lead Capture Flow

```
[idle] ──── Widget opens ──── [step_1]
                                  │
                         Fill name + email
                                  │
                           [step_2]
                              │
                     Select interest + message
                              │
                    capture_widget_lead RPC
                              │
              ┌── success ─── [captured]
              │                   │
              │          trackEvent('lead_captured')
              │          Show success UI
              │
              └── error ─── [capture_error]
                                │
                   Show "Please try again"
                   telemetry.logError()
```

### 14.3 Appointment Booking Flow

```
[browse] ──── Select instructor ──── [instructor_detail]
                                          │
                                    Select time slot
                                          │
                                   [booking_form]
                                          │
                              Fill name, email, goals
                                          │
                          capture_widget_lead RPC
                                          │
              ┌── success ──── [booking_requested]
              │                       │
              │            sendContext('appointment_viewed')
              │            sendContext('lead_captured')
              │            Show confirmation
              │
              └── error ──── [booking_error]
                                   │
                       Show error, allow retry
```

**Note:** Appointment bookings are NOT instant confirmations — they are requests. The instructor/admin confirms via the admin portal. The state machine reflects this (requested → confirmed is async, outside the widget).

### 14.4 Idempotency

| Action | Idempotency Key | Behavior |
|---|---|---|
| `capture_widget_lead` | `email + gym_id + source_detail` | Dedup: updates existing lead if same email+gym within 24h |
| `track_widget_event` | `visitor_id + event_type + timestamp` | No dedup needed (analytics events are append-only) |
| `ping_widget_install` | `slug + domain` | Rate limited to 1/hour — subsequent pings update `last_seen` |
| Stripe checkout | Stripe's own idempotency (payment_intent) | Handled by Stripe SDK |

---

## 15. Runtime Telemetry Architecture

### 15.1 Error Classification

| Category | Examples | Severity |
|---|---|---|
| **Fatal** | Config fetch 4xx/5xx, iframe blocked by CSP | Widget won't render |
| **Degraded** | RPC timeout > 5s, partial data load | Widget renders with gaps |
| **Warning** | widget:ready timeout, analytics send failure | Widget works but monitoring gap |
| **Info** | Cache hit, lazy load triggered, trigger fired | Operational telemetry |

### 15.2 Client-Side Collection

```javascript
// All errors flow through telemetry.logError()
// which stores in-memory AND sends to Supabase:

track_widget_event({
  p_widget_type: 'schedule',
  p_event_type: 'widget_error',
  p_metadata: {
    error: 'RPC timeout after 10s',
    context: { rpc: 'get_public_schedule', duration_ms: 10000 }
  }
})
```

### 15.3 Server-Side Aggregation

Widget errors são armazenados na mesma tabela de analytics (`widget_analytics_events`) com `event_type = 'widget_error'`. O Admin Dashboard pode filtrar:

```sql
SELECT
  widget_type,
  metadata->>'error' as error_message,
  COUNT(*) as occurrences,
  COUNT(DISTINCT visitor_id) as affected_visitors
FROM widget_analytics_events
WHERE event_type = 'widget_error'
  AND created_at > NOW() - INTERVAL '24 hours'
GROUP BY widget_type, metadata->>'error'
ORDER BY occurrences DESC;
```

### 15.4 Stripe-Specific Telemetry

| Event | When | Metadata |
|---|---|---|
| `checkout_started` | `EmbeddedCheckout` mounts | `{ plan_id }` |
| `checkout_complete` | `onComplete` callback | `{ plan_id }` |
| `checkout_abandoned` | User closes/navigates away before completion | `{ plan_id, duration_seconds }` |
| `checkout_error` | Stripe SDK error | `{ plan_id, error_code, error_message }` |

### 15.5 PostMessage Failure Detection

Loader.js não pode detectar se um iframe recebeu a mensagem (fire-and-forget). Mitigação:

1. **ACK pattern:** Widget responde com `widget:ack` após receber `context:*` messages
2. **Timeout detection:** Se nenhum ACK em 3s, loader logs telemetry warning
3. **Heartbeat:** Widget envia `widget:alive` a cada 30s — loader detects stale widgets

*(ACK pattern planned for v2.2)*

---

## 16. Loader Improvement Roadmap

### 16.1 Implemented (v2.1 — Current)

| Feature | Description | Status |
|---|---|---|
| **Config cache** | One fetch per slug, shared across all widgets | ✅ Done |
| **Error boundary** | iframe onerror → fallback UI + telemetry | ✅ Done |
| **IntersectionObserver** | Below-fold widgets load on scroll (200px margin) | ✅ Done |
| **Telemetry object** | In-memory error tracking + best-effort RPC reporting | ✅ Done |
| **widget:ready timeout** | 15s timeout per widget → error log | ✅ Done |
| **Enhanced ping** | Health data (widget_count, errors, user_agent) | ✅ Done |
| **Version tracking** | `window.CodeGym.version` for debugging | ✅ Done |

### 16.2 Implemented (v2.2 — Current)

| Feature | Description | Status |
|---|---|---|
| **Native Form Bridge** | `CodeGym.submitForm()` + standalone `form-bridge.js` + REST API | ✅ Done |
| **form_bridge_submit RPC** | Enhanced RPC with consent tracking, UTM, dedup | ✅ Done |
| **Consent tracking** | `sms_consent`, `waiver_accepted` columns on leads | ✅ Done |
| **SEO Mode** | `data-seo="true"` → native HTML + Schema.org JSON-LD via Shadow DOM | ✅ Done |
| **SEO Bundle RPC** | `get_public_seo_bundle` — single call for all widget data | ✅ Done |
| **seo-renderer.js** | On-demand 6KB renderer: schedule, pricing, instructors, reviews, info | ✅ Done |

### 16.3 Planned (v2.3)

| Feature | Description | Priority |
|---|---|---|
| **RPC batching** | Single POST to fetch all widget data for a slug | P1 |
| **Domain allowlist enforcement** | `allowed_domains` column + loader check (column exists) | P1 |
| **ACK pattern** | Confirm message delivery to iframes | P2 |
| **Widget heartbeat** | 30s alive signal from each widget | P2 |
| **Preconnect hints** | `<link rel="preconnect">` for Supabase domain | P2 |

### 16.4 Planned (v3.0)

| Feature | Description | Priority |
|---|---|---|
| **Signed embed tokens** | HMAC tokens for premium plan domain lock | P1 |
| **Web Components mode** | SEO-friendly alternative to iframes | P1 |
| **Service Worker cache** | Offline-first widget shell | P2 |
| **A/B test support** | Load variant widgets based on experiment config | P2 |

---

## 17. Native Form Bridge (4th Integration Mode)

### 17.1 Problem Statement

Many gyms already have existing websites with working lead capture forms (e.g., trial pass signup, contact forms). These gyms don't want to replace their forms with CodeGym widgets — they want to **keep their current UX** while piping leads into the CodeGym pipeline for AI scoring, automated follow-up, and CRM management.

**Real-world example:** A gym like Vasa Fitness has a `/trial-media2/` page with a fully styled form. They won't replace it with an iframe widget. But they need those leads in CodeGym.

### 17.2 Architecture

```
┌──────────────────────────────────────────────────────────┐
│                GYM WEBSITE (existing form)                │
│                                                          │
│  <form data-codegym-form data-gym="my-gym">              │
│    <input name="name" required>                          │
│    <input name="email" required>                         │
│    <input name="phone">                                  │
│    <input name="sms_consent" type="checkbox">            │
│    <button type="submit">Get Free Trial</button>        │
│  </form>                                                 │
│                                                          │
│  Integration paths (choose one):                         │
│                                                          │
│  A. loader.js → CodeGym.submitForm(payload)              │
│     (if loader already loaded — zero extra code)         │
│                                                          │
│  B. form-bridge.js → CodeGymForms.submit(payload)        │
│     (standalone 3KB snippet, no loader needed)           │
│                                                          │
│  C. Auto-bind: data-codegym-form attribute on <form>     │
│     (zero JavaScript — form-bridge.js detects & wires)   │
│                                                          │
│  D. REST POST → /api/public/form-bridge                  │
│     (server-side, no JS required — for backends/Zapier)  │
└────────────────────┬─────────────────────────────────────┘
                     │ HTTPS POST
                     ▼
┌──────────────────────────────────────────────────────────┐
│              CODEGYM INGESTION LAYER                     │
│                                                          │
│  Path A/B/C: Direct Supabase RPC call                   │
│    → form_bridge_submit(p_slug, p_name, p_email, ...)   │
│    → Uses anon key from meta tags                        │
│                                                          │
│  Path D: Next.js API route                               │
│    → /api/public/form-bridge (POST)                      │
│    → CORS + rate limit (10 req/min/IP) + domain check    │
│    → Calls form_bridge_submit via service role key        │
│                                                          │
│  Both paths → same RPC → same dedup → same pipeline      │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│              LEAD PIPELINE (existing)                     │
│                                                          │
│  ✅ Dedup: email + gym_id (update if exists)             │
│  ✅ Consent: sms_consent + waiver timestamps             │
│  ✅ UTM attribution: source, medium, campaign            │
│  ✅ AI scoring: temperature assigned                     │
│  ✅ Workflows: trigger automated follow-up               │
│  ✅ CRM: visible in admin leads dashboard                │
└──────────────────────────────────────────────────────────┘
```

### 17.3 RPC: `form_bridge_submit`

**Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `p_slug` | TEXT | ✅ | Gym slug (resolves to gym_id) |
| `p_name` | TEXT | ✅ | Lead's full name |
| `p_email` | TEXT | ✅ | Lead's email (normalized to lowercase) |
| `p_phone` | TEXT | | Phone number |
| `p_form_type` | TEXT | | `trial_pass`, `membership`, `general`, `contact` |
| `p_sms_consent` | BOOLEAN | | SMS marketing opt-in (stored with timestamp) |
| `p_waiver_accepted` | BOOLEAN | | Waiver/terms accepted (stored with timestamp) |
| `p_source_url` | TEXT | | URL where form was submitted |
| `p_interest` | TEXT | | Interest area (e.g., "yoga", "personal_training") |
| `p_message` | TEXT | | Free-text message from the lead |
| `p_context` | JSONB | | Additional context (UTMs, location, IP, user_agent) |

**Dedup logic:**
1. **24h window**: Same email + gym_id within 24h → update existing (merge context, don't overwrite consent)
2. **Older lead**: Same email + gym_id beyond 24h → update + re-warm if status was `lost`/`cold`
3. **New lead**: Create with `source='website_form'`, `temperature='warm'`

**Consent tracking:**
- `sms_consent` only escalates (false→true, never true→false)
- `sms_consent_at` records first consent timestamp
- Same logic for `waiver_accepted`

**Return value:**
```json
{
  "success": true,
  "lead_id": "uuid",
  "is_new": true,
  "gym_id": "uuid"
}
```

### 17.4 API Route: `/api/public/form-bridge`

**Why this exists (architecture exception):** This is a legitimate exception to the "no API routes" rule. External websites/backends/Zapier integrations need a simple REST URL to POST to — they can't construct Supabase RPC calls with auth headers.

**Security layers:**
1. **CORS**: Allows all origins (gym sites are on arbitrary domains)
2. **Rate limiting**: 10 requests/minute per IP (in-memory)
3. **Domain allowlist**: If gym has `allowed_domains` configured, validates origin
4. **Input validation**: Email format, name min length, slug existence
5. **Server-side key**: Uses `SUPABASE_SERVICE_ROLE_KEY` (never exposed to client)

**Request format:**
```json
POST /api/public/form-bridge
Content-Type: application/json

{
  "slug": "my-gym",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-0123",
  "form_type": "trial_pass",
  "sms_consent": true,
  "waiver_accepted": true,
  "interest": "free_trial",
  "message": "I'd like to try a class",
  "source_url": "https://mygym.com/trial",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "spring_trial",
  "context": {
    "selected_location": "downtown"
  }
}
```

### 17.5 JavaScript Integration

#### Path A: `CodeGym.submitForm()` (via loader.js)

For sites already using the universal loader:

```html
<script src="https://app.codegym.com/w/loader.js" data-gym="my-gym"></script>
<script>
document.getElementById('my-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const result = await CodeGym.submitForm({
    slug: 'my-gym',
    name: fd.get('name'),
    email: fd.get('email'),
    phone: fd.get('phone'),
    form_type: 'trial_pass',
    sms_consent: !!fd.get('sms_opt_in'),
  });
  if (result.success) window.location.href = '/thank-you';
});
</script>
```

**Enrichment:** Automatically adds `visitor_id`, `session_id`, `pages_viewed`, `referrer`, and UTM params from URL.

#### Path B: `CodeGymForms.submit()` (standalone snippet)

For sites that don't want the full loader:

```html
<script src="https://app.codegym.com/widgets/form-bridge.js"></script>
<script>
CodeGymForms.submit({
  slug: 'my-gym',
  name: 'John Doe',
  email: 'john@example.com',
  form_type: 'trial_pass',
}).then(result => { /* handle result */ });
</script>
```

#### Path C: Auto-bind (zero JavaScript)

Just add attributes to existing HTML forms:

```html
<script src="https://app.codegym.com/widgets/form-bridge.js"></script>

<form data-codegym-form data-gym="my-gym" data-form-type="trial_pass" data-success-url="/thank-you">
  <input name="name" required placeholder="Full Name">
  <input name="email" type="email" required placeholder="Email">
  <input name="phone" type="tel" placeholder="Phone">
  <label><input name="sms_consent" type="checkbox"> I agree to receive SMS</label>
  <label><input name="waiver_accepted" type="checkbox"> I accept the terms</label>
  <button type="submit">Start Free Trial</button>
</form>
```

The `form-bridge.js` auto-detects `data-codegym-form` on DOM ready, intercepts submit, maps `<input name>` to API fields, shows success/error feedback. **Zero custom JavaScript needed.**

#### Path D: REST API (server-side / Zapier)

```bash
curl -X POST https://app.codegym.com/api/public/form-bridge \
  -H "Content-Type: application/json" \
  -d '{"slug":"my-gym","name":"John","email":"john@email.com","form_type":"contact"}'
```

### 17.6 New Database Columns

```sql
ALTER TABLE leads ADD COLUMN sms_consent BOOLEAN DEFAULT false;
ALTER TABLE leads ADD COLUMN sms_consent_at TIMESTAMPTZ;
ALTER TABLE leads ADD COLUMN waiver_accepted BOOLEAN DEFAULT false;
ALTER TABLE leads ADD COLUMN waiver_accepted_at TIMESTAMPTZ;
ALTER TABLE leads ADD COLUMN form_type TEXT;
ALTER TABLE leads ADD COLUMN utm_source TEXT;
ALTER TABLE leads ADD COLUMN utm_medium TEXT;
ALTER TABLE leads ADD COLUMN utm_campaign TEXT;
```

### 17.7 Files Created

| File | Purpose | Size |
|---|---|---|
| `ADD_FORM_BRIDGE_SYSTEM.sql` | RPC + consent columns + grants | — |
| `public/widgets/form-bridge.js` | Standalone Form Bridge snippet | ~3KB |
| `app/api/public/form-bridge/route.ts` | REST API endpoint | — |
| `loader.js` → `submitForm()` | Added to `window.CodeGym` API (v2.2.0) | — |

---

## 18. SEO Mode — Native HTML + Schema.org Structured Data

### 18.1 Problem

iframes are invisible to search engines. All 15 widgets render inside iframes, which means:
- Google/Bing can't index class schedules, instructor names, reviews, or pricing
- No Schema.org structured data = no rich results (star ratings, event cards, price ranges)
- AI-powered search (ChatGPT, Perplexity, Google AI Overviews) can't extract gym information from widget content

### 18.2 Solution: Dual-Mode Rendering

When `data-seo="true"` is set, the loader renders widgets **twice**:
1. **Native HTML** via Shadow DOM — semantic HTML with Schema.org microdata for crawlers
2. **Interactive iframes** — full-featured widgets for users (same as before)

This means SEO content is always available for crawlers, while users still get the full interactive experience.

### 18.3 Architecture

```
┌──────────────────────────────────────────────────────────┐
│  <script data-gym="slug" data-seo="true">               │
│                                                          │
│  ┌─ SEO Layer (native HTML) ──────────────────────────┐  │
│  │  Shadow DOM (style-isolated)                       │  │
│  │                                                    │  │
│  │  <section itemscope itemtype="HealthClub">         │  │
│  │    Studio info, address, phone                     │  │
│  │  </section>                                        │  │
│  │  <section> Schedule with itemprop="event" </section│  │
│  │  <section> Pricing with itemprop="Offer" </section>│  │
│  │  <section> Instructors with itemprop="Person" </s> │  │
│  │  <section> Reviews with AggregateRating </section> │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  + JSON-LD <script type="application/ld+json">           │
│    LocalBusiness, Event[], Offer[], Person[], Review[]    │
│                                                          │
│  ┌─ Interactive Layer (iframes, same as before) ──────┐  │
│  │  [schedule iframe] [pricing iframe] [chat iframe]  │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

### 18.4 Usage

**Full SEO mode (all enabled widgets):**
```html
<script src="https://app.codegym.com/widgets/loader.js"
        data-gym="my-gym"
        data-seo="true"></script>
```

**Selective SEO for specific widgets:**
```html
<div data-codegym="reviews" data-gym="my-gym" data-seo="true"></div>
<div data-codegym="schedule" data-gym="my-gym" data-seo="true"></div>
```

### 18.5 Schema.org Types Generated

| Widget | Schema.org Type | Rich Result Eligible |
|---|---|---|
| Studio Info | `HealthClub` (LocalBusiness) | Google Knowledge Panel, Maps |
| Schedule | `ExerciseAction` per class | Event cards in search |
| Pricing | `Offer` per plan | Price ranges in search |
| Instructors | `Person` with jobTitle, knowsAbout | People Knowledge Panel |
| Reviews | `AggregateRating` + `Review[]` | Star ratings in search results |

### 18.6 RPC: `get_public_seo_bundle`

Single RPC that returns ALL widget data in one call (instead of 5+ separate RPCs). **Storefront-aware** — all sub-queries use `show_on_website` filter with `COALESCE(website_name, name)` fallback pattern.

| Field | Content | Storefront |
|---|---|---|
| `studio` | Name, logo, address, phone, email, website, social_links | No filter (always shown) |
| `config` | Enabled widgets list, theme, conversion_mode | No filter |
| `schedule` | Up to 50 future classes via `class_schedules` JOIN `classes` | `classes.show_on_website`, `status = 'scheduled'` |
| `pricing` | Active plans with features, featured flag | `plans.show_on_website`, `website_name` fallback |
| `instructors` | Active instructors with bios, photos, specialties | `instructors.show_on_website`, `website_bio` fallback |
| `reviews` | Up to 20 approved reviews with ratings | No filter (public reviews only) |
| `review_stats` | Aggregate: average rating + total count | No filter |

### 18.7 Technical Details

- **seo-renderer.js** (~6KB) loaded on-demand only when `data-seo="true"` is present
- **Shadow DOM** isolates SEO styles from gym's website CSS
- **JSON-LD injection** into `<head>` for maximum crawler compatibility
- **Microdata** on HTML elements for crawlers that don't execute JS
- **Responsive** — CSS Grid with mobile breakpoints
- **Theme-aware** — reads gym theme config and applies colors/fonts

### 18.8 Files Created

| File | Purpose | Size |
|---|---|---|
| `ADD_WIDGET_SEO_BUNDLE.sql` | `get_public_seo_bundle` RPC | — |
| `public/widgets/seo-renderer.js` | Schema.org + HTML renderer | ~6KB |
| `loader.js` → SEO init | Detects `data-seo`, loads renderer on-demand | — |

---

## 12. Performance Requirements

| Metric | Target |
|--------|--------|
| `loader.js` size (gzipped) | < 5 KB |
| Time to first widget render | < 2 seconds |
| Individual widget bundle | < 50 KB each |
| Total initial load (loader + first widget) | < 100 KB |
| Supabase RPC response time | < 200ms |
| iframe lazy loading | Only load when visible (IntersectionObserver) |
| Caching | `get_public_widget_config` cached 5 minutes client-side |

---

## 13. Existing Code Reuse

| Existing Asset | Reuse Strategy |
|----------------|---------------|
| `app/chat/[gymId]/page.tsx` | Enhance with cross-widget context awareness |
| `app/signup/[slug]/page.tsx` | Pattern reference for slug-based public pages |
| `app/guest-invite/[code]/page.tsx` | Wrap in guest-pass widget, reuse registration flow |
| `app/lead-capture/[code]/page.tsx` | Pattern reference for lead capture form |
| `components/marketing/lead-capture-form.tsx` | Reuse form component in lead capture widget |
| `ADD_PUBLIC_CHAT_SYSTEM.sql` | Pattern reference for widget settings table + RLS |

---

## 14. Implementation Phases

### Phase 0: Foundation (Blocks All Others)

| Step | Deliverable | Files |
|------|------------|-------|
| 0.1 | SQL migration: tables, RPCs, RLS, seed data | `ADD_WEBSITE_WIDGET_SYSTEM.sql` |
| 0.2 | JS Loader (universal + individual modes) | `public/widgets/loader.js` |
| 0.3 | Widget shell component + theme provider | `app/widgets/_components/*` |
| 0.4 | Admin widget dashboard + theme editor | Gym settings page |
| 0.5 | Widget page shell (iframe + standalone detection) | Shared layout |

### Phase 1: Core Widgets (Parallel After Phase 0)

| Step | Widget | Page |
|------|--------|------|
| 1.1 | Schedule (interactive calendar) | `app/widgets/schedule/[slug]/page.tsx` |
| 1.2 | Pricing (plan comparison) | `app/widgets/pricing/[slug]/page.tsx` |
| 1.3 | Studio Info (hours, contact, map) | `app/widgets/info/[slug]/page.tsx` |
| 1.4 | AI Chat Enhancement | Modify existing `app/chat/[gymId]/page.tsx` |
| 1.5 | Lead Capture Enhancement | `app/widgets/lead-capture/[slug]/page.tsx` |

### Phase 2: Engagement Widgets (Parallel After Phase 0)

| Step | Widget | Page |
|------|--------|------|
| 2.1 | Instructor Profiles | `app/widgets/instructors/[slug]/page.tsx` |
| 2.2 | Reviews & Testimonials | `app/widgets/reviews/[slug]/page.tsx` |
| 2.3 | Guest Pass CTA | `app/widgets/guest-pass/[slug]/page.tsx` |
| 2.4 | Events & Workshops | `app/widgets/events/[slug]/page.tsx` |

### Phase 3: WOW Factor (Parallel After Phase 0)

| Step | Widget | Unique Value |
|------|--------|-------------|
| 3.1 | Visual Spot Map | No competitor has this on web |
| 3.2 | Real-time Social Proof | Real data, not fake badges |
| 3.3 | Live Class Feed | "Happening Now" indicator |
| 3.4 | Community Showcase | Leaderboards, achievements |

---

## 15. Testing Strategy

| Test Type | Scope | Method |
|-----------|-------|--------|
| **SQL migration** | Tables, RPCs, RLS | `./run_sql.sh` + manual RPC tests |
| **Unit: loader.js** | Config fetch, iframe creation, bus | Jest (vanilla JS) |
| **Unit: widgets** | Data display, theme application | React Testing Library |
| **Integration: embed** | Widget renders in external iframe | Test HTML page on different domain |
| **Integration: cross-widget** | postMessage routing, context sharing | Playwright E2E |
| **Security: XSS** | Parameter sanitization | Manual + OWASP ZAP scan |
| **Security: CORS** | Origin validation in postMessage | Cross-origin test page |
| **Performance: bundle** | loader.js < 5KB, widgets < 50KB each | `next build` + gzip check |
| **Responsive** | Widgets work on mobile websites | Chrome DevTools responsive |
| **Cross-browser** | Chrome, Safari, Firefox, Edge | Manual spot check |

---

## 16. Verification Checklist

- [ ] SQL migration runs without errors via `./run_sql.sh`
- [ ] All `get_public_*` RPCs return correct data for test gym
- [ ] RLS prevents anon from reading disabled widget configs
- [ ] `npm run build` completes with zero errors
- [ ] loader.js < 5KB gzipped
- [ ] Widget renders correctly inside iframe on external HTML page
- [ ] Theme colors applied correctly from URL params
- [ ] postMessage origin validation works (rejects non-CodeGym origins)
- [ ] Cross-widget context flows from schedule → AI chat
- [ ] Lead capture creates lead with correct source attribution
- [ ] Admin dashboard toggles reflect in embedded widgets
- [ ] Rate limiting prevents API abuse
- [ ] Mobile responsive on 375px viewport
- [ ] Installation detection shows "LIVE" in admin after ping
