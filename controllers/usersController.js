const db = require("../models");

// Defining methods for the UsersController
module.exports = {
  findAllUsers: function (req, res) {
    db.User
      .find({})
      .sort({ name: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findByEmail: function (req, res) {
    db.User
      .findOne(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  updateUser: function (req, res) {
    db.User
      .findOneAndUpdate({ email: req.body.email }, {coins: req.body.coins, level: req.body.level}, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  createUser: function (req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  authenticateUser: function (req, res) {
    db.User
      .findOne({email: req.body.email})
      .then(function(dbModel) {
        dbModel.verifyPassword(req.body.password)
          .then(function(valid) {
            res.json({
              isValid: valid,
              dbModel: dbModel
            });
          })
      })
      .catch(err => res.status(422).json(err));
  }
};
