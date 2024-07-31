"use client";
import {getChatListHistory} from "@/app/api/services/message.Service";
import CustomCard from "@/components/custom-card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useEffect, useState} from "react";
import UserProfile from "../user-profile/user-profile";
import MessageItem from "./message-item";

interface SidebarProps {
    user: any;
}
export interface MessageItemModel {
    room_id: string;
    last_message: string;
    updatedAt: Date;
    user_name: string;
    user_photo: string;
    user_email: string;
}

const Sidebar: React.FC<SidebarProps> = ({user}) => {
    const [listMessages, setListMessages] = useState<MessageItemModel[]>();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await getChatListHistory();
        if (res.status === 200) {
            setListMessages(res.data);
        }
    };

    return (
        <CustomCard className="hidden lg:flex flex-col flex-none min-w-[260px] max-h-full">
            <UserProfile user={user}/>
            <ScrollArea className="flex-1 rounded-md overflow-auto">
                <div className="pt-3">
                    {listMessages?.map((msg) => (
                        <MessageItem message={msg} key={msg.room_id}/>
                    ))}
                </div>
            </ScrollArea>
        </CustomCard>
    );
};

export default Sidebar;
