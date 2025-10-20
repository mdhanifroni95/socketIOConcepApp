const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

//create server
const expressServer = http.createServer(app);
const io = new Server(expressServer);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// io.on("connection", (socket) => {
//   console.log(`a user connected`);
//data transfer after 10 second
/**
   setTimeout(() => {
    socket.send("Learn with Rabbil Hasan (Server-->Client)");
  }, 10000);
  */

//data transfer continuously
/**
   setInterval(() => {
    const d = new Date();
    const t = d.getTime();
    socket.send(t);
  }, 100);
  */

/**
 *  setInterval(() => {
    const d = new Date();
    const t = d.getTime();
    socket.emit("myEvent", t);
  }, 100);
*/
//client to server data receive
//   socket.on("myEventClientToServer", (msg) => {
//     console.log(msg);
//   });
// });

//broadcast server to all
io.on("connection", (socket) => {
  //broadcasting data
  io.sockets.emit("myBroadcast", "Hello Everyone");
});

//broadcast server to namespace wise
let buyNsp = io.of("/buy");
buyNsp.on("connection", (socket) => {
  buyNsp.emit("myEvent", "hello buy");
});

let sellNsp = io.of("/sell");
sellNsp.on("connection", (socket) => {
  sellNsp.emit("myEvent", "hello sell");
});

expressServer.listen(3000, () => {
  console.log("server run at 3000");
});
