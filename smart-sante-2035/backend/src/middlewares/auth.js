// Middleware d'authentification JWT
const { verifyAccessToken } = require('../config/jwt');

module.exports = function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant' });
  }
  const token = header.substring(7);
  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded; // { id, email, role, hospitalId }
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Token invalide ou expire' });
  }
};
