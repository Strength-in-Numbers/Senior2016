'use strict';

var mongoose = require('mongoose'),
				Schema = mongoose.Schema;

var gymSchema = new Schema({
		username: {type: String},
		equipment: {type: String},
		description: {type: String},
		number: {type: String}
	});

mongoose.model('GymSchema', gymSchema);



// username: $scope.formData.username,
//             equipment: $scope.selection,
//             description: $scope.formData.description,
//             number: $scope.formData.number
