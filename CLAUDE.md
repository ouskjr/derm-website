# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Lamazi is a static marketing website for a mobile esthetician (Magdana Machavariani) serving Brielle, NJ. No build tools, no framework, no package manager — just HTML, CSS, and JS served directly.

**Live site:** https://lamazi.netlify.app (deployed via Netlify from this repo's `main` branch)

## Development

Open any `.html` file directly in a browser, or use a local server to avoid any relative-path quirks:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

There are no build steps, linters, or tests configured.

## Architecture

All pages share a single `style.css` and `script.js`. The nav, footer, and `<head>` block are copy-pasted into every HTML file — there is no templating engine. **When changing the nav or footer, update all five HTML files** (`index.html`, `services.html`, `about.html`, `contact.html`, `booking.html`).

**`script.js`** handles two things only:
- Hamburger menu toggle (`toggleMenu`) with ARIA state management and Escape-key close
- Contact form fake submit (`handleSubmit`) — hides the form and shows a `#form-success` element

**`style.css`** uses CSS custom properties defined in `:root` for the entire design system. All colors come from these tokens:

| Token | Value |
|---|---|
| `--pink-dark` | `#A85870` (primary brand / theme-color) |
| `--pink-deep` | `#8F465C` (focus rings, darkest accent) |
| `--pink-accent` | `#C97A8F` |
| `--pink-mid` | `#F2D4DC` |
| `--pink-light` | `#FDF0F3` |
| `--font-serif` | Cormorant Garamond |
| `--font-sans` | Inter |

## Known placeholders

- **WhatsApp number** — all `wa.me/1XXXXXXXXXX` links need a real number before launch
- **Booking calendar** — `booking.html` shows a static placeholder; a real scheduling embed (e.g. Calendly, Acuity) goes inside `.booking-calendar`
- **Hero image** — `index.html` uses `.image-placeholder` div instead of a real `<img>`; real photos go in the `images/` directory

## SEO / meta

Every page has full Open Graph, Twitter Card, canonical URL, and a `robots` meta tag. `index.html` also includes a `ld+json` `HealthAndBeautyBusiness` schema block. `sitemap.xml` and `robots.txt` are at the root and should be updated if pages are added or URLs change.

## Accessibility conventions

- Every page starts with a `.skip-link` pointing to `#main-content`
- The active page sets `aria-current="page"` on its own nav `<a>`
- Decorative icons use `aria-hidden="true"`
- Focus styles use `focus-visible` only (no focus ring on mouse click)
