"use client";
import { Search } from "@/components/ui/search";
import Image from "next/image";

import Dropdown from "./dropdown";

const UserProfile = ({ user }: any) => {
  return (
    <div className="px-3 py-5 border-b border-[#5C6B81]">
      <div className="gap-4 flex">
        <div className="flex-1 flex  gap-3 ">
          <div className="relative inline-block ">
            <span className="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full">
              <Image
                width={40}
                height={40}
                className="aspect-square h-full w-full"
                src={
                  user.image ??
                  "https://dash-tail.vercel.app/_next/static/media/avatar-2.1136fd53.jpg"
                }
                alt="tst"
              />
            </span>
            {/* if user online */}
            <span className="inline-flex rounded-full h-2 w-2 p-0 ring-1 ring-border ring-green-500 items-center justify-center absolute left-[calc(100%-8px)] top-[calc(100%-10px)] bg-green-500" />

            {/* if user offline */}
            {/* <span className="inline-flex rounded-full h-2 w-2 p-0 ring-1 ring-border ring-offset-[1px] items-center justify-center absolute left-[calc(100%-8px)] top-[calc(100%-10px)]" /> */}
          </div>
          <div className="block">
            <div className="truncate max-w-[120px]">
              <span className="text-sm  text-white font-medium">
                {" "}
                {user.name}
              </span>
            </div>
            <div className="truncate  max-w-[120px]">
              <span className=" text-sm  text-[#5C6B81] ">Çevrimiçi</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Dropdown />
        </div>
      </div>
      <div className="pt-5">
        <Search placeholder="İsim'e göre ara" />
      </div>
    </div>
  );
};

export default UserProfile;
