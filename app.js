const { createServer } = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");



const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true
  }
});

instrument(io, {
  auth: false,
  mode: "development",
});
io.on("connection", (socket) => {


    socket.join("some room");
    io.to("some room").emit("theRoom","some event");
    console.log("a user connected");
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    });
    socket.broadcast.emit('hi');
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
  
httpServer.listen(3000);