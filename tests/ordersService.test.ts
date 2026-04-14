import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAllOrders, createOrder, getOrderById, updateOrderStatus, deleteOrder } from '../src/services/ordersService';

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

const mockNewOrder = { id: 6, customer_name: 'Jane Doe', status: 'pending', total_amount: 59.99, created_at: '2024-01-15 10:00:00' };

let mockPrepare: ReturnType<typeof vi.fn>;

beforeEach(() => {
  mockPrepare = vi.fn();
  vi.mocked(getDb).mockReturnValue({
    prepare: mockPrepare,
  } as any);
});

describe('ordersService', () => {
  describe('getAllOrders', () => {
    beforeEach(() => {
      mockPrepare.mockReturnValue({ all: vi.fn().mockReturnValue(mockOrders) });
    });

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

  describe('getOrderById', () => {
    it('should return the order when found', () => {
      mockPrepare.mockReturnValue({ get: vi.fn().mockReturnValue(mockOrders[0]) });
      const order = getOrderById(1);
      expect(order).toBeDefined();
      expect(order?.id).toBe(1);
      expect(order?.customer_name).toBe('Alice Johnson');
    });

    it('should return undefined when order not found', () => {
      mockPrepare.mockReturnValue({ get: vi.fn().mockReturnValue(undefined) });
      const order = getOrderById(999);
      expect(order).toBeUndefined();
    });
  });

  describe('createOrder', () => {
    it('should return the created order with pending status', () => {
      mockPrepare
        .mockReturnValueOnce({ run: vi.fn().mockReturnValue({ lastInsertRowid: 6 }) })
        .mockReturnValueOnce({ get: vi.fn().mockReturnValue(mockNewOrder) });
      const order = createOrder('Jane Doe', 59.99);
      expect(order).toBeDefined();
      expect(order.customer_name).toBe('Jane Doe');
      expect(order.status).toBe('pending');
      expect(order.total_amount).toBe(59.99);
    });

    it('should assign an id to the created order', () => {
      mockPrepare
        .mockReturnValueOnce({ run: vi.fn().mockReturnValue({ lastInsertRowid: 6 }) })
        .mockReturnValueOnce({ get: vi.fn().mockReturnValue(mockNewOrder) });
      const order = createOrder('Jane Doe', 59.99);
      expect(order.id).toBeDefined();
      expect(typeof order.id).toBe('number');
    });
  });

  describe('updateOrderStatus', () => {
    it('should return the updated order when found', () => {
      const updatedOrder = { ...mockOrders[1], status: 'shipped' };
      mockPrepare
        .mockReturnValueOnce({ run: vi.fn().mockReturnValue({ changes: 1 }) })
        .mockReturnValueOnce({ get: vi.fn().mockReturnValue(updatedOrder) });
      const order = updateOrderStatus(2, 'shipped');
      expect(order).toBeDefined();
      expect(order?.status).toBe('shipped');
    });

    it('should return undefined when order not found', () => {
      mockPrepare.mockReturnValue({ run: vi.fn().mockReturnValue({ changes: 0 }) });
      const order = updateOrderStatus(999, 'shipped');
      expect(order).toBeUndefined();
    });
  });

  describe('deleteOrder', () => {
    it('should return true when order is deleted', () => {
      mockPrepare.mockReturnValue({ run: vi.fn().mockReturnValue({ changes: 1 }) });
      const result = deleteOrder(1);
      expect(result).toBe(true);
    });

    it('should return false when order not found', () => {
      mockPrepare.mockReturnValue({ run: vi.fn().mockReturnValue({ changes: 0 }) });
      const result = deleteOrder(999);
      expect(result).toBe(false);
    });
  });
});
