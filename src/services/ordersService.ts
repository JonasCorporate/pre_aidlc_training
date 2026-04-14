import { getDb } from '../db/database';

export interface OrderSummary {
  id: number;
  customer_name: string;
  status: string;
  total_amount: number;
  created_at: string;
}

export function getAllOrders(): OrderSummary[] {
  const db = getDb();
  return db
    .prepare('SELECT id, customer_name, status, total_amount, created_at FROM orders ORDER BY created_at DESC')
    .all() as OrderSummary[];
}

export function getOrderById(id: number): OrderSummary | undefined {
  const db = getDb();
  return db
    .prepare('SELECT id, customer_name, status, total_amount, created_at FROM orders WHERE id = ?')
    .get(id) as OrderSummary | undefined;
}

export function createOrder(customerName: string, totalAmount: number): OrderSummary {
  const db = getDb();
  const result = db
    .prepare("INSERT INTO orders (customer_name, status, total_amount, created_at) VALUES (?, 'pending', ?, datetime('now'))")
    .run(customerName, totalAmount);
  return getOrderById(result.lastInsertRowid as number) as OrderSummary;
}

export function updateOrderStatus(id: number, status: string): OrderSummary | undefined {
  const db = getDb();
  const changes = db
    .prepare('UPDATE orders SET status = ? WHERE id = ?')
    .run(status, id).changes;
  if (changes === 0) return undefined;
  return getOrderById(id);
}

export function deleteOrder(id: number): boolean {
  const db = getDb();
  const changes = db
    .prepare('DELETE FROM orders WHERE id = ?')
    .run(id).changes;
  return changes > 0;
}
