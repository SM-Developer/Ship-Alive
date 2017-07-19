'use strict'

const Obj = require ('../server/object.js');

var BULLET_LIST = {};

class Bullet extends Obj{
	constructor(x, y, speed, range) {
		super(x, y);
		this.ox = x;
		this.oy = y;
		this.shotSpeed = speed;
		this.shotRange = range;
	}

	update() {
		// update Bullet
		this.x += 3;
	}

	static addBullet(x, y, speed, range) {
		BULLET_LIST[Math.random()] = new Bullet(x, y, speed, range);
    }

	static updateList() {
		var pack = [];
		
		for (var i in BULLET_LIST) {
			BULLET_LIST[i].update();
			pack.push({
				// pack Player
				x: BULLET_LIST[i].x,
				y: BULLET_LIST[i].y,
			});
		}
		console.log(pack);
		return pack;
    }

};

module.exports = Bullet;