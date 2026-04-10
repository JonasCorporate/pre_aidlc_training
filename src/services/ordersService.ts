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
