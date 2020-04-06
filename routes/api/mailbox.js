const express = require("express");
const request = require("request");
require("dotenv").config();
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const Mail = require("../../models/Mail");
const User = require("../../models/User");
const Post = require("../../models/post");
const multer = require("multer");
const path = require("path");

// @route    GET api/mailbox/inbox
// @desc     Get all received mails
// @access   Private
router.get("/inbox", auth, async (req, res) => {
  try {
    //console.log(req.user.id);
    const mails = await Mail.find({
      toUser: req.user.id
    })
      .populate("fromUser", ["fname", "lname", "userphoto"])
      .sort({ date: -1 });

    if (!mails) {
      return res.status(400).json({ msg: "There is no mails for this user" });
    }
    //console.log(mails);
    res.json(mails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/mailbox/inbox
// @desc     Get all sent mails
// @access   Private
router.get("/sent", auth, async (req, res) => {
  try {
    //console.log(req.user.id);
    const mails = await Mail.find({
      fromUser: req.user.id
    })
      .populate("toUser", ["fname", "lname", "userphoto"])
      .sort({ date: -1 });

    if (!mails) {
      return res
        .status(400)
        .json({ msg: "There is no mails sent from this user" });
    }
    //console.log(mails);
    res.json(mails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete("/inbox/:mailId", auth, async (req, res) => {
  try {
    console.log(req.params.mailId);
    // Remove mail
    await Mail.findOneAndRemove({ _id: req.params.mailId });

    const mails = await Mail.find({
      fromUser: req.user.id
    })
      .populate("toUser", ["fname", "lname", "userphoto"])
      .sort({ date: -1 });

    if (!mails) {
      return res
        .status(400)
        .json({ msg: "There is no mails sent from this user" });
    }
    //console.log(mails);
    res.json(mails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/mailbox/inbox/conversationId
// @desc     Get all messages inside a conversation
// @access   Private
router.get("/inbox/:conversationId", auth, async (req, res) => {
  try {
    const messages = await Mail.findOne({
      _id: req.params.conversationId
    }).select("messages");

    if (!messages) {
      return res
        .status(400)
        .json({ msg: "There is no mails sent from this user" });
    }
    //console.log(messages);
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
