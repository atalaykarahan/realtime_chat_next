"use client";
import ConnectionStatus from "@/components/connection-status";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Message } from "@/models/Message";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import ChatBox from "./chat-box/chat-box";
import FriendsSettings from "./friends/page";
import Sidebar from "./sidebar/sidebar";
import { changeValue } from "@/app/redux/slices/message-boxSlice";
import {useDispatch} from "react-redux"

const ChatPage = () => {
  const user = useCurrentUser();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<string>("Bağlanıyor...");

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    //#region SOCKET.IO

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
    if (user && user.id) {
      newSocket.on("chat", (data: { sender_id: string; message: string }) => {
        // console.log("mesaj dinleniyor")
        // console.log(data);
        setMessages((prevMessages: any) => [...prevMessages, data]);
      });
    }

    setSocket(newSocket);
    return () => {
      if (newSocket) newSocket.close();
    };
    //#endregion
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

        {/* friends settings */}
        <FriendsSettings />

        {/* chat box */}
        <ChatBox user={user} messages={messages} socket={socket} />
        {/* duruma göre hidden vericeksin atalay !!!!! */}
        {/* <CustomCard className="flex-1 flex flex-col justify-between"> */}
        {/* chatin ust kisminda konusulan kisinin resminin falan oldugu yer */}
        {/* <CustomCard className="flex-1 hidden flex-col justify-between">
          <ChatNavbar />

   
          <Speech user={user} messages={oldMessages} />
    
          <div className="mt-auto">
            <WriteMessage user={user} socket={socket} />
          </div>
        </CustomCard> */}
      </div>
    </>
  );
};

export default ChatPage;
