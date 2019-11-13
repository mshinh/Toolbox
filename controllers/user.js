const _ = require("lodash");
const User = require("../models/User");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found"
      });
    }
    req.profile = user; // adds profile object in req with user info
    next();
  });
};

exports.hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized to perform this action"
    });
  }
};

exports.allUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json({ users });
  }).select("fname lname email updated created");
};

exports.getUser = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

// exports.updateUser = (req, res, next) => {
//   let user = req.profile;
//   user = _.extend(user, req.body); // extend - mutate the source
//   user.updated = Date.now();
//   user.save(err => {
//     if (err) {
//       return res.status(400).json({
//         error: "You are not authorized to perform this action"
//       });
//     }
//     user.hashed_password = undefined;
//     user.salt = undefined;
//     res.json({ user });
//   });
// };

exports.updateUser = async (req, res) => {
  const { fname, lname, email, password } = req.body;

  // Build profile object
  const accountFields = {};

  if (fname) profileFields.dob = dob;
  if (lname) profileFields.gender = gender;
  if (email) profileFields.location = location;
  if (password) profileFields.phone = phone;

  accountFields.updated = Date.now();

  try {
    // Using upsert option (creates new doc if no match is found):
    let user = await User.findOneAndUpdate(
      { user: req.user.id },
      { $set: accountFields },
      { new: true, upsert: true }
    );
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.deleteUser = (req, res, next) => {
  let user = req.profile;
  user.remove((err, user) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    res.json({ message: "User deleted successfully" });
  });
};
