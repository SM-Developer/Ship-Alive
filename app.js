'use strict';

var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

serv.listen(2000);
console.log("port : 2000 open");

var SOCKET_LIST = {};

var DEBUG = true;

var io = require('socket.io')(serv, {});
io.sockets.on('connection', function(socket) {
  socket.id = Math.random();
  SOCKET_LIST[socket.id] = socket;
  PLAYER_LIST[socket.id] = new Player(socket.id);

  socket.on('disconnect', function() {
    delete SOCKET_LIST[socket.id];
    delete PLAYER_LIST[socket.id];
  });
});

var input = require('./server/input.js')(io);

const Player = require('./server/player.js');
var PLAYER_LIST = {};


setInterval(function() {

  var pack = {
    player: Player.updateList(PLAYER_LIST),
  }

  for (var i in SOCKET_LIST) {
    var socket = SOCKET_LIST[i];
    socket.emit('newPosition', pack);
  }

}, 1000/25);
