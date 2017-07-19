'use strict'

const Ship = require ('../server/ship.js');

class Player extends Ship{
	constructor(id) {
		super(0, 0); // may be random
		this.id = id;

		this.pressRight = false;
		this.pressLeft = false;
		this.pressUp = false;
		this.pressDown =false;
	}

	update() {
		// update Player
		// ex) this.x = this.x + 3;
		this.move();
	}

	move() {
	    if(this.pressUp) this.moveUp();
	    if(this.pressDown) this.moveDown();
	    if(this.pressLeft) this.moveLeft();
	    if(this.pressRight) this.moveRight();
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
		//console.log(pack);

		return pack;
    }

};

module.exports = Player;