"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Message } from "@/models/Message";
import { useEffect, useState } from "react";
import ChatBox from "./chat-box/chat-box";
import FriendsSettings from "./friends/page";
import Sidebar from "./sidebar/sidebar";
import { useAppSelector } from "@/app/redux/store";
import io, {Socket} from "socket.io-client";
import { toast } from "sonner";

const ChatPage = () => {
  const user = useCurrentUser();
  const chatBoxValue = useAppSelector((state) => state.messageBoxReducer.value);

  const [connectionStatus, setConnectionStatus] =
    useState<string>("Bağlanıyor...");
  const [socket, setSocket] = useState<Socket | null>(null);
  const socketUrl = process.env.SOCKET_IO_URL;
  useEffect(() => {
    const newSocket = io(socketUrl as string, {
      transports: ["websocket", "polling"],
    });
  
    newSocket.on("connect", () => {
      setConnectionStatus("Bağlandı");
    });
    newSocket.on("disconnect", () => {
      setConnectionStatus("Bağlanamadı");
    });
    newSocket.on("connect_error", (error) => {
      setConnectionStatus(`Bağlantı Hatası: ${error.message}`);
    });
  
    setSocket(newSocket);
    return () => {
      if (newSocket) newSocket.close();
    };
  }, [socketUrl]);
  return (
    <>
      <div
        className="h-screen w-screen p-6 flex gap-5 relative"
        style={{ zIndex: "1" }}
      >
        {/* userın id degerini gormek icin */}
        {/* {user && (
        <div className="bg-white"> {user.id}</div>
        )} */}

        {/* {JSON.stringify(session)} */}
        <Sidebar user={user} />

        {/* friends settings */}
        <FriendsSettings socket={socket} />

        {/* chat box */}
        <ChatBox chatBoxValue={chatBoxValue} user={user} socket={socket} />
      </div>
    </>
  );
};

export default ChatPage;
