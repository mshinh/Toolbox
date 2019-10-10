const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');




const app = express();


//DB config

const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose
    .connect(db)
    .then(()=>console.log('Mongo DB connected..'))
    .catch(err=>console.log(err));

    


//bring in routes
const authRoutes = require('./routes/api/auth');
const postRoutes = require('./routes/api/post');
//middleware

app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

app.use('/',authRoutes);

app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Unauthorized!' });
    }
});

app.use('/', postRoutes);




const port = process.env.PORT || 8000;

app.listen(port,()=> console.log(`Server started on port ${port}`));