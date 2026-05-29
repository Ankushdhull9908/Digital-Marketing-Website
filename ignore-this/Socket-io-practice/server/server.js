import express from "express";
import { config } from "dotenv";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors"
import { fileURLToPath } from "url";
import path from "path";
import { type } from "node:os";
config();

const App = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

App.use(express.static(path.join(__dirname, "../client")));

const port = process.env.PORT 


const server = createServer(App);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
var users = []
var rooms = []
io.on("connection", (socket) => {

  socket.on("join", (data) => {
   
    const userData = {name:data.name,id:socket.id,status:data.status}


    socket.emit('userdata',userData)

    const filter = users.filter((i)=> i.name===data.name)

    filter.length== 0 ? users.push(userData) : ''
    console.log(users)
  });

  socket.on('message',(message)=>{
    console.log('message received')
    socket.to(message.receiver).emit('receivemessage',message)
  })


  socket.on('matchmaking',(data)=>{
        rooms.push(data)
        if(rooms.length===2)
        {
             console.log('now rooms',rooms)
            createRoom(rooms[0],rooms[1])
            rooms.splice(0,2)
        }
 
       
  })

  function createRoom(player1,player2)
  {
    console.log('player1',player1,'player2',player2)


    const roomid = Math.ceil(Math.random()*999)+Date.now()
    console.log('room id',roomid)

    const player1socket = io.sockets.sockets.get(player1.id)
    const player2socket = io.sockets.sockets.get(player2.id)

    if(!player1socket || !player2socket) return
    player1socket.join(roomid)
    player1.status = 'inmatch'
    
    player2socket.join(roomid)
    player2.status = 'inmatch'
    console.log('users',users)

    io.to(roomid).emit("roomcreated", {
            roomid,
            player1:player1.name,
            player2:player2.name
           
        });


        io.on('gamemsg',(msg)=>{
                 console.log('message is',msg)
        })

        
  }

  socket.on('disconnect',()=>{
    console.log('disconnected',socket.id)


    
})
});


server.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});