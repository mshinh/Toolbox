const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  dob: {
    type: Date
  },
  gender: {
    type: String
  },
  location: {
    type: String
  },
  phone: {
    type: String
  },
  occupation: {
    type: String
  },
  website: {
    type: String
  },
  bio: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  updated: Date
});

module.exports = mongoose.model("Profile", ProfileSchema);
