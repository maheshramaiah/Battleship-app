const Room = require('./Room');

class SocketManager {
  constructor(io) {
    this.io = io;
    this.io.on('connection', this.onConnect.bind(this));
    this.rooms = {};
  }

  onConnect(socket) {
    socket.on('CREATE_ROOM', this.createRoom.bind(this, socket));
    socket.on('JOIN_ROOM', this.joinRoom.bind(this, socket));
    socket.on('PLAYER_READY', this.playerReady.bind(this, socket));
    socket.on('ON_SHOOT', this.onShoot.bind(this, socket));
    socket.on('ON_SHOOT_ACK', this.onShootAck.bind(this, socket));
  }

  createRoom(socket, roomId) {
    if (!this.rooms[roomId]) {
      const room = new Room();

      room.addPlayer(socket.id, { socket, name: 'PLAYER1' });
      this.rooms[roomId] = room;
      socket.join(roomId);
    }
  }

  joinRoom(socket, roomId) {
    const room = this.rooms[roomId];

    if (!room || room.length > 1) {
      socket.emit('LOGIN_FAILURE', { message: 'Room not available' });
      return;
    }

    room.addPlayer(socket.id, { socket, name: 'PLAYER2' });
    socket.join(roomId);
    this.io.sockets.in(roomId).emit('LOGIN_SUCCESS', roomId);
  }

  playerReady(socket, roomId) {
    const room = this.rooms[roomId];

    room.getPlayer(socket.id).setReady();

    if (room.arePlayersReady()) {
      room.setNextPlayer();
      room.getCurrentPlayerSocket().emit('YOUR_TURN');
    }
  }

  onShoot(socket, { roomId, ...rest }) {
    socket.broadcast.to(roomId).emit('FIRE_RECIEVED', rest);
  }

  onShootAck(socket, { roomId, isHit, ...rest }) {
    const room = this.rooms[roomId];

    socket.broadcast.to(roomId).emit('GAME_STATUS', { isHit, ...rest });

    if (!isHit) {
      room.setNextPlayer();
    }

    room.getCurrentPlayerSocket().emit('YOUR_TURN');
  }
}

module.exports = SocketManager;