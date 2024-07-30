"use client";
import CustomCard from "@/components/custom-card";
import ChatNavbar from "../chat-navbar";
import Speech from "../speech/speech";
import WriteMessage from "../write-message";
import {Message} from "@/models/Message";
import {useEffect, useState} from "react";
import io, {Socket} from "socket.io-client";
import {cn} from "@/lib/utils";
import {MessageItemSliceModel} from "@/app/redux/slices/message-boxSlice";
import ConnectionStatus from "@/components/connection-status";
import {getHistoryByRoomId} from "@/app/api/services/message.Service";
import {toast} from "sonner";

interface ChatBoxProps {
    user: any;
    socket: Socket | null;
    chatBoxValue: MessageItemSliceModel;
}

const ChatBox: React.FC<ChatBoxProps> = ({user,socket, chatBoxValue}) => {
   
    const [messages, setMessages] = useState<Message[]>([]);
    useEffect(() => {
        
        //#region OLD MESSAGES & LIVE CHAT
       setMessages([]); //ekran her degistiginde gecmis mesajlar silmek icin

        if (user && user.id && socket) {     
          //gecmis mesajlar basarili bir sekilde dondukten sonra socket'e baglaniyor eger gecmis mesajlar gelmez ise baglanmaz!!
          history().then(() => {
              socket.on(chatBoxValue.room_id, (newMessage: Message) => {
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                });
            });
      
          return () => {
            if (socket) socket.close();
          };
        }
        //#endregion
      }, [chatBoxValue.room_id]);


    // gecmis mesajlari getiren func
    const history = async () => {
        const res = await getHistoryByRoomId(chatBoxValue.room_id);
        if (res.status === 200) {
            setMessages(res.data);
        } else {
            toast('ESKİ MESAJLAR GETİRİLİRKEN BİLİNMEYEN BİR HATA MEYDANA GELDİ')
            console.error(res)
        }
    }

    return (
        //duruma göre hidden kodu olucak
        <CustomCard
            className={cn(
                "flex-1 flex-col justify-between",
                chatBoxValue.chatBoxStatus == true ? "flex" : "hidden"
            )}
        >
            {/* <ConnectionStatus statusTitle={connectionStatus}/> */}
            <ChatNavbar friend={chatBoxValue}/>

            {/* Chat Message */}
            <Speech user={user} messages={messages}/>

            {/* write new message section */}
            <div className="mt-auto">
                <WriteMessage room_id={chatBoxValue.room_id} user={user} socket={socket}/>
            </div>
        </CustomCard>
    );
};

export default ChatBox;
