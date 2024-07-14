import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GoBlocked } from "react-icons/go";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { LuUserX } from "react-icons/lu";

const Options = () => {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <GoBlocked className="text-rose-600 h-5 w-5 transition-all duration-500   opacity-70 hover:opacity-100" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Engelle</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <LuUserX className="text-white h-5 w-5 transition-all duration-500   opacity-70 hover:opacity-100" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Arkadaşı Sil</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <IoChatboxEllipsesOutline className="text-white transition-all duration-500 h-5 w-5  opacity-70 hover:opacity-100" />
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
