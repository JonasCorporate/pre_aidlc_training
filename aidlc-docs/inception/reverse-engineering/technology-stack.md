# Technology Stack

## Programming Languages

| Language   | Version Target | Usage                                   |
|------------|----------------|-----------------------------------------|
| TypeScript | ^6.0.2         | All source and test files               |
| JavaScript | ES2020 (output)| Compiled output in `dist/`              |
| SQL        | SQLite dialect | Database schema and queries             |

## Frameworks

| Framework                        | Version  | Purpose                                             |
|----------------------------------|----------|-----------------------------------------------------|
| Express.js                       | ^5.2.1   | HTTP server and REST routing framework              |
| @scalar/express-api-reference    | ^0.9.7   | Interactive OpenAPI documentation UI                |

## Data Storage

| Technology  | Version  | Purpose                                              |
|-------------|----------|------------------------------------------------------|
| SQLite      | embedded | Persistent order storage (local file `shopping.db`)  |
| better-sqlite3 | ^12.8.0 | Synchronous Node.js SQLite driver                 |

## Build Tools

| Tool        | Version  | Purpose                                              |
|-------------|----------|------------------------------------------------------|
| TypeScript  | ^6.0.2   | Compiler (`tsc`) — transpiles `src/` → `dist/`       |
| ts-node     | ^10.9.2  | On-the-fly TypeScript execution for development      |
| npm         | (runtime)| Package manager and script runner                    |

## Testing Tools

| Tool       | Version  | Purpose                                               |
|------------|----------|-------------------------------------------------------|
| Vitest     | ^4.1.4   | Test runner, assertions, and mocking framework        |
| Supertest  | ^7.2.2   | HTTP integration testing for Express routes           |

## Runtime Environment

| Component  | Detail                                           |
|------------|--------------------------------------------------|
| Node.js    | Required runtime (version not pinned in package.json) |
| Port       | `process.env.PORT` (default: 3000)               |
| DB Path    | `process.env.DB_PATH` (default: `shopping.db` in project root) |

## Type Definitions (Dev)

| Package                     | Version   | Purpose                            |
|-----------------------------|-----------|------------------------------------|
| @types/better-sqlite3       | ^7.6.13   | TypeScript types for better-sqlite3|
| @types/express              | ^5.0.6    | TypeScript types for Express 5     |
| @types/node                 | ^25.5.2   | TypeScript types for Node.js       |
| @types/supertest            | ^7.2.0    | TypeScript types for Supertest     |

## OpenAPI

| Standard    | Version  | Usage                                              |
|-------------|----------|----------------------------------------------------|
| OpenAPI     | 3.0.3    | API contract definition in `src/openapi.ts`        |
