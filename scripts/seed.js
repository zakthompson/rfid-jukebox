const sqlite3 = require('better-sqlite3');
const db = new sqlite3('data.db', { verbose: console.log });

const q = db.prepare(`CREATE TABLE albums (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  card_uid TEXT NOT NULL,
  album_id TEXT NOT NULL
)`);
q.run();
