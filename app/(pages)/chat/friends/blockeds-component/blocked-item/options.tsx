import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
  import { GoBlocked } from "react-icons/go";
  import { IoChatboxEllipsesOutline } from "react-icons/io5";
  import { LuUserX } from "react-icons/lu";
  import { BlockedsModel } from "../blockeds";
  import { Delete } from "@/app/api/services/friendship.Service";
  import { CgUnblock } from "react-icons/cg";

  interface BlockedsProps {
    blocked: BlockedsModel;
  }
  
  const unblock = async (friendMail: string) => {
    const res = await Delete(friendMail)
    if (res.status !== 200) {
      console.error(
        "geçmiş mesajları getirmekle ilgili bir sorun oluştu ",
        res
      );
    } else {
      console.log("basariyla engel kaldirildi")
    }
  
  };
  
  
  
  const Options: React.FC<BlockedsProps> = ({ blocked }) => {
    return (
      <>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CgUnblock
               onClick={() => unblock(blocked.blocked_mail)}
               className="text-[#3b82f6] h-5 w-5 transition-all duration-500   opacity-70 hover:opacity-100" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Engeli Kaldır</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
       
      </>
    );
  };
  
  export default Options;
  