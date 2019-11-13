const express = require("express");
const router = express.Router();

const User = require("../../models/User");
const { requireSignin } = require("../../controllers/auth");
const {
  profileById,
  getUserProfile,
  getallProfiles,
  getProfilebyUserId,
  createProfile,
  updateProfile,
  deleteProfile
} = require("../../controllers/profile");
const {
  userById,
  allUsers,
  getUser,
  updateUser,
  deleteUser
} = require("../../controllers/user");
const { validateProfileInput } = require("../../validation/profile");
const { auth } = require("../../middleware/auth");

// const mongoose = require('mongoose');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
// router.get("/me", requireSignin, getUserProfile);
router.get("/me", auth, getUserProfile);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get("/", getallProfiles);

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get("/user/:user_id", getProfilebyUserId);

// @route    POST api/profile/
// @desc     Create Profile
// @access   Public
// router.post("/", auth, validateProfileInput, createProfile);
router.post("/", auth, validateProfileInput, createProfile);

// @route    DELETE api/profile/
// @desc     Delete Profile, user & posts
// @access   Private
router.delete("/", auth, deleteProfile);

// // @route    POST api/profile/
// // @desc     Update Profile
// // @access   Public
// router.put("/profile/:userId", requireSignin, updateProfile);

// //follow users
// router.post("/:username/follow",allUsers);

// //unfollow user
// router.DELETE("/:username/follow",allUsers);

//any route containing :userId, our app will first execute userById()
router.param("userId", userById);

//any route containing :profileId, our app will first execute profileById()
router.param("profileId", profileById);

module.exports = router;
