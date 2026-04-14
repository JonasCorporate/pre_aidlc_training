# Orders CRUD — Code Generation Plan

**Unit**: Orders CRUD
**Project Type**: Brownfield
**Workspace Root**: `C:/Users/GioSh/code/pre_aidlc_training`

## Unit Context

- **Purpose**: Add full CRUD operations (POST, GET/:id, PUT/:id, DELETE/:id) to the existing Orders REST API
- **Requirements**: FR-1 through FR-4 from `aidlc-docs/inception/requirements/requirements.md`
- **Architecture**: Existing 3-layer pattern — Routes → Services → Database (no structural changes)
- **Constraints**: No input validation, status defaults to `pending` on create, only `status` updatable on PUT

---

## Files to Modify (Brownfield — modify in-place, never duplicate)

| File | Action |
|---|---|
| `src/services/ordersService.ts` | Modify — add 4 new service functions |
| `src/routes/orders.ts` | Modify — add 4 new route handlers |
| `src/openapi.ts` | Modify — document all new endpoints and schemas |
| `tests/ordersService.test.ts` | Modify — add unit tests for new service functions |
| `tests/app.test.ts` | Modify — add integration tests for new HTTP endpoints |

---

## Generation Steps

- [x] **Step 1 — Service Layer: Add CRUD functions to `src/services/ordersService.ts`**
- [x] **Step 2 — Route Layer: Add CRUD handlers to `src/routes/orders.ts`**
- [x] **Step 3 — OpenAPI Spec: Update `src/openapi.ts`**
- [x] **Step 4 — Unit Tests: Update `tests/ordersService.test.ts`**
- [x] **Step 5 — Integration Tests: Update `tests/app.test.ts`**

---

## Completion Criteria

- All 5 steps marked [x]
- No duplicate files created
- All existing tests unaffected
- New code follows existing patterns (TypeScript strict, same import style)
