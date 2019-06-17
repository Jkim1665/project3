import axios from "axios";

export default {
  // Gets all the users from db (for testing)
  findUsers: function() {
    return axios.get("/api/user");
  },

  // Gets a single user from db
  findUser: function(userData) {
    return axios.post("/api/user/findUser", userData);
  },
  // Creates a user entry in the db
  createUser: function(userData) {
    return axios.post("/api/user/createUser", userData);
  }
};
