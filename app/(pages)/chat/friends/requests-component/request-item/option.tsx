import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BsCheckLg } from "react-icons/bs";
import { GoBlocked } from "react-icons/go";
import { LiaTimesSolid } from "react-icons/lia";
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
            <BsCheckLg className="text-white h-5 w-5 transition-all duration-500   opacity-70 hover:opacity-100" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Kabul Et</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <LiaTimesSolid className="text-white transition-all duration-500 h-5 w-5  opacity-70 hover:opacity-100" />
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
