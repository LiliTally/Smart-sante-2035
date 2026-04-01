import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('smartsante.db');

export function initDb() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS local_patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT, full_name TEXT, gender TEXT,
      phone TEXT, city TEXT, region TEXT,
      score_global REAL, level TEXT, symptoms TEXT,
      synced INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export function insertPatient(p) {
  db.runSync(
    `INSERT INTO local_patients (uuid, full_name, gender, phone, city, region, score_global, level, symptoms)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [p.uuid, p.full_name, p.gender, p.phone, p.city, p.region, p.score_global, p.level, p.symptoms]
  );
}

export function listPatients() {
  return db.getAllSync('SELECT * FROM local_patients ORDER BY created_at DESC');
}

export function listUnsynced() {
  return db.getAllSync('SELECT * FROM local_patients WHERE synced = 0');
}

export function markSynced(id) {
  db.runSync('UPDATE local_patients SET synced = 1 WHERE id = ?', [id]);
}

export function countUnsynced() {
  const r = db.getFirstSync('SELECT COUNT(*) AS c FROM local_patients WHERE synced = 0');
  return r ? r.c : 0;
}