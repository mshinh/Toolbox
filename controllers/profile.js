const User = require("../models/User");
const Profile = require("../models/Profile");
const Post = require("../models/post");
const _ = require("lodash");
const request = require("request");

exports.profileById = (req, res, next, id) => {
  Profile.findById(id).exec((err, profile) => {
    if (err || !profile) {
      return res.status(400).json({
        error: "Profile not found"
      });
    }
    req.userProfile = profile; // adds profile object in req with user info

    next();
  });
};

exports.getUserProfile = async (req, res) => {
  // Profile.findOne({ user: req.profile._id })
  // .populate( 'user', [ 'fname','lname','email'] )
  // .exec((err,profile)=>{

  //     if(err||!profile){
  //         return res.status(400).json({
  //             error:"There is no profile for this user"
  //         });
  //     }

  //     res.json(profile);
  // });

  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["fname", "lname", "email", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getallProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", [
      "fname",
      "lname",
      "email",
      "avatar"
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getProfilebyUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["fname", "lname", "email", "avatar"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
};

exports.createProfile = async (req, res) => {
  // const userExists = await Profile.findOne({user: req.profile._id});

  // //if profile exist update profile
  // if(userExists) return res.status(403).json({
  //     error: "Profile exist"
  // });

  // //if no profile for user create new
  // else {

  //     const userProfile = await new Profile(req.body);

  //     //attach user Id to user Profile
  //     userProfile.user = req.profile._id;

  //     await userProfile.save();

  //     res.status(200).json(userProfile);

  // }

  const { dob, gender, location, phone, occupation, website, bio } = req.body;

  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;

  if (dob) profileFields.dob = dob;
  if (gender) profileFields.gender = gender;
  if (location) profileFields.location = location;
  if (phone) profileFields.phone = phone;
  if (occupation) profileFields.occupation = occupation;
  if (website) profileFields.website = website;
  if (bio) profileFields.bio = bio;
  profileFields.updated = Date.now();

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
};

exports.deleteProfile = async (req, res) => {
  try {
    // // Remove user posts
    // await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// exports.updateProfile = async (req, res) => {
//   const profile = await Profile.findOne({ user: req.profile._id });

//   //if profile exist update profile
//   if (profile) {
//     const profileFields = {};

//     if (req.body.dob) profileFields.dob = req.body.dob;
//     if (req.body.gender) profileFields.gender = req.body.gender;
//     if (req.body.location) profileFields.location = req.body.location;
//     if (req.body.phone) profileFields.phone = req.body.phone;
//     if (req.body.occupation) profileFields.occupation = req.body.occupation;
//     if (req.body.website) profileFields.website = req.body.website;
//     if (req.body.bio) profileFields.bio = req.body.bio;
//     profileFields.updated = Date.now();

//     Profile.findOneAndUpdate(
//       { user: req.profile._id },
//       { $set: profileFields },
//       { new: true }
//     ).then(profile => res.status(200).json(profile));
//   }

//   //if no profile for user create new
//   else {
//     const userProfile = await new Profile(req.body);

//     //attach user Id to user Profile
//     userProfile.user = req.profile._id;

//     await userProfile.save();

//     res.status(200).json(userProfile);
//   }
// };

// exports.updateProfile = (req,res) => {

//     let userProfile = req.userProfile;

//     userProfile = _.extend(userProfile,req.body); // extend - mutate the source
//     userProfile.updated = Date.now();
//     userProfile.new = true;

//     userProfile.save((err) =>{
//         if(err){
//             return res.status(400).json({
//                 error: "You are not authorized to perform this action"
//             });
//         }

//         res.status(200).json({userProfile});

//     });

// };

// exports.deleteProfile = (req, res, next) => {
//   let userProfile = req.userProfile;

//   userProfile.remove((err, userProfile) => {
//     if (err) {
//       return res.status(400).json({
//         error: err
//       });
//     }

//     res.json({ message: "User Profile deleted successfully" });
//   });
// };
