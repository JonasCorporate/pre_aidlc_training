import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

// Mock the database before importing app
vi.mock('../src/db/database', () => ({
  getDb: vi.fn(),
}));

vi.mock('../src/services/ordersService', () => ({
  getAllOrders: vi.fn(),
  createOrder: vi.fn(),
  getOrderById: vi.fn(),
  updateOrderStatus: vi.fn(),
  deleteOrder: vi.fn(),
}));

import app from '../src/app';
import { getAllOrders, createOrder, getOrderById, updateOrderStatus, deleteOrder } from '../src/services/ordersService';

const mockOrders = [
  { id: 1, customer_name: 'Alice Johnson', status: 'completed', total_amount: 49.99, created_at: '2024-01-10 09:00:00' },
  { id: 2, customer_name: 'Bob Smith', status: 'pending', total_amount: 125.00, created_at: '2024-01-11 11:30:00' },
  { id: 3, customer_name: 'Carol White', status: 'shipped', total_amount: 75.50, created_at: '2024-01-12 14:00:00' },
  { id: 4, customer_name: 'David Brown', status: 'pending', total_amount: 200.00, created_at: '2024-01-13 16:45:00' },
  { id: 5, customer_name: 'Eva Martinez', status: 'completed', total_amount: 33.20, created_at: '2024-01-14 08:15:00' },
];

const mockNewOrder = { id: 6, customer_name: 'Jane Doe', status: 'pending', total_amount: 59.99, created_at: '2024-01-15 10:00:00' };

beforeEach(() => {
  vi.mocked(getAllOrders).mockReturnValue(mockOrders);
});

describe('GET /', () => {
  it('should return health status', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ status: 'ok' });
  });
});

describe('GET /health', () => {
  it('should return health status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ status: 'ok' });
  });
});

describe('GET /orders', () => {
  it('should return a non-empty list of orders', async () => {
    const res = await request(app).get('/orders');
    expect(res.status).toBe(200);
    expect(res.body.orders).toBeDefined();
    expect(res.body.orders.length).toBeGreaterThan(0);
  });

  it('should return orders with basic fields only', async () => {
    const res = await request(app).get('/orders');
    const order = res.body.orders[0];
    expect(order).toHaveProperty('id');
    expect(order).toHaveProperty('customer_name');
    expect(order).toHaveProperty('status');
    expect(order).toHaveProperty('total_amount');
  });
});

describe('POST /orders', () => {
  it('should return 201 with the created order', async () => {
    vi.mocked(createOrder).mockReturnValue(mockNewOrder);
    const res = await request(app)
      .post('/orders')
      .send({ customer_name: 'Jane Doe', total_amount: 59.99 });
    expect(res.status).toBe(201);
    expect(res.body.customer_name).toBe('Jane Doe');
    expect(res.body.status).toBe('pending');
    expect(res.body.id).toBeDefined();
  });
});

describe('GET /orders/:id', () => {
  it('should return 200 with the order when found', async () => {
    vi.mocked(getOrderById).mockReturnValue(mockOrders[0]);
    const res = await request(app).get('/orders/1');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
    expect(res.body.customer_name).toBe('Alice Johnson');
  });

  it('should return 404 with JSON error when not found', async () => {
    vi.mocked(getOrderById).mockReturnValue(undefined);
    const res = await request(app).get('/orders/999');
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ error: 'Order not found' });
  });
});

describe('PUT /orders/:id', () => {
  it('should return 200 with updated order when found', async () => {
    const updated = { ...mockOrders[1], status: 'shipped' };
    vi.mocked(updateOrderStatus).mockReturnValue(updated);
    const res = await request(app)
      .put('/orders/2')
      .send({ status: 'shipped' });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('shipped');
  });

  it('should return 404 with JSON error when not found', async () => {
    vi.mocked(updateOrderStatus).mockReturnValue(undefined);
    const res = await request(app)
      .put('/orders/999')
      .send({ status: 'shipped' });
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ error: 'Order not found' });
  });
});

describe('DELETE /orders/:id', () => {
  it('should return 204 when order is deleted', async () => {
    vi.mocked(deleteOrder).mockReturnValue(true);
    const res = await request(app).delete('/orders/1');
    expect(res.status).toBe(204);
  });

  it('should return 404 with JSON error when not found', async () => {
    vi.mocked(deleteOrder).mockReturnValue(false);
    const res = await request(app).delete('/orders/999');
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ error: 'Order not found' });
  });
});

