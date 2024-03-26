const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);

const songSchema = mongoose.Schema({
  song: { type: String },
  title: { type: String },
  artish: { type: String },
});

module.exports = mongoose.model("Song", songSchema);
