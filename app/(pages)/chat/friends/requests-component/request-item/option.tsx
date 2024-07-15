import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BsCheckLg } from "react-icons/bs";
import { GoBlocked } from "react-icons/go";
import { LiaTimesSolid } from "react-icons/lia";
import { ComingRequestsModel } from "../requests";
import { Accept, Block, Reject } from "@/app/api/services/friendship.Service";

interface ComingRequestsProps {
  requests: ComingRequestsModel;
}

const block = async (senderId: string) => {
  const res = await Block(senderId)
  if (res.status !== 200) {
    console.error(
      "geçmiş mesajları getirmekle ilgili bir sorun oluştu ",
      res
    );
  } else {
    console.log("basariyla blocklandi")
  }

};

const accept = async (senderId: string) => {
  const res = await Accept(senderId)
  if (res.status !== 200) {
    console.error(
      "arkadaslik istegi onaylanirken hata",
      res
    );
  } else {
    console.log("basariyla kabuledildi")
  }
};

const reject = async (senderId: string) => {
  const res = await Reject(senderId)
  if (res.status !== 200) {
    console.error(
      "arkadaslik istegi reddedilirken hata",
      res
    );
  } else {
    console.log("basariyla reddedildi")
  }
};

const Options: React.FC<ComingRequestsProps> = ({ requests }) => {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <GoBlocked
              onClick={() => block(requests.sender_id)}
              className="text-rose-600 h-5 w-5 transition-all duration-500 opacity-70 hover:opacity-100"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Engelle</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <BsCheckLg
              onClick={() => accept(requests.sender_id)}
              className="text-white h-5 w-5 transition-all duration-500 opacity-70 hover:opacity-100"
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
              onClick={() => reject(requests.sender_id)}
              className="text-white transition-all duration-500 h-5 w-5 opacity-70 hover:opacity-100"
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
