const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  coins: { type: Number, required: false, default: 0 },
  level: { type: Number, required: false, default: 0 }
},
  { collection: 'users' }
  );

const User = mongoose.model("User", userSchema);

module.exports = User;