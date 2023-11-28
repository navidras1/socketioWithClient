//const express = require('express');
import express from "express";
const app = express();
// const http = require('http');
import http from "http";
const server = http.createServer(app);
//const { Server } = require("socket.io");
import { Server } from "socket.io";
const io = new Server(server,{
  cors: {
    origin: true,
    credentials: true,
  },
  allowEIO3: true,
});

import { fileURLToPath } from "url";
import { dirname } from "path";
import navid from './sum.js'
import {Person,MyClass} from './person.js'

var aa = new Person("navid", "rasouli");
aa.display();

var bb = new MyClass("10000000");
console.log(`bb.x is  ${bb.x}`);

console.log(navid(1,3));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var a = 10;
console.log(a);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {

  var mm =  socket.handshake.headers["sec-websocket-version"];


  socket.join("some room");
  io.to("some room").emit("theRoom","some event");
  console.log(`a user connected ${new Date(Date.now()).toLocaleString()}`);
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.broadcast.emit('hi');
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
