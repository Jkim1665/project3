import axios from "axios";

export default {
  // Gets all userData from db
  getUser: function(userData) {
    return axios.post("/api/user/findUser", userData);
  },
  // Saves a book to the database
  createUser: function(userData) {
    return axios.post("/api/user/createUser", userData);
  }
};
