const router = require("express").Router();
const db = require("../../models");

// Matches with "/api/user/createUser"
router.route("/createUser")
  .post(db.User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
    .then(function (data) {
      res.json(data);
    })
    .catch(function(err) {
      console.log(err);
    })
  );

// Matches with "/api/user/findUser"
router.route("/findUser")
  .post(
    db.User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(function (data) {
        res.json(data);
      })
  );

module.exports = router;
