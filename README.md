# On-Page SEO Agent — API

Next.js 14 API backend for the On-Page SEO optimization platform. Migrated from FastAPI to Next.js Route Handlers for unified deployment on Vercel.

## Stack

- **Runtime**: Next.js 14 (App Router, Route Handlers only — no UI)
- **Database**: PostgreSQL 16 via Prisma ORM (hosted on Supabase)
- **Auth**: Auth.js v5 (NextAuth) with JWT sessions, Google OAuth + credentials
- **AI**: Anthropic Claude API, Google Gemini
- **Background Jobs**: Inngest (serverless queues)
- **Billing**: Stripe subscriptions + webhooks
- **SEO Data**: SerpAPI, DataForSEO

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database (or Supabase project)
- API keys for Anthropic, SerpAPI, Stripe (see `.env.example`)

### Setup

```bash
# Install dependencies
npm install

# Copy env template and fill in values
cp .env.example .env.local

# Generate Prisma client (after adding schema)
npx prisma generate

# Push schema to database
npx prisma db push

# Start dev server on port 3001
npm run dev
```

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string (pooled) |
| `DIRECT_URL` | Yes | PostgreSQL direct connection (for migrations) |
| `NEXTAUTH_SECRET` | Yes | Random secret for JWT signing |
| `NEXTAUTH_URL` | Yes | Base URL of this API |
| `GOOGLE_CLIENT_ID` | No | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | No | Google OAuth client secret |
| `ANTHROPIC_API_KEY` | Yes | Claude API key |
| `ANTHROPIC_MODEL` | No | Default model (claude-sonnet-4-20250514) |
| `ANTHROPIC_MODEL_DEEP` | No | Deep analysis model (claude-opus-4-20250514) |
| `GEMINI_API_KEY` | No | Google Gemini API key |
| `SERPAPI_KEY` | Yes | SerpAPI key for SERP retrieval |
| `DATAFORSEO_LOGIN` | No | DataForSEO login |
| `DATAFORSEO_PASSWORD` | No | DataForSEO password |
| `STRIPE_SECRET_KEY` | No | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | No | Stripe webhook signing secret |
| `BLOG_COMMANDER_DSN` | No | Blog Commander database connection |
| `BLOG_COMMANDER_AUTHOR_ID` | No | Default blog author ID |
| `ALLOWED_ORIGINS` | Yes | Comma-separated allowed CORS origins |
| `SENTRY_DSN` | No | Sentry error tracking DSN |
| `POSTHOG_KEY` | No | PostHog analytics key |
| `MAX_CRAWL_PAGES` | No | Max pages to crawl (default: 50) |
| `CRAWL_DELAY_MS` | No | Delay between crawl requests (default: 500) |
| `SCRAPE_CONCURRENCY` | No | Concurrent scraping workers (default: 10) |
| `SERP_CONCURRENCY` | No | Concurrent SERP requests (default: 5) |

## API Routes

### Auth
- `GET/POST /api/auth/*` — NextAuth handlers (login, callback, session)

### Projects
- `GET /api/projects` — List user projects
- `POST /api/projects` — Create project
- `GET /api/projects/:id` — Get project details
- `DELETE /api/projects/:id` — Delete project
- `POST /api/projects/:id/pipeline` — Trigger analysis pipeline

### Keywords
- `GET /api/keywords?project_id=` — List keywords for project
- `GET /api/keywords/:id` — Get keyword with all related data
- `DELETE /api/keywords/:id` — Delete keyword

### Analyses
- `GET /api/analyses?keyword_id=` — Get all analyses for keyword
- `GET /api/analyses/:id` — Get single report

### Competitors
- `GET /api/competitors?project_id=` — List competitors
- `POST /api/competitors` — Add competitor
- `GET /api/competitors/:id` — Get competitor
- `DELETE /api/competitors/:id` — Remove competitor

### SEO Tools
Each tool exposes `GET` (fetch reports) and `POST` (start analysis):
- `/api/tools/keyword-difficulty`
- `/api/tools/keyword-gap`
- `/api/tools/content-gap`
- `/api/tools/content-performance`
- `/api/tools/topic-research`
- `/api/tools/long-tail-keywords`
- `/api/tools/ai-keyword-suggestions`
- `/api/tools/serp-preview`
- `/api/tools/serp-features`
- `/api/tools/domain-authority`
- `/api/tools/page-speed`
- `/api/tools/internal-links`
- `/api/tools/site-audit`
- `/api/tools/backlinks`
- `/api/tools/anchor-text`
- `/api/tools/rank-tracker`
- `/api/tools/site-profiler`
- `/api/tools/competitor-discovery`
- `/api/tools/keyword-extraction`
- `/api/tools/google-ads`
- `/api/tools/image-gen`

### Blog
- `POST /api/blog/generate` — Queue blog generation
- `GET /api/blog/status?job_id=` — Check generation status

### Exports
- `GET /api/exports/pdf?report_id=` — Download PDF report
- `GET /api/exports/csv?project_id=` — Download keywords CSV

### Billing
- `GET /api/billing` — Get billing info
- `POST /api/billing` — Create checkout session
- `POST /api/billing/webhook` — Stripe webhook handler

### Settings
- `GET /api/settings` — List app settings
- `PUT /api/settings` — Update setting (admin only)

### Health
- `GET /api/health` — Health check (no auth required)

## Adding a New Route

1. Create `app/api/<resource>/route.ts`
2. Import utilities from `@/lib/api-utils`
3. Use `getAuthSession()` for authentication
4. Use `json()`, `errorResponse()`, `notFound()`, `unauthorized()` for responses
5. Keep each route handler under 100 lines

```typescript
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthSession, json, errorResponse, unauthorized } from "@/lib/api-utils";

export async function GET(req: NextRequest) {
  const session = await getAuthSession();
  if (!session) return unauthorized();
  // ... your logic
  return json(data);
}
```

## Deployment (Vercel)

1. Connect the repo to Vercel
2. Set the root directory to `API` (or wherever this project lives)
3. Add all environment variables from `.env.example`
4. Deploy — Vercel auto-detects Next.js

The API runs as serverless functions. No persistent server process needed.

## Scripts

```bash
npm run dev        # Start dev server on port 3001
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript type checking
```
