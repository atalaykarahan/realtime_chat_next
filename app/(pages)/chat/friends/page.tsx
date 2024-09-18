"use client";
import CustomCard from "@/components/custom-card";
import AddFriend from "./add-friends";
import FriendsComponent from "./friends-component/friends";
import RequestsComponent from "./requests-component/requests";
import io, { Socket } from "socket.io-client";
import { useAppSelector } from "@/app/redux/store";
import { cn } from "@/lib/utils";
import BlockedComponent from "@/app/(pages)/chat/friends/blockeds-component/blocked";
import React from "react";

interface FriendsSettingsProps {
  socket: Socket | null;
}

const FriendsSettings: React.FC<FriendsSettingsProps> = ({ socket }) => {
  const statusValue = useAppSelector((state) => state.messageBoxReducer.value);

  return (
    <CustomCard className={"flex-1 flex-col justify-between"}>
      <AddFriend socket={socket} />
      <div className="grid grid-cols-2 flex-1 gap-4 p-5">
        <FriendsComponent />
        <div className="flex flex-col h-full gap-4">
          <RequestsComponent socket={socket} />
          <BlockedComponent />
        </div>
      </div>
    </CustomCard>
  );
};

export default FriendsSettings;
