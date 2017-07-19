'use strict'

const Obj = require ('../server/object.js');

class Ship extends Obj{
    constructor(type)
    {
		super(Math.random()*2000-1000, Math.random()*2000-1000, Math.random()*360);

		switch(type)
		{
		    case 0:
		        this.name = "Name";
		        this.hp = 100;
		        this.speed = 8;
		        this.shotSpeed = 14;
		        this.shotRange = 300;
		        this.shotDamage = 3;
		        break;
            case 1:
                this.name = "Computer";
                this.hp = 15;
                this.speed = 4;
                this.shotSpeed = 12;
                this.shotRange = 300;
                this.shotDamage = 3;
                break;
            case 2:
                this.name = "Computer";
                this.hp = 10;
                this.speed = 6;
                this.shotSpeed = 12;
                this.shotRange = 250;
                this.shotDamage = 3;
                break;
		}
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

	decreaseHp(damage)
	{
	    this.hp -= damage;
	}
};

module.exports = Ship;