exports.createPostValidator =  (req, res, next) =>{
    //title should not be null, between 4-150 characters
    req.check('title', "Write a title").notEmpty();
    req.check('title', 'Title must be between 4 to 150 characters').isLength({
        min: 4,
        max: 150
    });

    //body should not be null, between 4-2000 characters
    req.check('body', "Write a body").notEmpty();
    req.check('body', 'Body must be between 4 to 2000 characters').isLength({
        min: 4,
        max: 2000
    });
    //check for errors
    const errors = req.validationErrors();
    if(errors) {
        const firstError = errors.map((error) => error.msg)[0]
        return res.status(400).json({error: firstError})
    }
    // proceed to next middleware
    next();
};