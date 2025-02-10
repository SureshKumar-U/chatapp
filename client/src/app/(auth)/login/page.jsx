'use client'
import { AuthContext } from "@/context/authContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useRef, useState } from "react";


export default function Login() {
  const emailRef = useRef("")
  const passwordRef = useRef("")
 const {setCurrentUser} = useContext(AuthContext)
 const router = useRouter()
 
  const submitHandler = async(e)=>{
    console.log(e)
    e.preventDefault()
    const email = emailRef.current?.value
    const password = passwordRef.current?.value

    if(!email || !password){
      alert("all fields are mandatory")
    }
    const response = await fetch("http://localhost:8085/api/v1/auth/login",{
    body: JSON.stringify({email,password}),
      method:"POST", headers:{ 'Content-Type': 'application/json',  // Ensure the correct header is set
    }})
    const status = response.status
    const {message,user} = await response.json()
    if(status == 200){
      setCurrentUser(user)
     setTimeout(()=>{
      router.push("/chat")
     },2000) 
    }
    alert(message)
  }
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
          <form onSubmit={submitHandler} >
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                ref={emailRef}
                id="email"
                name="email"
                required
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
                ref={passwordRef}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
  
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </form>
  
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-blue-500 hover:underline">Forgot your password?</a>
          </div>
  
          <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Don't have an account? <Link href="signup" className="text-blue-500 hover:underline">Sign up</Link></p>          </div>
        </div>
      </div>
    );
  }
  