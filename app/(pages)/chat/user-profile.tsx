"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { PiDotsThreeCircleLight } from "react-icons/pi";
import { Search } from "@/components/ui/search";
import { ExtendedUser } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast"

import {
  UserRoundPlus,
  User,
  CreditCard,
  Gem,
  CircleMinus,
  CircleCheck,
  LogOut,
} from "lucide-react";
import { logout } from "@/app/api/services/auth.Service";


const UserProfile = ({ user }: any) => {
  const { toast } = useToast()

  const handleLogout = async () => {
    try {
      const res = await logout();
      if (res.status === 200 ) {
        window.location.href = "/";
      }
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
    }
  };

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
                  src={
                    user.image ??
                    "https://dash-tail.vercel.app/_next/static/media/avatar-2.1136fd53.jpg"
                  }
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
            <DropdownMenu>
              <DropdownMenuTrigger>
                <PiDotsThreeCircleLight className="text-[#4A32B0] text-[2rem]" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Gem className="mr-2 h-4 w-4 text-blue-700" />
                  <span>Premium</span>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <UserRoundPlus className="mr-2 h-4 w-4" />
                  Add Friends
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    {/* dinamik */}
                    <CircleCheck className="mr-2 h-4 w-4 text-green-700" />
                    <span>Status</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <CircleCheck className="mr-2 h-4 w-4 text-green-700" />

                        <span>Active</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CircleMinus className="mr-2 h-4 w-4 text-rose-700" />
                        <span>Busy</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4 text-rose-700" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="pt-5">
          <Search placeholder="Search by name" />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
