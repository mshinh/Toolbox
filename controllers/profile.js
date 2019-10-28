
const User = require("../models/User");
const Profile = require( '../../models/Profile' );



exports.getUserProfile = (req,res,next) => {

    Profile.findOne({ user: req.user._id })
    .populate( 'user', [ 'fname','lname','email' , 'password'] )
    .select('_id fname lname')
    .exec((err,profile)=>{

        if(err||!profile){
            return res.status(400).json({
                error:"There is no profile for this user"
            });
        }
        
        res.json(profile);        
        
        next();

    });
};





