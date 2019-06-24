const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Users collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/project3db"
);

const Users = [
  {
    name: "Kevin",
    email: "kevin@gmail.com",
    password: "kevinpw"
  }
];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(Users))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
