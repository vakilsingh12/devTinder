const mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gendar: {
    type: String,
  },
});
module.exports = mongoose.model("User", userSchema);
