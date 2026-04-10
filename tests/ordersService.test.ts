import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAllOrders } from '../src/services/ordersService';

// Mock the database module so tests run without a real SQLite file
vi.mock('../src/db/database', () => ({
  getDb: vi.fn(),
}));

import { getDb } from '../src/db/database';

const mockOrders = [
  { id: 1, customer_name: 'Alice Johnson', status: 'completed', total_amount: 49.99, created_at: '2024-01-10 09:00:00' },
  { id: 2, customer_name: 'Bob Smith', status: 'pending', total_amount: 125.00, created_at: '2024-01-11 11:30:00' },
  { id: 3, customer_name: 'Carol White', status: 'shipped', total_amount: 75.50, created_at: '2024-01-12 14:00:00' },
  { id: 4, customer_name: 'David Brown', status: 'pending', total_amount: 200.00, created_at: '2024-01-13 16:45:00' },
  { id: 5, customer_name: 'Eva Martinez', status: 'completed', total_amount: 33.20, created_at: '2024-01-14 08:15:00' },
];

beforeEach(() => {
  vi.mocked(getDb).mockReturnValue({
    prepare: vi.fn().mockReturnValue({
      all: vi.fn().mockReturnValue(mockOrders),
    }),
  } as any);
});

describe('ordersService', () => {
  describe('getAllOrders', () => {
    it('should return a non-empty list of orders', () => {
      const orders = getAllOrders();
      expect(orders.length).toBeGreaterThan(0);
    });

    it('should return exactly 5 seed orders', () => {
      const orders = getAllOrders();
      expect(orders).toHaveLength(5);
    });

    it('should return orders with required fields', () => {
      const orders = getAllOrders();
      orders.forEach((order) => {
        expect(order).toHaveProperty('id');
        expect(order).toHaveProperty('customer_name');
        expect(order).toHaveProperty('status');
        expect(order).toHaveProperty('total_amount');
        expect(order).toHaveProperty('created_at');
      });
    });

    it('should include Alice Johnson as a customer', () => {
      const orders = getAllOrders();
      const alice = orders.find((o) => o.customer_name === 'Alice Johnson');
      expect(alice).toBeDefined();
      expect(alice?.status).toBe('completed');
    });
  });
});
