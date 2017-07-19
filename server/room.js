'use strict'

var PLAYER_LIST = new Array();
var state = new Array();

class Room {
	
	constructor() {

	}

	static addPlayer(num, id, name) {

	    var cnt = 0;
	    for (var i in PLAYER_LIST[num]) {
	      cnt++;
	    }
	    if (cnt < 8) {
			PLAYER_LIST[num][id] = name;
			return ;
	    }
	}

	static delPlayer(num, id) {
		var p = PLAYER_LIST[num]
		delete p[id];
		console.log(p);
		console.log(PLAYER_LIST[num]);
	}

	static initList() {
		for (var i = 0; i < 5; i++) {
			PLAYER_LIST[i] = {};
			state[i] = 'WAIT';
		}
	}

	static getList() {
		return PLAYER_LIST;
	}

	static getNumList(num) {
		return PLAYER_LIST[num];
	}

	static getState() {
		return state;
	}

	static getNumState(num) {
		return state[num];
	}
};

module.exports = Room;