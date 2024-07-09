"use client";
import { logoutAction } from "@/actions/logout";
import AddFriendDialog from "@/components/dialogs/add-friend";
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

const Dropdown = () => {
  const [addFriendDialog, setAddFriendDialog] = useState<boolean>(false);
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

          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            Profil
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={() => {
              setDropdown(!dropdown);
              setAddFriendDialog(!addFriendDialog);
            }}
          >
            <UserRoundPlus className="mr-2 h-4 w-4" />
            Arkadaş Ekle
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={async () => await logoutAction()}>
            <LogOut className="mr-2 h-4 w-4 text-rose-700" />
            <span>Çıkış Yap</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* add friend dialog */}

      {addFriendDialog && (
        <AddFriendDialog
          openModal={addFriendDialog}
          closeModal={() => setAddFriendDialog(!addFriendDialog)}
        />
      )}
    </>
  );
};

export default Dropdown;
