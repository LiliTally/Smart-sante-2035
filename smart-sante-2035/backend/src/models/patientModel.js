// Modele Patient
const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

async function create(data, userId) {
  const uuid = 'P-' + uuidv4().substring(0, 8).toUpperCase();
  const [result] = await db.query(
    `INSERT INTO patients (uuid, full_name, birth_date, gender, phone, city, region, medical_history, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [uuid, data.full_name, data.birth_date || null, data.gender || 'AUTRE',
     data.phone || null, data.city || null, data.region || null,
     data.medical_history || null, userId]
  );
  return { id: result.insertId, uuid };
}

async function findAll({ search = '', limit = 50, offset = 0 }) {
  const like = `%${search}%`;
  const [rows] = await db.query(
    `SELECT * FROM patients
     WHERE full_name LIKE ? OR uuid LIKE ? OR phone LIKE ?
     ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [like, like, like, Number(limit), Number(offset)]
  );
  const [[count]] = await db.query(
    `SELECT COUNT(*) AS total FROM patients WHERE full_name LIKE ? OR uuid LIKE ? OR phone LIKE ?`,
    [like, like, like]
  );
  return { data: rows, total: count.total };
}

async function findById(id) {
  const [rows] = await db.query('SELECT * FROM patients WHERE id = ?', [id]);
  return rows[0] || null;
}

async function update(id, data) {
  await db.query(
    `UPDATE patients SET full_name=?, birth_date=?, gender=?, phone=?, city=?, region=?, medical_history=?
     WHERE id=?`,
    [data.full_name, data.birth_date || null, data.gender || 'AUTRE',
     data.phone || null, data.city || null, data.region || null,
     data.medical_history || null, id]
  );
}

async function remove(id) {
  await db.query('DELETE FROM patients WHERE id = ?', [id]);
}

async function getHistory(patientId) {
  const [rows] = await db.query(
    `SELECT t.*, h.name AS hospital_name
     FROM triages t LEFT JOIN hospitals h ON h.id = t.hospital_id
     WHERE t.patient_id = ? ORDER BY t.created_at DESC`,
    [patientId]
  );
  return rows;
}

module.exports = { create, findAll, findById, update, remove, getHistory };
