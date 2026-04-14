import { Router, Request, Response } from 'express';
import { getAllOrders, createOrder, getOrderById, updateOrderStatus, deleteOrder } from '../services/ordersService';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  const orders = getAllOrders();
  res.json({ orders });
});

router.post('/', (req: Request, res: Response) => {
  const { customer_name, total_amount } = req.body;
  const order = createOrder(customer_name, total_amount);
  res.status(201).json(order);
});

router.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params['id'] as string, 10);
  const order = getOrderById(id);
  if (!order) {
    res.status(404).json({ error: 'Order not found' });
    return;
  }
  res.json(order);
});

router.put('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params['id'] as string, 10);
  const { status } = req.body;
  const order = updateOrderStatus(id, status);
  if (!order) {
    res.status(404).json({ error: 'Order not found' });
    return;
  }
  res.json(order);
});

router.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params['id'] as string, 10);
  const deleted = deleteOrder(id);
  if (!deleted) {
    res.status(404).json({ error: 'Order not found' });
    return;
  }
  res.status(204).send();
});

export default router;
