// Modele User - requetes SQL simples
const db = require('../config/db');

async function findByEmail(email) {
  const [rows] = await db.query(
    `SELECT u.*, r.code AS role_code
     FROM users u
     JOIN roles r ON r.id = u.role_id
     WHERE u.email = ? LIMIT 1`,
    [email]
  );
  return rows[0] || null;
}

async function findById(id) {
  const [rows] = await db.query(
    `SELECT u.id, u.full_name, u.email, u.phone, u.region, u.hospital_id,
            r.code AS role_code, r.label AS role_label
     FROM users u JOIN roles r ON r.id = u.role_id
     WHERE u.id = ?`, [id]);
  return rows[0] || null;
}

async function create({ full_name, email, phone, password_hash, role_id, hospital_id, region }) {
  const [result] = await db.query(
    `INSERT INTO users (full_name, email, phone, password_hash, role_id, hospital_id, region)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [full_name, email, phone, password_hash, role_id, hospital_id || null, region || null]
  );
  return result.insertId;
}

async function listAll() {
  const [rows] = await db.query(
    `SELECT u.id, u.full_name, u.email, u.phone, u.region, u.is_active,
            r.code AS role_code, r.label AS role_label,
            h.name AS hospital_name
     FROM users u
     JOIN roles r ON r.id = u.role_id
     LEFT JOIN hospitals h ON h.id = u.hospital_id
     ORDER BY u.created_at DESC`
  );
  return rows;
}

async function listRoles() {
  const [rows] = await db.query('SELECT * FROM roles ORDER BY id');
  return rows;
}

module.exports = { findByEmail, findById, create, listAll, listRoles };
