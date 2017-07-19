'use strict'

const Obj = require ('../server/object.js');

class Ship extends Obj{
    constructor(x, y)
    {
		super(x, y);
		this.name = "Name";
		this.speed = 3;
	}

	moveUp()
	{
        this.y -= this.speed;
	}
	moveDown()
	{
	    this.y += this.speed;
	}
	moveRight()
	{
	    this.x += this.speed;
	}
	moveLeft()
	{
	    this.x -= this.speed;
	}
};

module.exports = Ship;