"use client";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip";
import {GoBlocked} from "react-icons/go";
import {IoChatboxEllipsesOutline} from "react-icons/io5";
import {LuUserX} from "react-icons/lu";
import {FriendsModel} from "../friends";
import {Block, Remove} from "@/app/api/services/friendship.Service";
import {toast} from "sonner";
import {checkAndGetPrivateRoom, createPrivateRoom} from "@/app/api/services/room.Service";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/redux/store";
import {openChatBox} from "@/app/redux/slices/messageBoxSlice";
import { addChatMessage } from "@/app/redux/slices/chatlistSlice";

interface FriendsProps {
    friend: FriendsModel;
}

const Options: React.FC<FriendsProps> = ({friend}) => {
    const dispatch = useDispatch<AppDispatch>();

    const block = async (friendMail: string, friendName: string) => {
        const res = await Block(friendMail)
        if (res.status === 200) {
            toast(`${friendName} BAŞARIYLA ENGELLENDİ`, {
                action: {
                    label: "Geri Al",
                    onClick: () => console.log("Geri Al butonuna basıldı"),
                },
            })
        } else {
            toast('BİLİNMEYEN BİR HATA MEYDANA GELDİ')
            console.error(res)
        }
    };

    const removeFriend = async (friendMail: string, friendName: string) => {
        const res = await Remove(friendMail)
        if (res.status === 204) {
            toast(`${friendName} arkadaşlıktan çıkarıldı!`, {
                action: {
                    label: "Geri Al",
                    onClick: () => console.log("Geri Al butonuna basıldı"),
                },
            })
        } else {
            toast('BİLİNMEYEN BİR HATA MEYDANA GELDİ')
            console.error(res)
        }
    };

    const openChatBoxHandler = async (friendMail: string) => {
        const res = await checkAndGetPrivateRoom(friendMail);
        if (res.status === 200) {
            const chatMessage = {
                room_id: res.data.room_id,
                last_message: '', 
                updatedAt: new Date().toISOString(),
                user_name: friend.user_name,
                user_photo: friend.user_photo,
                user_email: friendMail,
                friend_status: 'friend',
            };
            dispatch(addChatMessage(chatMessage));
            dispatch(openChatBox({
                activeComponent: "chatbox",
                other_user_email: friendMail,
                other_user_name: friend.user_name,
                other_user_photo: friend.user_photo,
                friend_status: 'friend',
                room_id: res.data.room_id
            }))
        } else {
            toast('BİLİNMEYEN BİR HATA MEYDANA GELDİ')
            console.error(res)
        }
    }
    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <GoBlocked
                            onClick={() => block(friend.friend_mail, friend.user_name)}
                            className="text-rose-600 h-5 w-5 transition-all duration-500   opacity-70 hover:opacity-100"/>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Engelle</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <LuUserX
                            onClick={() => removeFriend(friend.friend_mail, friend.user_name)}
                            className="text-white h-5 w-5 transition-all duration-500   opacity-70 hover:opacity-100"/>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Arkadaşı Çıkar</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <IoChatboxEllipsesOutline
                            onClick={() => openChatBoxHandler(friend.friend_mail)}
                            className="text-white transition-all duration-500 h-5 w-5  opacity-70 hover:opacity-100"/>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Mesaj Gönder</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
    );
};

export default Options;
