module.exports = function(app){

	app.get('/', function(req, res) {
	  res.sendFile(__dirname + '/client/public/game.html');
	});

	app.get('/login', function(req, res) {
	  res.sendFile(__dirname + '/client/public/login.html');
	});

	app.get('/lobby', function(req, res) {
	  res.sendFile(__dirname + '/client/public/lobby.html');
	});

	app.get('/room', function(req, res) {
	  res.sendFile(__dirname + '/client/public/room.html');
	});
}