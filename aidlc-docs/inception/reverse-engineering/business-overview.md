# Business Overview

## Business Context Diagram

```
+--------------------------------------------------+
|              Shopping Orders System              |
|                                                  |
|  Clients --> REST API --> Orders Data Store      |
|                                                  |
|  Transactions:                                   |
|    - List Orders (GET /orders)                   |
|    - [Create Order - not yet implemented]        |
|    - [Update Order - not yet implemented]        |
|    - [Delete Order - not yet implemented]        |
+--------------------------------------------------+
```

## Business Description

- **Business Description**: A Shopping Orders management system that exposes a REST API for tracking customer orders. The system maintains order records with lifecycle statuses (pending, shipped, completed) and supports browsing order history. It is intentionally partial — full CRUD operations are identified as future work (training exercise).

- **Business Transactions**:
  | Transaction      | Status              | Endpoint           | Description                                     |
  |------------------|---------------------|--------------------|------------------------------------------------|
  | List Orders      | Implemented         | GET /orders        | Retrieves all orders sorted by creation date (newest first) |
  | Create Order     | NOT implemented     | POST /orders       | Would allow creating new customer orders        |
  | Get Order by ID  | NOT implemented     | GET /orders/:id    | Would retrieve a specific order by ID           |
  | Update Order     | NOT implemented     | PUT /orders/:id    | Would allow updating order status/details       |
  | Delete Order     | NOT implemented     | DELETE /orders/:id | Would allow removing an order                   |

- **Business Dictionary**:
  | Term            | Definition                                                                 |
  |-----------------|----------------------------------------------------------------------------|
  | Order           | A purchase record associated with a customer, having a status and amount   |
  | Customer Name   | The name of the customer who placed the order                              |
  | Status          | Lifecycle state of an order: `pending`, `shipped`, or `completed`          |
  | Total Amount    | The monetary value of the order (floating-point number)                    |
  | Created At      | The datetime string when the order was created                             |

## Component Level Business Descriptions

### API Layer (src/app.ts, src/server.ts)
- **Purpose**: Entry point for the Shopping API. Initialises the Express server, wires middleware, registers route handlers, exposes API documentation, and provides health check endpoints.
- **Responsibilities**: Request parsing, route registration, health monitoring, API docs serving.

### Orders Route Handler (src/routes/orders.ts)
- **Purpose**: HTTP interface for order-related business transactions.
- **Responsibilities**: Accepts incoming HTTP requests for orders, delegates to the service layer, returns JSON responses.

### Orders Service (src/services/ordersService.ts)
- **Purpose**: Business logic layer for order management.
- **Responsibilities**: Orchestrates data access for order transactions; defines the `OrderSummary` data contract.

### Database Layer (src/db/database.ts)
- **Purpose**: Manages the SQLite data store for persistent order storage.
- **Responsibilities**: Connection lifecycle management, schema initialisation, data seeding for development/demo purposes.

### API Specification (src/openapi.ts)
- **Purpose**: Machine-readable OpenAPI 3.0.3 contract for the Shopping API.
- **Responsibilities**: Defines all endpoints, schemas, and response models; drives the interactive Scalar docs UI.
