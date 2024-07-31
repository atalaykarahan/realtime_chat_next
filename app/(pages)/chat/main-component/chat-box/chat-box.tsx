"use client";
import CustomCard from "@/components/custom-card";
import ChatNavbar from "../../chat-navbar";
import Speech from "@/app/(pages)/chat/main-component/speech/speech";
import WriteMessage from "../../write-message";
import {Message} from "@/models/Message";
import {useEffect, useState} from "react";
import io, {Socket} from "socket.io-client";
import {MessageItemSliceModel} from "@/app/redux/slices/message-boxSlice";
import ConnectionStatus from "@/components/connection-status";
import {getChatHistoryByRoomId} from "@/app/api/services/message.Service";
import {toast} from "sonner";

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
        if (!chatBoxValue?.room_id) return; //room_id degeri null iken socket baslamasin diye
        setMessages([]); //ekran her degistiginde gecmis mesajlar silmek icin
        //#region OLD MESSAGES & LIVE CHAT
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

        //gecmis mesajlar basarili bir sekilde dondukten sonra socket'e baglaniyor eger gecmis mesajlar gelmez ise baglanmaz!!
        if (user && user.id && chatBoxValue?.room_id) {
            history(chatBoxValue.room_id).then(() => {
                newSocket.on(chatBoxValue.room_id, (newMessage: Message) => {
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                });
            });
        }
        setSocket(newSocket);
        return () => {
            if (newSocket) newSocket.close();
        };
        //#endregion
    }, [chatBoxValue.room_id]);

    // gecmis mesajlari getiren func
    const history = async (room_id: string) => {
        const res = await getChatHistoryByRoomId(room_id);
        if (res.status === 200) {
            setMessages(res.data);
        } else {
            toast('ESKİ MESAJLAR GETİRİLİRKEN BİLİNMEYEN BİR HATA MEYDANA GELDİ')
            console.error(res)
        }
    }

    if (chatBoxValue.chatBoxStatus == true)
        return (
            <CustomCard
                className="flex-1 flex-col justify-between flex">
                <ConnectionStatus statusTitle={connectionStatus}/>
                <ChatNavbar friend={chatBoxValue}/>

                {/* Chat Message */}
                <Speech room_id={chatBoxValue.room_id} user={user} messages={messages}/>

                {/* write new message section */}
                <div className="mt-auto">
                    <WriteMessage room_id={chatBoxValue.room_id} user={user} socket={socket}/>
                </div>
            </CustomCard>
        );

};

export default ChatBox;
