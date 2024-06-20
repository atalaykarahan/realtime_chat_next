"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PiDotsThreeCircleLight } from "react-icons/pi";
import {
  CircleCheck,
  CircleMinus,
  CreditCard,
  Gem,
  LogOut,
  User,
  UserRoundPlus,
} from "lucide-react";
import { logout } from "@/app/api/services/auth.Service";
import { toast } from "sonner";

const Dropdown = () => {
  const handleLogout = async () => {
    try {
      const res = await logout();
      if (res.status === 200) {
        window.location.href = "/";
      }
    } catch (error: any) {
      toast.error("Bir şeyler ters gitti.", {
        description: "Çıkış yapma işlemi ile ilgili bir hata oluştu",
        duration: 3000,
      });
      console.error(error);
    }
  };

  return (
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
  );
};

export default Dropdown;
