


import { useState, useEffect } from "react";
import io from "socket.io-client";

const SOCKET_URL = "http://localhost:8080"; // Your socket server URL

export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [isSocketConnected, setSocketConnected] = useState(false);


  useEffect(() => {
    // Establish socket connection
    const socketConnection = io(SOCKET_URL);

    // Set the socket instance
    setSocket(socketConnection);

    // Listen for the "connect" event when socket is connected
    socketConnection.on("connect", () => {
      console.log("Connected to server");
      setSocketConnected(true);
    });

    // Listen for the "disconnect" event
    socketConnection.on("disconnect", () => {
      console.log("Disconnected from server");
      setSocketConnected(false);
    });

    // Cleanup function to disconnect and remove listeners when the component unmounts
    return () => {
      if (socketConnection) {
        socketConnection.off("connect");
        socketConnection.off("disconnect");
        socketConnection.disconnect();
      }
    };
  }, []);

  return { socket, isSocketConnected };
};
