# System Architecture

## System Overview

The Shopping Orders system is a single-process **Express.js REST API monolith** written in TypeScript. It follows a classic three-layer architecture: HTTP routing → business logic service → SQLite data store. The application is self-contained — it embeds both the API server and the database within the same process, with no external service dependencies.

## Architecture Diagram

```
+-------------------------------------------------------------+
|                        Client (HTTP)                        |
+------------------------------+------------------------------+
                               |
                               v
+-------------------------------------------------------------+
|                    Express.js Application                   |
|   (src/app.ts)                                              |
|                                                             |
|  +------------------+   +----------------------------+      |
|  | Health Endpoints |   | Scalar Docs UI (/docs)     |      |
|  | GET /            |   | (OpenAPI 3.0.3 spec)       |      |
|  | GET /health      |   |                            |      |
|  +------------------+   +----------------------------+      |
|                                                             |
|  +--------------------------------------------------+       |
|  |              Orders Router (/orders)             |       |
|  |  src/routes/orders.ts                            |       |
|  |                                                  |       |
|  |  GET /orders --> getAllOrders()                  |       |
|  +---------------------+----------------------------+       |
|                        |                                    |
|                        v                                    |
|  +--------------------------------------------------+       |
|  |              Orders Service                      |       |
|  |  src/services/ordersService.ts                   |       |
|  |                                                  |       |
|  |  getAllOrders(): OrderSummary[]                   |       |
|  +---------------------+----------------------------+       |
|                        |                                    |
|                        v                                    |
|  +--------------------------------------------------+       |
|  |              Database Layer                      |       |
|  |  src/db/database.ts                              |       |
|  |                                                  |       |
|  |  getDb() --> better-sqlite3 instance             |       |
|  |  Schema init + seed data on first run            |       |
|  +---------------------+----------------------------+       |
|                        |                                    |
+------------------------+------------------------------------+
                         |
                         v
+-------------------------------------------------------------+
|                  SQLite Database File                       |
|                  shopping.db (WAL mode)                     |
|                                                             |
|  Table: orders                                              |
|    id, customer_name, status, total_amount, created_at      |
+-------------------------------------------------------------+
```

## Component Descriptions

### src/app.ts — Express Application
- **Purpose**: Configures and exports the Express application instance
- **Responsibilities**: JSON middleware, route registration (`/orders`, `/docs`, `/`, `/health`)
- **Dependencies**: Express, ordersRouter, openApiSpec, @scalar/express-api-reference
- **Type**: Application

### src/server.ts — Server Entry Point
- **Purpose**: Starts the HTTP server and triggers database initialisation
- **Responsibilities**: Binds to PORT (default 3000), calls `getDb()` to initialise schema on startup
- **Dependencies**: app.ts, database.ts
- **Type**: Application

### src/routes/orders.ts — Orders Router
- **Purpose**: HTTP route handler for the `/orders` resource
- **Responsibilities**: Maps `GET /` to `getAllOrders()` service call, returns JSON response
- **Dependencies**: ordersService
- **Type**: Application

### src/services/ordersService.ts — Orders Service
- **Purpose**: Business logic and data access for orders
- **Responsibilities**: Queries all orders from SQLite ordered by `created_at DESC`; exports `OrderSummary` interface
- **Dependencies**: database.ts
- **Type**: Application

### src/db/database.ts — Database Module
- **Purpose**: SQLite connection manager and schema manager
- **Responsibilities**: Singleton DB connection (WAL mode), schema creation, seed data insertion
- **Dependencies**: better-sqlite3
- **Type**: Application

### src/openapi.ts — OpenAPI Specification
- **Purpose**: OpenAPI 3.0.3 spec object served to the Scalar docs UI
- **Responsibilities**: Defines schemas for `HealthResponse` and `OrderSummary`; documents all endpoints
- **Dependencies**: None
- **Type**: Application

## Data Flow

```
Sequence: GET /orders

Client
  |
  | HTTP GET /orders
  v
app.ts (Express)
  |
  | route match: /orders
  v
routes/orders.ts
  |
  | getAllOrders()
  v
services/ordersService.ts
  |
  | db.prepare(SELECT ...).all()
  v
db/database.ts --> shopping.db
  |
  | OrderSummary[]
  v
routes/orders.ts
  |
  | res.json({ orders })
  v
Client (HTTP 200)
```

## Integration Points

- **External APIs**: None
- **Databases**: SQLite (better-sqlite3) — local file `shopping.db` (path configurable via `DB_PATH` env var)
- **Third-party Services**: @scalar/express-api-reference — renders interactive API docs UI at `/docs`

## Infrastructure Components

- **CDK Stacks**: None
- **Deployment Model**: Single Node.js process; `npm start` runs `node dist/server.js` (compiled output)
- **Networking**: Listens on `process.env.PORT` (default 3000)
