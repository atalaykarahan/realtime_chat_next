"use client";
import { getChatListHistory } from "@/app/api/services/room.Service";
import CustomCard from "@/components/custom-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import UserProfile from "../user-profile/user-profile";
import MessageItem from "./message-item";
import { Socket } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { MessageItemModel, setChatList } from "@/app/redux/slices/chatlistSlice";

interface SidebarProps {
  user: any;
  socket: Socket | null;
}

const Sidebar: React.FC<SidebarProps> = ({ user, socket }) => {
  const dispatch = useDispatch<AppDispatch>();
  const listMessages = useSelector((state: RootState) => state.chatListReducer.messages);
  const [highlightedRoomId, setHighlightedRoomId] = useState<string | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchData();
    if (user && user.email && socket) {
      console.log("useridd", user.email);
      socket.on(user.email, (res: any) => {
        if (res.notification_type === "message") {
          console.log("chat listi guncelle", res.data);
          updateLastMessage(res.data);
          setHighlightedRoomId(res.data.room_id);
        }
      });
    }
  }, [user, socket]);

  const fetchData = async () => {
    const res = await getChatListHistory();
    if (res.status === 200) {
      console.log("reschatlist", res.data);
      dispatch(setChatList(res.data));
    }
  };

  const updateLastMessage = (data: { message: string; room_id: string; updatedAt: string; other_user_email: string }) => {
    console.log("dataroomid", data.room_id)
    const updatedMessages = listMessages?.map((msg: MessageItemModel) =>
      
      msg.room_id === data.room_id
        ? { ...msg, last_message: data.message, updatedAt: data.updatedAt }
        : msg
    ) || [];
  
    // Mesaj listesinde güncellenmiş mesajı bulamadık, o zaman yeni bir mesaj ekleyelim
    if (!updatedMessages.some((msg) => msg.room_id === data.room_id)) {
      updatedMessages.unshift({
        room_id: data.room_id,
        last_message: data.message,
        updatedAt: data.updatedAt,
        user_name: user.user_name,  // İhtiyaç duyuluyorsa kullanıcı bilgileri
        user_photo: user.user_photo,  // İhtiyaç duyuluyorsa kullanıcı fotoğrafı
        user_email: data.other_user_email,
        friend_status: "friend",  // Bu değeri güncellemeniz gerekebilir
      });
    }
  
    dispatch(setChatList(updatedMessages));
  };

  const handleItemClick = (room_id: string) => {
    setSelectedRoomId(room_id);
    if (highlightedRoomId === room_id) {
      setHighlightedRoomId(null);
    }
  };

  const filteredMessages = listMessages.filter((msg: MessageItemModel) =>
    msg.user_name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  return (
    <CustomCard className="hidden lg:flex flex-col flex-none min-w-[260px] max-h-full">
      <UserProfile user={user} onSearch={setSearchQuery} />
      <ScrollArea className="flex-1 rounded-md overflow-auto">
        <div className="pt-3">
          {filteredMessages?.map((msg: any) => (
            <MessageItem
              message={msg}
              key={msg.room_id}
              highlight={msg.room_id === highlightedRoomId}
              selected={msg.room_id === selectedRoomId}
              onClick={() => handleItemClick(msg.room_id)}
            />
          ))}
        </div>
      </ScrollArea>
    </CustomCard>
  );
};

export default Sidebar;
