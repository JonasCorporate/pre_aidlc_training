import { Router, Request, Response } from 'express';
import { getAllOrders } from '../services/ordersService';

const router = Router();

/**
 * GET /orders
 * Returns a list of all orders with basic details.
 * Full CRUD operations are left as an exercise.
 */
router.get('/', (_req: Request, res: Response) => {
  const orders = getAllOrders();
  res.json({ orders });
});

export default router;
