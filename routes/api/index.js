const router = require("express").Router();
const userRoutes = require("./users");

// Users routes
router.use("/users", userRoutes);

// router.route("/test").get(function (req, res) {
//   console.log("test route");
// }
// );


module.exports = router;
