const express = require('express');

const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const { addConversation } = require('./controllers/conversations.controllers');
const dotenv = require('dotenv')
dotenv.config()
const cors = require("cors")
const Port = process.env.PORT 
const conversationRoutes = require("./routes/conversation.routes.js")
const app = express();
const server = createServer(app);
const io = new Server(server,{
  cors: {
    
    origin: "http://localhost:3000", // Change this to your frontend's URL
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],  // Optional: Use if you have custom headers
    credentials: true  // Optional: Set if you need to allow cookies
  }
});
const {connectDB} = require('./config/dbconfig.js');
connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use("/api/v1/conversations", conversationRoutes)

const socketUsers = {}

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("register",(email)=>{
     if(email){
      socketUsers[email] = socket.id
     }


  })
  socket.on("messageToServer",(data)=>{
    console.log(data)
    const {text,sender,receiver} = data
 
   const receiverSocket = socketUsers[receiver]
   console.log("receiversocket",receiverSocket)
   io.to(receiverSocket).emit('message', {text,sender,receiver});
   addConversation({text,sender,receiver})
 
  })
});
 
server.listen(Port, () => {
  console.log('server running at http://localhost:8000');
});