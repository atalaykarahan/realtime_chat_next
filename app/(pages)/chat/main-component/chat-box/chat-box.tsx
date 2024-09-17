"use client";
import CustomCard from "@/components/custom-card";
import ChatNavbar from "../../chat-navbar";
import Speech from "@/app/(pages)/chat/main-component/speech/speech";
import WriteMessage from "../../write-message";
import {Message} from "@/models/Message";
import {useEffect, useState} from "react";
import io, {Socket} from "socket.io-client";
import {MessageItemSliceModel} from "@/app/redux/slices/messageBoxSlice";
import ConnectionStatus from "@/components/connection-status";
import {getChatHistoryByRoomId} from "@/app/api/services/message.Service";
import {toast} from "sonner";

interface ChatBoxProps {
    user: any;
    socket: Socket | null;
    chatBoxValue: MessageItemSliceModel;
}

const ChatBox: React.FC<ChatBoxProps> = ({user, socket,chatBoxValue}) => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        setMessages([]);
    
        if (user && user.id && chatBoxValue?.room_id && socket) {
            // Unsubscribe from previous room's event
            socket.off(chatBoxValue.room_id);
    
            // Fetch chat history
            history(chatBoxValue.room_id).then(() => {
                // Listen for new messages
                socket.on(chatBoxValue.room_id, (newMessage: Message) => {
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                });
            });
        }
    
        return () => {
            // Clean up listeners
            if (socket) socket.off(chatBoxValue.room_id);
        };
    }, [chatBoxValue.room_id, user, socket]);
    
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

    if (chatBoxValue.activeComponent == "chatbox")
        return (
            <CustomCard
                className="flex-1 flex-col justify-between flex">
                <ChatNavbar friend={chatBoxValue}/>

                {/* Chat Message */}
                <Speech room_id={chatBoxValue.room_id} user={user} messages={messages}/>

                {/* write new message section */}
                <div className="mt-auto">
                    <WriteMessage friend={chatBoxValue} user={user} socket={socket}/>
                </div>
            </CustomCard>
        );

};

export default ChatBox;
