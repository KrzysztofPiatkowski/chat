const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();
const PORT = 8000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  socket.on('message', (message) => { 
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
  console.log('I\'ve added a listener on message event \n');

  socket.on('join', (name) => {
    console.log(`User ${name} has joined the chat!`);
    users.push({ name, id: socket.id });
    io.emit('userList', users);
    socket.broadcast.emit('message', {
      author: 'Chat Bot',
      content: `${name} has joined the conversation!`
    });
  })

  socket.on('disconnect', () => {
    console.log('Oh, socket ' + socket.id + ' has left');

    const index = users.findIndex(user => user.id === socket.id);

    if (index !== -1) {
      const userName = users[index].name;
      
      console.log(`User ${users[index].name} has been removed from the chat.`);
      users.splice(index, 1);

      socket.broadcast.emit('message', {
        author: 'Chat Bot',
        content: `${userName} has left the conversation...:(`
      });
    }

    io.emit('userList', users);
  });
});

const messages = [];

const users = [];

app.use(express.static(path.join(__dirname, '/client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});