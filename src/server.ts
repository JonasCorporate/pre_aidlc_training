import app from './app';
import { getDb } from './db/database';

const PORT = process.env.PORT || 3000;

// Initialize database on startup
getDb();

app.listen(PORT, () => {
  console.log(`Shopping API listening on http://localhost:${PORT}`);
  console.log(`  GET /        -> health check`);
  console.log(`  GET /health  -> health check`);
  console.log(`  GET /orders  -> list all orders`);
});
