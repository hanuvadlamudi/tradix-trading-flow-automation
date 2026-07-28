# Turborepo
https://turbo.build/repo/docs

## Apps
- `apps/web` — Vite + React workflow canvas

## Packages
- `packages/common` — shared workflow types, catalogs, and defaults (`@tradix/common`)

## Commands

```bash
npm install
npm run dev          # start all packages in parallel
npm run build        # build common then web
npm run typecheck
npm run dev:web      # web only
```
