"use client";
import { logout } from "@/app/api/services/auth.Service";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, UserRoundPlus } from "lucide-react";
import { PiDotsThreeCircleLight } from "react-icons/pi";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

const Dropdown = () => {
  const handleLogout = async () => {
    try {
      const res = await logout();
      console.log(res);
      if (res.status === 200) {
        toast.success("Çıkış yaptı");
        await signOut();
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
        <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          Profil
        </DropdownMenuItem>

        <DropdownMenuItem>
          <UserRoundPlus className="mr-2 h-4 w-4" />
          Arkadaş Ekle
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4 text-rose-700" />
          <span>Çıkış Yap</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
