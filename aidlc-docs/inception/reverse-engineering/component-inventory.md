# Component Inventory

## Application Packages

| Component                        | Type        | Purpose                                                               |
|----------------------------------|-------------|-----------------------------------------------------------------------|
| `src/server.ts`                  | Application | HTTP server entry point; triggers DB init on startup                  |
| `src/app.ts`                     | Application | Express app factory; mounts middleware, routes, health checks, docs   |
| `src/routes/orders.ts`           | Application | Route handler for `/orders` resource; delegates to service layer      |
| `src/services/ordersService.ts`  | Application | Business logic for orders; exposes `getAllOrders()` function          |
| `src/db/database.ts`             | Application | SQLite connection singleton; schema init and seed data management     |
| `src/openapi.ts`                 | Application | Inline OpenAPI 3.0.3 spec; drives Scalar docs UI                      |

## Infrastructure Packages

None — no CDK, Terraform, or CloudFormation configurations detected.

## Shared Packages

None — single-package monolith with no shared library separation.

## Test Packages

| Component                          | Type        | Purpose                                                              |
|------------------------------------|-------------|----------------------------------------------------------------------|
| `tests/app.test.ts`                | Test        | HTTP integration tests using supertest; mocks `ordersService`       |
| `tests/ordersService.test.ts`      | Test        | Unit tests for `ordersService`; mocks `database` module             |

## Total Count

| Category        | Count |
|-----------------|-------|
| **Total Files** | 8     |
| Application     | 6     |
| Infrastructure  | 0     |
| Shared          | 0     |
| Test            | 2     |

## Notable Gaps (Future Work)

The codebase comment in `src/routes/orders.ts` explicitly states:
> *"Full CRUD operations are left as an exercise."*

The following business transactions are **not yet implemented**:
- `POST /orders` — Create a new order
- `GET /orders/:id` — Get a single order by ID
- `PUT /orders/:id` — Update an existing order
- `DELETE /orders/:id` — Delete an order
