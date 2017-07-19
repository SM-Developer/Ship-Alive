'use strict'

const Ship = require ('../server/ship.js');
const Bullet = require('../server/bullet.js');

var COMPUTER_LIST = {};

class Computer extends Ship
{
    constructor(type)
    {
        super(type);
		this.type = type;
		this.destX = this.x;
		this.destY = this.y;
		this.destAngle = this.angle;
	}

	update()
	{
	    if(this.hp <= 0)
	    {
	        return false;
	    }

	    if (this.y > this.destY)
	    {
	        this.moveUp();
	        if (this.y <= this.destY) this.destY += Math.random()*400-200;
	    }
	    else if (this.y <= this.destY)
	    {
	        this.moveDown();
	        if (this.y > this.destY) this.destY += Math.random()*400-200;
	    }
	    if (this.x > this.destX)
	    {
	        this.moveLeft();
	        if (this.x <= this.destX) this.destX += Math.random()*400-200;
	    }
	    else if (this.x <= this.destX)
	    {
	        this.moveRight();
	        if (this.x > this.destX) this.destX += Math.random()*400-200;
	    }

	    this.angle += (this.destAngle - this.angle)/10;
	    if (Math.abs(this.destAngle - this.angle) <= 2)
	    {
	        this.destAngle = Math.random()*360;
	    }

	    // Random Shooting
	    if (Math.random()*10 <= 1)
	    {
	        Bullet.addBullet(this.x, this.y, this.angle, this.shotSpeed, this.shotRange, this.shotDamage);
	    }

	    return true;
	}

    static addComputer(type)
	{
	    COMPUTER_LIST[Math.random()] = new Computer(type);
	}

	static updateList(list)
	{
	    var pack = [];

	    for (var i in COMPUTER_LIST)
	    {
	        if (!COMPUTER_LIST[i].update())
	        {
	            delete COMPUTER_LIST[i];
	        }
	        else
	        {
	            pack.push({
	                type: COMPUTER_LIST[i].type,
	                x: COMPUTER_LIST[i].x,
	                y: COMPUTER_LIST[i].y,
	                angle: COMPUTER_LIST[i].angle,
                    hp: COMPUTER_LIST[i].hp
	            });
	        }
	    }

		return pack;
    }

    static getList()
    {
        return COMPUTER_LIST;
    }
};

module.exports = Computer;