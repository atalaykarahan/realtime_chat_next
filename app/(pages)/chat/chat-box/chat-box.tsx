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

interface ChatBoxProps {
    user: any;
    chatBoxValue: MessageItemSliceModel;
}

const ChatBox: React.FC<ChatBoxProps> = ({user, chatBoxValue}) => {
    const [connectionStatus, setConnectionStatus] =
        useState<string>("Bağlanıyor...");
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const socketUrl = process.env.SOCKET_IO_URL;
    useEffect(() => {
        //#region LIVE CHAT
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

        //kullanici chat roomunu dinlemeli
        if (user && user.id) {
            //odayi dinlemeleri icin once odaya girmeleri gerekir.
            newSocket.emit('joinRoom', chatBoxValue.room_id);
            newSocket.on('message', (newMessage: Message) => {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });
        }

        setSocket(newSocket);
        return () => {
            if (newSocket) newSocket.close();
        };
        //#endregion


    }, [chatBoxValue.room_id]);

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
            <ConnectionStatus statusTitle={connectionStatus}/>
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
