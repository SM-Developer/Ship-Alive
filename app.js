'use strict';

var express = require('express');
var app = express();
var serv = require('http').Server(app);

require('./routes')(app);

app.use('/client', express.static(__dirname + '/client'));

serv.listen(2000);
console.log("port : 2000 open");

var SOCKET_LIST = {};

var DEBUG = true;

/* Room Server */
const Lobby = require('./server/lobby.js');
var PLAYER_NAME_LIST = {};

const Room = require('./server/room.js');
Room.initList();

/* In Game */
const Player = require('./server/player.js');
var PLAYER_LIST = {};

const Bullet = require('./server/bullet.js');
Bullet.addBullet(0, 0, 0, 0);

var io = require('socket.io')(serv, {});
io.sockets.on('connection', function(socket) {

  socket.id = Math.random();
  SOCKET_LIST[socket.id] = socket;

  var name;

  Lobby.addPlayer(socket.id);
  socket.on('LogIn', function (data) {
    if (PLAYER_NAME_LIST[data.name] != undefined) {
      socket.emit('Lobby', 'alread exist name');
    } else {
      socket.emit('Lobby', 'GetLobby');
      PLAYER_NAME_LIST[data.name] = data.name;
      name = data.name;
    }
  });

  socket.on('GetLobby', function (data) {
    socket.emit('GetLobby', name, Room.getList());
  });

  socket.on('tryRoom', function (data) {
    var room = Room.getList()[data.num]

    if (room[8] !== 'WAIT') {
      socket.emit('tryRoom', {type: 'error', msg: "is already start"});
      return ;
    }

    var cnt = 0;
    for (var j = 0; j < 8; j++) {
      if (room[j] !== 'No') cnt++;
    }
    if (cnt == 8) {
      socket.emit('tryRoom', {type: 'error', msg: "is Full"});
      return ;
    }

    Room.addPlayer(data.num, name);
    socket.emit('tryRoom', {type: 'success', name: name, num: data.num});
  });

  socket.on('GetRoom', function (data) {
    socket.emit('GetRoom', data);
  });
 
  /* In Game */
  /*
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
  });*/


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
