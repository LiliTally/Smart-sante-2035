// Gestion centralisee des erreurs
module.exports = function errorHandler(err, req, res, next) {
  console.error('[ERROR]', err.stack || err.message);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Erreur serveur interne',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};
