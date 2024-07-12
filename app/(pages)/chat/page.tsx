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
import { PostPrivateConversation } from "@/app/api/services/Message.Service";
import { Message } from "@/models/Message";



const ChatPage = () => {
  const user = useCurrentUser();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<string>("Bağlanıyor...");
  const [messages, setMessages] = useState<
    Array<{ sender_id: string; message: string }>
  >([]);
  const [oldMessages, setOldMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (user && user.id) oldSpeech(user.id, "114950733215735919150");

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

  //#region OLD SPEECH
  const oldSpeech = async (sender_id: string, receiver_id: string) => {
    try {
      const res = await PostPrivateConversation(sender_id, receiver_id);

      if (res.status !== 200) {
        console.error("Mesaj ile ilgili bir sorun oluştu", res);
      }

      setOldMessages(res.data);
    } catch (error) {
      console.error("hata oldu mesajlar gelemedi ", error);
    }
  };
  //#endregion

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

          {/* New Chat Message */}
          <Speech user={user} messages={oldMessages} />
          {/* <Speech user={user} messages={messages} /> */}

          {/* write new message section */}
          <div className="mt-auto">
            <WriteMessage user={user} socket={socket} />
          </div>
        </CustomCard>
      </div>
    </>
  );
};

export default ChatPage;
