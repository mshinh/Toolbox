const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  photo: {
    data: Buffer,
    contentType: String
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
  social: {
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  },
  updated: Date,
  portfolio: [
    {
      title: {
        type: String,
        required: true
      },
      imgCollection: [{ type: String }],
      description: {
        type: String
      }
    }
  ],
  notification: [  {
      type: Schema.Types.ObjectId,
      ref: "Post"
  }
  ],
  jobNotification: [ {
    type: Schema.Types.ObjectId,
    ref: "Post"
  }
]
});

module.exports = mongoose.model("Profile", ProfileSchema);
