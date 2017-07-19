module.exports = function(app){

	app.get('/', function(req, res) {
	  res.sendFile(__dirname + '/client/game.html');
	});

	app.get('/login', function(req, res) {
	  res.sendFile(__dirname + '/client/login.html');
	});

	app.get('/lobby', function(req, res) {
	  res.sendFile(__dirname + '/client/lobby.html');
	});

}