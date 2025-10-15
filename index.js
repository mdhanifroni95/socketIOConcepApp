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

io.on("connection", (socket) => {
  console.log(`a user connected`);
  socket.on("disconnect", () => {
    console.log(`user disconnected`);
  });
});

expressServer.listen(3000, () => {
  console.log("server run at 3000");
});
