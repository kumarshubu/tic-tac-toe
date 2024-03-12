const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {cors: {origin: "*"}});
const cors = require('cors');
app.use(cors())
const path = require("path");
require('dotenv').config();

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

const PORT = process.env.PORT || 8000;
const router = require("./router");

io.on("connection", (socket) => {
  socket.on("join", ({ name, room, email, password }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, email, room, password });
    if (error) return callback(error);
    console.log(user)
    socket.join(user.room);

    socket.emit("message", {
      user: "admin",
      text: `${name}, welcome to the room ${room}`,
      type: "message",
      time: new Date(),
    });
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name}, has joined!`,
      type: "message",
      time: new Date(),
    });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    callback();
  });

  socket.on("challengePlayer",(opponent)=>{
    const user = getUser(socket.id);
    io.to(opponent.id).emit("gotChallenged", {
      userId: user.id,
      text: `${user.name} has challenged you!`,
      type: "challenge",
      time: new Date(),
    });
  })

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    if (!user) return;

    io.to(user.room).emit("message", {
      user: user.name,
      text: message,
      type: "message",
      time: new Date(),
    });
    // io.to(user.room).emit("roomData", {
    //   room: user.room,
    //   users: getUsersInRoom(user.room),
    // });

    callback(); //setMessage("")
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name}, has left the chat!`,
        type: "message",
        time: new Date(),
      });

      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });

  socket.on("upload-image", function (message) {
    io.to(message.room).emit("message", {
      user: message.user,
      text: message.data,
      type: message.type,
      name: message.name,
      time: new Date(),
    });
  });


  let files = {},
    struct = {
      name: null,
      type: null,
      data: [],
      size: 0,
      slice: 0,
    };

  socket.on("newFile", (data) => {
    if (!files[data.name]) {
      files[data.name] = Object.assign({}, struct, data);
      files[data.name].data = [];
    }

    let x = Buffer.from(new Uint8Array(data.data));
    files[data.name].slice++;
    files[data.name].data.push(x);
    
    if (files[data.name].slice * 64000 < data.size) {
      socket.emit("sendAll", {
        slice: files[data.name].slice,
      });
    } else {
      var fileBuffer = Buffer.concat(files[data.name].data);

      io.to(data.room).emit("message", {
        user: data.user,
        text: fileBuffer,
        type: data.type,
        name: data.name,
        time: new Date(),
        fileType: data.type,
      });

      delete files[data.name];

      socket.emit("end upload");
    }
  });
});

if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    //first require path then...
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.use(router);

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
