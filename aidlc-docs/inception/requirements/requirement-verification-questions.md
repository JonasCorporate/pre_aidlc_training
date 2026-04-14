# Requirements Clarification Questions

Please answer each question by filling in the letter choice after the `[Answer]:` tag.
If none of the options match your needs, choose the last option (Other/X) and describe your preference.
Let me know when you're done.

---

## Question 1
The existing codebase only implements `GET /orders`. Which CRUD operations should be added?

A) Full CRUD — POST /orders, GET /orders/:id, PUT /orders/:id, DELETE /orders/:id
B) Create + Read only — POST /orders and GET /orders/:id
C) Create + Read + Update — POST /orders, GET /orders/:id, PUT /orders/:id
X) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 2
Should a new order's `status` be settable by the caller on creation, or should it always default to `pending`?

A) Always default to `pending` on creation (caller cannot set status on POST)
B) Caller can optionally provide a status on creation
X) Other (please describe after [Answer]: tag below)

[Answer]: 

---

## Question 3
When updating an order (PUT /orders/:id), what fields should be updatable?

A) Status only (e.g., advance from pending → shipped → completed)
B) All fields — customer_name, status, total_amount
C) Status and total_amount only
X) Other (please describe after [Answer]: tag below)

[Answer]: 

---

## Question 4
What should the API return when a requested order ID does not exist?

A) HTTP 404 with a JSON error body (e.g., `{ "error": "Order not found" }`)
B) HTTP 404 with an empty body
C) HTTP 200 with null/empty result
X) Other (please describe after [Answer]: tag below)

[Answer]: 

---

## Question 5
Should input validation be added to reject invalid request bodies (e.g., missing required fields, invalid status values)?

A) Yes — validate inputs and return HTTP 400 with descriptive error messages
B) Minimal — only check required fields are present, no format validation
C) No — skip validation for now
X) Other (please describe after [Answer]: tag below)

[Answer]: 

---

## Question 6
Should the existing seed data (`database.ts`) be kept as-is after adding write operations?

A) Yes — keep seed data as-is (only runs if DB is empty)
B) Yes — keep seed data but move it to a separate script
C) Remove seed data — start with an empty database
X) Other (please describe after [Answer]: tag below)

[Answer]: 

---

## Question 7
Should tests be added or updated to cover the new CRUD endpoints?

A) Yes — add unit tests (service layer) and integration tests (HTTP routes) for all new endpoints
B) Yes — integration tests (HTTP routes) only
C) Yes — unit tests (service layer) only
D) No — skip new tests for now
X) Other (please describe after [Answer]: tag below)

[Answer]: 

---

## Question 8
Should the OpenAPI specification (`src/openapi.ts`) be updated to document the new endpoints?

A) Yes — update OpenAPI spec for all new endpoints
B) No — skip OpenAPI updates for now
X) Other (please describe after [Answer]: tag below)

[Answer]: 

---

## Question 9 — Security Extension
Should security extension rules be enforced for this project?

A) Yes — enforce all SECURITY rules as blocking constraints (recommended for production-grade applications)
B) No — skip all SECURITY rules (suitable for PoCs, prototypes, and experimental projects)
X) Other (please describe after [Answer]: tag below)

[Answer]: 

---

## Question 10 — Property-Based Testing Extension
Should property-based testing (PBT) rules be enforced for this project?

A) Yes — enforce all PBT rules as blocking constraints (recommended for projects with business logic, data transformations, serialization, or stateful components)
B) Partial — enforce PBT rules only for pure functions and serialization round-trips
C) No — skip all PBT rules (suitable for simple CRUD applications or thin integration layers)
X) Other (please describe after [Answer]: tag below)

[Answer]: 
