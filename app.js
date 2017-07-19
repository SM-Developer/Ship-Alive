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
const Computer = require('./server/computer.js');
const Bullet = require('./server/bullet.js');

var io = require('socket.io')(serv, {});
io.sockets.on('connection', function(socket) {

  socket.id = Math.random();
  SOCKET_LIST[socket.id] = socket;

  var name;
  var where;

  Lobby.addPlayer(socket.id);
  where = 'Lobby';

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
    socket.emit('GetLobby', name, {state: Room.getState(), list: Room.getList()});
  });

  socket.on('tryRoom', function (data) {
    var room = Room.getNumList(data.num)

    if (Room.getNumState(data.num) !== 'WAIT') {
      socket.emit('tryRoom', {type: 'error', msg: "is already start"});
      return ;
    }

    var cnt = 0;
    for (var i in room) {
      cnt++;
    }
    if (cnt == 8) {
      socket.emit('tryRoom', {type: 'error', msg: "is Full"});
      return ;
    }

    Room.addPlayer(data.num, socket.id, name);
    where = data.num;
    socket.emit('tryRoom', {type: 'success', name: name, num: data.num});
    io.sockets.emit('roomChange', {state: Room.getState(), list: Room.getList()});
  });

  socket.on('GetRoom', function (data) {
    socket.emit('GetRoom', data);
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
    Lobby.delPlayer(socket.id);
    if (where !== 'Lobby') {
      Room.delPlayer(where, socket.id);
      io.sockets.emit('roomChange', {state: Room.getState(), list: Room.getList()});
    }
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