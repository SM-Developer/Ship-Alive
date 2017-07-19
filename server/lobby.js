'use strict'

var PLAYER_LIST = {};

class Lobby {
	static addPlayer(id) {
		PLAYER_LIST[id] = 'LOBBY';
	}

	static delPlayer(id) {
		delete SOCKET_LIST[id];
	}
};

module.exports = Lobby;