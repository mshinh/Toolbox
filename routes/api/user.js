const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");

const User = require("../../models/User");

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  "/",
  [
    check("fname", "First name is required")
      .not()
      .isEmpty(),
    check("lname", "Last name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fname, lname, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: [{ msg: "Email is taken!" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      user = new User({
        fname,
        lname,
        email,
        avatar,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    GET api/users/me
// @desc     Get current users account information
// @access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.user.id
    });

    if (!user) {
      return res.status(400).json({ msg: "There is no user" });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/users/update
// @desc     Update user info
// @access   Public
router.post(
  "/update",
  [
    auth,
    check("fname", "First name is required")
      .not()
      .isEmpty(),
    check("lname", "Last name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fname, lname, email, password, passwordold } = req.body;

    if (!passwordold && password) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Please include your current password" }] });
    }

    // Build account object
    const accountFields = {};

    if (fname) accountFields.fname = fname;
    if (lname) accountFields.lname = lname;
    if (email) accountFields.email = email;
    if (password) accountFields.password = password;
    accountFields.updated = Date.now();

    try {
      let user = await User.findOne({ _id: req.user.id });
      let userEmail;

      if (user) {
        if (user.email != email) {
          userEmail = await User.findOne({ email });
        }
        if (userEmail) {
          return res.status(400).json({ errors: [{ msg: "Email is taken!" }] });
        }

        const isMatch = await bcrypt.compare(passwordold, user.password);

        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Current Password" }] });
        }

        if (passwordold && !password) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Please include your new password" }] });
        }

        if (passwordold === password) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Please use different new password" }] });
        }
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      accountFields.avatar = avatar;

      const salt = await bcrypt.genSalt(10);
      accountFields.password = await bcrypt.hash(password, salt);

      user = await User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: accountFields },
        { new: true, upsert: true }
      );

      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
