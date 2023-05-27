
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
     cors:{
          origin:"*",
          
     }
});
io.on("connection",(socket)=>{
     console.log("connected")
})
app.get('/', (req, res) => {
  res.send("Hello world");
});

io.on('connection', (socket) => {

  socket.on("join_room",(data)=>{
    socket.join(data)
    console.log(`User with ID ${socket.id} joined room: ${data}`)
  })
  socket.on("send_message",(data)=>{
    console.log(data)
    socket.to(data.room).emit('recieve_message',(data))
  })
  socket.on("disconnect",()=>{
     console.log(socket.id+" disconnected")
  })
});

server.listen(80, () => {
  console.log('listening on *:3000');
});