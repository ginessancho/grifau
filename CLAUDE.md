# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GRIFAU is a luxury water filtration landing page — "the Apple of faucets." This is a Next.js 16 marketing site with an email subscription feature backed by Turso (libSQL) database. The design emphasizes neoclassical elegance with British-French refinement.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (opens on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Environment Setup

Copy `.env.example` to `.env.local` and configure:

```bash
DB_URL=libsql://your-database.turso.io
AUTH_TOKEN=your-auth-token-here
```

These credentials are for the Turso database that stores email subscribers.

## Architecture

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **Database**: Turso (libSQL) via `@libsql/client`
- **Styling**: Vanilla CSS with custom design tokens (no CSS framework)
- **Typography**: Cormorant Garamond + Inter (loaded via Google Fonts in globals.css)
- **Deployment**: Vercel

### Directory Structure

```
src/
├── app/
│   ├── api/subscribe/route.ts   # POST endpoint for email subscriptions
│   ├── globals.css              # Global styles and design tokens
│   ├── layout.tsx               # Root layout with metadata
│   └── page.tsx                 # Landing page component
└── lib/
    └── db.ts                    # Turso client and database operations
```

### Database Layer

The database layer (`src/lib/db.ts`) uses Turso (libSQL) with:
- **Auto-initialization**: The `subscribers` table is created on first API request
- **Single table**: `subscribers(id, email, created_at)`
- **Duplicate handling**: UNIQUE constraint on email with graceful error handling

Database functions:
- `initializeDatabase()` - Creates the subscribers table if it doesn't exist
- `addSubscriber(email)` - Inserts email with duplicate detection

### API Routes

**POST /api/subscribe** (`src/app/api/subscribe/route.ts`)
- Lazy initializes database on first request
- Validates email format with regex
- Normalizes email to lowercase and trims whitespace
- Returns 200 (success), 409 (duplicate), or 400 (validation error)

### Design System

The design is implemented through CSS custom properties in `globals.css`:
- **Color palette**: Warm ivory to deep charcoal grays
- **Typography**: Cormorant Garamond (serif, headings) + Inter (sans-serif, body)
- **Layout**: Centered, vertical flow with generous whitespace
- **Roman numerals**: Used for section markers (styling pattern established)

Design philosophy emphasizes understated luxury and rigorous simplicity.

### Path Aliases

TypeScript path alias configured in `tsconfig.json`:
- `@/*` maps to `./src/*`

Use this for all imports: `import { db } from '@/lib/db'`

## Key Patterns

1. **Database initialization**: Happens lazily on first API call, not at build time
2. **Email handling**: Always lowercase and trim before storage
3. **Error handling**: Database errors are caught and converted to user-friendly messages
4. **Styling**: No CSS-in-JS or utility classes — pure CSS with design tokens

## Deployment

Configured for Vercel with automatic deployments. Environment variables must be set in Vercel dashboard:
- `DB_URL`
- `AUTH_TOKEN`
