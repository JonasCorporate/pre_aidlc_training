import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../../shopping.db');

let db: Database.Database;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    initializeSchema();
  }
  return db;
}

function initializeSchema(): void {
  getDb().exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      total_amount REAL NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  seedOrders();
}

function seedOrders(): void {
  const database = getDb();
  const count = (database.prepare('SELECT COUNT(*) as cnt FROM orders').get() as { cnt: number }).cnt;
  if (count > 0) return;

  const insert = database.prepare(
    'INSERT INTO orders (customer_name, status, total_amount, created_at) VALUES (?, ?, ?, ?)'
  );

  const seed = database.transaction(() => {
    insert.run('Alice Johnson', 'completed', 49.99, '2024-01-10 09:00:00');
    insert.run('Bob Smith', 'pending', 125.00, '2024-01-11 11:30:00');
    insert.run('Carol White', 'shipped', 75.50, '2024-01-12 14:00:00');
    insert.run('David Brown', 'pending', 200.00, '2024-01-13 16:45:00');
    insert.run('Eva Martinez', 'completed', 33.20, '2024-01-14 08:15:00');
  });

  seed();
}
