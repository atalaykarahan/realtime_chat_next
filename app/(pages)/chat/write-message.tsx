"use client";
import { Disclosure } from "@headlessui/react";
import { LuPlusCircle } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import { AiOutlineSend } from "react-icons/ai";
import io, { Socket } from "socket.io-client";
import React, { useEffect, useState } from "react";

interface WriteMessageProps {
  user: any;
  socket: Socket | null;
}

const WriteMessage: React.FC<WriteMessageProps> = ({ user, socket }) => {
  const [newMessage, setNewMessage] = useState("");
  const [toUserId, setToUserId] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() && user.id) {
      sendMessage("109815820391877629881", newMessage);
      setNewMessage("");
    }
  };

  const sendMessage = (DestionationUserId: string, message: string) => {
    if (socket && user) {
      socket.emit("sendMessage", {
        DestionationUserId,
        message,
      });
    }
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
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
              </div>
              <div onClick={handleSendMessage}>
                <AiOutlineSend className="text-[#4A32B0] text-[2rem]" />
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default WriteMessage;
