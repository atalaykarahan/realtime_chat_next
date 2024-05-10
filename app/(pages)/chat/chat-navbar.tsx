"use client";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { RxHamburgerMenu } from "react-icons/rx";
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import { LuPhone, LuInfo } from "react-icons/lu";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Input } from "@/components/ui/input";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

export default function ChatNavbar() {
  return (
    <Disclosure as="nav" className="border-b border-[#5C6B81]">
      {({ open }) => (
        <>
          <div>
            <div className="relative px-5 flex h-20 items-center justify-between">
              <div className="flex items-center">
                {/* Profile dropdown */}
                <div>
                  <div className="gap-4 flex">
                    <div className="flex-1 flex  gap-3 ">
                      <div className="relative inline-block ">
                        <span className="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full">
                          <Image
                            width={40}
                            height={40}
                            className="aspect-square h-full w-full"
                            src="https://dash-tail.vercel.app/_next/static/media/avatar-2.1136fd53.jpg"
                            alt="tst"
                          />
                        </span>
                        <div className="inline-flex rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-success border-transparent text-success-foreground h-2 w-2 p-0 ring-1 ring-border ring-offset-[1px] items-center justify-center absolute left-[calc(100%-8px)] top-[calc(100%-10px)]"></div>
                      </div>
                      <div className="block">
                        <div className="truncate max-w-[120px]">
                          <span className="text-sm  text-white font-medium">
                            {" "}
                            Felecia Rower
                          </span>
                        </div>
                        <div className="truncate  max-w-[120px]">
                          <span className=" text-sm  text-[#5C6B81] ">
                            Active Now
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
              <div className="flex items-center gap-5">
                <LuPhone className="text-[#4A32B0] text-2xl" />
                <LuInfo  className="text-[#4A32B0] text-2xl" />
                <HiOutlineDotsVertical className="text-[#4A32B0] text-2xl" />
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
