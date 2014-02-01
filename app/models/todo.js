'use strict';

// include mongoose for model 
var mongoose = require('mongoose');

module.exports = mongoose.model('todo', {
	text : String,
	done : Boolean
});