import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

// Mock the database before importing app
vi.mock('../src/db/database', () => ({
  getDb: vi.fn(),
}));

vi.mock('../src/services/ordersService', () => ({
  getAllOrders: vi.fn(),
}));

import app from '../src/app';
import { getAllOrders } from '../src/services/ordersService';

const mockOrders = [
  { id: 1, customer_name: 'Alice Johnson', status: 'completed', total_amount: 49.99, created_at: '2024-01-10 09:00:00' },
  { id: 2, customer_name: 'Bob Smith', status: 'pending', total_amount: 125.00, created_at: '2024-01-11 11:30:00' },
  { id: 3, customer_name: 'Carol White', status: 'shipped', total_amount: 75.50, created_at: '2024-01-12 14:00:00' },
  { id: 4, customer_name: 'David Brown', status: 'pending', total_amount: 200.00, created_at: '2024-01-13 16:45:00' },
  { id: 5, customer_name: 'Eva Martinez', status: 'completed', total_amount: 33.20, created_at: '2024-01-14 08:15:00' },
];

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
