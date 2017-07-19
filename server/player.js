'use strict'

const Ship = require ('../server/ship.js');

class Player extends Ship{
	constructor(id) {
		super(0, 0); // may be random
		this.id = id;
	}

	update() {
		// update Player
		// ex) this.x = this.x + 3;
	}

	static updateList(list) {
		var pack = [];
		
		for (var i in list) {
			list[i].update();
			pack.push({
				// pack Player
				x: list[i].x,
				y: list[i].y,
			});
		}

		return pack;
    }

};


module.exports = Player;