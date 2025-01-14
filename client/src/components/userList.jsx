"use client"

import { useEffect } from "react"

const UserList = ({users,selectedUserHandler,selectedUser}) => {

   
    return (
        <>
       
                <div className="max-w-4xl ">
                    <div className="overflow-hidden bg-white shadow-lg sm:rounded-lg">
                        {users?.length > 0 ? users.map(user=>(  <ul role="list" className="divide-y divide-gray-200">
                            <li className= {`flex items-center justify-between ${selectedUser?._id == user._id ? "bg-blue-800 text-white" : "text-black-800"} py-3 px-4 border-b `}onClick={()=>selectedUserHandler(user)}>
                                <div className="flex items-center">
                                    <img className="h-10 w-10 rounded-full" src="https://randomuser.me/api/portraits/men/1.jpg" alt="User image" />
                                    <div className="ml-3">
                                        {/* <p className="text-sm font-medium text-gray-900"></p> */}
                                        <p className="text-sm ">{user.email}</p>
                                    </div>
                                </div>
                                <div className="ml-3 flex-shrink-0">
                                    <button className="text-sm font-medium  hover:text-indigo-900">Edit</button>
                                </div>
                            </li>

                         

                          
                        </ul>)):<p>No users available</p>}
                      
                    </div>
                </div>

        </>
    )
}

export default UserList