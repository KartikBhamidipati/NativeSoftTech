const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' }
});

let messages = [];

io.on('connection', socket => {
  console.log('A user connected');
  socket.emit('chat history', messages);
  socket.on('chat message', msg => {
    const message = { text: msg, timestamp: new Date() };
    messages.push(message);
    io.emit('chat message', message);
  });
});

server.listen(3000, () => {
  console.log('Chat server is running on port 3000');
});
