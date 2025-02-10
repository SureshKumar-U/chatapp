'use client'

import { createContext, useState,useEffect } from "react";

const AuthContext = createContext()

const AuthContextProvider = ({children})=>{
 
    let userInfo;
       // Ensure localStorage is only accessed on the client-side
       if (typeof window !== 'undefined') {
         userInfo = localStorage.getItem("userInfo")
          ? JSON.parse(localStorage.getItem("userInfo"))
          : null;
       }
 // Run once on mount
    const [currentUser,setCurrentUser] = useState(userInfo)

    useEffect(() => {
        if (currentUser) {
          localStorage.setItem("userInfo", JSON.stringify(currentUser));
        } else {
          localStorage.removeItem("userInfo");
        }
      }, [currentUser]); // Re-run this effect when currentUser changes

    return <AuthContext.Provider value = {{currentUser,setCurrentUser}}>
        {children}
    </AuthContext.Provider>

}
export {AuthContext, AuthContextProvider} 