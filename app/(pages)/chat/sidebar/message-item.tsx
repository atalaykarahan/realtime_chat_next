"use client";
import Image from "next/image";
import {MessageItemModel} from "./sidebar";
import {openChatBox} from "@/app/redux/slices/message-boxSlice";
import {useDispatch} from "react-redux"
import {AppDispatch} from "@/app/redux/store";

interface MessageItemProps {
    message: MessageItemModel;
}

const MessageItem: React.FC<MessageItemProps> = ({message}) => {
    const dispatch = useDispatch<AppDispatch>();
    const openMessageBox = () => {
        dispatch(openChatBox({
            chatBoxStatus: true,
            other_user_email: message.user_email,
            other_user_name: message.user_name,
            other_user_photo: message.user_photo,
            room_id: message.room_id
        }))
    }
    return (
        <div
            onClick={openMessageBox}
            className="gap-4 py-2 lg:py-2.5 px-3 border-l-2 border-transparent hover:bg-default-200 cursor-pointer flex">
            <div className="flex-1 flex  gap-3 ">
                <div className="relative inline-block ">
          <span className="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full">
            <Image
                width={40}
                height={40}
                className="aspect-square h-full w-full"
                src={
                    message.user_photo ||
                    "https://dash-tail.vercel.app/_next/static/media/avatar-2.1136fd53.jpg"
                }
                alt="tst"
                loading="eager"
            />
          </span>
                    <div
                        className="inline-flex rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-success border-transparent text-success-foreground h-2 w-2 p-0 ring-1 ring-border ring-offset-[1px] items-center justify-center absolute left-[calc(100%-8px)] top-[calc(100%-10px)]"></div>
                </div>
                <div className="block">
                    <div className="truncate max-w-[120px]">
            <span className="text-sm text-white  font-medium">
              {" "}
                {message.user_name}
            </span>
                    </div>
                    <div className="truncate  max-w-[120px]">
            <span className=" text-xs  text-[#5C6B81] ">
              {/* 52 karakter  */}
                {message.last_message.length >= 52
                    ? message.last_message.substring(0, 52) + "..."
                    : message.last_message}
            </span>
                    </div>
                </div>
            </div>
            <div className="flex-none  flex-col items-end  gap-2 hidden lg:flex">
        <span className="text-xs text-white text-end uppercase ">
          {new Date(message.updatedAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false, // 24 saat formatı için
              timeZone: "Europe/Istanbul", // Türkiye saati için
          })}
        </span>
                <span
                    className="h-[14px] w-[14px] flex items-center justify-center bg-default-400 rounded-full text-primary-foreground text-[10px] font-medium">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              className="text-sm iconify iconify--uil"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
          >
            {/* okundu okunmadi durumlari icin tek tik ikonu */}
              <path
                  fill="currentColor"
                  d="M18.71 7.21a1 1 0 0 0-1.42 0l-7.45 7.46l-3.13-3.14A1 1 0 1 0 5.29 13l3.84 3.84a1 1 0 0 0 1.42 0l8.16-8.16a1 1 0 0 0 0-1.47"
              ></path>
          </svg>
        </span>
            </div>
        </div>
    );
};

export default MessageItem;
