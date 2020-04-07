const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mailSchema = new mongoose.Schema(
  {
    fromUser: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    toUser: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    title: {
      type: String,
      required: true
    },
    messages: [
      {
        author: {
          type: Schema.Types.ObjectId,
          ref: "User"
        },
        content: {
          type: String,
          required: true
        },
        time: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Mail", mailSchema);
