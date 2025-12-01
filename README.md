# Portfolio

Modern personal portfolio built with Next.js 16, React 19, and Tailwind CSS 4. Features an animated hero, responsive project cards, a gallery carousel, and a contact section — optimized for mobile-first usability and accessibility.

## Overview

- Animated hero background with dynamic SVG paths and a prominent call to action.
- Projects grid using interactive cards with hover transitions on desktop and full-card tap on mobile.
- Carousel gallery with round navigation dots and smooth snapping.
- Contact section with accessible inputs and responsive layout.

## Tech Stack

- Framework: Next.js `16.0.3`
- UI: React `19.2.0`
- Styling: Tailwind CSS `^4`
- Animations: Framer Motion `^12`, GSAP `^3`
- UI Primitives: Radix UI (`@radix-ui/*`), Lucide Icons

## Getting Started

### Prerequisites

- Node.js `>=18`
- npm `>=10`

### Installation

```bash
git clone <your-repo-url>
cd portfolio
npm install
```

### Development

```bash
npm run dev
```

Open `http://localhost:3000` in the browser.

### Production Build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## Key Features & Files

- Hero background and CTA:
  - Background paths component in `src/components/ui/background-paths.tsx`
  - Button links to projects with proper touch size and visual feedback
  - Mobile-only background scaling applied to balance the hero with heading
- Home page composition:
  - `src/app/page.tsx` assembles hero, about, education, projects, gallery, and contact sections
- Project cards:
  - `src/components/card-7.tsx` provides hover-lift interactions on desktop and a full-card tap overlay on mobile
  - Maintains z-index layering to avoid visual overlaps
- Gallery carousel:
  - `src/components/gallery4.tsx` — round dots, smooth transitions, accessible controls
- Contact section and inputs:
  - `src/components/contact.tsx`
  - `src/components/ui/checkbox.tsx` — compact checkboxes without inherited min-heights
- Global styles and tokens:
  - `src/app/globals.css` — design tokens, fluid typography, scrollbar styling

## Responsive Behavior

- Mobile (≤768px):
  - Entire project card is tappable; subtle highlight on tap
  - CTA button hidden (overlay tap handles navigation)
  - Background SVG scaled up for visual balance
- Tablet (769–1024px) and Desktop (>1024px):
  - Hover-reveal CTA and content lift transitions on cards
  - Standard background scale and animations

## Accessibility

- Touch targets meet the 48×48px minimum on interactive elements
- Buttons and links include descriptive labels
- Color contrast adheres to a dark/light theme with high readability

## Deployment

- Recommended: Vercel
- Ensure Node.js version matches local (`>=18`)
- Environment variables: none required for baseline portfolio

## Project Structure

```
portfolio/
├─ src/
│  ├─ app/            # Next.js App Router pages and global styles
│  ├─ components/     # UI components (cards, gallery, inputs, footer)
│  └─ lib/            # Utilities (e.g., class name helpers)
├─ package.json
├─ README.md
└─ ...
```

## Troubleshooting

- Tailwind CSS 4: Ensure `src/app/globals.css` imports `@import "tailwindcss";`
- Hero background scaling: Controlled via utility classes on the SVG (mobile-only)
- Images: External Unsplash URLs may throttle; fallback URLs are set in cards
- Node version: Use `nvm` to match `>=18` if build errors arise

## Contributing

- Fork the repo and create feature branches
- Run `npm run lint` before submitting PRs
- Keep mobile-first and accessibility requirements intact

## License

- Add your license details here (MIT, Apache-2.0, or proprietary)

