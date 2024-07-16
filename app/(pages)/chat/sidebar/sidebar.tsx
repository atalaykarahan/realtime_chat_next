"use client";
import { GetConversation } from "@/app/api/services/Message.Service";
import CustomCard from "@/components/custom-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "@/models/Message";
import { useEffect, useState } from "react";
import UserProfile from "../user-profile/user-profile";
import MessageItem from "./message-item";

interface SidebarProps {
  user: any;
}

export interface MessageItemModel {
  other_user_email: string;
  other_user_name: string;
  other_user_photo: string;
  messages: Message[];
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const [messages, setMessages] = useState<MessageItemModel[]>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await GetConversation();

    if (res.status !== 200) {
      console.error(
        "geçmiş mesajları getirmekle ilgili bir sorun oluştu ",
        res
      );
    }

    setMessages(res.data);
  };

  return (
    <CustomCard className="hidden lg:flex flex-col flex-none min-w-[260px] max-h-full">
      <UserProfile user={user} />
      <ScrollArea className="flex-1 rounded-md overflow-auto">
        <div className="pt-3">
          {messages?.map((msg) => (
            <MessageItem message={msg} key={msg.other_user_email} />
          ))}
        </div>
      </ScrollArea>
    </CustomCard>
  );
};

export default Sidebar;
