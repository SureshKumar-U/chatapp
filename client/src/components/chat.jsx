"use client"

import { useState } from "react";
const Chat = ({sendMessageHandler,message,setMessage, messages,selectedUser}) => {



  return (
    <div className="flex flex-col w-full h-full bg-white shadow-lg rounded-lg p-3">
         <h5 className="font-bold border-b border-gray-200">{selectedUser?.email}</h5>
      <div className="flex-1 p-2  space-y-4 overflow-y-auto max-h-96 ">
        {/* Chat messages */}
        <div className="space-y-4">
          {messages?.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.receiver == selectedUser?.email ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs text-sm ${
                  msg.receiver == selectedUser?.email
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message input */}
      <div className="flex items-center p-4 border-t border-gray-200">
        <form  className="w-full flex items-center space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            onClick={sendMessageHandler}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
