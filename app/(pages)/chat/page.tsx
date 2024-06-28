"use client";
import ConnectionStatus from "@/components/connection-status";
import CustomCard from "@/components/custom-card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import ChatMessage from "./type-message";
import ChatNavbar from "./chat-navbar";

import Sidebar from "./sidebar/sidebar";
import Speech from "./speech/speech";
// import { auth } from "@/auth";

const ChatPage = () => {
  const user = useCurrentUser();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<string>("Bağlanıyor...");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const newSocket = io("http://localhost:9898/chat", {
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

    newSocket.on("merhaba", (data) => {
      setMessage(data);
    });

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
        <div className="bg-white"> {message}</div>
        {/* {JSON.stringify(session)} */}
        <Sidebar user={user} />

        <CustomCard className="flex-1 flex flex-col justify-between">
          {/* chatin ust kisminda konusulan kisinin resminin falan oldugu yer */}
          <ChatNavbar />
          <Speech user={user} />

          <div className="mt-auto">
            <ChatMessage />
          </div>
        </CustomCard>
      </div>
    </>
  );
};

export default ChatPage;
