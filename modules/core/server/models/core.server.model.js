'use strict';

var mongoose = require('mongoose'),
				Schema = mongoose.Schema;

var gymSchema = new Schema({
		username: {type: String, required: true},
	    equipment: {type: [String]},
	    location: {type: String, required: true},
	    description: {type : String, required: true},
	    images: {type: String, required: true}
	    
	});

mongoose.model('GymSchema', gymSchema);
