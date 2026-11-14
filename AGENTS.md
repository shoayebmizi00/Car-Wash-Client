<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

## Commands

- `npm run dev` / `build` / `start` / `lint` — the only npm scripts. No test suite exists.
- Typecheck: `npx tsc --noEmit` (no script defined). Run after `next build` or `next dev` so `.next/types/**` and `.next/dev/types/**` exist for route type validation.
- `lint` runs bare `eslint` (no path args) using `eslint.config.mjs` (flat config, core-web-vitals + TS presets).

## Environment

- `.env` (committed) has only `BETTER_AUTH_SECRET` / `BETTER_AUTH_URL`. Also required by `src/lib/auth.ts` but **not present in `.env`**: `MONGODB_URI`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`.
- `src/lib/auth.ts` creates the `MongoClient` at module load, so anything importing it (e.g. the `/api/auth/[...all]` route) fails at request time without `MONGODB_URI` set.

## Stack & conventions

- Next.js 16 (App Router only, `src/app`), React 19, **React Compiler enabled** (`reactCompiler: true` in `next.config.ts`) — don't hand-write `useMemo`/`useCallback` where the compiler handles it.
- Tailwind CSS v4, CSS-first config: no `tailwind.config.*`. Theme lives in `@theme inline` in `src/app/globals.css`; Tailwind is wired through a Turbopack rule in `next.config.ts`.
- shadcn/ui is configured with `style: "base-nova"` using **Base UI (`@base-ui/react`), not Radix** — check existing components in `src/components/ui/` before assuming Radix APIs. Add components via `npx shadcn add`; aliases: `@/components`, `@/components/ui`, `@/lib`, `@/hooks` (`@/*` → `src/*`, see `tsconfig.json`).
- Auth is better-auth (email/password + Google/GitHub social) with the MongoDB adapter, exposed at `/api/auth/[...all]`; server instance in `src/lib/auth.ts`, client in `src/lib/auth-client.ts`.
