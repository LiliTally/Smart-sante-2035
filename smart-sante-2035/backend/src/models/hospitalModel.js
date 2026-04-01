// Modele Hospital
const db = require('../config/db');

async function findAll() {
  const [rows] = await db.query('SELECT * FROM hospitals ORDER BY name');
  return rows;
}

async function findById(id) {
  const [rows] = await db.query('SELECT * FROM hospitals WHERE id = ?', [id]);
  return rows[0] || null;
}

async function create(data) {
  const [r] = await db.query(
    `INSERT INTO hospitals (name, city, region, latitude, longitude, phone, total_beds, available_beds, specialties, status)
     VALUES (?,?,?,?,?,?,?,?,?,?)`,
    [data.name, data.city, data.region, data.latitude || null, data.longitude || null,
     data.phone || null, data.total_beds || 0, data.available_beds || 0,
     data.specialties || '', data.status || 'OPERATIONAL']
  );
  return r.insertId;
}

async function update(id, data) {
  await db.query(
    `UPDATE hospitals SET name=?, city=?, region=?, latitude=?, longitude=?, phone=?,
     total_beds=?, available_beds=?, specialties=?, status=? WHERE id=?`,
    [data.name, data.city, data.region, data.latitude || null, data.longitude || null,
     data.phone || null, data.total_beds || 0, data.available_beds || 0,
     data.specialties || '', data.status || 'OPERATIONAL', id]
  );
}

async function remove(id) { await db.query('DELETE FROM hospitals WHERE id = ?', [id]); }

async function listRoutes() {
  const [rows] = await db.query('SELECT * FROM hospital_routes');
  return rows;
}

module.exports = { findAll, findById, create, update, remove, listRoutes };
