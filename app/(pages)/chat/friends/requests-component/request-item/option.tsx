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
import {  Accept, Reject } from "@/app/api/services/request.Service";

interface ComingRequestsProps {
  requests: ComingRequestsModel;
}


const accept = async (senderMail: string) => {
  const res = await Accept(senderMail)
  if (res.status !== 200) {
    console.error(
      "arkadaslik istegi onaylanirken hata",
      res
    );
  } else {
    console.log("basariyla kabuledildi")
  }
};

const reject = async (senderMail: string) => {
  const res = await Reject(senderMail)
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
            <BsCheckLg
              onClick={() => accept(requests.sender_mail)}
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
              onClick={() => reject(requests.sender_mail)}
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
