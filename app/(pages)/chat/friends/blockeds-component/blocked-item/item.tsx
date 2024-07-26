"use client";
import Image from "next/image";
import Options from "./options";
import { BlockedsModel } from "../blockeds";

interface BlockedsProps {
  blocked: BlockedsModel;
}

const FriendItem: React.FC<BlockedsProps> = ({ blocked }) => {
  return (
    <div onClick={() => console.log(blocked.blocked_mail, "bu userın içerdiği kutuya tıklanıldı")} className="gap-4 py-2 lg:py-2.5 px-3 mx-3 rounded-md hover:bg-[#4A32B0]/30 transition-all duration-500 cursor-pointer flex items-center">
      <div className="flex-1 flex gap-3">
        <div className="relative inline-block">
          <span className="relative flex h-12 w-12 overflow-hidden rounded-full">
            <Image
              width={40}
              height={40}
              className="aspect-square h-full w-full"
              src={
                blocked.user_photo ||
                "https://dash-tail.vercel.app/_next/static/media/avatar-2.1136fd53.jpg"
              }
              alt="tst"
            />
          </span>
        </div>
        <div className="flex items-center">
          <div className="truncate max-w-[120px]">
            <span className="text-sm text-white font-medium">
            {blocked.user_name}
            </span>
          </div>
        </div>
      </div>
      <div className="flex-none flex items-center justify-center  gap-2 ml-auto lg:ml-0">
        <Options blocked={blocked}/>
      </div>
    </div>
  );
};

export default FriendItem;
