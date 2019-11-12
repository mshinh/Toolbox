const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
var cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

//DB config

// const db = require('./config/keys').mongoURI;

//Connect to Mongo

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

//bring in routes
const authRoutes = require("./routes/api/auth");
const postRoutes = require("./routes/api/post");
const userRoutes = require("./routes/api/user");
const profileRoutes = require("./routes/api/profile");

//middleware

app.use(express.json({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());

// app.use("/", authRoutes);
// app.use("/", postRoutes);
// app.use("/", userRoutes);
// app.use("/", profileRoutes);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postRoutes);

app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthorized!" });
  }
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server started on port ${port}`));
