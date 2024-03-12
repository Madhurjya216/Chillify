const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect(
  process.env.MONGODB_URI 
);

const userSchema = mongoose.Schema({
  fullname: { type: String },
  username: { type: String },
  email: { type: String },
  password: { type: String },
});

userSchema.plugin(plm);

module.exports = mongoose.model("User", userSchema);
