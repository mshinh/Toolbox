
const User = require("../models/User");
const Profile = require( '../models/Profile');
const _ = require('lodash');


exports.profileById = (req,res,next,id) => {
    Profile.findById(id).exec((err,profile)=>{

        if(err||!profile){
            return res.status(400).json({
                error:"Profile not found"
            });
        }
        req.userProfile = profile; // adds profile object in req with user info
       
        next();

    });
};


exports.getUserProfile = (req,res,next) => {

    Profile.findOne({ user: req.profile._id })
    .populate( 'user', [ 'fname','lname','email'] )    
    .exec((err,profile)=>{

        if(err||!profile){
            return res.status(400).json({
                error:"There is no profile for this user"
            });
        }
        
        res.json(profile);   
    });
};


exports.getallProfiles = (req, res) => {
    
    Profile.find()
    .populate( 'user', [ 'fname','lname','email'] )
    .exec((err,profiles) => {
        if(err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({profiles});
    })
    .catch( err => res.status( 404 ).json( { profiles: 'There are no profiles!' } ) 
    );
};



exports.createProfile = async (req,res)=>{

    const userExists = await Profile.findOne({user: req.profile._id});
    
    //if profile exist update profile
    if(userExists) return res.status(403).json({
        error: "Profile exist"        
    });

    //if no profile for user create new
    else {

        const userProfile = await new Profile(req.body);

        //attach user Id to user Profile
        userProfile.user = req.profile._id;

        await userProfile.save();

        res.status(200).json(userProfile);

    }

};


exports.updateProfile = (req,res) => {

    let userProfile = req.userProfile;   

    userProfile = _.extend(userProfile,req.body); // extend - mutate the source    
    userProfile.updated = Date.now();
    userProfile.new = true;
    
    userProfile.save((err) =>{
        if(err){
            return res.status(400).json({
                error: "You are not authorized to perform this action"
            });
        }
        
        res.status(200).json({userProfile});

    });

};


exports.deleteProfile = (req,res,next) => {

    let userProfile = req.userProfile;

    userProfile.remove((err,userProfile) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }

        
        res.json({message: "User Profile deleted successfully"});
    });

};




         

        
    




