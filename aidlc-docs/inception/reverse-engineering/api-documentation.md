# API Documentation

## REST APIs

### GET / — Root Health Check
- **Method**: GET
- **Path**: `/`
- **Purpose**: Verify the API is running
- **Request**: No parameters
- **Response**:
  ```json
  {
    "status": "ok",
    "message": "Shopping API is running"
  }
  ```
- **Status Codes**: `200 OK`

---

### GET /health — Health Check
- **Method**: GET
- **Path**: `/health`
- **Purpose**: Health probe endpoint (identical to root)
- **Request**: No parameters
- **Response**:
  ```json
  {
    "status": "ok",
    "message": "Shopping API is running"
  }
  ```
- **Status Codes**: `200 OK`

---

### GET /orders — List All Orders
- **Method**: GET
- **Path**: `/orders`
- **Purpose**: Retrieve all customer orders sorted by creation date (newest first)
- **Request**: No parameters
- **Response**:
  ```json
  {
    "orders": [
      {
        "id": 1,
        "customer_name": "Alice Johnson",
        "status": "completed",
        "total_amount": 49.99,
        "created_at": "2024-01-10 09:00:00"
      }
    ]
  }
  ```
- **Status Codes**: `200 OK`

---

### GET /docs — API Documentation UI
- **Method**: GET
- **Path**: `/docs`
- **Purpose**: Renders interactive Scalar API documentation driven by the OpenAPI 3.0.3 spec
- **Request**: No parameters
- **Response**: HTML page (Scalar UI)
- **Status Codes**: `200 OK`

---

## Internal APIs

### ordersService — getAllOrders()
- **Signature**: `getAllOrders(): OrderSummary[]`
- **Purpose**: Fetches all orders from the database, ordered by `created_at DESC`
- **Parameters**: None
- **Return Type**: `OrderSummary[]`
- **Side Effects**: None (read-only)

### database — getDb()
- **Signature**: `getDb(): Database.Database`
- **Purpose**: Returns the singleton SQLite database connection; initialises schema and seeds data on first call
- **Parameters**: None
- **Return Type**: `better-sqlite3` Database instance
- **Side Effects**: Creates `shopping.db` file, creates `orders` table, and inserts seed rows on first invocation

---

## Data Models

### OrderSummary
- **Definition**: `src/services/ordersService.ts`
- **Fields**:
  | Field           | Type     | Nullable | Description                              |
  |-----------------|----------|----------|------------------------------------------|
  | `id`            | number   | No       | Auto-incremented primary key             |
  | `customer_name` | string   | No       | Full name of the customer                |
  | `status`        | string   | No       | Order lifecycle state (see enum below)   |
  | `total_amount`  | number   | No       | Total monetary value of the order (float)|
  | `created_at`    | string   | No       | ISO-like datetime string of creation     |

- **Status Enum**: `pending` | `shipped` | `completed`
- **Relationships**: Top-level entity; no foreign key relationships in current schema

### HealthResponse
- **Definition**: `src/openapi.ts` (OpenAPI schema)
- **Fields**:
  | Field     | Type   | Nullable | Description                       |
  |-----------|--------|----------|-----------------------------------|
  | `status`  | string | No       | Always `"ok"` when healthy        |
  | `message` | string | No       | Human-readable status description |

---

## Database Schema

```sql
CREATE TABLE IF NOT EXISTS orders (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_name TEXT    NOT NULL,
  status        TEXT    NOT NULL DEFAULT 'pending',
  total_amount  REAL    NOT NULL,
  created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);
```

- **Storage**: SQLite WAL mode (`PRAGMA journal_mode = WAL`)
- **File**: `shopping.db` (path configurable via `DB_PATH` environment variable)
- **Seed Data**: 5 sample orders inserted on first run if table is empty
