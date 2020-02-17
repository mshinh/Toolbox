const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema

const UserSchema = new mongoose.Schema({
  fname: {
    type: String,
    trim: true,
    required: true
  },
  lname: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userphoto: {
    data: Buffer,
    contentType: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date,
  contact: [
   { type: Schema.Types.ObjectId,
    ref: "User"
  }
  ]
});

module.exports = mongoose.model("User", UserSchema);
