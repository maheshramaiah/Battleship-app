const path = require('path');
const http = require('http');
const express = require('express');
let io = require('socket.io');
const compression = require('compression');
const SocketManager = require('./server/model/SocketManager');

const port = process.env.PORT || 3000;
const app = express();
const server = http.Server(app);

app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

io = io(server);

server.listen(port, () => {
  new SocketManager(io);
  console.log(`Server listening on port ${port}`);
});
