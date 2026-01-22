# Kaiten.com Landing Page Spec (Mobile-First)

## Overview
Single-page, SEO-friendly marketing router for Kaiten Mart, Kaiten Living, Kaiten HomeCare. Next.js App Router, styled-components, theme toggle (light/dark), EN/JP UI toggle. No backend. External routing to product domains. Analytics hooks are placeholders only.

## Information Architecture (Section Order)
1) Sticky Top Bar (header)
2) Hero (above the fold)
3) Product Router Cards (core)
4) How Kaiten Works (3-step strip)
5) Deep-dive mini sections (3 product blocks)
6) Trust & policy strip
7) Contact / Footer

## Visual Direction (MiniShare UI)
- Palette: teal-navy / deep blue; paper textures layered on top.
- Surfaces: squared corners, bold borders, slight offsets.
- Shadows: pixel-frame + soft shadow.
- Background: composite of gradient blobs + fine grid + subtle diagonal pattern.
- Typography: Outfit for headings, Inter for body; headings letter-spacing -0.02em; eyebrows uppercase with 0.08em tracking.
- Motion: card hover scale, button press 2px offset “retro feedback.”
- Iconography: Lucide style icons (14–20px).

## Theme Tokens
### Light (default)
- primary: #24356f
- primaryDark: #1b274f
- accent: #3b4f9b
- paper: #f2f4f8
- surface: #f8f9fc
- text: #0c1224
- muted: #596380
- outline: rgba(12, 18, 36, 0.12)
- gradient: linear-gradient(135deg, #1e2c5c, #2f4285, #1a2450)
- shadowPixel: 0 0 0 2px #111, 6px 6px 0 rgba(17,17,17,0.4)
- shadowSoft: 0 14px 34px rgba(0,0,0,0.08)

### Dark
- primary: #c7d2ff
- primaryDark: #9fb0ff
- accent: #7a90e6
- paper: #0f1630
- surface: #121a33
- text: #f2f4f8
- muted: #a9b4ce
- outline: rgba(242, 244, 248, 0.14)
- gradient: linear-gradient(135deg, #0f1a3a, #1a2856, #0d1430)
- shadowPixel: 0 0 0 2px #0a0a0a, 6px 6px 0 rgba(0,0,0,0.5)
- shadowSoft: 0 18px 36px rgba(0,0,0,0.35)

## Layout Spec (mobile-first)
### 1) Sticky Top Bar
- Structure: left brand cluster, right action cluster.
- Left: KTLogo.png + Kaiten wordmark.
- Right actions: ThemeToggle, LanguageToggle (EN/JP), Contact anchor link.
- Style: translucent surface panel with blur, pixel-frame border/shadow, slight offset.
- Behavior: sticky at top, tap targets >= 44px, keyboard focus with pixel-frame outline.

### 2) Hero
- Eyebrow: “Kaiten Ecosystem” (uppercase).
- H1: “One hub for living, shopping, and home services.”
- Supporting copy: 2 lines max, benefit-first (convenience + trust + local coverage).
- Primary CTAs (pixel-frame):
  - “Go to Kaiten Mart”
  - “Explore Kaiten Living”
  - “Book Kaiten HomeCare”
- Secondary CTA (text button): “See how it works” (scrolls to Section 4).
- Visual element: retro framed “ecosystem card” showing three mini tiles connected by subtle dotted lines.

### 3) Product Router Cards (core)
- Grid: 1 column mobile, 3 columns desktop; equal height cards.
- Each card includes:
  - Icon + product name
  - 1-sentence value proposition
  - 3 bullet highlights
  - Primary CTA (routes external domain)
  - Secondary “Learn more” link (scrolls to product deep-dive)
  - Status chip: “Popular” / “New” / “Trusted” (accent/primary)
- Card style: surface background, outline border, soft shadow, pixel-frame overlay; hover lift + scale.
- Product positioning:
  - Kaiten Mart: second-hand, student-friendly, quick browsing
  - Kaiten Living: rentals/long-term, agencies/agents, viewing requests
  - Kaiten HomeCare: repair/installation/moving/delivery/home repair/cleaning

### 4) How Kaiten Works
- 3-step strip: horizontal on desktop, stacked on mobile.
- Steps:
  1. Choose a service (Mart / Living / HomeCare)
  2. View details (listings / items / services)
  3. Take action (buy / inquire / request service)
- Retro number chips and concise microcopy.

### 5) Deep-dive Mini Sections (3)
- Alternating layout (image/text left-right) on desktop; stacked on mobile.
- Each block:
  - Retro framed screenshot placeholder (RetroFrame)
  - Short paragraph (<= 90 words)
  - 4 feature chips
  - “Go now” CTA button (routes external domain)

### 6) Trust & Policy Strip
- Compact band, 3–4 trust points with icon + label:
  - Transparent pricing
  - Local support
  - Reliable scheduling
  - Secure communication

### 7) Contact / Footer
- Contact card (surface panel):
  - CTA title: “Partner with Kaiten”
  - Email field + message field
  - Submit shows success toast (front-end only)
- Footer links: Kaiten Mart / Living / HomeCare, Terms, Privacy, Copyright.

## Routing Targets
- Kaiten Mart: https://mart.kaiten.com
- Kaiten Living: https://living.kaiten.com
- Kaiten HomeCare: https://homecare.kaiten.com

## Analytics Hooks (placeholders)
- trackClick("mart-cta")
- trackClick("living-cta")
- trackClick("homecare-cta")
- trackClick("hero-see-how")
- trackClick("contact-submit")

## Component Kit (Reusable)
### TopBar
- States: default, scrolled (adds stronger blur), focus-visible.

### Container / Section
- Container: max-width 1200px, padding responsive.
- Section: vertical rhythm with consistent spacing.

### Card / CardHeader / CardBody
- States: default, hover (scale 1.01), active (slight downscale), focus-visible.

### PixelButton
- Variants: Primary, Secondary, Ghost, Text.
- States: default, hover (slight lift), active (2px offset), disabled.

### Chip / StatusPill
- Small label; uses accent or primary; rounded but squared corners.

### ThemeToggle
- Toggle with accessible label; keyboard toggle; reflects theme state.

### Toast
- Simple success toast with pixel-frame shadow; auto-dismiss.

### RetroFrame
- Bordered rectangle for screenshots; pixel-frame shadow; optional label.

### TextureBackground
- 3-layer composite: gradient blobs + fine grid + subtle diagonal pattern.

## Responsive Rules
- Breakpoints: 640px, 900px, 1200px.
- Mobile first: single column, larger tap targets, reduced padding.
- Desktop: 3-card grid, horizontal stepper, alternating deep-dive layout.

## Accessibility
- Single H1 only; logical heading order.
- Focus-visible: pixel-frame outline, 2px offset.
- Contrast: ensure text on gradient buttons meets minimum contrast.
- Keyboard navigable toggles/links; all CTAs reachable.

## Content Spec (Exact CTA Labels)
### EN (default)
- “Go to Kaiten Mart”
- “Explore Kaiten Living”
- “Book Kaiten HomeCare”
- “See how it works”
- “Partner with Kaiten”

### JP (toggle UI only)
- “Kaiten Martへ”
- “Kaiten Livingを見る”
- “Kaiten HomeCareを予約”
- “使い方を見る”
- “提携する”

## Page Copy (Section-by-Section)
### Hero
- Eyebrow: Kaiten Ecosystem
- H1: One hub for living, shopping, and home services.
- Supporting copy:
  - “From listings to local services, Kaiten keeps everything in one trusted place.”
  - “Discover, compare, and act fast across your neighborhood.”

### Product Router Cards
#### Kaiten Mart
- Value proposition: “A student-friendly second-hand marketplace with fast, focused browsing.”
- Bullets: “Verified local sellers” / “Quick filters for essentials” / “Pick-up and meetups made simple”
- Chip: Popular

#### Kaiten Living
- Value proposition: “Reliable rental listings with agencies, agents, and viewing requests.”
- Bullets: “Long-term listings you can trust” / “Schedule viewings in minutes” / “Agency-backed transparency”
- Chip: Trusted

#### Kaiten HomeCare
- Value proposition: “Book repairs, installs, moving, delivery, or cleaning in a few taps.”
- Bullets: “Clear scopes and pricing” / “Local pros, flexible times” / “End-to-end service tracking”
- Chip: New

### How Kaiten Works
- Step 1: “Choose a service.”
- Step 2: “View details.”
- Step 3: “Take action.”

### Deep-dive Blocks
#### Kaiten Mart
- Paragraph: “Browse quality second-hand items from nearby sellers, built for students and quick turnarounds. Clear photos, straightforward prices, and easy meetups make shopping fast and friendly.”
- Chips: “Student-friendly” / “Local pickup” / “Quick browse” / “Trusted sellers”
- CTA: “Go now” (routes to mart)

#### Kaiten Living
- Paragraph: “Find rentals and long-term listings supported by agencies and agents. Compare neighborhoods, request viewings, and move forward with confidence.”
- Chips: “Agency-backed” / “Viewing requests” / “Neighborhood filters” / “Long-term focus”
- CTA: “Go now” (routes to living)

#### Kaiten HomeCare
- Paragraph: “From repairs and installations to moving, delivery, and cleaning, request reliable help without the back-and-forth. Get clear scopes and flexible scheduling.”
- Chips: “Repair & install” / “Moving & delivery” / “Cleaning” / “Clear scopes”
- CTA: “Go now” (routes to homecare)

### Trust Strip
- Labels: Transparent pricing; Local support; Reliable scheduling; Secure communication.

### Contact / Footer
- Contact card header: “Partner with Kaiten”
- Contact subcopy: “For partnerships, listings, or service providers, reach out and we’ll follow up soon.”
- Fields: “Email address” + “Message”
- Submit button: “Partner with Kaiten”

## Interaction Notes
- Buttons trigger placeholder analytics: trackClick("...")
- Language toggle switches visible text between EN/JP labels only.
- External CTAs open in same tab by default; can set `rel="noopener"` if using `target="_blank"`.

## SEO Notes
- Title: “Kaiten | One hub for living, shopping, and home services”
- Meta description: “Kaiten connects you to second-hand shopping, rental listings, and trusted home services.”
- Open Graph: title + description + product ecosystem image placeholder.
