// dependencies
// const dbOps = require("./dbOps");

const TIME_TO_WAIT_BEFORE_STORE_IN_DB = 15000;

const Message = require("./models/Message");

const allSocketOps = io => {
  //   io.on("connection", function(socket) {
  //     console.log("a user connected");
  //     socket.on("disconnect", function() {
  //       console.log("User Disconnected");
  //     });
  //     socket.on("example_message", function(msg) {
  //       console.log("message: " + msg);
  //     });
  //   });

  io.on("connection", socket => {
    // Get the last 10 messages from the database.
    Message.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .exec((err, messages) => {
        if (err) return console.error(err);

        // Send the last messages to the user.
        socket.emit("init", messages);
      });

    // Listen to connected users for a new message.
    socket.on("message", msg => {
      // Create a message with the content and the name of the user.
      const message = new Message({
        fromUser: msg.fromUser,
        toUser: msg.toUser,
        title: msg.formMessage.title,
        content: msg.formMessage.content
      });

      // Save the message to the database.
      message.save(err => {
        if (err) return console.error(err);
      });

      // Notify all other users about a new message.
      socket.broadcast.emit("push", msg);
    });
  });

  //   let messagesToStoreInDb = [];

  //   let activeUsers = [];
  //   let users = {};

  //   io.sockets.on("connection", socket => {
  //     console.log("socket connection done successfully...", socket.id);

  //     socket.on("message", data => {
  //       console.log("data is inside socketOps", data);
  //       messagesToStoreInDb.push(data);

  //       // after 15 sec store all the messages in the DB
  //       setTimeout(() => {
  //         if (messagesToStoreInDb.length > 0) {
  //           console.log("15 sec crossed, we have some messages.. STORE IN DB...");
  //           let req = { body: messagesToStoreInDb };

  //           dbOps.connectDbAndRunQueries("updateRoom", req);

  //           // reset the array
  //           messagesToStoreInDb = [];
  //         }
  //       }, TIME_TO_WAIT_BEFORE_STORE_IN_DB);
  //       socket.broadcast.emit("message", data);
  //     });

  //     socket.on("disconnect", () => {
  //       console.log("socket disconnected...", socket.id);
  //       activeUsers = activeUsers.filter(activeUser => {
  //         return activeUser != users[socket.id]["userId"];
  //       });

  //       // send to all except the sender
  //       socket.broadcast.emit("onlineUser", activeUsers);
  //     });

  //     socket.on("onlineUser", data => {
  //       console.log("data is", data);
  //       if (data) {
  //         users[socket.id] = { userId: data };

  //         if (activeUsers.indexOf(data) == -1) {
  //           activeUsers.push(data);
  //         }
  //       }

  //       // send to all clients including sender most important don't forget
  //       io.emit("onlineUser", activeUsers);
  //     });
  //   });
};
module.exports = {
  allSocketOps
};
