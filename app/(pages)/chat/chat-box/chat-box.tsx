"use client";
import CustomCard from "@/components/custom-card";
import ChatNavbar from "../chat-navbar";
import Speech from "../speech/speech";
import WriteMessage from "../write-message";
import { Message } from "@/models/Message";
import { PostPrivateConversation } from "@/app/api/services/Message.Service";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useAppSelector } from "@/app/redux/store";
import { cn } from "@/lib/utils";

interface ChatBoxProps {
  user: any;
  messages: Message[];
  socket: Socket | null;
}

const ChatBox: React.FC<ChatBoxProps> = ({ user, messages, socket }) => {
  // const [oldMessages, setOldMessages] = useState<Message[]>([]);
  const chatBoxValue = useAppSelector((state) => state.messageBoxReducer.value);

  useEffect(() => {
    // if (user && user.id)
      // oldSpeech("115849378656249115607", "115943935417963963678");
  }, []);

  //#region OLD SPEECH
  // const oldSpeech = async (sender_id: string, receiver_id: string) => {
  //   try {
  //     const res = await PostPrivateConversation(sender_id, receiver_id);
  //
  //     if (res.status !== 200) {
  //       console.error("Mesaj ile ilgili bir sorun oluştu", res);
  //     }
  //
  //     console.warn(res.data.data);
  //
  //     setOldMessages(res.data.data);
  //   } catch (error) {
  //     console.error("hata oldu mesajlar gelemedi ", error);
  //   }
  // };
  //#endregion

  return (
    //duruma göre hidden kodu olucak
    <CustomCard
      className={cn(
        "flex-1 flex-col justify-between",
        chatBoxValue.chatBoxStatus == true ? "flex" : "hidden"
      )}
    >
      <ChatNavbar friend={chatBoxValue} />

      {/* New Chat Message */}
      {/*<Speech user={user} messages={chatBoxValue.messages} />*/}
      {/* <Speech user={user} messages={oldMessages} /> */}
      {/* <Speech user={user} messages={messages} /> */}

      {/* write new message section */}
      <div className="mt-auto">
        <WriteMessage user={user} socket={socket} />
      </div>
    </CustomCard>
  );
};

export default ChatBox;
