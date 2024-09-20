"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";
import Sidebar from "./sidebar/sidebar";
import { useDispatch } from "react-redux";
import io, { Socket } from "socket.io-client";
import MainComponent from "@/app/(pages)/chat/main-component/page";
import { AppDispatch } from "@/app/redux/store";
import { setUser } from "@/app/redux/slices/userSlice";
import {useAppSelector} from "@/app/redux/store";

const ChatPage = () => {
  const currentUser  = useCurrentUser();
  const [socket, setSocket] = useState<Socket | null>(null);
  const socketUrl = process.env.SOCKET_IO_URL;
  useEffect(() => {
    console.warn("user", currentUser)
  

    const newSocket = io(socketUrl as string, {
      transports: ["websocket", "polling"],
    });

    newSocket.on("connect", () => {
      console.log("baglandi");
    });
    newSocket.on("disconnect", () => {
      console.log("disconnected");
    });
    newSocket.on("connect_error", (error) => {
      console.error(`Bağlantı Hatası: ${error.message}`);
    });

    newSocket.emit("joinRoom", "notification");
    
    setSocket(newSocket);
    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, [socketUrl]); 
   
  return (
    <div
      className="h-screen w-screen p-6 flex gap-5 relative"
      style={{ zIndex: "1" }}>
      <Sidebar user={currentUser}  socket={socket}/>
      <MainComponent user={currentUser} socket={socket} />
    </div>
  );
};

export default ChatPage;
