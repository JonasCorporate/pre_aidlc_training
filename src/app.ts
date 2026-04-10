import express, { Request, Response } from 'express';
import ordersRouter from './routes/orders';

const app = express();

app.use(express.json());

const healthResponse = { status: 'ok', message: 'Shopping API is running' };

app.get('/', (_req: Request, res: Response) => {
  res.json(healthResponse);
});

app.get('/health', (_req: Request, res: Response) => {
  res.json(healthResponse);
});

app.use('/orders', ordersRouter);

export default app;
