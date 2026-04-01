// Point d'entree du serveur (Express + Socket.io)
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const notifications = require('./sockets/notifications');

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: process.env.CORS_ORIGIN || '*' }
});
notifications.init(io);

server.listen(PORT, () => {
  console.log(`========================================`);
  console.log(`  Smart Sante 2035 - API`);
  console.log(`  Ecoute sur http://localhost:${PORT}`);
  console.log(`========================================`);
});
