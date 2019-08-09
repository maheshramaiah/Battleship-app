class Player {
  constructor(name, socket) {
    this.name = name;
    this.socket = socket;
    this.ready = false;
  }

  setReady() {
    this.ready = true;
  }
}

class Room {
  constructor() {
    this.players = {};
    this.length = 0;
    this.currentPlayer = null;
  }

  addPlayer(id, { name, socket }) {
    this.players[id] = new Player(name, socket);
    this.length++;
  }

  arePlayersReady() {
    return Object.values(this.players).every(player => player.ready);
  }

  getPlayer(id) {
    return this.players[id];
  }

  getCurrentPlayerSocket() {
    return this.players[this.currentPlayer].socket;
  }

  setNextPlayer() {
    const players = Object.keys(this.players);

    this.currentPlayer = this.currentPlayer === players[0] ? players[1] : players[0];
  }
}

module.exports = Room;