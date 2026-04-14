# Requirements

## Intent Analysis

- **User Request**: Add full CRUD operations to the Shopping Orders REST API
- **Request Type**: New Feature
- **Scope**: Multiple Components — routes, services, database layer, OpenAPI spec, tests
- **Complexity**: Moderate
- **Requirements Depth**: Standard

---

## Functional Requirements

### FR-1: Create Order
- **Endpoint**: `POST /orders`
- **Description**: Accepts a new order and persists it to the database
- **Request Body**:
  - `customer_name` (string, required)
  - `total_amount` (number, required)
- **Behavior**:
  - `status` always defaults to `pending` (not settable by caller)
  - `created_at` set to current datetime by the database
- **Success Response**: HTTP 201 with the created order object (including generated `id`, `status`, `created_at`)
- **Error Response**: HTTP 404 not applicable; other errors return appropriate HTTP status

### FR-2: Get Order by ID
- **Endpoint**: `GET /orders/:id`
- **Description**: Retrieves a single order by its ID
- **Path Parameter**: `id` (integer)
- **Success Response**: HTTP 200 with the matching `OrderSummary` object
- **Not Found Response**: HTTP 404 with JSON body `{ "error": "Order not found" }`

### FR-3: Update Order Status
- **Endpoint**: `PUT /orders/:id`
- **Description**: Updates the status of an existing order
- **Path Parameter**: `id` (integer)
- **Request Body**:
  - `status` (string, required) — one of `pending`, `shipped`, `completed`
- **Behavior**: Only the `status` field is updatable; other fields remain unchanged
- **Success Response**: HTTP 200 with the updated order object
- **Not Found Response**: HTTP 404 with JSON body `{ "error": "Order not found" }`

### FR-4: Delete Order
- **Endpoint**: `DELETE /orders/:id`
- **Description**: Permanently removes an order from the database
- **Path Parameter**: `id` (integer)
- **Success Response**: HTTP 204 No Content
- **Not Found Response**: HTTP 404 with JSON body `{ "error": "Order not found" }`

### FR-5: Existing Endpoint — List Orders (no change)
- **Endpoint**: `GET /orders` — remains unchanged
- **Description**: Returns all orders sorted by `created_at DESC`

---

## Non-Functional Requirements

### NFR-1: Input Validation
- Validation is **out of scope** for this iteration — no request body schema validation required
- Invalid or missing fields will not be explicitly rejected at this stage

### NFR-2: Error Handling
- All endpoints must return structured JSON error responses for 404 scenarios: `{ "error": "Order not found" }`
- Unhandled database errors should not expose stack traces to the client

### NFR-3: Test Coverage
- **Unit tests** (service layer, mocked DB) must be added for all new service functions
- **Integration tests** (HTTP layer via supertest, mocked service) must be added for all new endpoints
- Existing tests must continue to pass

### NFR-4: API Documentation
- OpenAPI 3.0.3 spec (`src/openapi.ts`) must be updated to document all new endpoints and request/response schemas

### NFR-5: Data Integrity
- Seed data behaviour in `database.ts` remains unchanged (runs on first boot if table is empty)

---

## Out of Scope

- Input validation / request body schema enforcement
- Authentication or authorization
- Pagination on `GET /orders`
- Order line items / products (orders remain flat single-record entities)
- Status transition enforcement (any status value can be set freely)

---

## Extension Configuration

| Extension                | Enabled | Decided At              |
|--------------------------|---------|-------------------------|
| Security Baseline        | No      | Requirements Analysis   |
| Property-Based Testing   | No      | Requirements Analysis   |
