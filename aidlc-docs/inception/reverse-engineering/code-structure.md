# Code Structure

## Build System

- **Type**: npm with TypeScript compiler
- **Configuration**:
  - `package.json` — scripts, dependencies, module type (`commonjs`)
  - `tsconfig.json` — strict TypeScript, ES2020 target, CommonJS modules, output to `./dist/`, source in `./src/`
- **Key Scripts**:
  | Script         | Command                | Purpose                              |
  |----------------|------------------------|--------------------------------------|
  | `build`        | `tsc`                  | Compile TypeScript to `dist/`        |
  | `start`        | `node dist/server.js`  | Run compiled production build        |
  | `dev`          | `ts-node src/server.ts`| Run in development mode (no compile) |
  | `test`         | `vitest run`           | Run all tests once                   |
  | `test:watch`   | `vitest`               | Run tests in watch mode              |

## Key Classes/Modules

```
src/
  server.ts           -- Entry point: starts HTTP server, initialises DB
  app.ts              -- Express app factory: middleware + routes
  openapi.ts          -- OpenAPI 3.0.3 spec (inline object)
  routes/
    orders.ts         -- Router for /orders resource
  services/
    ordersService.ts  -- Business logic: getAllOrders(), OrderSummary interface
  db/
    database.ts       -- DB singleton: getDb(), schema init, seed

tests/
  app.test.ts         -- HTTP integration tests (supertest, mocked service)
  ordersService.test.ts -- Unit tests for ordersService (mocked DB)
```

## Existing Files Inventory

| File                              | Purpose / Responsibility                                                  |
|-----------------------------------|---------------------------------------------------------------------------|
| `src/server.ts`                   | HTTP server entry point; triggers DB initialisation on startup            |
| `src/app.ts`                      | Express app configuration; wires middleware, routes, and docs             |
| `src/openapi.ts`                  | Inline OpenAPI 3.0.3 spec; defines schemas and endpoint contracts         |
| `src/routes/orders.ts`            | Route handler for `/orders`; delegates to ordersService                   |
| `src/services/ordersService.ts`   | Business logic layer; exports `getAllOrders()` and `OrderSummary` type    |
| `src/db/database.ts`              | SQLite connection singleton; schema creation and seed data management     |
| `tests/app.test.ts`               | HTTP-level integration tests using supertest; mocks ordersService         |
| `tests/ordersService.test.ts`     | Unit tests for ordersService; mocks the database module                   |
| `package.json`                    | Project manifest; scripts, runtime and dev dependencies                   |
| `tsconfig.json`                   | TypeScript compiler configuration                                         |
| `vitest.config.ts`                | Vitest test runner configuration                                          |
| `shopping.db`                     | SQLite database file (runtime artefact, not source code)                  |

## Design Patterns

### Singleton — Database Connection
- **Location**: `src/db/database.ts` — `getDb()` function
- **Purpose**: Ensures a single SQLite connection instance is reused across the application lifecycle
- **Implementation**: Module-level `let db` variable; initialised on first call, returned on subsequent calls

### Layered Architecture (Routes → Services → DB)
- **Location**: `src/routes/orders.ts` → `src/services/ordersService.ts` → `src/db/database.ts`
- **Purpose**: Separates HTTP concerns, business logic, and data access for testability and maintainability
- **Implementation**: Each layer only imports from the layer directly below it

### Dependency Injection via Mocking (Tests)
- **Location**: `tests/app.test.ts`, `tests/ordersService.test.ts`
- **Purpose**: Isolate unit under test from real SQLite and service dependencies
- **Implementation**: Vitest `vi.mock()` replaces modules before import

## Critical Dependencies

### express ^5.2.1
- **Usage**: HTTP server framework — all routing, request/response handling
- **Purpose**: Core application framework

### better-sqlite3 ^12.8.0
- **Usage**: `src/db/database.ts` — synchronous SQLite access
- **Purpose**: Persistent order storage; synchronous API simplifies the data layer (no async/await required)

### @scalar/express-api-reference ^0.9.7
- **Usage**: `src/app.ts` — mounted at `/docs`
- **Purpose**: Interactive API documentation UI driven by the inline OpenAPI spec

### typescript ^6.0.2
- **Usage**: Entire `src/` and `tests/` — strict TypeScript compilation
- **Purpose**: Type safety, interface definitions (`OrderSummary`), compiler toolchain

### vitest ^4.1.4
- **Usage**: All test files — test runner and assertion library
- **Purpose**: Unit and integration test execution

### supertest ^7.2.2
- **Usage**: `tests/app.test.ts` — HTTP request simulation
- **Purpose**: Integration testing of Express routes without starting a real server
