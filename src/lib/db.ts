import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "nexoapp.db");

const db = new Database(dbPath);

	db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    admin BIT NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL
  );
`);

const columns = db
  .prepare(`PRAGMA table_info(users)`)
  .all() as { name: string }[];

const hasAdmin = columns.some((column) => column.name === "admin");

if (!hasAdmin) {
  db.exec(`
    ALTER TABLE users
    ADD COLUMN admin BIT NOT NULL DEFAULT 0
  `);
}

export default db;