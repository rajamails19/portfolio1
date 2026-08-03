# Notes for Claude Code

## Mobile & responsive design — read before any UI change

This app is used on phones. Every UI change (new component, new page, new
modal, edits to an existing one) must be checked at a 375px viewport before
being considered done — not just desktop. This codebase had a mobile-audit
pass done; keep it that way going forward.

Regressions to watch for, in rough order of how often they bite:

- **Inputs under 16px zoom the page on iOS Safari focus.** Use `text-base
  sm:text-sm` (or larger) on any `input`/`textarea`/`select`.
- **`100vh` breaks with the mobile URL bar.** Use `100dvh`.
- **`env(safe-area-inset-*)` silently returns `0`** unless the viewport meta
  also has `viewport-fit=cover`. They ship together or not at all.
- **A permanent sidebar/nav with no `hidden md:*` fallback** strands phone
  users — pair any desktop-only nav with a collapsed pattern (drawer,
  hamburger) below `md`.
- **`flex-wrap` control bars** that look fine on desktop can eat a third of a
  phone screen — make low-priority controls `shrink-0` and hide extras below
  `sm:` rather than letting everything wrap.
- **Decorative `absolute` glow/orb elements with negative offsets** need an
  `overflow-hidden` ancestor, or they cause real horizontal page scroll on
  narrow viewports — not just visual bleed. Verify with
  `document.documentElement.scrollWidth === clientWidth` at 375px, don't
  eyeball a screenshot.
- **`background-attachment: fixed`** is janky/ignored on iOS Safari — use a
  fixed `body::before` layer instead.
- **`group-hover` affordances never fire on touch.** Anything gated behind
  hover-only should also be visible by default below `sm:`.
- **Long unbreakable strings in a flex row** (a slug, a single long word) need
  both `break-words` and `min-w-0` on the flex child — `break-words` alone
  does nothing while the flex item's default `min-width: auto` blocks it.

Before shipping any UI change, verify at 375×812 in a real browser — click
through the actual interaction, not just a screenshot.
