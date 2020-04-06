const TIME_TO_WAIT_BEFORE_STORE_IN_DB = 15000;

const Mail = require("./models/Mail");

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

  let messagesToStoreInDb = [];

  let activeUsers = [];
  let users = {};

  io.on("connection", socket => {
    console.log("socket connection done successfully...", socket.id);

    // Listen to connected users for a new message.
    socket.on("newMail", data => {
      console.log("data is inside socketOps", data);
      messagesToStoreInDb.push(data);

      const newMessage = {};
      newMessage.content = data.formMessage.content;
      newMessage.author = data.fromUser;

      const mail = new Mail({
        fromUser: data.fromUser,
        toUser: data.toUser,
        title: data.formMessage.title,
        messages: newMessage
      });

      // Save the message to the database.
      mail.save(err => {
        if (err) return console.error(err);
      });

      // Notify all other users about a new message.
      socket.broadcast.emit("newMail", data);
    });

    // Listen to new messages inside conversation.
    socket.on("message", data => {
      console.log("data is inside socketOps", data);
      //messagesToStoreInDb.push(data);
      //console.log(data.conversationId);

      let req = { body: data };
      makeUpdateRoom(req);

      // Notify all other users about a new message.
      socket.broadcast.emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("socket disconnected...", socket.id);
      activeUsers = activeUsers.filter(activeUser => {
        return activeUser != users[socket.id]["userId"];
      });

      // send to all except the sender
      socket.broadcast.emit("onlineUser", activeUsers);
    });

    socket.on("onlineUser", data => {
      console.log("data is", data);
      if (data) {
        users[socket.id] = { userId: data };

        if (activeUsers.indexOf(data) == -1) {
          activeUsers.push(data);
        }
      }

      // send to all clients including sender most important don't forget
      io.emit("onlineUser", activeUsers);
    });
  });

  let makeUpdateRoom = async req => {
    const mailId = req.body.conversationId;
    console.log(mailId);

    const newMessage = {};
    newMessage.content = req.body.message;
    newMessage.author = req.body.author;

    try {
      const mail = await Mail.findOne({ _id: mailId });

      mail.messages.push(newMessage);

      await mail.save(err => {
        if (err) return console.error(err);
      });
    } catch (error) {
      console.log("Unable to update rooms with messages", error);
    }
  };
};

module.exports = {
  allSocketOps
};
