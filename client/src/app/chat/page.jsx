'use client'

import Chat from "@/components/chat";
import UserList from "@/components/userList";
import { useEffect, useState } from "react";
export default function ChatPage() {

  const [users,setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState({})

  useEffect(()=>{
    getAllUsers()
  },[])

  const selectedUserHandler = (selectedUser)=>{
      setSelectedUser(selectedUser)

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
          <h1 className="text-2xl font-bold">Chat with Us</h1>
        </div>
      </header>
      <main className="flex  gap-2 min-h-[82vh]  py-5 px-2">
      <div className="w-1/3 h-full shadow-lg">
        <UserList users= {users} selectedUserHandler={selectedUserHandler} selectedUser ={selectedUser}/>
          </div>
        <div className="w-2/3 ">
          <Chat />
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
   
