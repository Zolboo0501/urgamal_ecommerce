/* eslint-disable react/prop-types */
import { getCookie } from "cookies-next";
import React, { createContext, useEffect, useState } from "react";

import socket from "@/utils/Socket";
import { tokenDecode } from "@/utils/utils";

export const SocketContext = createContext();
const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const token = getCookie("token");
  const socketLogin = (userid) => {
    socket.emit("storeMySocketId", userid);
  };
  const onConnect = () => setIsConnected(true);

  const onDisconnect = () => setIsConnected(false);

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    if (token) {
      const decoded = tokenDecode(token);
      socketLogin(decoded.userid);
    }
  }, [token]);

  const connect = () => socket.connect();

  const disconnect = () => socket.disconnect();

  const mContext = {
    socket: socket,
    connect: connect,
    disconnect: disconnect,
    status: isConnected,
    socketLogin: socketLogin,
  };

  return (
    <SocketContext.Provider value={mContext}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
