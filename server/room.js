'use strict'

var PLAYER_LIST = new Array();

class Room {
	
	constructor() {

	}

	static addPlayer(num, name) {
		for (var j = 0; j < 8; j++) {
	      if (PLAYER_LIST[num][j] === 'No') {
	        PLAYER_LIST[num][j] = name;
	        break;
	      }
	    }
	}

	static delPlayer(num, name) {
		for (var j = 0; j < 8; j++) {
			if (PLAYER_LIST[num][j] === name) {
				PLAYER_LIST[num][j] = 'No';
				break;
			}
	    }
	}

	static initList() {
		for (var i = 0; i < 5; i++) {
			PLAYER_LIST[i] = new Array();
			for (var j = 0; j < 8; j++) {
				PLAYER_LIST[i].push('No')
			}

			PLAYER_LIST[i].push('WAIT');
		}
	}

	static getList() {
		return PLAYER_LIST;
	}
};

module.exports = Room;