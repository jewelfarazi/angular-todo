'use strict';

// todo services
angular.module('todoService', [])
 	// super simple service
	// each function returns a promise object
	.factory('Todos', function($http) {
		return {
			get: function() {
				return $http.get('/api/todos');
			},
			create: function(todoData) {
				return $http.post('/api/todos', todoData);
			},
			delete: function(id) {
				return $http.delete('/api/todos/' + id);
			},
			done: function(id) {
				return $http.post('/api/todos/done/' + id);
			},
			undone: function(id) {
				return $http.post('/api/todos/undone/' + id);
			},
			alldone: function() {
				return $http.post('/api/todos/alldone');
			},
		}
	});