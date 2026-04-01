// Modele Triage
const db = require('../config/db');

async function create(data) {
  const [r] = await db.query(
    `INSERT INTO triages (patient_id, score_vital, score_symptomes, score_antecedents, score_age,
     score_global, level, symptoms, recommended_action, hospital_id, status, created_by)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
    [data.patient_id, data.score_vital, data.score_symptomes, data.score_antecedents, data.score_age,
     data.score_global, data.level, data.symptoms || null, data.recommended_action || null,
     data.hospital_id || null, data.status || 'EN_ATTENTE', data.created_by || null]
  );
  return r.insertId;
}

async function findById(id) {
  const [rows] = await db.query(
    `SELECT t.*, p.full_name AS patient_name, p.uuid AS patient_uuid, h.name AS hospital_name
     FROM triages t
     JOIN patients p ON p.id = t.patient_id
     LEFT JOIN hospitals h ON h.id = t.hospital_id
     WHERE t.id = ?`, [id]);
  return rows[0] || null;
}

async function listActive() {
  const [rows] = await db.query(
    `SELECT t.*, p.full_name AS patient_name, p.uuid AS patient_uuid, h.name AS hospital_name
     FROM triages t
     JOIN patients p ON p.id = t.patient_id
     LEFT JOIN hospitals h ON h.id = t.hospital_id
     WHERE t.status IN ('EN_ATTENTE','PRIS_EN_CHARGE')
     ORDER BY t.score_global DESC, t.created_at ASC`
  );
  return rows;
}

async function listAll() {
  const [rows] = await db.query(
    `SELECT t.*, p.full_name AS patient_name, h.name AS hospital_name
     FROM triages t
     JOIN patients p ON p.id = t.patient_id
     LEFT JOIN hospitals h ON h.id = t.hospital_id
     ORDER BY t.created_at DESC LIMIT 200`
  );
  return rows;
}

async function updateStatus(id, status) {
  await db.query('UPDATE triages SET status = ? WHERE id = ?', [status, id]);
}

async function stats() {
  const [rows] = await db.query(
    `SELECT level, COUNT(*) AS total FROM triages GROUP BY level`
  );
  const [[active]] = await db.query(
    `SELECT COUNT(*) AS total FROM triages WHERE status IN ('EN_ATTENTE','PRIS_EN_CHARGE')`
  );
  const [[critical]] = await db.query(
    `SELECT COUNT(*) AS total FROM triages WHERE level = 'CRITIQUE' AND status != 'TERMINE'`
  );
  return { byLevel: rows, active: active.total, critical: critical.total };
}

module.exports = { create, findById, listActive, listAll, updateStatus, stats };
