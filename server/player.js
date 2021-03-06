'use strict'

const Ship = require ('../server/ship.js');

class Player extends Ship{
    constructor(id)
    {
		super(0);
		this.id = id;

		this.pressRight = false;
		this.pressLeft = false;
		this.pressUp = false;
		this.pressDown =false;
	}

    update()
    {
		this.move();
	}

    move()
    {
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
                id: list[i].id,
				x: list[i].x,
				y: list[i].y,
				angle: list[i].angle,
                hp: list[i].hp
			});
		}
		//console.log(pack);

		return pack;
	}

};

module.exports = Player;