// load Todo model
var Todo = require('./models/todo');

// expose the routes to our app with module.exports
module.exports = function(app) {

	// SERVER ROUTES ======================

	// api-----------------------
	// get all todos
	app.get('/api/todos', function(req, res) {

		// use mongoose to get all todos from DB
		Todo.find(function(err, todos) {

			if (err)
				res.send(err);

			res.json(todos);

		});

	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {

			if (err)
				res.send(err);

			// get and return all the todos after create another
			Todo.find(function(err, todos) {

				if (err)
					res.send(err);

				res.json(todos);

			});

		});

	});

	// done a todo
	app.post('/api/todos/done/:todo_id', function(req, res) {

		// update a todo as done
		Todo.update({ _id : req.params.todo_id }, { done : true }, function(err, todo) {

			if (err)
				res.send(err);

			// get and return all the todos after update
			Todo.find(function(err, todos) {

				if (err)
					res.send(err);

				res.json(todos);

			});

		});

	});

	// undone a todo
	app.post('/api/todos/undone/:todo_id', function(req, res) {

		// update a todo as done
		Todo.update({ _id : req.params.todo_id }, { done : false }, function(err, todo) {

			if (err)
				res.send(err);

			// get and return all the todos after update
			Todo.find(function(err, todos) {

				if (err)
					res.send(err);

				res.json(todos);

			});

		});

	});

	// all todo done 
	app.post('/api/todos/alldone', function(req, res) {

		// make all todo as done
		Todo.update({done : false }, {$set : { done : true }}, {multi : true }, function(err, todo) {

			if (err)
				res.send(err);

			// get and return all the todos after update
			Todo.find(function(err, todos) {

				if (err)
					res.send(err);

				res.json(todos);

			});

		});

	});

	// delete a todo
	app.del('/api/todos/:todo_id', function(req, res) {

		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {

			if (err)
				res.send(err);

			// get and return all the todos after delete
			Todo.find(function(err, todos) {

				if (err)
					res.send(err);

				res.json(todos);

			});

		});

	});

	// FRONTEND ROUTES =====================
	// route to handle all angular requests
	app.get('/angulartodo', function(req, res) {
		res.sendfile('./public/angulartodo.html');
	});

	// single page app
	app.get('*', function(req, res) {
		//res.sendfile('./public/single.html');

		res.send('Hello guys!');
	});

};