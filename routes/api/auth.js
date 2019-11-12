const express = require("express");
const { signup, signin, signout } = require("../../controllers/auth");
const { userById } = require("../../controllers/user");
const { userSignupValidator } = require("../../validation/index");
const { auth } = require("../../middleware/auth");

const router = express.Router();
const User = require("../../models/User");

// router.post("/signup",userSignupValidator, signup);
// router.post("/signin",signin);
// router.get("/signout",signout);

// @route    GET api/auth
// @desc     Test route
// @access   Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// router.get("/", auth, async (req, res) => res.send("Auth Route"));

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post("/", signin);

//any route containing :userId, our app will first execute userById()
router.param("userId", userById);

module.exports = router;
