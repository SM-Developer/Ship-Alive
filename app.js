'use strict';

var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});
app.get('/lobby', function(req, res) {
  res.sendFile(__dirname + '/client/lobby.html');
});

app.use('/client', express.static(__dirname + '/client'));

serv.listen(2000);
console.log("port : 2000 open");

var SOCKET_LIST = {};

var DEBUG = true;

/* Room Server */
const Lobby = require('./server/lobby.js');
var PLAYER_NAME_LIST = {};

/* In Game */
const Player = require('./server/player.js');
var PLAYER_LIST = {};
const Computer = require('./server/computer.js');
const Bullet = require('./server/bullet.js');

var io = require('socket.io')(serv, {});
io.sockets.on('connection', function(socket) {

  socket.id = Math.random();
  SOCKET_LIST[socket.id] = socket;

  Lobby.addPlayer(socket.id);
  socket.on('goLobby', function (data) {
    if (PLAYER_NAME_LIST[data.name] != undefined) {
      socket.emit('Lobby', 'alread exist name');
    } else {
      socket.emit('Lobby', 'goLobby');
      PLAYER_NAME_LIST[data.name] = "yes";
    }
  });
  
  /* In Game */

  PLAYER_LIST[socket.id] = new Player(socket.id);
  for (var i = 1; i <= 20; i++) Computer.addComputer(Math.floor(Math.random()*2)+1);

  socket.emit('initGame', socket.id, PLAYER_LIST);

  socket.on('keyPress', function (data) {
    if (data.inputId === 'right') {
      PLAYER_LIST[socket.id].pressRight = data.isPress;
    }
    else if (data.inputId === 'left') {
      PLAYER_LIST[socket.id].pressLeft = data.isPress;
    }
    else if (data.inputId === 'up') {
      PLAYER_LIST[socket.id].pressUp = data.isPress;
    }
    else if (data.inputId === 'down') {
      PLAYER_LIST[socket.id].pressDown = data.isPress;
    }
  });

  socket.on('moveMouse', function (angle) {
      PLAYER_LIST[socket.id].angle = angle;
  });

  socket.on('clickMouse', function ()
  {
      Bullet.addBullet(PLAYER_LIST[socket.id].x, PLAYER_LIST[socket.id].y, PLAYER_LIST[socket.id].angle, 
                PLAYER_LIST[socket.id].shotSpeed, PLAYER_LIST[socket.id].shotRange, PLAYER_LIST[socket.id].shotDamage);
  });

  socket.on('disconnect', function() {
    delete SOCKET_LIST[socket.id];
    delete PLAYER_LIST[socket.id];
  });
});

setInterval(function() {

  var pack = {
    player: Player.updateList(PLAYER_LIST),
    bullet: Bullet.updateList(PLAYER_LIST),
    computer: Computer.updateList()
  }

  for (var i in SOCKET_LIST) {
    var socket = SOCKET_LIST[i];
    socket.emit('newPosition', pack);
  }

}, 1000/25);