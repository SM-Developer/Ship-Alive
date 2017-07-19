const Player = require('../server/player.js');

exports = module.exports = function(io){
	io.sockets.on('connection', function (socket) {

		var player = new Player(socket.id);

		socket.on('keyPress', function (data) {
			if (data.inputId === 'right') {
				console.log("right");
			}
			else if (data.inputId === 'left') {
				console.log("left");
			}
			else if (data.inputId === 'up') {
				console.log("up");
			}
			else if (data.inputId === 'down') {
				console.log("down");
			}
		});
	});

}