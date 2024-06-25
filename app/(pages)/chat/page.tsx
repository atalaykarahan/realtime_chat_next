"use client";
import CustomCard from "@/components/custom-card";
import DummyData from "@/components/ui/dummy";
import ChatMessage from "./chat-message";
import ChatNavbar from "./chat-navbar";
import UserProfile from "./user-profile/user-profile";
import { useCurrentUser } from "@/hooks/use-current-user";
import io, { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import ConnectionStatus from "@/components/connection-status";
// import { auth } from "@/auth";

const ChatPage = () => {
  const user = useCurrentUser();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<string>("Bağlanıyor...");

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
        {/* {JSON.stringify(session)} */}
        <CustomCard className="hidden lg:block flex-none min-w-[260px]">
          <UserProfile user={user} />
          <div className="pt-3">
            <DummyData />
            <DummyData />
            <DummyData />
            <DummyData />
            <DummyData />
            <DummyData />
            <DummyData />
            <DummyData />
            <DummyData />
            <DummyData />
            <DummyData />
          </div>
        </CustomCard>
        <CustomCard className="flex-1 flex flex-col justify-between">
          <ChatNavbar />
          <div className="mt-auto">
            <ChatMessage />
          </div>
        </CustomCard>
      </div>
    </>
  );
};

export default ChatPage;
