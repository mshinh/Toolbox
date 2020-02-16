const express = require("express");
const request = require("request");
require("dotenv").config();
const router = express.Router();

const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/",
  filename: function(req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 }
// }).single("myImage");

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  }
});

// router.post(
//   "/profilePhoto",
//   auth,
//   upload.single("photo"),
//   async (req, res, next) => {
//     const url = req.protocol + "://" + req.get("host");
//     console.log("Request file ---", req.file);

//     try {
//       // Using upsert option (creates new doc if no match is found):
//       let profile = await Profile.findOneAndUpdate(
//         { user: req.user.id },
//         { photo: url + "/public/" + req.file.filename },
//         { new: true, upsert: true }
//       );
//       res.json(profile);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server Error");
//     }
//   }
// );

//upload profile image for user
router.post(
  "/profilePhoto",
  auth,
  upload.single("photo"),
  async (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    console.log("Request file ---", req.file);

    try {
      // Using upsert option (creates new doc if no match is found):
      let user = await User.findOneAndUpdate(
        { _id: req.user.id },
        { userphoto: url + "/public/" + req.file.filename },
        { new: true, upsert: true }
      );
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["fname", "lname", "email", "userphoto"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  "/",
  [
    auth
    // [
    //   check("status", "Status is required")
    //     .not()
    //     .isEmpty(),
    //   check("skills", "Skills is required")
    //     .not()
    //     .isEmpty()
    // ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      dob,
      location,
      phone,
      occupation,
      website,
      bio,
      facebook,
      instagram
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;

    if (dob) profileFields.dob = dob;
    if (location) profileFields.location = location;
    if (phone) profileFields.phone = phone;
    if (occupation) profileFields.occupation = occupation;
    if (website) profileFields.website = website;
    if (bio) profileFields.bio = bio;
    profileFields.updated = Date.now();
    // Build social object
    profileFields.social = {};
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", [
      "fname",
      "lname",
      "email",
      "userphoto"
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["fname", "lname", "email", "userphoto"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete("/", auth, async (req, res) => {
  try {
    // Remove user posts
    await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/profile/portfolio
// @desc     Add profile portfolio
// @access   Private
router.put(
  "/portfolio",
  [
    auth,
    [
      // check("title", "Title is required")
      //   .not()
      //   .isEmpty()
    ]
  ],
  upload.array("imgCollection", 6),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const url = req.protocol + "://" + req.get("host");

    const { title, description } = req.body;

    const newPortfolio = {};
    if (title) newPortfolio.title = title;
    if (description) newPortfolio.description = description;
    if (req.files.length != 0) {
      newPortfolio.imgCollection = [];
      for (var i = 0; i < req.files.length; i++) {
        newPortfolio.imgCollection.push(
          url + "/public/" + req.files[i].filename
        );
      }
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.portfolio.unshift(newPortfolio);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    PUT api/profile/portfolio
// @desc     delete photo from portfolio
// @access   Private

//To Do later

// @route    DELETE api/profile/portfolio/:portf_id
// @desc     Delete portfolio from profile
// @access   Private
router.delete("/portfolio/:portf_id", auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    const portfolioIds = foundProfile.portfolio.map(por => por._id.toString());
    // if i dont add .toString() it returns this weird mongoose coreArray and the ids are somehow objects and it still deletes anyway even if you put /portfolio/5
    const removeIndex = portfolioIds.indexOf(req.params.por_id);
    if (removeIndex === -1) {
      return res.status(500).json({ msg: "Server error" });
    } else {
      // theses console logs helped me figure it out
      console.log("portfolioIds", portfolioIds);
      console.log("typeof porIds", typeof portfolioIds);
      console.log("req.params", req.params);
      console.log("removed", portfolioIds.indexOf(req.params.por_id));
      foundProfile.portfolio.splice(removeIndex, 1);
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

// @route    POST api/profile/contacts
// @desc     Add friend
// @access   Public

router.post("/addContact",
  [
    auth
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { contact } = req.body;
    console.log(req.body)
    try {
      let user = await User.findOne({ _id: req.user.id });
      if (user) {
        user.contact.push(contact);
        user.save();
        res.status(200).json({ success: 'Done' })
      } else {
        return res.status(401).json({ errors: "User not foubd" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);


// @route    POST api/profile/contacts
// @desc     Get all friends
// @access   Public

router.get("/contacts",
  [
    auth
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ _id: req.user.id });
      if(user) {
        const profiles = await Profile.find({'_id' : { $in: user.contact}}).populate("user", [
          "fname",
          "lname",
          "email",
          "userphoto"
        ]);
        res.json(profiles);
      }
     
  } catch (err) {
    res.status(500).send("Server Error");
  }
  }
);

module.exports = router;
