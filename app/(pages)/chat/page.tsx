"use client";
import ConnectionStatus from "@/components/connection-status";
import CustomCard from "@/components/custom-card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import WriteMessage from "./write-message";
import ChatNavbar from "./chat-navbar";

import Sidebar from "./sidebar/sidebar";
import Speech from "./speech/speech";
// import { auth } from "@/auth";

const ChatPage = () => {
  const user = useCurrentUser();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<string>("Bağlanıyor...");
  // const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Array<{ fromUserId: string; text: string }>>([]);

  useEffect(() => {
    const newSocket = io(process.env.SOCKET_IO_CONNECTION_URL as string, {
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

    //kullanici kendi id degerini dinlemeli
    if(user && user.id){
      newSocket.on(user.id, (data: { fromUserId: string; text: string }) => {
        // console.log("mesaj dinleniyor")
        // console.log(data);
        setMessages((prevMessages:any) => [...prevMessages, data]);
      });

    }

    setSocket(newSocket);
    return () => {
      if (newSocket) newSocket.close();
    };
  }, []);

  return (
    <>
      <ConnectionStatus statusTitle={connectionStatus} />
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

        <CustomCard className="flex-1 flex flex-col justify-between">
          {/* chatin ust kisminda konusulan kisinin resminin falan oldugu yer */}
          <ChatNavbar />
          <Speech user={user} messages={messages} />

          <div className="mt-auto">
            <WriteMessage user={user} socket={socket} />
          </div>
        </CustomCard>
      </div>
    </>
  );
};

export default ChatPage;
