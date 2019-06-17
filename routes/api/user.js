const router = require("express").Router();
const db = require("../../models");

// Matches with "/api/user/createUser"
// router.route("/createUser")
//   .post(db.User.create({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password
//   })
//     .then(function (data) {
//       res.json(data);
//     })
//     .catch(function (err) {
//       console.log(err);
//     })
//   );

router.post("/createUser", function (req, res) {
  console.log(req.body);
  db.User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      console.log(err);
    });
});


// Matches with "/api/user/findUser"
// router.route("/findUser")
//   .post(
//     db.User.findOne({
//       where: {
//         email: req.body.email
//       }
//     })
//       .then(function (data) {
//         res.json(data);
//       })
//   );
// router
//   .post("/findUser", function (req, res) {
//     db.User.findOne({
//       where: {
//         email: req.body.email
//       }
//     })
//       .then(function (data) {
//         res.json(data);
//       })
//   });

router.get("/", function (req, res) {
  db.User.findAll({}).then(function (users) {
    alert(users);
    console.log(users);
    res.json(users);
  }).catch(function (err) {
    console.log(err);
  })
});

module.exports = router;

