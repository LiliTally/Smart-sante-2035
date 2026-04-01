// Script utilitaire : re-hash les mots de passe des comptes seed avec bcrypt valide
// Lancer : node src/utils/seedPasswords.js
const bcrypt = require('bcryptjs');
const db = require('../config/db');

(async () => {
  const password = 'Demo1234!';
  const hash = await bcrypt.hash(password, 10);
  await db.query('UPDATE users SET password_hash = ?', [hash]);
  console.log('Mots de passe re-hashes. Mot de passe pour tous les comptes :', password);
  process.exit(0);
})();
