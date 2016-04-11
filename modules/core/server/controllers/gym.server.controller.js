'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  GymSchema = mongoose.model('GymSchema'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


/**
 * Create a gym location
 */
exports.create = function(req, res) {

  var gym = new GymSchema(req.body);

  gym.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(gym);
    }
  });
};