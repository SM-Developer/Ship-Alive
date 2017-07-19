'use strict';

var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/login.html');
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

const Bullet = require('./server/bullet.js');
Bullet.addBullet(0, 0, 0, 0);

var io = require('socket.io')(serv, {});
io.sockets.on('connection', function(socket) {

  socket.id = Math.random();
  SOCKET_LIST[socket.id] = socket;

  Lobby.addPlayer(socket.id);
  socket.on('goLobby', function (data) {
    console.log(data.name);
    console.log(PLAYER_NAME_LIST[data.name]);
    if (PLAYER_NAME_LIST[data.name] != undefined) {
      socket.emit('Lobby', 'alread exist name');
    } else {
      socket.emit('Lobby', 'goLobby');
      PLAYER_NAME_LIST[data.name] = "yes";
    }
  });
  //console.log("A");
  
  /* In Game */

  PLAYER_LIST[socket.id] = new Player(socket.id);

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


  socket.on('disconnect', function() {
    delete SOCKET_LIST[socket.id];
    delete PLAYER_LIST[socket.id];
  });
});

/*
setInterval(function() {

  var pack = {
    player: Player.updateList(PLAYER_LIST),
    bullet: Bullet.updateList()
  }

  for (var i in SOCKET_LIST) {
    var socket = SOCKET_LIST[i];
    socket.emit('newPosition', pack);
  }

}, 1000/25);*/
