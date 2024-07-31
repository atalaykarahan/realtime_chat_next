import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip";
import {BsCheckLg} from "react-icons/bs";
import {LiaTimesSolid} from "react-icons/lia";
import {ComingRequestsModel} from "../requests";
import {UpdateFriendshipRequest} from "@/app/api/services/request.Service";
import {RequestStatus} from "@/models/Enum";
import {toast} from "sonner";

interface ComingRequestsProps {
    requests: ComingRequestsModel;
}

const handleOnClick = async (senderMail: string, status: RequestStatus, senderName: string) => {
    const res = await UpdateFriendshipRequest(senderMail, status);
    if (res.status === 200) {
        if (status === RequestStatus.accepted) {
            toast(`${senderName} artık arkadaşın`, {
                action: {
                    label: "Geri Al",
                    onClick: () => console.log("Geri Al butonuna basıldı"),
                },
            })
        } else {
            toast('İstek silindi!', {
                action: {
                    label: "Geri Al",
                    onClick: () => console.log("Geri Al butonuna basıldı"),
                },
            })
        }
    } else {
        toast('BİLİNMEYEN BİR HATA MEYDANA GELDİ')
        console.error(res)
    }
};


const Options: React.FC<ComingRequestsProps> = ({requests}) => {
    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <BsCheckLg
                            onClick={() => handleOnClick(requests.sender_mail, RequestStatus.accepted, requests.user_name)}
                            className="text-[#3b82f6] h-5 w-5 transition-all duration-500 opacity-70 hover:opacity-100"
                        />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Kabul Et</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <LiaTimesSolid
                            onClick={() => handleOnClick(requests.sender_mail, RequestStatus.rejected, requests.user_name)}
                            className="text-[#e11d48] transition-all duration-500 h-5 w-5 opacity-70 hover:opacity-100"
                        />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Reddet</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
    );
};

export default Options;
