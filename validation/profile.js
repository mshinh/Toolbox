
exports.validateProfileInput = (req,res,next) => {

    
    // handle is not null and between 2-40 characters

    // req.check("handle","Profile handle is required").notEmpty();
    // req.check("handle")
    // .isLength({min: 3, max: 40})
    // .withMessage("Handle needs to be between 2 and 40 characters");
    
    
    // if( !isEmpty( data.website ) ){
    //     if( !Validator.isURL( data.website ) ){
    //         errors.website = 'Not a valid URL!';
    //     }
    // }
    
    //check for errors
    const errors = req.validationErrors();

    if(errors){
        const firstError = errors.map(error=>error.msg)[0];
        return res.status(400).json({error:firstError});
    }

    //proceed to next middleware

    next();
        
}

