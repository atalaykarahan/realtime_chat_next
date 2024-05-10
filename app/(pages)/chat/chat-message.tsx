"use client";
import { Disclosure } from "@headlessui/react";
import { LuPlusCircle } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import { AiOutlineSend } from "react-icons/ai";

export default function ChatMessage() {
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
                <Input  type="text" placeholder="Type your message..." />
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
