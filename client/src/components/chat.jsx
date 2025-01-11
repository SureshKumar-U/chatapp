"use client"

import { useState } from "react";
const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "Welcome to the chat!", sender: "bot" },
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === "") return; // Don't send empty messages
    setMessages([
      ...messages,
      { text: message, sender: "user" },
      { text: "This is an automated response.", sender: "bot" },
    ]);
    setMessage("");
  };

  return (
    <div className="flex flex-col w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-96">
        {/* Chat messages */}
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs text-sm ${
                  msg.sender === "user"
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
        <form onSubmit={handleSendMessage} className="w-full flex items-center space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
