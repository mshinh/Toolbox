const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const path = require("path");
var cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

// var server = app.listen(3000);

// const http = require("http").Server(app);
// const io = require("socket.io").listen(server);

//DB config

//Connect to Mongo
mongoose.Promise = global.Promise;
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
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(cookieParser());
// app.use(expressValidator());

app.use("/public", express.static("public"));
// app.use(express.static("public"));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postRoutes);

// socket related events
// const socketOps = require("./socketOps");
// socketOps.allSocketOps(io);

// app.use(function(err, req, res, next) {
//   if (err.name === "UnauthorizedError") {
//     res.status(401).json({ error: "Unauthorized!" });
//   }
// });

// io.on("connection", function(socket) {
//   console.log("a user connected");
//   socket.on("disconnect", function() {
//     console.log("User Disconnected");
//   });
//   socket.on("example_message", function(msg) {
//     console.log("message: " + msg);
//   });
// });

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server started on port ${port}`));
