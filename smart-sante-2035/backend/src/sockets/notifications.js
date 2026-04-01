// Socket.io - notifications temps reel
let ioRef = null;

function init(io) {
  ioRef = io;
  io.on('connection', (socket) => {
    console.log('[SOCKET] Client connecte', socket.id);
    socket.on('disconnect', () => console.log('[SOCKET] Deconnecte', socket.id));
  });
}

function broadcast(event, payload) {
  if (ioRef) ioRef.emit(event, payload);
}

module.exports = { init, broadcast };
