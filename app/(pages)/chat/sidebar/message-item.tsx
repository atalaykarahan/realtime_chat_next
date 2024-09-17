"use client";
import Image from "next/image";
import { openChatBox } from "@/app/redux/slices/messageBoxSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { extractTime } from "@/lib/utils";
import clsx from "clsx";
import { MdOutlineNotificationsActive } from "react-icons/md";
import animationData from "@/public/notification-bell.json";
import { MessageItemModel } from "@/app/redux/slices/chatlistSlice";

interface MessageItemProps {
  message: MessageItemModel;
  highlight?: boolean;
  selected?: boolean;
  onClick: () => void;
}

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  highlight,
  selected,
  onClick,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const openMessageBox = () => {
    dispatch(
      openChatBox({
        activeComponent: "chatbox",
        other_user_email: message.user_email,
        other_user_name: message.user_name,
        other_user_photo: message.user_photo,
        room_id: message.room_id,
        friend_status: message.friend_status,
      })
    );
    onClick();
  };
  const formattedTime = extractTime(message.updatedAt);

  return (
    <div
      onClick={openMessageBox}
      className={clsx(
        "gap-4 py-2 lg:py-2.5 px-3 border-l-2 rounded-lg   border-transparent hover:bg-default-200 cursor-pointer flex transition-all duration-500",
        { "": highlight }
      )}
    >
      <div className="flex-1 flex  gap-3 ">
        <div className="relative inline-block ">
          <span className="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full">
            <Image
              width={40}
              height={40}
              className="aspect-square h-full w-full"
              src={
                message.friend_status === "friend"
                  ? message.user_photo
                  : "/profile-circle.svg"
              }
              alt="tst"
              loading="eager"
            />
          </span>
          <div className="inline-flex rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-success border-transparent text-success-foreground h-2 w-2 p-0 ring-1 ring-border ring-offset-[1px] items-center justify-center absolute left-[calc(100%-8px)] top-[calc(100%-10px)]"></div>
        </div>
        <div className="block">
          <div className="truncate max-w-[120px]">
            <span
              className={clsx(
                "text-sm text-gray-300 font-medium transition-all duration-500 ease-in-out",
                {
                  "font-bold text-white": highlight || selected,
                }
              )}
            >
              {" "}
              {message.user_name}
            </span>
          </div>
          <div className="truncate  max-w-[120px]">
            <span
              className={clsx(
                "text-xs  text-[#5C6B81] transition-all duration-500 ease-in-out",
                {
                  "text-[#fff]": highlight || selected,
                }
              )}
            >
              {/* 52 karakter  */}
              {
              message.last_message.length >= 15
                ? message.last_message.substring(0, 15) + "..."
                : message.last_message}
            </span>
          </div>
        </div>
      </div>
      <div className="flex-none  flex-col items-end  gap-2 hidden lg:flex">
        <span className="text-xs text-white text-end uppercase ">
          {formattedTime}
        </span>
        {highlight && (
          <span className=" flex items-center  text-[#fff] justify-center bg-default-400 rounded-full text-[8px] font-light tracking-widest">
            NEW
          </span>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
