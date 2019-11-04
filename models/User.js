const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');



//Create Schema

const UserSchema = new mongoose.Schema({
    fname: {
        type:String,
        trim:true,
        required: true,
    },
    lname: {
        type:String,
        trim:true,
        required: true,
    },
    email: {
        type:String,
        trim:true,
        required: true,
    },
    username:{
        type:String,
        required: true,
    },
    hashed_password: {
        type:String,        
        required: true,        
    },
    salt:String,
    created:{
        type:Date,
        default:Date.now
    },
    updated:Date
});

//virtual field

UserSchema
    .virtual('password')
    .set(function(password){

        //create temp. variable called _password
        this._password=password;

        //generate a timestamp
        this.salt =  uuidv1();

        //encrypt the password
        this.hashed_password = this.encryptPassword(password);

    })
    .get(function(){
        return this._password;
    });

//methods

UserSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password
    },

    encryptPassword: function(password){
        if(!password) return "";
        try {
            return crypto
                .createHmac('sha1',this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return "";
        }
    },
    toProfile: function(){
        return {
          username: getUserFromEmail(this.email),
         // image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
         // following:  false  // we'll implement following functionality in a few chapters :)
        };
    },
    getUserFromEmail: function(email){

        var userEmail = email.split('@');        
       
        return userEmail[0];
    }
};


module.exports =  mongoose.model('User',UserSchema);