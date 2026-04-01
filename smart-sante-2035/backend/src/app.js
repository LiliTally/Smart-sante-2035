// Application Express - configuration des middlewares et routes
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json({ limit: '2mb' }));

// Route racine (health check)
app.get('/', (req, res) => {
  res.json({ app: 'Smart Sante 2035 API', status: 'OK', version: '1.0.0' });
});

// Montage des routes
app.use('/api/auth',      require('./routes/auth'));
app.use('/api/patients',  require('./routes/patients'));
app.use('/api/triage',    require('./routes/triage'));
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/stats',     require('./routes/stats'));
app.use('/api/users',     require('./routes/users'));

// 404
app.use((req, res) => res.status(404).json({ error: 'Route inconnue' }));

// Gestion centralisee des erreurs (toujours en dernier)
app.use(errorHandler);

module.exports = app;
