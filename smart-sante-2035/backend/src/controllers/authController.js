// Controller : Authentification
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../config/jwt');
const db = require('../config/db');

exports.register = async (req, res, next) => {
  try {
    const { full_name, email, phone, password, role_code, hospital_id, region } = req.body;
    // Verifier email deja utilise
    const existing = await userModel.findByEmail(email);
    if (existing) return res.status(400).json({ error: 'Email deja utilise' });
    // Recuperer le role
    const [[role]] = await db.query('SELECT id FROM roles WHERE code = ?', [role_code]);
    if (!role) return res.status(400).json({ error: 'Role inconnu' });
    // Hasher le mot de passe
    const password_hash = await bcrypt.hash(password, 10);
    const id = await userModel.create({
      full_name, email, phone, password_hash,
      role_id: role.id, hospital_id, region
    });
    res.status(201).json({ id, message: 'Compte cree' });
  } catch (e) { next(e); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findByEmail(email);
    if (!user) return res.status(401).json({ error: 'Identifiants invalides' });
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Identifiants invalides' });
    if (!user.is_active) return res.status(403).json({ error: 'Compte desactive' });

    const payload = {
      id: user.id, email: user.email,
      role: user.role_code, hospitalId: user.hospital_id,
      name: user.full_name
    };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken({ id: user.id });
    res.json({
      accessToken, refreshToken,
      user: {
        id: user.id, full_name: user.full_name, email: user.email,
        role: user.role_code, hospital_id: user.hospital_id, region: user.region
      }
    });
  } catch (e) { next(e); }
};

exports.refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: 'Refresh token requis' });
    const decoded = verifyRefreshToken(refreshToken);
    const user = await userModel.findById(decoded.id);
    if (!user) return res.status(401).json({ error: 'Utilisateur introuvable' });
    const accessToken = signAccessToken({
      id: user.id, email: user.email,
      role: user.role_code, hospitalId: user.hospital_id, name: user.full_name
    });
    res.json({ accessToken });
  } catch (e) {
    res.status(401).json({ error: 'Refresh token invalide' });
  }
};

exports.me = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);
    res.json({ user });
  } catch (e) { next(e); }
};
