"use client";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { IoIosLogOut } from "react-icons/io";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface googleInformation {
  user_email: string;
  user_name: string;
  user_photo: string;
}

const GoogleSection = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [userInfo, setUserInfo] = useState<googleInformation | undefined>({
    user_email: "",
    user_name: "",
    user_photo: "",
  });

  useEffect(() => {
    if (token) {
      try {
        const decodedToken: googleInformation = jwtDecode(token);
        setUserInfo(decodedToken);
        console.log(decodedToken);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  return (
    <div className="rounded-lg w-full bg-transparent my-8 text-center">
      <p className="text-gray-400 w-full flex items-center pb-4">
        <FcGoogle className="mr-2" />
        Google tarafından şu şekilde oturum açıldı:
      </p>
      <div className="flex items-center justify-between ">
        <div className="flex space-x-4 items-center">
          <Image
            src={userInfo?.user_photo ?? "https://i.hizliresim.com/r0g8cdd.png"}
            alt={"Google Username"}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            {/* name section */}
            <p className="font-bold text-lg flex text-white">
              {userInfo?.user_name}
            </p>
            {/* mail section */}
            <p className="text-gray-400">{userInfo?.user_email}</p>
          </div>
        </div>

        <button className="text-gray-500  hover:text-gray-700  duration-300">
          <IoIosLogOut className="h-[1.7rem] w-auto" />
        </button>
      </div>
    </div>
  );
};

export default GoogleSection;
