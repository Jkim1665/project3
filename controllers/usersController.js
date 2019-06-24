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
      .findOneAndUpdate({ email: req.body.email }, req.body, {new: true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  createUser: function (req, res) {
    console.log("usersController.js: req.body:");
    console.log(req.body);
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
