import express, { Request, Response } from 'express';
import { apiReference } from '@scalar/express-api-reference';
import ordersRouter from './routes/orders';
import openApiSpec from './openapi';

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

app.use('/docs', apiReference({ content: openApiSpec }));

export default app;
