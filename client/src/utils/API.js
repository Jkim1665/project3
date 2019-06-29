import axios from "axios";

export default {
  // Gets all the users from db
  // FOR TESTING ONLY
  findAllUsers: function () {
    return axios.get("/api/users");
  },

  // Gets a single user from db
  getSingleUser: function(userData) {
    return axios.get("/api/users/existingUser/" + userData);
  },
  
  // Updates a single user from db
  updateSingleUser: function (userData) {
    return axios.put("/api/users/existingUser", userData);
  },
  
  // Creates a new user entry in the db
  createUser: function (userData) {
    return axios.post("/api/users/newUser", userData);
  },

  authenticateUser: function(userData) {
    return axios.post("/api/users/authUser", userData);
  }
};