"use client";
import { Disclosure } from "@headlessui/react";
import { LuPlusCircle } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import { AiOutlineSend } from "react-icons/ai";
import io, { Socket } from "socket.io-client";
import { useEffect, useState } from "react";

export default function ChatMessage() {
  // const [socket, setSocket] = useState<Socket | null>(null);
  // const [connectionStatus, setConnectionStatus] =
  //   useState<string>("Connecting...");

  useEffect(() => {
    // const newSocket = io("http://localhost:9898/chat", {
    //   transports: ["websocket", "polling"],
    // });
    // newSocket.on("connect", () => {
    //   setConnectionStatus("Connected");
    // });
    // newSocket.on("disconnect", () => {
    //   setConnectionStatus("Disconnected");
    // });
    // newSocket.on("connect_error", (error) => {
    //   setConnectionStatus(`Connection Error: ${error.message}`);
    // });
    // setSocket(newSocket);
    // return () => {
    //   if (newSocket) newSocket.close();
    // };
  }, []);

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
                <Input type="text" placeholder="Type your message..." />
              </div>
              <div>
                <AiOutlineSend className="text-[#4A32B0] text-[2rem]" />
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
