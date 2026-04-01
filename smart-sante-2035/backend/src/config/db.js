// Configuration de la connexion MySQL avec mysql2 (pool de connexions)
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'smart_sante_2035',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test de connexion au demarrage
pool.getConnection()
  .then(conn => {
    console.log('[DB] Connexion MySQL OK');
    conn.release();
  })
  .catch(err => {
    console.error('[DB] Erreur de connexion :', err.message);
  });

module.exports = pool;
