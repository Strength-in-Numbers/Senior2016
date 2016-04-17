'use strict';

var mongoose = require('mongoose'),
				Schema = mongoose.Schema;

var gymSchema = new Schema({
		username: {type: String}
	});

mongoose.model('GymSchema', gymSchema);


