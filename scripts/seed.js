const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

db.run(`CREATE TABLE albums (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  card_uid TEXT NOT NULL,
  album_id TEXT NOT NULL
)`);
