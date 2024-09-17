import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Remove } from "@/app/api/services/friendship.Service";
import { CgUnblock } from "react-icons/cg";
import { toast } from "sonner";
import { BlockedModel } from "@/app/(pages)/chat/main-component/friends/blockeds-component/blocked";

interface BlockedsProps {
  blocked: BlockedModel;
}

const unblock = async (friendMail: string) => {
  const res = await Remove(friendMail);
  if (res.status === 200) {
    toast(`Engel başarıyla kaldırıldı.`, {
      action: {
        label: "Geri Al",
        onClick: () => console.log("Geri Al butonuna basıldı"),
      },
    });
  } else {
    toast("BİLİNMEYEN BİR HATA MEYDANA GELDİ");
    console.error(res);
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
              className="text-[#3b82f6] h-5 w-5 transition-all duration-500   opacity-70 hover:opacity-100"
            />
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
