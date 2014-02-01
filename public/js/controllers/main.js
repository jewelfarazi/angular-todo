// todo main controller
angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', function($scope, $http, Todos) {

		$scope.formData = {};

		$scope.homeTag = 'Angular Todo App';

		// get all todos from db
		Todos.get()
			.success(function(data){
				$scope.todos = data;
				console.log(data);
			});

		// create new todo
		$scope.createTodo = function() {

			if (! $.isEmptyObject($scope.formData)) {
				Todos.create($scope.formData)
					.success(function(data) {
						$scope.formData = {};
						$scope.todos = data;
					});
			}
			
		};

		// done a todo
		$scope.doneTodo = function(id) {
			Todos.done(id)
				.success(function(data) {
					$scope.todos = data;
				});
		};

		// undone a todo
		$scope.undoneTodo = function(id) {
			Todos.undone(id)
				.success(function(data) {
					$scope.todos = data;
				});
		};

		// todo alldone
		$scope.alldone = function() {
			Todos.alldone()
				.success(function(data) {
					$scope.todos = data;
				});
		}

		// delete a todo
		$scope.deleteTodo = function(id) {
			Todos.delete(id)
				.success(function(data) {
					$scope.todos = data;
				});
		}
	});