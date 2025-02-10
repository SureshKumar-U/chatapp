"use client"
import Link from "next/link"
import { useState } from "react"

export default function Login() {
  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name,setUserName] = useState('')
  
  const submitHandler = async(e)=>{
    e.preventDefault()
  
    if(!name ||!email || !password){
      alert("all fields are mandatory")
      return
    }
    const response = await fetch("http://localhost:8085/api/v1/auth/signup",{
      body: JSON.stringify({name, email,password}),
      method:"POST",
      headers: {
        'Content-Type': 'application/json',  // Ensure the correct header is set
      },
    } ) 
    const status = response.status
    const {message} =await response.json()
    if(status == 200){
       //setCurrentuser
    }
    alert(message)
  
    

  }

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Signup</h2>
          <form >
          <div className="mb-4">
              <label htmlFor="user_name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                required
                onChange={(e)=>setUserName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your Name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                onChange={(e)=>setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
  
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                onChange={(e)=>setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
  
            <button
              type="button"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={submitHandler}
            >
              Signup
            </button>
          </form>
  
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-blue-500 hover:underline">Forgot your password?</a>
          </div>
  
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login </Link></p>
          </div>
        </div>
      </div>
    );
  }
  