var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);
var gameUtils = require('./game-utils');

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

// Starts the server.
server.listen(5000, function() {
  console.log('Starting server on port 5000');
});

var players = {};

// Add the WebSocket handlers
io.on('connection', function(socket) {
  socket.on('disconnect', function() {
    // remove disconnected player
    delete players[socket.id];
  });
});

io.on('connection', function(socket) {
  socket.on('new-player', function() {
    players[socket.id] = {
      x: 300,
      y: 300
    };

    io.sockets.emit('state', players);
  });
  socket.on('movement', function(data) {
    var player = players[socket.id] || {};
    if (data.left) {
      player.x -= 5;
    }
    if (data.up) {
      player.y -= 5;
    }
    if (data.right) {
      player.x += 5;
    }
    if (data.down) {
      player.y += 5;
    }

    gameUtils.calculateBorders(player);

    io.sockets.emit('state', players);
  });
});
// setInterval(function() {
//   io.sockets.emit('state', players);
// }, 1000 / 30);