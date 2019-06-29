const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
// FOR TESTING ONLY
router.route("/")
  .get(usersController.findAllUsers)

// Matches with "/api/users/existingUser"
router
  .route("/existingUser")
  .put(usersController.updateUser)

router
  .route("/existingUser/:email")
  .get(usersController.findByEmail)

// Matches with "/api/users/newUser"
router
  .route("/newUser")
  .post(usersController.createUser)

router
  .route("/authUser")
  .post(usersController.authenticateUser)

module.exports = router;
