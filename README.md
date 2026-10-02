
# Startup Innovation & Incubation Center

The Startup Innovation & Incubation Center (SIC) website for ICFAI University Tripura presents the center's startup ecosystem, leadership, student opportunities, incubated ventures, partnerships, and collaboration programs.

## Project Overview

The homepage includes:

- a sticky header with navigation and a registration call to action
- a hero section introducing SIC and its mission
- SIC and university leadership profiles
- student body and event highlights
- incubated startups and global partnerships
- roadshows and collaboration opportunities
- membership, collaboration, and contact forms

The design uses responsive layouts, optimized images, and reusable components to keep the experience consistent across desktop and mobile devices.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint 9

## Routes

- `/` - SIC homepage
- `/startups` - incubated startups and grant support
- `/sic-leadership` - SIC leadership team

The form endpoints are implemented as Next.js route handlers:

- `/api/send-membership`
- `/api/send-collaboration`

## Repository Structure

```text
app/
	globals.css
	layout.tsx
	page.tsx
	api/
	components/
lib/
public/
```

Key component responsibilities:

- `app/page.tsx` composes the full homepage
- `app/components/Header.tsx` contains the navigation and mobile menu
- `app/components/HeroSection.tsx` introduces SIC
- `app/components/SICLeadershipSection.tsx` presents the SIC leadership team
- `app/components/IncubatedStartups.tsx` showcases supported startups
- `app/components/MembershipForm.tsx` handles student membership applications
- `app/components/CollaborationForm.tsx` handles collaboration requests
- `app/api/` contains the form submission endpoints
- `lib/security.ts` provides request validation and input protection

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env.local` file for form email delivery:

```env
RESEND_API_KEY=your_resend_api_key
RECIPIENT_EMAIL=your_recipient_email
```

The forms use Resend to deliver submissions. Keep these values server-side and do not commit `.env.local`.

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

## Available Scripts

- `npm run dev` starts the local development server
- `npm run build` creates a production build
- `npm run start` serves the production build locally
- `npm run lint` runs ESLint across the project

## Deployment

This project can be deployed on any platform that supports Next.js applications, including Vercel and similar Node.js hosting environments. Before deploying, run `npm run build` to confirm the application compiles successfully.

## Contributing

If you update the event copy, imagery, or section structure, keep the README aligned with the homepage so that the repository documentation continues to reflect the live experience.
