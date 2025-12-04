# Portfolio

Modern portfolio for showcasing projects, achievements, and contact information. Built with Next.js 16, React 19, and Tailwind CSS 4; optimized for mobile-first usability, accessibility, and performance.

## Project Overview

- Purpose: Present work, achievements, and contact avenues in a responsive, accessible site.
- Core Features:
  - Animated hero with dynamic paths and prominent CTA.
  - Projects grid with interactive cards and minimalist “View” links.
  - Gallery section with badges and WCAG AA-compliant overlays.
  - Achievements & Certifications section with cards and certificate viewer.
  - Contact form that sends HTML emails directly via Resend (no Gmail redirect).
- Technologies:
  - Frameworks: Next.js `16.0.7` (App Router), React `19.2.1`.
  - Styling: Tailwind CSS `^4`.
  - UI/Icons: Radix UI (`@radix-ui/*`), Lucide Icons.
  - Motion: Framer Motion `^12` and GSAP `^3` for animations.
  - Email: Resend `^6` for server-side email sending.

## Key Components

- `src/app/page.tsx` — assembles hero, about, education, projects, achievements, and contact.
- `src/components/gallery4.tsx` — gallery cards with badges and minimalist bottom-right “View”.
- `src/components/card-7.tsx` — project card interactions and CTA consistency.
- `src/components/achievements.tsx` — achievements grid using `AwardCard` and certificate modal.
- `src/components/achievement-cards.tsx` — shadcn-style `AwardCard` component.
- `src/components/contact.tsx` — contact form with client validation and status.
- `src/app/api/contact/route.ts` — server route that sends Resend HTML emails.
- `src/components/navbar-client.tsx` — navigation with smooth anchor scrolling.
- `src/app/globals.css` — tokens and global styles.

## Recent Changes

- Achievements section added and integrated in navbar after Projects.
- Switched achievements to `AwardCard` grid; replaced overlay image implementation.
- Embedded Google Drive certificate preview (`/preview`) and added “Open in new tab”.
- Contact form now sends HTML emails via Resend with inline CSS template and required-field validation.
- Minimalist “View” link redesign across cards; improved spacing and hierarchy.
- WCAG AA contrast improvements with gradient overlays and typography tuning.
- Technology badges for all “More Projects” cards.
- Environment file `.env.local` added for Resend configuration.
- Security: Upgraded Next.js and React to patched versions (RSC CVEs).

### Changelog

- 2025-12-04
  - Upgrade Next.js to `16.0.7`, React to `19.2.1` to address RSC CVEs.
  - Implement Achievements section with `AwardCard` and certificate viewer.
  - Add Google Drive `preview` embedding and external open link.
  - Integrate Resend and HTML email template; client validation.
  - Redesign “View” links; badges for gallery items; AA contrast fixes.
  - Add `.env.local` configuration.
- 2025-12-01
  - Initial portfolio structure, hero, projects, gallery, and contact.

## Setup Instructions

### Prerequisites

- Node.js `>=18`
- npm `>=10`

### Installation

```bash
git clone <your-repo-url>
cd portfolio
npm install
```

### Environment Configuration

Create `./.env.local`:

```env
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=onboarding@resend.dev
TO_EMAIL=yashbharvada4@gmail.com
```

- Use a verified sender for `RESEND_FROM_EMAIL` (e.g., `contact@your-domain.com`).
- `TO_EMAIL` is the inbox where inquiries are delivered.

### Development

```bash
npm run dev
```

Open `http://localhost:3000`.

### Production Build & Start

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## Usage Guidelines

- Navigation: Use the navbar to jump to sections (`About`, `Journey`, `Projects`, `Achievements`, `Contact`).
- Projects: Click minimalist “View” in the bottom-right of cards to open links.
- Achievements: Click any achievement card to open the certificate viewer; if access is restricted, use the “Open in new tab” link.
- Contact: Fill `Name`, `Email`, `Brief description`, and select relevant items; click “Send a message” to deliver an email directly. Replies go to the entered email (`replyTo`).

## Deployment

- Recommended: Vercel.
- Set environment variables in Vercel project settings to match `.env.local`.
- Ensure Node version `>=18` (Vercel defaults are fine).

## Maintenance Information

- Known Issues:
  - Google Drive links require share settings “Anyone with the link” for inline preview.
  - Multiple lockfile warning from Turbopack if duplicate lockfiles exist.
  - Two lint warnings on unused props in `card-7.tsx`; safe to ignore.
- Planned Enhancements:
  - Add certificate thumbnails in `public/achievements/` for all entries.
  - Replace placeholder sender with verified domain email.
  - Add automated tests for API route and form validation.
- Contribution Guidelines:
  - Create feature branches, keep PRs small and focused.
  - Run `npm run lint` and ensure accessibility for new UI.

## Project Structure

```
portfolio/
├─ src/
│  ├─ app/
│  ├─ components/
│  └─ lib/
├─ package.json
├─ README.md
└─ .env.local
```

## Troubleshooting

- Tailwind CSS 4: Ensure `src/app/globals.css` imports `@import "tailwindcss";`.
- Drive preview access: Set sharing to “Anyone with the link”.
- Node version: Use `nvm` to match `>=18` if build errors arise.

## License

- Add your license details here (MIT, Apache-2.0, or proprietary)
