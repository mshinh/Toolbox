const jwt = require('jsonwebtoken');
require('dotenv').config();
const expressJwt = require('express-jwt');
const User = require("../models/User");



exports.signup = async (req,res) => {

    const userExists = await User.findOne({email: req.body.email});

    if(userExists) return res.status(403).json({
        error: "Email is taken!"        
    });

    const user = await new User(req.body);

    await user.save();

    // //generate a token with user id and secret
    // const token = jwt.sign({_id: user._id},process.env.JWT_SECRET);

    // //persist the token as 't' in cookie with expiry date
    // res.cookie("t",token,{expire: new Date() + 9999});

    // //return response with user and token to fronted client
    // const {_id,fname,lname,email} = user;

    // //signup success return webtoken, user is logged in

    // return res.json({token,user:{_id,email,fname,lname}});

    res.status(200).json({ message: 'Signup success! Please login.' });
    
    
};

exports.signin = (req,res) => {

    //find the user based on email
    const {email,password} = req.body;
    User.findOne({email},(err,user)=>{
        //if err or no user
        if(err||!user)
        {
            return res.status(401).json({
                error: "User with that email does not exist.Please signin."
            });
        }

        //if user is found make sure the email and password match
        //create authenticate method in model and use here
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and password do not match"
            });
        }

        //generate a token with user id and secret
        const token = jwt.sign({_id: user._id},process.env.JWT_SECRET);

        //persist the token as 't' in cookie with expiry date
        res.cookie("t",token,{expire: new Date() + 9999});

        //return response with user and token to fronted client
        const {_id,fname,lname,email} = user;
        return res.json({token,user:{_id,email,fname,lname}});

    });   

};

exports.signout = (req,res) => {

    res.clearCookie("t")
    return res.json({message:"Signout success!"})

};

exports.requireSignin = expressJwt({
    //if the token is valid, express jwt appends the verified user id
    //in an auth key to the request object
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});