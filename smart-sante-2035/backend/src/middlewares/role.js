// Middleware de controle de role
// Usage : router.get('/admin', auth, requireRole(['SYSTEM_ADMIN']), handler)

module.exports = function requireRole(allowedRoles) {
  return function (req, res, next) {
    if (!req.user) {
      return res.status(401).json({ error: 'Non authentifie' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Acces refuse pour ce role' });
    }
    next();
  };
};
