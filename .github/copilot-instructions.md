# Copilot Instructions

## Commands

```bash
npm run build        # compile TypeScript → dist/
npm run dev          # run via ts-node (no compile step)
npm test             # run all tests once (vitest run)
npm run test:watch   # vitest in watch mode

# Run a single test file
npx vitest run tests/ordersService.test.ts
npx vitest run tests/app.test.ts
```

## Architecture

This is an Express 5 REST API written in TypeScript (compiled to CommonJS).

```
src/server.ts        ← entry point: initializes DB, calls app.listen()
src/app.ts           ← Express app (exported separately for testing, no listen())
src/openapi.ts       ← OpenAPI 3.0 spec object (all routes + schemas); served at /docs
src/routes/orders.ts ← route handlers, calls service functions
src/services/ordersService.ts ← business logic, calls getDb()
src/db/database.ts   ← singleton SQLite DB via better-sqlite3; auto-creates schema and seeds data on first call
tests/               ← all tests live here, not under src/
```

`app.ts` is intentionally decoupled from `server.ts` so tests can import the app without starting a server.

## Database

- Uses **better-sqlite3** (synchronous API — no `await` needed for queries).
- `getDb()` returns a singleton; call it directly in services.
- Schema and seed data are auto-applied on first `getDb()` call.
- The DB file path defaults to `shopping.db` at project root; override with `DB_PATH` env var.
- Valid order statuses: `pending`, `shipped`, `completed`.

## Testing conventions

- Tests use **Vitest** + **supertest** for HTTP-level integration tests.
- Always mock `../src/db/database` with `vi.mock()` at the top of test files to avoid touching a real SQLite file.
- Service-level tests mock `getDb()` to return a fake `{ prepare: vi.fn() }` chain.
- Route-level tests in `app.test.ts` mock the entire service module instead.
- Mocks must be set up **before** importing the modules under test (Vitest hoists `vi.mock` calls).

## API response shape

Routes wrap arrays in a named key:
```json
GET /orders → { "orders": [ … ] }
```
