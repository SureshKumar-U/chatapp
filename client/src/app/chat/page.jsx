'use client'

import Chat from "@/components/chat";
import UserList from "@/components/userList";
import { useContext, useEffect, useState } from "react";
import { useSocket } from "@/socket/useSocket";
import { AuthContext } from "@/context/authContext";
export default function ChatPage() {
  const {socket,isSocketConnected} = useSocket()  //Access socket from custom hook
  const [users,setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState({})
  const [message, setMessage] = useState("");
  const {currentUser:sender} = useContext(AuthContext)
  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    getAllUsers()
  },[])



   useEffect(()=>{
    if(!selectedUser?.email){
     return
    }
    getMessages()
   },[selectedUser])

  useEffect(()=>{
    if(socket && isSocketConnected){  
       socket.emit("register",  sender?.email)
       socket.on("message", (receivedMessage)=>{
    
         setMessages(prevMessages => [...prevMessages, receivedMessage]);
    })}
    return ()=> {
      if(socket){
        socket.off("message")
      }
     }

  },[isSocketConnected])

  const sendMessageHandler = ()=>{
    if(!message.trim()){
      return
    }
    const sentMessage = {
      text: message,
      sender : sender.email,
      receiver : selectedUser.email


    }
    socket.emit("messageToServer",sentMessage)
    setMessages((prevMessages)=>[...prevMessages,sentMessage])
   setMessage("")
  }

  const selectedUserHandler = (selectedUser)=>{
      setSelectedUser(selectedUser)

  }

  const getMessages = async()=>{
    try{
     const response = await  fetch(`http://localhost:8080/api/v1/conversations?sender=${sender.email}&receiver=${selectedUser.email}`)
     const status = response.status
     const {data} =await response.json()
     if(status == 200){
      if(data.msgs){
        setMessages(data?.msgs)
      }
     

     }
    }catch(err){
      alert(err)
    }
  }

  const getAllUsers = async()=>{
    const response = await fetch("http://localhost:8000/api/v1/users")
    const status = response.status
    const {users,message} = await response.json()
    if(status == 200){
       setUsers(users)
    }
    else{
       alert(message)
    }
  }
  return (
    <div className="bg-gray-50 ">
      <header className="bg-blue-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-6">
          <h6 className="text-2xl font-bold">Chat with Us</h6>
        </div>
      </header>
      <main className="flex  gap-2 min-h-[82vh]  py-5 px-2">
      <div className="w-1/3 h-full shadow-lg">
        <UserList users= {users} selectedUserHandler={selectedUserHandler} selectedUser ={selectedUser}/>
          </div>
        <div className="w-2/3 ">
     
          <Chat  sendMessageHandler={sendMessageHandler} message={message} setMessage={setMessage} messages={messages} selectedUser={selectedUser} />
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>&copy; 2025 Your Company. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
   
