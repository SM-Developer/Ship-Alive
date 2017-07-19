'use strict'

const Obj = require ('../server/object.js');


var BULLET_LIST = {};

class Bullet extends Obj
{
    constructor(x, y, angle, speed, range, damage)
    {
		super(x, y, angle);
		this.ox = x;
		this.oy = y;
		this.speed = speed;
		this.range = range;
		this.radius = 50;
		this.damage = damage;
	}

	update(PLAYER_LIST)
	{
		// update Bullet
	    this.x = this.ox + this.radius*Math.cos(this.angle*Math.PI/180);
	    this.y = this.oy + this.radius*Math.sin(this.angle*Math.PI/180);
	    this.radius += this.speed;

	    if(this.radius > this.range)
	    {
	        return false;
	    }


	    /* 충돌 체크 */
	    var dist = function( x1, y1, x2, y2 )
	    {
	        return Math.sqrt( ( x1 - x2 ) * ( x1 - x2 ) + ( y1 - y2 ) * ( y1 - y2 ) );
	    };
	    for (var i in PLAYER_LIST) // 플레이어와 충돌 체크
	    {
	        if (dist(this.x, this.y, PLAYER_LIST[i].x, PLAYER_LIST[i].y) <= 30)
	        {
	            PLAYER_LIST[i].decreaseHp(this.damage);
	            return false;
	        }
	    }
        const Computer = require('../server/computer.js'); // 컴퓨터와 충돌 체크
        var COMPUTER_LIST = Computer.getList();
        for (var i in COMPUTER_LIST)
	    {
	        if (dist(this.x, this.y, COMPUTER_LIST[i].x, COMPUTER_LIST[i].y) <= 30)
	        {
	            COMPUTER_LIST[i].decreaseHp(this.damage);
	            return false;
	        }
	    }

	    return true;
	}

	static addBullet(x, y, angle, speed, range, damage)
	{
		BULLET_LIST[Math.random()] = new Bullet(x, y, angle, speed, range, damage);
    }

	static updateList(PLAYER_LIST)
	{
		var pack = [];
		
		for (var i in BULLET_LIST)
		{
		    if (!BULLET_LIST[i].update(PLAYER_LIST))
		    {
		        delete BULLET_LIST[i];
		    }
		    else
		    {
		        pack.push({
		            x: BULLET_LIST[i].x,
		            y: BULLET_LIST[i].y,
		            angle: BULLET_LIST[i].angle
		        });
		    }
		}
		return pack;
    }
};

module.exports = Bullet;