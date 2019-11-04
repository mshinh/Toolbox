const express = require('express');
const router = express.Router();

const User = require("../../models/User");
const { requireSignin } = require("../../controllers/auth");
const { profileById,getUserProfile,getallProfiles,createProfile,updateProfile,deleteProfile } = require("../../controllers/profile");
const { userById, allUsers,getUser,updateUser,deleteUser } = require("../../controllers/user");
const {validateProfileInput} = require("../../validation/profile");

// const mongoose = require('mongoose');




// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/profile/:userId', requireSignin, getUserProfile);
 
  

// @route    GET api/profile/all
// @desc     Get all profiles
// @access   Public
router.get("/profile/all",requireSignin, getallProfiles);


// @route    POST api/profile/
// @desc     Create Profile
// @access   Public
router.post("/profile/:userId",requireSignin,validateProfileInput,createProfile);


// @route    POST api/profile/
// @desc     Update Profile
// @access   Public
router.put("/profile/:profileId",requireSignin,updateProfile);

// @route    DELETE api/profile/
// @desc     Delete Profile
// @access   Public
router.delete("/profile/:profileId",requireSignin,deleteProfile);


// //get profile of the user
// router.get("/:username",userProfile);


// //follow users
// router.post("/:username/follow",allUsers);

// //unfollow user
// router.DELETE("/:username/follow",allUsers);


//any route containing :userId, our app will first execute userById()
router.param("userId",userById);

//any route containing :profileId, our app will first execute profileById()
router.param("profileId",profileById);

module.exports = router;


