const express = require("express");
const { requireSignin } = require("../../controllers/auth");
const {
  userById,
  allUsers,
  getUser,
  updateUser,
  deleteUser
} = require("../../controllers/user");
const router = express.Router();
const { userSignupValidator } = require("../../validation/index");
const { signup, signin, signout } = require("../../controllers/auth");

// router.get("/users",allUsers);
// router.get("/user/:userId",requireSignin,getUser);
// router.put("/user/:userId",requireSignin,updateUser);
// router.delete("/user/:userId",requireSignin,deleteUser);

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post("/", userSignupValidator, signup);

// router.post("/", (req, res) => {
//   console.log(req.body);
//   res.send("User route");
// });

//any route containing :userId, our app will first execute userById()
router.param("userId", userById);

module.exports = router;
