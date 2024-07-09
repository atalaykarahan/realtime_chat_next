import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PiDotsThreeCircleVertical } from "react-icons/pi";
import Dropdown from "../dropdown";

interface LeftBubbleProps {
  user: any;
  group?: boolean;
  message: string;
}

const LeftBubble: React.FC<LeftBubbleProps> = ({ user, group, message }) => {
  return (
    <div className="block md:px-6 px-4 ">
      <div className="flex space-x-2 items-start group rtl:space-x-reverse mb-4">
        {/* profile photo */}
        {group && (
          <div className="flex-none self-end -translate-y-5">
            <div className="h-8 w-8 rounded-full">
              <Image
                width={40}
                height={40}
                src={user?.image}
                alt="/images/avatar/avatar-1.jpg"
                className="block w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        )}

        {/* chat bubble */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex flex-col max-w-[40%]   gap-1">
            <div className="flex items-center gap-1">
              <div className="whitespace-pre-wrap break-all relative z-[1]">
                <div className="bg-[#1f2937] text-white  text-sm  py-2 px-3 rounded-2xl  flex-1  ">
                  {message}
                </div>
              </div>
              {/* option button */}
              <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible flex">
                <Button
                  type="button"
                  size="icon"
                  className="w-7 h-7 rounded-full bg-default-100 hover:bg-default-200 my-auto"
                >
                  {/* <PiDotsThreeCircleVertical   className="w-12 h-12 text-[#4A32B0]" /> */}
                  <Dropdown isLeftMode={true} />
                </Button>
              </div>
            </div>
            {/* text time */}
            <span className="text-xs text-[#e0f2fe]">19:48</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBubble;
