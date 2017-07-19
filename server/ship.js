'use strict'

const Obj = require ('../server/object.js');

class Ship extends Obj{
	constructor(x, y) {
		super(x, y);
		this.name = "Name";
	}
};

module.exports = Ship;