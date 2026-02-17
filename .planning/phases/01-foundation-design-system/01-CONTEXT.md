# Phase 1: Foundation & Design System - Context

**Gathered:** 2026-02-17
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish design tokens (colors, typography, spacing), error boundaries, custom hooks for API logic, and replace non-functional `<el-*>` elements. This phase creates the visual language and technical primitives that every future component builds on. No new features are added — the app should look and feel different but do the same things.

</domain>

<decisions>
## Implementation Decisions

### Color & Mood
- Cool neutral palette — light grays, blue-grays, soft whites
- Near-white main background (#f8f9fa range) — airy, lots of breathing room
- Muted teal accent color for interactive elements (buttons, links, focus states)
- Book covers sit on floating white cards with subtle shadow — covers pop slightly off the background

### Typography Pairing
- **Headings:** Syne Mono — geometric monospace, distinctive and understated
- **Body text:** System font stack — fastest load, native feel per device
- **Type scale:** Compact — smaller headings, tight hierarchy, more content visible
- **Syne Mono usage:** Claude's discretion on where beyond page headings (navigation, badges, etc.)

### Motion & Transitions
- **Level:** Intentional — noticeable choreography, not just fades
- **Page transitions:** Shared element — book cover morphs from grid position to detail position
- **Grid reveal:** Claude's discretion (staggered vs all-at-once)
- **Hover:** Subtle lift — card rises slightly with shadow change, tactile physical feeling

### Error Fallback
- **Tone:** Warm and reassuring — "Something went wrong. Your books are safe."
- **Visual:** Simple line illustration or icon to soften the moment
- **Scope:** Full page error — replace entire page with error state when something fails
- **Recovery:** Manual retry button ("Try again") — user controls when to retry

### Claude's Discretion
- Exact Syne Mono usage beyond page headings (nav, badges, buttons — find what works)
- Grid reveal animation style (staggered or simultaneous)
- Specific teal shade and gray scale values
- Shadow depth and card border-radius
- Spacing scale ratios
- Transition timing and easing curves
- Error illustration style

</decisions>

<specifics>
## Specific Ideas

- Syne Mono is a specific font choice — not a generic serif. This gives Sadie a distinctive, slightly technical identity that stands apart from typical book apps
- "Subtle lift" on hover implies physical metaphor — cards should feel like real objects you can pick up
- Shared element transitions (cover morphing from grid to detail) is the most polished option — this is a priority for the "intentional" animation philosophy
- Cool neutrals + muted teal creates a calm, reading-nook atmosphere without warmth — more like a quiet library than a cozy living room

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation-design-system*
*Context gathered: 2026-02-17*
