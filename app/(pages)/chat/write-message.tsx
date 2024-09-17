"use client";
import { Disclosure } from "@headlessui/react";
import { LuPlusCircle } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import { AiOutlineSend } from "react-icons/ai";
import { Socket } from "socket.io-client";
import React, { useState } from "react";
import { AnimatedPlaceholdersInput } from "@/components/ui/animated-placeholders-input";
import { MessageItemSliceModel } from "@/app/redux/slices/messageBoxSlice";
import {
  addChatMessage,
  updateLastMessage,
} from "@/app/redux/slices/chatlistSlice";
import { AppDispatch } from "@/app/redux/store";
import { useDispatch } from "react-redux";

interface WriteMessageProps {
  user: any;
  socket: Socket | null;
  friend: MessageItemSliceModel;
}

const WriteMessage: React.FC<WriteMessageProps> = ({
  user,
  socket,
  friend,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSendMessage = () => {
    console.log("other_user_email", friend.other_user_email);
    if (newMessage.trim() && user.id) {
      sendMessage(friend.room_id, newMessage, friend.other_user_email);
      setNewMessage("");
    }
  };

  const sendMessage = (
    room_id: string,
    message: string,
    other_user_email: string
  ) => {
    if (socket && user) {
      console.log("Error sending message4:");

      socket.emit("sendMessage", {
        room_id,
        message,
        other_user_email,
      });
      dispatch(
        updateLastMessage({
          room_id,
          message,
          updatedAt: new Date().toISOString(),
        })
      );
    }
  };

  // for press enter then send a message
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const friendPlaceholders =
    friend.friend_status !== "friend"
      ? ["Bu kişi seni engellemiş veya sen onu engellemişsin"]
      : [
          "Mesajınızı buraya yazın...",
          "Merhaba, nasılsınız?",
          "Dün akşamki film harikaydı!",
          "Sohbete katılın...",
          "Yeni projeyle ilgili düşüncelerim var.",
          "Bir şeyler yazmak ister misiniz?",
        ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSendMessage();
  };
  return (
    <Disclosure as="nav" className="border-t border-[#5C6B81]">
      {({ open }) => (
        <>
          <div>
            <div className="relative px-5 flex h-20 gap-5 items-center">
              <div>
                <LuPlusCircle className="text-[#4A32B0] text-[2rem]" />
              </div>
              <div className="w-full">
                <AnimatedPlaceholdersInput
                  placeholders={friendPlaceholders}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onSubmit={onSubmit}
                  disabled={friend.friend_status !== "friend"}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default WriteMessage;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
