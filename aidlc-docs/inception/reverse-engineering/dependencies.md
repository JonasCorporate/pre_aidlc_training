# Dependencies

## Internal Dependencies

```
server.ts
  |-- app.ts
  |     |-- routes/orders.ts
  |     |     |-- services/ordersService.ts
  |     |           |-- db/database.ts
  |     |-- openapi.ts
  |
  |-- db/database.ts

tests/app.test.ts
  |-- app.ts  (via supertest)
  |-- services/ordersService.ts  (mocked)
  |-- db/database.ts  (mocked)

tests/ordersService.test.ts
  |-- services/ordersService.ts
  |-- db/database.ts  (mocked)
```

### Dependency Details

| Consumer                        | Depends On                   | Type    | Reason                                          |
|---------------------------------|------------------------------|---------|-------------------------------------------------|
| `src/server.ts`                 | `src/app.ts`                 | Runtime | Starts the Express app                          |
| `src/server.ts`                 | `src/db/database.ts`         | Runtime | Triggers DB initialisation on startup           |
| `src/app.ts`                    | `src/routes/orders.ts`       | Runtime | Mounts orders router at `/orders`               |
| `src/app.ts`                    | `src/openapi.ts`             | Runtime | Provides spec to Scalar docs middleware         |
| `src/routes/orders.ts`          | `src/services/ordersService.ts` | Runtime | Delegates business logic for GET /orders     |
| `src/services/ordersService.ts` | `src/db/database.ts`         | Runtime | Accesses DB connection for SQL queries          |
| `tests/app.test.ts`             | `src/app.ts`                 | Test    | Tests HTTP routes via supertest                 |
| `tests/app.test.ts`             | `src/services/ordersService.ts` | Test | Mocked to isolate HTTP layer                    |
| `tests/ordersService.test.ts`   | `src/services/ordersService.ts` | Test | Unit tests the service function                 |
| `tests/ordersService.test.ts`   | `src/db/database.ts`         | Test    | Mocked to isolate from real SQLite              |

## External Dependencies

### Runtime

| Package                         | Version   | Purpose                                        | License  |
|---------------------------------|-----------|------------------------------------------------|----------|
| express                         | ^5.2.1    | HTTP server and routing framework              | MIT      |
| better-sqlite3                  | ^12.8.0   | Synchronous SQLite driver for Node.js          | MIT      |
| @scalar/express-api-reference   | ^0.9.7    | OpenAPI docs UI middleware                     | MIT      |

### Development

| Package                  | Version   | Purpose                                            | License  |
|--------------------------|-----------|----------------------------------------------------|----------|
| typescript               | ^6.0.2    | TypeScript compiler                                | Apache-2.0 |
| ts-node                  | ^10.9.2   | TypeScript execution engine for development        | MIT      |
| vitest                   | ^4.1.4    | Test runner and mocking framework                  | MIT      |
| supertest                | ^7.2.2    | HTTP test utility for Express                      | MIT      |
| @types/better-sqlite3    | ^7.6.13   | TypeScript type definitions for better-sqlite3     | MIT      |
| @types/express           | ^5.0.6    | TypeScript type definitions for Express 5          | MIT      |
| @types/node              | ^25.5.2   | TypeScript type definitions for Node.js            | MIT      |
| @types/supertest         | ^7.2.0    | TypeScript type definitions for supertest          | MIT      |

## Dependency Risk Notes

- **Express 5.x**: Still in active development (major version bump from Express 4). Potential for breaking changes; API is mostly compatible with Express 4 patterns used here.
- **TypeScript 6.x**: Very recent major version. Strict mode is enabled — strong type safety.
- **No circular dependencies detected** in the current source graph.
- **No infrastructure/cloud dependencies** — fully local/self-contained.
