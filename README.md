# RateMyHighSchoolTeachers (RateMyHST)

RateMyHighSchoolTeachers—also known as RateMyHST or RMHST—is a modern, student-first take on classic RateMyProfessors style reviews, purpose-built for high school teachers, schools, and districts. The app is an end-to-end discovery and insights platform for classroom culture rather than transit maps.

> **Goal**: help students surface what works in their classrooms, give educators a place to showcase impact, and provide districts with actionable context rather than anonymous call‑outs.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment variables](#environment-variables)
  - [Development scripts](#development-scripts)
- [Project Structure](#project-structure)
- [Data Model](#data-model)
- [Roadmap](#roadmap)
- [Credits](#credits)

## Overview

RateMyHST focuses on storytelling around classroom culture, clarity, and support. The landing page highlights verified teacher profiles, student reviews, and district spotlights. Each profile can surface rating averages, difficulty, “would take again” percentages, teaching style notes, and curated highlights such as internships, field work, or lab experiences.

The project currently ships with a curated sample dataset to demonstrate the experience; wire it up to your own source of truth, moderation workflow, or district feeds to go from prototype to production.

## Features

- Search hub with filters for state, subject, and sort order (rating, ease, recent reviews)
- Teacher profiles that display averages, credentials, highlights, reviews, and CTA to share experiences
- School spotlights summarizing standout programs, trending subjects, and featured teachers
- Recent review stream that emphasizes respectful, specific student voice
- Global rebrand (layout, metadata, header/footer) for RateMyHighSchoolTeachers with CTA-friendly hero

## Tech Stack

- **Next.js 14** with the App Router and React Server Components
- **TypeScript** for strict typing across components and data
- **Tailwind CSS** for design tokens and responsive layouts
- **Headless UI** + custom hooks for theming and inputs

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
git clone <repo-url>
cd ratemyhst
npm install
```

### Environment variables

No secrets are required to explore the current static experience. If you decide to add analytics, authentication, or storage, create a `.env.local` file and follow the Next.js pattern for exposing public variables with `NEXT_PUBLIC_`.

### Development scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server on `http://localhost:3000` (Turbopack) |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Lint the project |

## Project Structure

```text
.
├── src/
│   ├── app/
│   │   ├── (website)/             # Marketing + review experience (home, teacher pages, auth, etc.)
│   │   └── api/                   # API routes (auth, reset password, etc.)
│   ├── components/                # UI building blocks (header, footer, search, spotlights)
│   ├── context/                   # Theme + auth contexts
│   ├── lib/                       # Teacher data, helpers, config
│   ├── styles/                    # Tailwind layers
│   └── types/                     # Shared TS definitions
├── public/                        # Static assets
└── README.md
```

The codebase focuses entirely on RateMyHST&apos;s teacher discovery flow, so you can extend it with new surfaces (district dashboards, counselor tools, etc.).

## Data Model

Sample data lives in `src/lib/teachers.ts` and includes:

- `Teacher`: ratings, subjects, schools/districts, teaching style, highlights, and review feed
- `Review`: student class experience with rating, difficulty, tags, and timestamp
- `School`: spotlight content for district storytelling
- `systemStats`: aggregate numbers for the hero + search panels

Swap this file with a call to your database, Prisma models, or API client when you are ready to go live.

## Roadmap

1. Hook up actual authentication and moderation tools
2. Replace static data with Prisma/REST backed storage
3. Build counselor and district dashboards for trend alerts
4. Add submission flows with guardrails (screen for defamation, verify enrollment, etc.)

## Credits

- Rebrand, dataset, and RateMyHST experience by the RateMyHighSchoolTeachers team
- Ongoing UX, moderation, and data storytelling contributions from educators, students, and counselors in the RateMyHST community
