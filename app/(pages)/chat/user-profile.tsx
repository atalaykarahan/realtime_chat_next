"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { PiDotsThreeCircleLight } from "react-icons/pi";
import { Search } from "@/components/ui/search";
import { ExtendedUser } from "@/auth";

const UserProfile = ({user}: any) => {
  return (
    <>
      <div className="px-3 py-5 border-b border-[#5C6B81]">
        <div className="gap-4 flex">
          <div className="flex-1 flex  gap-3 ">
            <div className="relative inline-block ">
              <span className="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image
                  width={40}
                  height={40}
                  className="aspect-square h-full w-full"
                  src={user.image ?? "https://dash-tail.vercel.app/_next/static/media/avatar-2.1136fd53.jpg"}
                  alt="tst"
                />
              </span>
              <div className="inline-flex rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-success border-transparent text-success-foreground h-2 w-2 p-0 ring-1 ring-border ring-offset-[1px] items-center justify-center absolute left-[calc(100%-8px)] top-[calc(100%-10px)]"></div>
            </div>
            <div className="block">
              <div className="truncate max-w-[120px]">
                <span className="text-sm  text-white font-medium">
                  {" "}
                  {user.name}
                </span>
              </div>
              <div className="truncate  max-w-[120px]">
                <span className=" text-sm  text-[#5C6B81] ">Active Now</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <PiDotsThreeCircleLight className="text-[#4A32B0] text-[2rem]"/>
          </div>
        </div>
        <div className="pt-5">
          <Search placeholder="Search by name"/>
        </div>
      </div>
    </>
  );
}

export default UserProfile;