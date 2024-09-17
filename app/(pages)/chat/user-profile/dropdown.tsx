"use client";
import { logoutAction } from "@/actions/logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { PiDotsThreeCircleLight } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { showProfile, showFriends } from "@/app/redux/slices/messageBoxSlice";

const Dropdown = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [dropdown, setDropdown] = useState<boolean>(false);

  return (
    <>
      <DropdownMenu open={dropdown} onOpenChange={setDropdown}>
        <DropdownMenuTrigger className="outline-none">
          <PiDotsThreeCircleLight className="text-[#4A32B0] text-[2rem]	" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={() => {
              setDropdown(!dropdown);
              dispatch(showProfile());
            }}
          >
            <User className="mr-2 h-4 w-4 text-blue-500" />
            Profil
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={() => {
              setDropdown(!dropdown);
              dispatch(showFriends());  
            }}
          >
            <UserRoundPlus className="mr-2 h-4 w-4 text-green-600" />
            Arkadaşlar
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={async () => await logoutAction()}>
            <LogOut className="mr-2 h-4 w-4 text-rose-700" />
            <span>Çıkış Yap</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Dropdown;
