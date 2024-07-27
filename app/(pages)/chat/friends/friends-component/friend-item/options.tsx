import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip";
import {GoBlocked} from "react-icons/go";
import {IoChatboxEllipsesOutline} from "react-icons/io5";
import {LuUserX} from "react-icons/lu";
import {FriendsModel} from "../friends";
import {Block, Delete} from "@/app/api/services/friendship.Service";
import {toast} from "sonner";

interface FriendsProps {
    friends: FriendsModel;
}

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

const deleteFriend = async (friendMail: string) => {
    const res = await Delete(friendMail)
    if (res.status !== 204) {
        console.error(
            "arkadaslik silinirken hata",
            res
        );
    } else {
        console.log("basariyla silindi")
    }
};


const Options: React.FC<FriendsProps> = ({friends}) => {
    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <GoBlocked
                            onClick={() => block(friends.friend_mail, friends.user_name)}
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
                            onClick={() => deleteFriend(friends.friend_mail)}
                            className="text-white h-5 w-5 transition-all duration-500   opacity-70 hover:opacity-100"/>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Arkadaşı Sil</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <IoChatboxEllipsesOutline
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
